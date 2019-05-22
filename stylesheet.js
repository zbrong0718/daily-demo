var stylesheet = function() {
  var
  head = document.getElementsByTagName('head')[0],
  style = document.createElement('style'),
  records = [],
  total = 0;
  head.appendChild(style);

  return {
    get: function(n) {
      n = n < 0 ? total + n : n % total;
      return records[n] || '';
    },

    add: function(cssText) {
      records.push(cssText);
      total = records.length;
      style.innerHTML = records.join('\r\n');
      return total;
    },

    remove: function(n) {
      if( typeof n === 'number') {
        total >= n && records.splice(n, 1);
      } else if ( typeof n === 'string' ) {
        for( var i = 0; i < total; ++i ) {
          if( n === records[i] ) {
            records.splice(i, 1);
            break;
          }
        }
      }
      style.innerHTML = records.join('\r\n');
      total = records.length;
      return total;
    },

    replace: function(n, cssText) {
      var type = typeof n;
      if( 'number' === type ) {
        total >= n && ( records[n] = cssText );
      } else if ( 'string' === type ) {
        for( var i = 0; i < total; ++i ) {
          if( n === records[i] ) {
            records[i] = cssText;
            break;
          }
        }
      }
      style.innerHTML = records.join('\r\n');
    },

    mix: function(o) {
      var type = Object.prototype.toString.call(o).slice(8, -1).toLowerCase(), op;
      'string' === type && ( o = {type: arguments[1], css: o}, type = 'object' );
      if( 'object' === type ) {
        if ( o.css ) {
          op = /add|replace|remove/.test(o.type) ? RegExp.$0 : 'add';
          this[ op ]( o.css );
        }
      } else {
        throw Error('stylesheet: arguments parse error!');
      }
    }
  };
}();