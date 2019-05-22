/**
 * 
 */
var A;
(function(util) {
  var extend = util.extend;
  var A = function(el) {
    return new fn.init(el);
  };
  A.INTERVAL = 1000 / 60;
  var fn = A.prototype;
  extend(fn, {
    init: function(el) {
      extend( this, {
        el: el,
        tid: null
      });
    },

    animate: function(options, delay, callback) {
      var self = this, el = this.el, step;
      if ( util.isFunction( delay ) ) {
        callback = delay;
        delay = null;
      }
      delay = delay || 500;
      step = Math.round( delay / A.INTERVAL );
      this.stop();
      this.tid = setInterval( function() {
        var current, target, value, unit, speed, prop, flag = true; 
        for ( prop in options ) {

          value = util.getCss( el, prop );

          current = parseFloat( value );

          if ( prop === 'opacity' ) {
            current = Math.round( current * 100 );
          }

          // 获取单位
          unit = value.substring( current.toString().length );

          target = options[ prop ];

          speed = ( target - current ) / step;

          speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );


          if ( prop === 'opacity' ) {
            el.style[ prop ] = (( current + speed ) / 100).toFixed(2); 
          } else {
            el.style[ prop ] = current + speed + unit;
          }

          if ( value != target && current != target ) {
            flag = false;
          }

        }

        if ( flag ) {
          self.stop();
          callback && callback.call(self);
        }

      }, A.INTERVAL );
      return this;
    },

    wait: function(ms) {
      ms = ms || 300;
      var now = +new Date();
      while( +new Date() - now <= ms ) {}
      return this;
    },

    stop: function() {
      clearInterval(this.tid);
      return this;
    }
  });
  fn.init.prototype = fn;
  window.A = A;
})(function(){
  'use strict';
  var slice = Array.prototype.slice;

  function isPlainObject(o) {
    return Object.toString.call( o ) === '[object Object]';
  }

  function isArray(o) {
    return Object.toString.call( o ) === '[object Array]';
  }

  function isFunction(o) {
    return typeof o === 'function';
  }

  function extend() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[ 0 ] || {},
      length = arguments.length,
      i = 1,
      deep = false;

      if ( typeof target === 'boolean' ) {
        deep = target;
        target = arguments[ i ] || {};
        i ++;
      }

      if ( typeof target !== 'object' && typeof target !== 'function' ) {
        target = {};
      }

      if ( i === length ) {
        target = this;
        i --;
      }

      for ( ; i < length; i++ ) {
        if ( ( options = arguments[ i ] ) != null ) {
          for ( name in options) {
            src = target[ name ];
            copy = options[ name ];

            if ( src === copy) {
              continue;
            }

            if ( deep && copy && ( isPlainObject(copy) || ( copyIsArray = isArray(copy) ) ) ) {
              if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && isArray( src ) ? src : [];
              } else {
                clone = src && isPlainObject( src ) ? src : {};
              }

              target[ name ] = extend( deep, clone, copy );
            } else if ( copy !== void 0 ) {
              target[ name ] = copy;
            }
          }
        }
      }
    return target;
  }

  function getCss(o, p) {
    var alias = o.ownerDocument.defaultView.getComputedStyle;
    return isFunction( alias ) ? alias(o, false)[ p ] : o.currentStyle[ p ];
  }

  function setCss(o, options) {
    for (var p in options ) {
      o.style[ p ] = options[ p ];
    }
  }

  function css(o, p, v) {
    var options;
    if( typeof p === 'string') {
      if ( v ) {
        options = {};
        options[ p ] = v;
        setCss( o, options );
      } else {
        getCss(o, p);
      }
    } else if ( isPlainObject( p ) ) {
      setCss(o, p);
    }
  }

  function each( arr, callback, oThis ) {
    var i = -1, length = arr.length;
    while( ++i < length ) {
      if ( callback.call( oThis, arr[ i ], i, arr ) ) {
        break;
      }
    }
  }


  return {
    isFunction: isFunction,
    extend: extend,
    getCss: getCss,
    setCss: setCss,
    css: css,
    each: each
  };
}());