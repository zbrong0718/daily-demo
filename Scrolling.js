(function() {
  'use strict';
  var noop = function() {};
  // 首字母大写
  String.prototype.toCapitalize = function toCapitalize() {
    return this[0].toUpperCase() + this.slice(1);
  };

  if ( !isFunction( Date.now ) ) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }

  function sliceCall( arrLike, x, y ) {
    return Array.prototype.slice.call( arrLike, x, y );
  }

  function protoFnCall( ctor, fnName, oThis) {
    var args = sliceCall( arguments, 3 );
    return ctor.prototype[ fnName ].apply( oThis, args );
  }

  function each(arr, callback, oThis) {
    var i = -1, length = arr.length, args = sliceCall(arguments, 3);
    while( ++i < length ) {
      if ( callback.apply( oThis, ( args.unshift(arr[i], i, arr), args ) ) === false ) {
        break;
      }
    }
  }

  function isFunction(o) {
    return typeof o === 'function';
  }

  function isNumeric(o) {
    return ( typeof o === 'number' || typeof o === 'string' ) &&
           !isNaN( parseFloat( o ) - o );
  }

  function isArray( o ) {
    try {
      return Array.isArray( o );
    } catch( e ) {
      return protoFnCall( Object, 'toString', o ).slice(8, -1) === 'Array';
    }
  }

  function inArray( val, arr ) {
    arr = isArray( arr ) ? arr : [];
    try {
      return protoFnCall(Array, 'indexOf', arr, val );
    } catch( e ) {
      var iterator = makeIterator(arr), data;
      while( data = iterator.next() ) {
        if ( data === val ) {
          return iterator.index();
        }
      }
      return -1;
    }
  }

  function getScrollingElement() {
    if ( typeof document.scrollingElement === 'object' ) {
      return document.scrollingElement;
    } else {
      var iterator = makeIterator( ['body', 'documentElement'] ), prop, el;
      while( prop = iterator.next() ) {
        el = document[ prop ];
        el.scrollTop ++;
        if ( el.scrollTop ) {
          el.scrollTop --;
          return el;
        }
      }
    }
  }

  function makeIterator(arr) {
    var i = 0, length = +arr.length;
    return {
      next: function() {
        if ( i < length ) {
          return arr[ i++ ];
        }
      },
      index: function() {
        return i;
      }
    }
  }

  function makeAFfn(type) {
    type = type.toUpperCase();
    var
        iterator = makeIterator( ['webkit', 'moz', 'o', 'ms'] ), af = 'AnimationFrame',
        oType = {
          RAF: 'request',
          CAF: 'cancel'
        },
        fnString = oType[ type ] + af,
        prefix = '',
        fn;

    if ( typeof ( fn = window[ fnString ] ) === 'function' ) {
      return fn;
    }
    
    while( prefix = iterator.next() ) {
      if ( isFunction( ( fn = window[ prefix + fnString.toCapitalize() + af ] ) ) ) {
        return fn;
      }
    }

    oType = {
      RAF: function(fn) {
        return window.setTimout( function() {
          var ts = Date.now();
          fn.call(null, ts);
        }, 1000 / 60 );
      },

      CAF: function(tid) {
        window.clearTimeout( tid );
      }
    };

    fn = oType[ type ];

    return fn;
  }

  Math.absoluteFloor = function absoluteFloor( num ) {
    return num < 0 ? Math.floor( num ) : Math.ceil( num );
  }
  
  function transformPos( pos ) {
    if ( isNumeric( pos ) ) {
      return pos;
    }

    else if ( pos instanceof Node && pos.nodeType === 1 ) {
      return pos.offsetTop;
    }

    else if ( typeof pos === 'string') {
      var oFn = {
        top: 0,
        middle: getMiddleScreen(),
        bottom: document.body.scrollHeight - window.innerHeight
      };
      if ( pos in oFn ) {
        return oFn[ pos ];
      }
    }

    return 0;
  }

  function getMiddleScreen() {
    var cH = document.body.scrollHeight, oSH = window.innerHeight;
     return Math.ceil( (cH - oSH) / 2 );
  }

  function animate(el, targetPos, duration) {
    var
      raf = makeAFfn('raf'),
      step = Math.floor( duration / animate.INTERVAL );

      function steps() {
        var
          currentPos = el.scrollTop,
          speed = Math.absoluteFloor( ( targetPos - currentPos ) / step );

        el.scrollTop += speed;
        currentPos = el.scrollTop;

        if ( currentPos !== targetPos ) {
          raf( steps );
        }
      }

      raf( steps );
  }

  animate.INTERVAL = 1000 / 60;

  function setDefault( options, val, defaultVal ) {
    var opts = isArray( options ) ? options : options.split('|');
    if ( inArray( val, opts ) > -1 ) {
      return val;
    }
    return isNumeric(defaultVal) &&
           defaultVal >= 0 && defaultVal < opts.length ?
           opts[ defaultVal ] : defaultVal ;
  }

  var Scrolling = (function() {
    function Scrolling(pos, options) {
      this.initialize(pos, options);
    }

    Scrolling.prototype = {
      version: '0.0.1',
      constroctor: Scrolling,
      initialize: function(pos, options) {
        this.pos = transformPos( pos );
        this.opts = options || {};
        this.scrollingElement = getScrollingElement();
        if ( this.opts.run === true ) {
          this.move();
        }
      },

      move: function() {
        var effect = setDefault( 'jump|animate', this.opts.effect , 1 );
        var pos = this.pos;
        if ( effect === 'jump' ) {
          this.scrollingElement.scrollTop = pos;
        } else {
          animate(this.scrollingElement, pos, 50);
        }
      }
    };

    return Scrolling;
  })();

  window.Scrolling = Scrolling;

  document.addEventListener('DOMContentLoaded', function() {
    each(document.querySelectorAll('*[data-jump]'), function(e) {
      e.addEventListener('click', function() {
        var opts = JSON.parse( this.dataset.jump );
        var scrolling = new Scrolling( opts.pos, {
          effect: opts.effect
        } );
        scrolling.move();
      });
    });
  });
})();