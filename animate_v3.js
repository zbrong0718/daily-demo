var animate;
(function () {
  'use strict';
  var Ease = {
    'linear': function(t) {
      return t;
    },

    'easeIn': function(t) {
      return t ** 2;
    },

    'shake': function(t) {
      return t < .6 ? this.easeIn( t / .6 ) : 
      Math.sin((t-0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1;
    }
  };
  var animate = function animate(start, end, time, callback, easing) {
    var
      startTime = now(),
      differ = end - start,
      cur = start,
      rid,
      RAF = getAF('raf'),
      CAF = getAF('caf');
    
    easing = easing || 'linear';
    function loop() {
      rid = RAF(loop);
      var passTime = now() - startTime;
      var per = passTime / time;
      if ( per >= 1 ) {
        per = 1;
        CAF(rid);
      }

      cur = differ * Ease[ easing ](per);
      callback( cur );
    }
    rid = RAF(loop);
  }

  function isFunction(o) {
    return typeof o === 'function';
  }

  function now() {
    return 'performance' in window ? performance.now() : (
      isFunction(Date.now) ? Date.now() : (new Date).getTime()
    );
  }

  function getAF(type) {
    var vendors = 'webkit|moz|o|ms'.split('|'), fnName, fn,
    oType = {
      RAF: 'requestAnimationFrame',
      CAF: 'cancelAnimationFrame'
    },

    oTypeFn = {
      RAF: function(callback) {
        return setTimeout(callback, 1000 / 60 );
      },

      CAF: function(requestId) {
        clearTimeout(requestId);
      }
    };
    
    type = type.toUpperCase();

    fnName = oType[ type ];
    if ( fnName in window ) {
      return window[ fnName ];
    }

    for(var i = 0; i < vendors.length; i++) {
      fnName = vendors[ i ] + captialize( fnName );
      if ( fnName in window ) {
        fn = window[ fnName ];
        break;
      }
    }

    fn = isFunction( fn ) ? fn : oTypeFn[ type ];

    return fn;
  }


  function captialize(str) {
    var first = str[ 0 ].toUpperCase();
    return first + str.substring(1);
  }

  function getStyle(el, prop) {
    return window.getComputedStyle ? getComputedStyle(el)[prop] : el.currentStyle[prop];
  }

  /*window.animate = function(el, styles, easing, callback) {
    for( var prop in styles) {
      animate(parseFloat(getStyle(el, prop)), parseFloat(styles[prop]), 300, function(per) {
        el.style[prop] = per + 'px';
        callback && callback();
      }, easing);
    }
  };*/
  window.animate = animate;
})();

(function() {
  function runAnimation(callback) {
    var id, startTime = performance.now();
    function tick() {
      var now = performance.now();
      var diff = ( now - startTime ) / 1000;
      if ( callback( diff.toFixed(2) ) === false ) {
        clearTimeout(id);
        return;
      }

      id = setTimeout( tick );
    }
    id = setTimeout( tick );
    return {
      start: function() {
        id = setTimeout( tick );
      },
      stop: function() {
        clearTimeout(id);
      }
    }
  }
});