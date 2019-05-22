var singleton = function(fn) {
    var result;
    return function () {
        return result || ( result = fn.apply( this, arguments ) );
    };
}

var factory = function(tagName) {
    return singleton(function() {
        return document.body.appendChild( document.createElement(tagName) );
    });
}

var createMask = factory('div');
var createButton = factory('button');