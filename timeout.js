var timeout = function (fn, delay, thisArg) {
    fn = fn || function(){};
    if(typeof fn === 'string') {
        fn = new Function(fn);
    }
    delay = delay || 0;
    var now = Date.now();
    while(true) {
        if(Date.now() - now >= delay) {
            fn && fn.apply( thisArg, [].slice.call( arguments, 3) );
            break;
        }
    }
}

