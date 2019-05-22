(function() {
  var INTERVAL = 1000 / 60;
  function animate(obj, map, time, callback) {
    var isIE = /msie [6-8]/i.test(navigator.userAgent);
    var startTime = Date.now();
    if ( isFunction( time )  ) {
      callback = time;
      time = 500500;
    }
    time = time || 500;
    var flag = true;
    if (obj.timer)

      clearInterval(obj.timer);
      
      obj.timer = setInterval(function() {
        flag = true;
        for (var attr in map) {
          var curVal = (attr === 'opacity') ? Math.round(parseFloat(getStyle(obj, attr)) * 100) : parseInt(getStyle(obj, attr));
          var differ = map[attr] - curVal;
          var speed = differ / 8;
          
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
          
          if (curVal != map[attr]) {
            flag = false;
          }
          
          obj.style[attr] = (attr === 'opacity') ?
          (isIE ? 'filter:Alpha(opacity=' + (curVal + speed) + ')' :
          (curVal + speed) / 100) : (curVal + speed + 'px');
          
          if ( flag ) {
            
            clearInterval(obj.timer);
            
            delete obj.timer;

            if ( isFunction(callback) ) {
              callback.call(this);
            }
          
          }
        }
      
      }, INTERVAL);

  }

  function getStyle(obj, attr) {
    var view = obj.ownerDocument.defaultView;
    return !!view.getComputedStyle ? getComputedStyle(obj, false)[attr] : obj.currentStyle[attr];
  }

  function setStyle(obj, map) {
    if ( isElement(obj) && isPlainObject(map) ) {
      for (var attr in map) {
        obj.style[attr] = map[attr];
      }
    }
  }

  function hasOwn(o, prop) {
    return o != null ? Object.hasOwnProperty.call(o, prop) : false;
  }

  function getProto(o) {
    return o != null ? Object.getPrototypeOf(o) || Object.prototype : null;
  }

  function type(o) {
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
  }

  function isPlainObject(o) {
    var proto, Ctor;
    proto = getProto(o);
    Ctor = hasOwn(prop, 'constructor') && prop.constructor;
    return o && type(o) === 'object' && Ctor === Object;
  }

  function isFunction(o) {
    return typeof o === 'function';
  }

  window.animate = animate;
})();