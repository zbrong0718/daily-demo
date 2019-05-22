var JSlider = {
  version: '0.0.1'
};
(function(Utils){
  var j$ = function(selector, context) {
    var ret;
    if ( selector && selector.nodeType === 1 ) {
      ret = selector;
    } else {
      ret = document.querySelectorAll(selector, context);
    }
    return ret && ret.length === 1 ? ret[ 0 ] : ret;
  },

  toggleClass = Utils.toggleClass, insertAfter = Utils.insertAfter, getNextElement = Utils.getNextElement,

  sliders = [];

  var JSlider = function(options) {
    this.init(options);
  };

  var _defaults = {
    slider: '.jslider',
    list: '.jslider-list',
    prevBtn: '.jslider-toggle-prev',
    nextBtn: '.jslider-toggle-next',
    controls: '.jslider-controls',
    controlItems: '.jslider-controls-item',
    trigger: 'click',
    auto: false,
    time: 2000,
  };

  JSlider.prototype = {
    constructor: JSlider,

    init: function(options) {
      var opts = Utils.extend(this, _defaults, options);
      this.slider = j$( opts.slider );
      this.list = j$( opts.list );
      this.prevBtn = j$( opts.prevBtn );
      this.nextBtn = j$( opts.nextBtn );
      this.controls = j$( opts.controls );
      this.controlItems = j$( opts.controlItems, this.controls );
      this.index = 0;
      this.timer = null;
      this.length = this.list.children.length;
      this.width = this.slider.clientWidth;
      this.list.style.left = -this.width + 'px';
      this.list.style.width = ( this.width * ( this.length + 2 ) ) + 'px';
      this.controls.style.width = this.controlItems[0].offsetWidth * this.length + 5 * this.length  + 'px';
      this.controls.style.left = (this.slider.clientWidth - this.controls.clientWidth) / 2 + 'px';
      insertAfter( this.list.children[ this.length - 1 ] , this.list.children[0].cloneNode(true) );
      this.list.children[0].parentNode.insertBefore( this.list.children[this.length - 1].cloneNode(true), this.list.children[0]);
      this.bindEvent();
    },
    
    setIndex: function(index) {
      var self = this;
      animate( this.list, {left: -(index + 1) * this.width }, function() {
        if ( index >= self.length ) {
          self.list.style.left = '-600px';
        }
        if ( index < 0 ) {
          self.list.style.left = -self.length * self.width + 'px'; 
        }
      });
      this.index = index < 0 ? this.length - 1 : index % this.length;
      toggleClass( this.controlItems[ this.index ], 'active');
    },

    prev: function() {
      this.setIndex(this.index - 1);
    },

    next: function() {
      this.setIndex(this.index + 1);
    },

    autoPlay: function() {
      var self = this;
      this.timer = setInterval(function() {
        self.next();
      }, this.time);
    },

    stop: function() {
      clearInterval(this.timer);
    },

    bindEvent: function() {
      var self = this;

      Utils.EventUtil.addEvent(this.prevBtn, 'click', function() {
        self.prev();
      });

      Utils.EventUtil.addEvent(this.nextBtn, 'click', function() {
        self.next();
      });

      Utils.arrayUtils.each(this.controlItems, function(e, i) {
        Utils.EventUtil.addEvent(e, self.trigger, function() {
          self.setIndex( i );
        });
      });

      if ( this.auto ) {
        Utils.EventUtil.addEvent(document, 'DOMContentLoaded', function() {
          self.autoPlay();
        });

        Utils.EventUtil.addEvent(this.slider, 'mouseover', function() {
          self.stop();
        });

        Utils.EventUtil.addEvent(this.slider, 'mouseout', function() {
          self.autoPlay();
        });
      }
    }
  };

  Utils.extend(window, {
    onload: function() {
      var jslider = j$('[data-options]');
      if(jslider.dataset.options) {
        var opt = JSON.parse(jslider.dataset.options);
        opt.slider = jslider;
        this.JSlider.init(opt);
      }
    },
    JSlider: {
      init: function(options) {
        sliders.push( new JSlider(options) );
        return this.peek();
      },
      get: function() {
        var length = sliders.length;
        return typeof index === 'number' && index.toString() !== 'NaN' ? sliders[ index ] : sliders;
      },
      peek: function() {
        var length = sliders.length;
        return sliders[ length-1 ];
      }
    }
  });
})(function() {
  var hasOwn = function(obj, prop) {
    return obj ? obj.hasOwnProperty(prop) : false;
  },
  o2string = function(o) {
    return Object.prototype.toString.call(o);
  },
  getProto = function(o) {
    return Object.getPrototypeOf(o);
  },
  isType = function(o, type) {
    return o2string(o, type).slice(8, -1).toLowerCase() === type.toLowerCase();
  };

  var Utils = {
    hasOwn: hasOwn,
    getProto: getProto,
    isType: isType,
    o2string: o2string,
    isPlainObject: function(o) {
      var isObject = isType(o, 'object'),
      proto = isObject && getProto(o),
      Ctor = hasOwn(proto, 'constructor') && proto.constructor;
      return ( proto === Object.prototype || proto === null ) && Ctor === Object;
    },

    isArray: function(o) {
      return isType(o, 'array');
    },

    isBoolean: function(o) {
      return isType(o, 'boolean');
    },

    isFunction: function(o) {
      return isType(o, 'function');
    },

    isPlainObject: function(o) {
      return Object.prototype.toString.call(o) === '[object Object]';
    },

    extend: function() {
      var options, name, src, copy, clone, copyIsArray,
      target = arguments[ 0 ] || {},
      length = arguments.length,
      i = 1,
      deep = false;

      if ( Utils.isBoolean(target) ) {
        deep = target;
        target = {};
        i ++;
      }

      if( typeof obj === 'object' && !isFunction( target ) ) {
        target = {};
      }

      if ( length === i ) {
        i --;
        target = this;
      }

      for( ; i < length; i++ ) {
        if( ( options = arguments[i] ) != null ) {
          for( name in options ) {
            src = target[ name ];
            copy = options[ name ];
            if ( src === copy ) {
              continue;
            }

            if ( deep && copy && ( Utils.isPlainObject( copy ) || ( copyIsArray = Utils.isArray( copy ) ) ) ) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && Utils.isArray( src ) ? src : [];
              } else {
                clone = src && Utils.isPlainObject( src ) ? src : {};
              }

              target[ name ] = Utils.extend( deep, clone, copy );
            } else if ( copy !== undefined ) {
              target[ name ] = copy;
            }
          }
        }
      }

      return target;
    }
  };

  Utils.extend({
    EventUtil: {
      addEvent: function(el, type, fn) {
        if ( el.addEventListener ) {
          el.addEventListener(type, fn, false);
        } else if ( el.attachEvent ) {
          el.attachEvent( 'on' + type, fn );
        } else {
          el[ 'on' + type ] = fn;
        }
      },
      removeEvent: function(el, type, fn) {
        if ( el.removeEventListener ) {
          el.removeEventListener(type, fn);
        } else if ( el.dispatchEvent ) {
          el.dispatchEvent( 'on' + type );
        } else {
          el[ 'on' + type ] = null;
        }
      }
    },

    hasClass: function(el, cls) {
      return el.className.split(' ').indexOf(cls) > -1;
    },

    addClass: function(el, cls) {
      if ( !Utils.hasClass(el, cls) ) {
        var classList = el.className.split(' ');
        classList.push(cls);
        el.className = classList.join(' ');
      }
    },

    removeClass: function(el, cls) {
      if ( Utils.hasClass(el, cls) ) {
        var classList = el.className.split(' ');
        classList.splice( classList.indexOf(cls), 1);
        el.className = classList.join(' ');
      }
    },

    getSiblings: function(target, callback) {
      var parent = target.parentNode;
      return Utils.arrayUtils.filter( parent.children, function(element) {
        if ( callback && element !== target ) {
          callback(element);
        }
        return element !== target;
      });
    },

    toggleClass: function(target, cls) {
      Utils.addClass(target, cls);
      Utils.getSiblings( target, function(sibling) {
        Utils.removeClass(sibling, cls);
      } );
    },

    insertAfter: function(target, node) {
      var parent = target.parentNode;
      if ( target === parent.lastChild ) {
        parent.appendChild( node );
      } else {
        parent.insertBefore( node, target.nextSibling );
      }
      return node;
    },

    getNextElement: function(el) {
      var next = el.nextSibling;
      if ( next && next.nodeType ) {
        if ( next.nodeType == 1 ) {
          return next;
        } else {
          return getNextElement( next );
        }
      }
      return null;
    },

    arrayUtils: {
      filter: function(arr, callback, thisArg) {
        var ret = [], args = ret.slice.call(3), i = 0, length = arr.length, tmp;
        for(; i < length; i++ ) {
          if ( callback.apply( thisArg, [ arr[i], i, arr ].concat(ret) ) ) {
            ret.push(arr[i]);
          }
        }
        return ret;
      },
      inArray: function(el, arr) {
        var i = 0, length = arr.length;
        for(; i < length; i++ ) {
          if ( arr[i] === el ) {
            return i;
          }
        }
        return -1;
      },
      each: function(arr, callback) {
        var i = -1, length = arr.length;
        while( ++i < length ) {
          if ( callback(arr[i], i, arr) === false ) {
            break;
          }
        }
      }
    }
  });

  return Utils;
}());
