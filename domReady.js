(function(global, factory) {

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(global, true);
  } else {
    factory(global);
  }

})(this, function(global, noGlobal) {
  'use strict';

  var noop = function() {};
  var doc = global.document;
  var _slice = Array.prototype.slice;


  var _bind = function(fn, oThis) {
    var args;
    try {
      args = _slice.call(arguments, 1);
      return Function.prototype.bind.apply(fn, args);
    } catch (e) {
      args = _slice.call(arguments, 2);
      return function() {
        args = args.concat(_slice.call(arguments));
        fn.apply(oThis, args);
      };
    }
  };

  var _getProto = function(o) {
    return o != null ? Object.getPrototypeOf(o) || Object.prototype : null;
  };

  var _hasOwn = function(o, p) {
    return o != null && Object.hasOwnProperty.call(o, p);
  };

  var _fn2Str = function(fn) {
    return _isFunction(fn) ? fn.toString() : '';
  };

  var _setProto = function(o, p) {
    o = o != null ? o : {};
    p = typeof p === 'object' ? p : null;
    var ret = Object.setPrototypeOf(o, p);
    return ret === undefined ? o : ret;
  };

  var _isArray = Array.isArray || function(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array';
  };

  var _isFunction = function(o) {
    return typeof o === 'function';
  };

  var _isPlainObject = function(o) {
    var proto, Ctor;
    proto = _getProto(o);
    Ctor = _hasOwn(proto, 'constructor') && _isFunction(proto.constructor) && proto.constructor;
    return o && Object.prototype.toString.call(o).slice(8, -1) === 'Object' && Ctor && _fn2Str(Ctor) === _fn2Str(Object);
  };

  var _extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      length = arguments.length,
      i = 1,
      deep = false;

    if (typeof target === 'boolean') {
      deep = target;

      target = arguments[i] || {};
      i++;
    }

    if (typeof target !== 'object' && !_isFunction(target)) {
      target = {};
    }

    /*if ( i === length ) {
      target = this;
      i--;
    }*/

    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];

          if (src === copy) {
            continue;
          }

          if (deep && copy && (_isPlainObject(copy) || (copyIsArray = _isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && _isArray(src) ? src : [];
            } else {
              clone = src && _isPlainObject(src) ? src : {};
            }

            target[name] = _extend(deep, clone, copy);

          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  };

  var _defaults = {
    readyList: [],
    isReady: false
  };

  var DomReady = function(fn) {
    _extend(true, this, _defaults);
  };

  _extend(DomReady, {
    version: '1.0.0'
  });

  var proto = _setProto({}, null);

  _extend(proto, {
    constructor: DomReady,
    ready: function(fn) {
      var args = _slice.call(arguments, 1);
      fn = typeof fn === 'function' ? fn : noop;
      this.initReady();
      if (this.isReady) {
        fn.apply(this, args);
      } else {
        this.args = args;
        this.readyList.push(fn);
      }
      return this.pushStack();
    },

    initReady: function() {
      var handler = _bind(function() {
        doc.removeEventListener('DOMContentLoaded', handler, false);
        global.removeEventListener('load', handler, false);
        this.completed();
      }, this);
      if (doc.addEventListener) {
        doc.addEventListener('DOMContentLoaded', handler, false);
        global.addEventListener('load', handler, false);
      } else {
        if (doc.readyState === 'complete' ||
          (doc.readyState !== 'loading' && !doc.documentElement.doScroll)) {
          global.setTimeout( _bind(this.completed, this) );
        } else {
          global.setTimeout( _bind(this.initReady, this) );
        }
      }
      return this;
    },

    completed: function() {
      if (!this.isReady) {
        this.isReady = true;
        while (this.readyList.length) {
          this.readyList.shift().apply(this, this.args);
          delete this.args;
        }
      }
      return this;
    },

    pushStack: function() {
      var ret = new this.constructor();
      ret.prevObject = this;
      return ret;
    },

    then: function() {
      return this.ready.apply(this, arguments);
    }
  });

  DomReady.prototype = proto;

  var ready = function() {
    var domReady = new DomReady();
    var ret = domReady.ready.apply(domReady, arguments);
    return ret;
  };

  if (!noGlobal) {
    global.ready = ready;
  }

  return ready;
});