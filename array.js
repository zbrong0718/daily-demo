;(function() {
    Array.prototype.merge = function(newArr) {
        var len = +newArr.length, j = 0, i = this.length;
        for(; j < len; j++) {
            this[ i++ ] = newArr[ j ];
        }
        return this;
    };

    Array.prototype.unique = function(needSort) {
        if (needSort) {
            this.sort(function(a,b) {return a - b;});
        }
        var ret = [];
        for(var i=0; i < this.length; i++) {
            if(this.indexOf(this[i]) === i) {
                ret.push(this[i]);
            }
        }
        return this.clear().merge(ret);
    };

    Array.prototype.clear = function() {
        this.length = 0;
        return this;
    };

    
    Array.isArray =  Array.isArray || function isArray (arr) {
        return Object.prototype.toString.call( arr ).slice( 8, -1 ) === 'Array';
    };


    function find (arr, fn) {
        arr = Array.isArray(arr) ? arr : [];
        if(typeof fn !== 'function') {
            throw new TypeError( fn + ' is not a function');
        }
        var ret, i = 0, len = arr.length;
        for ( ; i < len; i++ ) {
            if( fn( arr[i], i, arr ) ) {
               ret = arr[i];
               break;
            }
        }
        return ret;
    }
})();
