(function(global, factory) {
    if(typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global, true);
    } else {
        factory(global);
    }
})(this, function(global, noGlobal) {
    Array.MAX_ARRAY_LENTH = Math.pow(2, 32) - 1;
    var
        min = function(arr) {
            var _arr = isArrayLike(arr) ? toArray(arr) : toArray(arguments);
            if(!isAllNumric(_arr)) return NaN;
            var i, len = +_arr.length, ret = _arr[0];
            for( i = 1; i < len; i++) {
                if( _arr[i] < ret ) {
                    ret = _arr[i];
                } 
            }
            return ret;
        },

        max = function(arr) {
            var _arr = isArrayLike(arr) ? toArray(arr) : toArray(arguments);
            if(!isAllNumric(_arr)) return NaN;
            var i, len = _arr.length, ret = _arr[0];
            for( i = 1; i < len; i++) {
                if( _arr[i] > ret ) {
                    ret = _arr[i];
                } 
            }
            return ret;
        },

        isArrayLike = function(o) {
            return isArray(o) || (
                typeof o === 'object' &&
                !isWindow(o) &&
                'length' in o &&
                isInteger(o.length) &&
                function(o) {
                    var len = ( 0 <= o.length <= Array.MAX_ARRAY_LENTH ) && o.length;
                    while(len--) {
                        if(!(len in o))
                            return false;
                    }
                    return true;
                }(o)
            );
        },

        isArray = function(o) {
            return Array.isArray ? Array.isArray(o) : o instanceof Array || Object.prototype.toString.call(o) === '[object Array]';
        },

        isAllNumric = function(arr) {
            if ( !isArrayLike(arr) ) throw TypeError( JSON.stringify(arr) + ' is not a array or array-like object.');
            var i, len = arr.length;
            for(i = 0; i < len; i++) {
                if (!isNumric(arr[i])) return false;
            }
            return len === 0 ? false : true;
        },

        isNumric = function(o) {
            var type = typeof o;
            return (type === 'number' || type === 'string') && !isNaN( o - parseFloat(o) );
        },

        isInteger = function(n) {
            return isNumric(n) && +n === parseInt(n);
        },

        isPlainObject = function(o) {
            return Object.prototype.toString.call(o) === '[object Object]';
        },

        isFunction = function(o) {
            return typeof o === 'function';
        },

        isWindow = function(o) {
            return o != null && o === o.window;
        },

        toArray = function(o) {
            return isArrayLike(o) ? Array.prototype.slice.call(o) : function(o){
                var ret = [], prop;
                for(prop in o) {
                    ret.push(o[prop]);
                }
                return ret;
            }(o);
        };

        var utils = {
            min: min,
            max: max,
            isArrayLike: isArrayLike,
            isArray: isArray,
            isNumric: isNumric,
            isPlainObject: isPlainObject,
            isAllNumric: isAllNumric,
            toArray: toArray
        };

        if(!noGlobal)
            global.utils = utils;
        else 
            utils['viewSource'] = function(obj) {
                if(isPlainObject(obj))
                    console.log( JSON.stringify(obj) );
                else
                    console.log( obj.toString() );
            };

        return utils;
})