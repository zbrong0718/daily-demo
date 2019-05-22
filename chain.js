(function(global) {

  function chain(o) {
    var _chain = {
      orginal: o,
      value: {},
      results: {}
    };
    var props = getProps(o);
    each(props, function(el) {
      var one = o[ el ], clone;
      if ( isFunction( one ) ) {
        _chain[ el ] = function() {
          value = one.apply(o, arguments);
          if ( value ) {
            clone = chain(value);
            clone.results[ el ] = {
              args: arguments,
              value: value
            };
            clone.prevObject = _chain;
            return clone;
          }
          return _chain;
        }
      } else {
        _chain.value[ el ] = one;
      }
    });
    return _chain;
  }

  function each(arr, action) {
    var i = 0, length = arr.length;
    while( i < length ) {
      if ( action(arr[i], i, arr) === false ) {
        return ;
      }
      ++i;
    }
  }

  function isFunction(o) {
    return typeof o === 'function';
  }

  function setProto(o, op) {
    return Object.setPrototypeOf(o, op);
  }

  function getProps(o) {
    var props = Object.getOwnPropertyNames(o).concat( Object.getOwnPropertyNames(o) ) || [];
    for( var k in o ) {
      props.push(k);
    }
    return props;
  }

  function deepClone(o) {
    var clone = Array.isArray(o) ? [] : {};
    for(var k in o) {
      clone[ k ] = 'object' === typeof o[k] ? deepClone(o[k]) : o[k];
    }
    return clone;
  }
  var _ = {};
  _.chain = chain;
  if ( module && typeof module.exports === 'object') {
    module.exports = _;
  }
})(this);