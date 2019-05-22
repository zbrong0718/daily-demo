/**
 * CSS Class List
 * https://github.com/jesson_wang/css-class-list
 * 
 * Copyright (c) since 2018 by Jesson Wang
 * Released under the MIT license
 */

 (function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    factory(global);
  }
})(this, function(global) {
  'use strict';

  function isObjectLike(o) {
    return typeof o === 'object' && o !== null;
  }

  function isDefined(o) {
    return typeof o !== 'undefined' && o !== null;
  }
  
  function isNode(o) {
    return o instanceof Element;
  }

  function extend() {
    var key, out, options, src, copy, sources, i, len;
    out = arguments[0] || {}, sources = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
    for( i = 0, len = sources.length; i < len; i++ ) {
      options = typeof sources[i] === 'object' ? sources[i] : {};
      for( key in options) {
        src = out[key];
        copy = options[key];
        if ( !options.hasOwnProperty(key) || src === copy || !isDefined(copy) ) {
          continue;
        }
        if ( isObjectLike(src) && isObjectLike(copy) ) {
          out[key] = extend(src, copy);
        } else {
          out[key] = copy;
        }
      }
    }
    return out;
  }

  function CSSClassList(el) {
    this.el = el;
    if ( isNode(el) ) {
    }
  }

  extend( CSSClassList.prototype, {
    contains(c) {
      c = ('' + c).split(' ')[0];
      return c && this.el.className.search('\\b'+ c +'\\b') > -1;
    },
    add(c) {
      c = ('' + c).split(' ')[0];
      if ( this.contains(c) ) return;
      var classes = this.el.className.replace(/\s+$/, '');
      c = classes && c ? (' ' + c) : (c || '');
      this.el.className += c;
    },
    remove(c) {
      c = ('' + c).split(' ')[0];
      var pattern = new RegExp('\\b' + (c || '') + '\\b', 'g'),
      classes = this.el.className.replace(pattern, '').replace(/\s+$/,'');
      this.el.className = classes;
    },
    toggle(c) {
      if(this.contains(c)) {
        this.remove(c);
        return false;
      } else {
        this.add(c);
        return true;
      }
    },
    toString() {
      return this.el.className;
    },
    toArray() {
      this.el.className.match(/\b\B+?\b/g) || [];
    },
    valueOf() {
      return this.toArray();
    }
  });

  function $class(el) {
    if ( !el.cssClassList ) {
      el.cssClassList = el.classList || new CSSClassList(el);
    }
    return el.cssClassList;
  }

  if ( global ) {
    global.$class = $class;
  }
  return $class;
});
