/**
 * by wang
 */

var substring = function(str, x, y) {
    var ret = '', min, max, i;
    str += '';
    x = x >> 0 || 0;
    y = typeof y === 'undefined' ? str.length : (y >> 0 || 0);
    min = Math.max( 0, Math.min( x, y ) );
    max =  Math.min( str.length, Math.max(x, y) );
    for( i=min ; i < max; i++ ) {
        ret += str[i];
    }
    return ret;
}

var substr = function (str, x, y) {
    var ret = '', i;
    str += '';
    x = x >> 0 || 0;
    y = typeof y === 'undefined' ? str.length : (y >> 0 || 0);
    x = x < 0 ? Math.max( x + str.length, -str.length) : x;
    y = x >= str.length ? x : Math.min(x + y, str.length);
    for(i = x; i < y; i ++ ) {
        ret += str[i];
    }
    return ret;
}

var slice = function (str, x, y) {
    var ret = '', i;
    str += '';
    x = x >> 0 || 0;
    y = typeof y === 'undefined' ? str.length : (y >> 0 || 0);
    x = x < 0 ? Math.max( -str.length, x + str.length ) : Math.min(x, str.length);
    y = y < 0 ? Math.max( -str.length, y + str.length ) : Math.min(y, str.length);
    for(i = x; i < y; i ++ ) {
        ret += str[i];
    }
    return ret;
}

function test(obj,fn) {
    var str = 'helloworld';
    var x = obj.x, y = obj.y;
    var r1 = window[fn](str, x, y);
    var r2 = str[fn](x, y);
    console.log( check( r1, r2 ) );
}

function check(r1, r2) {
    return r1 === r2 ? 'ok' : 'r1 is ' + r1 + ', r2 is ' + r2;
}

function sleep(ms) {
    var now = Date.now();
    while(true) {
        if( ( Date.now() - now ) >= ms ) break; 
    }
}

function init() {
    var map = [
        {x: -1, y: 1},
        {x: -1, y:0},
        {x: 11, y: 0},
        {x: 4, y: 10},
        {x:''},
        {y:[1]},
        {y:123},
        {},
        {x:[3,3],y:{}},
        {x:NaN},
        {y:NaN},
        {x:NaN,y:NaN},
        {x: 1000,y:300},
        {x: 0,y:300}
    ];

    map.forEach( function(e) {
        sleep(1000);
        console.log(Date.now());
        test(e, 'substring');
        test(e, 'substr');
        test(e, 'slice');
    });

}

init();
