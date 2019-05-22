function stringify(o) {
  var type, ret;
  var _type = function(o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
  };

  var _isPlainObject = function(o) {
    return _type(o) === 'object';
  }

  var _isCircle = function(o) {
    if ( !_isPlainObject(o) ) {
      return false;
    }
    var hasCircle = false, cache = [];
    (function cycle(o) {
      if ( cache.indexOf(o) > -1 ) {
        return hasCircle = true;
      }
      cache.push(o);
      for( var k in o ) {
        var v = o[k];
        if ( _isPlainObject(o) ) {
          cycle(v);
        }
      }
      cache.pop();
    })(o);
    return hasCircle;
  };

  var _quot = function(s) {
    return '"' + s + '"';
  };

  var _fmt = function(s) {
    if ( s && typeof s === 'object' )
      return stringify(s)
    return typeof s === 'string' ? _quot(s) : s
  };

  var handler = {
    array: function() {
      var arr = [];
      for(var i = 0, len = o.length; i < o.length; i++) {
        arr.push( _fmt( o[i] ) );
      }
      return '[' + arr.join(',') + ']';
    },
    object: function() {
      var arr = [];
      for( var k in o ) {
        if (!o.hasOwnProperty(k)) continue;
        arr.push( _quot(k) + ':' + _fmt(o[k]) );
      }
      return '{' + arr.join(',') + '}';
    }
  };

  type = _type(o);
  if ( type in handler ) {
    if ( !_isCircle(o) ) 
      ret = handler[type]();
    else
      throw new TypeError('Converting circular structure to JSON')
  }
  else if ( o !== undefined ) {
    ret = '' + o;
  }
  return ret;
}

function parse(json) {
  var rx_one = /^[\],:{}\s]*$/; var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  if ( rx_one.test( json.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "") {
    var obj = eval( "(" +json + ")" );
  }
  return obj;
}

if (module.exports === 'object') {
  module.exports = {
    stringify: stringify,
  }
}
