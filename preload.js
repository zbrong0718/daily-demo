(function(global, factory){
'use strict';

if(typeof define === 'function') {
    define(factory(global, true));
} else if ( typeof module === 'object' && typeof module.exports === 'object' ) {
    module.exports = global.document ? factory(global, true) : function(w) {
        if(!w.document) {
            throw new Error( "This plugin requires a window without a document" );
        }
        return factory( w );
    };
} else {
    factory( global );
}

})(jQuery || this, function( global, noGlobal) {
'use strict';
var 
    isPlainObject = function(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    },

    isArray = function(o) {
        return Array.isArray ? Array.isArray(o) : Object.prototype.toString.call(o) === '[object Array]';
    },

    isFunction = function(o) {
        return typeof o === 'function';
    };

var _default = {
    order: 'unordered',
    every: null,
    completed: null
};

var Preload = function(urls, options) {
    this.init(urls, options);
};

Preload.extend = Preload.prototype.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        len = arguments.length,
        deep = false;

    // 决定是否要深复制
    if ( typeof target === 'boolean' ) {
        deep = target;

        // 跳过boolean类型的target
        target = arguments[ i ] || {};
        i++;
    }

    // 不处理原始数据类型
    if ( typeof target !== 'object' && !isFunction( target ) ) {
        target = {};
    }

    // 如果只有一个参数则扩展本身
    if ( i === len ) {
        target = this;
        i--;
    }

    for ( ; i < len; i++ ) {
        // 只处理非null或undefined的值
        if ( ( options = arguments[ i ] ) != null ) {
            // 扩展基本对象
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // 防止死循环
                if (target === copy) {
                    continue;
                }

                // 递归合并属性中的原生对象和数组
                if ( deep && copy && ( isPlainObject( copy ) || ( copyIsArray = isArray( copy ) ) ) ) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && isArray( src ) ? src : [];
                    } else {
                        clone = src && isPlainObject( src ) ? src : {};
                    }

                    target[ name ] = Preload.extend( deep, clone, copy );

                // 不带走undefined的值
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // 返回已修改的target
    return target;
};

Preload.prototype.extend({
    init: function(urls, options) {
        if( typeof urls !==  'string' && !isArray(urls) ) throw new TypeError('urls must be a string or array');
        this.urls = typeof urls === 'string' ? [urls] : urls;
        this.opts = Preload.extend({}, _default, options);
        var order = this.opts.order;
        if(order && order === 'ordered') {
            this._ordered();
        } else {
            this._unordered();
        }
    },

    // 有序加载
    _unordered: function() {
        var
            urls = this.urls,
            len = urls.length,
            count = 0,
            i = 0,
            every = this.opts.every,
            completed = this.opts.completed,

            onFinished = function(e) {
                count++;
                if(every) every.call(this, count);
                if(count >= len && completed) {
                    completed.call(this, count);
                }
            },

            load = function() {
                for ( ; i < len; i++ ) {
                    var oImg = new Image();
                    oImg = onFinished;
                    oImg.src = urls[ i ];
                }
            };

        load();
    },

    _ordered: function() {
        var
            urls = this.urls,
            len = urls.length,
            count = 0,
            i = 0,
            every = this.opts.every,
            completed = this.opts.completed,

            onFinished = function(e) {
                count++;
                if(every) every.call(this, count);
                if(count >= len && completed) {
                    completed.call(this, count);
                } else {
                    load();
                }
            },

            load = function() {
                for ( ; i < len; i++ ) {
                    var oImg = new Image();
                    oImg = onFinished;
                    oImg.src = urls[ i ];
                }
            };

        load();
    }
});

if(!noGlobal) {
    global.Preload = Preload;
}

return Preload;
});