function Hook() {
  var realFn, fname;
  var hook = function(hookFn, context) {
    var _context = context || window;
    realFn = this;
    fname = realFn.name;

    if ( _context[ fname ].isHooked ) return;

    _context[ fname ] = function() {
      hookFn.apply(this, arguments);
      return realFn.apply(this, arguments);
    };

    _context[ fname ].isHooked = true;
    _context[ fname ].valueOf = _context[ fname ].toString = function() {
      return fname + '{ [native code] }';
    };

  }, unhook = function(context) {
    var _context = context || window;
    _context[ fname ] = realFn;
    if ( !_context[ fname ].isHooked ) return;
    _context[ fname ] = realFn;
    realFn = null;
  };
  return {
    initEnv: function() {
      Function.prototype.hook = hook;
      Function.prototype.unhook = unhook;
    },
    cleanEnv: function() {
      var env = ['hook', 'unhook'], prop;
      while( env.length ) {
        prop = env.shift();
        if ( Function.prototype.hasOwnProperty( prop ) ) {
          delete Function.prototype[ prop ];
        }
      }
    }
  }
}

if ( module && typeof module.exports === 'object' ) {
  module.exports = Hook;
}