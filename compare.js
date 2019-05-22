var arrProto = Array.prototype,
__slice = arrProto.slice,
__arrPush = arrProto.push,
__o2Str = Object.prototype.toString;

var is = function(x, y) {
  if ( x === y ) {
    return x === 0 && y === 0 ? 1 / x === 1 / y : true;
  } else {
    return x !== x && y !== y;
  }
},

isObjectLike = function(o) {
  return isSet(o) && typeof o === 'object';
},

isSet = function(o) {
  return typeof o !== 'undefined' && o !== null;
},

isAbsNaN = function(o) {
  return o !== o;
},

isArray = function(o) {
  return Array.isArray ? Array.isArray(o) : __o2Str.call(o) === '[object Array]';
},

isFunction = function(o) {
  return typeof o === 'function';
},

hasOwn = function(o, prop) {
  return isSet(o) ? o.hasOwnProperty(prop) : false;
},

extend = function() {
  var key, out, option, source, clone, sources, val, _i, _len;
  out = arguments[0] || {}, sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  for( _i = 0, _len = sources.length; _i < _len; _i++ ) {
    option = sources[_i];
    if (option) {
      for(key in option) {
        source = out[key];
        val = option[key];
        if( !hasOwn(option, key) || source === val || !isSet(val) ) continue;
        if ( isObjectLike( source ) && isObjectLike(val) ) {
          extend(source, val);
        } else {
          out[key] = val;
        }
      }
    }
  }
  return out;
},

clone = function(o) {
  return extend({}, o);
},

flattern = function(arr) {
  var i = -1, len = arr ? +arr.length : 0, val, ret = [];
  while(++i < len) {
    val = arr[i];
    __arrPush.apply( ret, isArray( val ) ? flattern( val ) : [ val ] );
  }
  return ret;
},

eachProps = function(obj, fn) {
  for(var k in obj) {
    if( obj.hasOwnProperty(k) && fn( obj[k], k, obj ) === false ) {
      break;
    }
  }
},

each = function(arr, fn) {
  var i = -1, len = arr.length;
  while(++i < len) {
    if ( fn( arr[i], i, arr ) === false ) {
      break;
    }
  }
},

eachReverse = function(arr, fn) {
  var i = arr.length;
  while( --i >= 0 ) {
    if( fn( arr[i], i, arr) === false ) {
      break;
    }
  }
},

reduce = function(arr, fn, initVal) {
  var acc, argsLen = arguments.length,
  hasInitVal = argsLen === 3,
  len = arr.length,
  i = hasInitVal ? 0 : 1;

  acc = hasInitVal ? initVal : arr[0];
  while( i < len ) {
    acc = fn( acc, arr[i], i, arr );
    i ++;
  }
  return acc;
},

reduceRight = function(arr, fn, initVal) {
  var acc, argsLen = arguments.length,
  hasInitVal = argsLen === 3,
  len = arr.length,
  i = hasInitVal ? len : len - 1;

  acc = hasInitVal ? initVal : arr[ len - 1 ];
  while( --i >= 0 ) {
    acc = fn( acc, arr[i], i, arr );
  }
  return acc;
},

every = function(arr, fn) {
  return !!reduce(arr, function(acc, cur, idx, src) {
    return acc && fn(cur, idx, src);
  });
},

some = function(arr, fn) {
  return !!reduce(arr, function(acc, cur, idx, src) {
    return acc || fn(cur, idx, src);
  }, false);
},

getKeys = Object.keys || function(o) {
  var keys = [];
  eachProps(o, function(val, key) {
    keys.push(key);
  });
  return keys;
},

filter = function(arr, fn) {
  var i = -1, len = arr.length, val, ret = [];
  while( ++i < len ) {
    val = fn( arr[i], i, arr );
    if ( val ) {
      ret.push( arr[i] );
    }
  }
  return ret;
},

contains = function(arr, val) {
  var ret = false;
  each(arr, function(v) {
    if ( isFunction(val) ) {
      ret = isFunction(v) ? val === v : val() === v;
    } else {
      ret = v === val;
    }
    return !ret;
  });
  return ret;
},

compare = function(o, obj) {
  var keys, cb;
  /**
   * Two sides must be required otherwise return false.
   */
   if( arguments.length < 2 ) {
    return false;
  }
  if ( isObjectLike(o) && isObjectLike(obj) ) {
    keys = getKeys(o).concat( getKeys(obj) );
    /**
     * When both sides are all empty, return true.
     */
     if ( keys.length === 0 ) {
      return true;
    }
    cb = function(cur) {
      return cur && compare( o[cur], obj[cur] );
    };
    return every(keys, cb);
  } else {
    return isAbsNaN(o) && isAbsNaN(obj) || o === obj;
  }
},

unique = function(arr) {
  var ret = [];
  each(arr, function(val) {
    if ( ret.indexOf(val) === -1 ) {
      ret.push( val );
    }
  });
  return ret;
},

difference = function(arr, rest) {
  var flatted;
  arr = flattern(arr);
  rest = flattern(rest);
  flatted = unique( arr.concat( rest) );
  return filter(flatted, function(val) {
    return !contains(arr, val) || !contains(rest, val);
  });
};