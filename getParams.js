

'use stric';

var Url = function(sURL) {
    if(!(this instanceof URI)) {
        return new Url(sURL);
    }
    Object.assign(this, urlParse(sURL));
};

var isJSON = function(json) {
    if(typeof json === 'object') return true;
    try{
        return JSON.parse(json) && true;
    } catch(ex) {
        console.log(ex)
        return false;
    }
}

var parse2Native = function (str) {
    var ret = decodeURIComponent(str);
    var rnum = /^-?\d+$/;
    var parseMap = {true: true, false: false, null: null, undefined: undefined};
    if(ret in parseMap) {
        ret = parseMap[ ret ];
    } else if(rnum.test(ret)) {
       ret = +ret;
    } else if(isJSON)
    return ret;
};

var getParams = function (url, key) {
    var aParams = (url.split('?')[1] || '').split('&'), i = 0, len = aParams.length, tmp, ret;

    for (; i < len; i ++ ) {
        tmp = aParams[ i ].split('=');
        if(tmp && tmp[0]) {
            if(!ret) ret = {};
            ret[ tmp[0] ] = format( tmp[1] );
        }
    }

    return ret ? ret[key] || ret : null;
};

var urlParse = function (sURL) {
    sURL = typeof sURL !== 'undefined' ? sURL : '' ;
    var sProtocol = urlParse.getProtocol(sURL);
    var hasSlashes = urlParse.hasSlashes(sURL);
    var sHost = urlParse.getHost(sURL);
    var sHostName = urlParse.getHostName(sURL);
    var sAuth = urlParse.getAuth(sURL);
    var sOrigin = urlParse.getOrigin(sURL)
    var sPath = urlParse.getPath(sURL);
    var sPathName = urlParse.getPathName(sURL);
    var sPort = urlParse.getPort(sURL);
    var sSearch = urlParse.getSearch(sURL);
    var sQuery = urlParse.getQuery(sSearch);
    var oQuery = urlParse.getQuery(sSearch, true);
    var sHash = urlParse.getHash(sURL);
    return {
        auth: sAuth,
        hash: sHash,
        host: sHost,
        hostname: sHostName,
        href: sURL,
        origin: sOrigin,
        path: sPath,
        pathname: sPathName,
        port: sPort,
        protocol: sProtocol,
        query: sQuery,
        queryObj: oQuery,
        search: sSearch,
        slashes: hasSlashes
    }
};

urlParse.getOrigin = function (sURL) {
    var hasProtocal = !!urlParse.getProtocol(sURL);
    return hasProtocal ? /(^\w+?:(?:\/{2,3})?[^~`!#$%^&*\(\)\{\}\[\]<>?,;'"\/\\]+)/.test(sURL) ? RegExp.$1 : '' : sURL;
};

/**
 * [getProtocol description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getProtocol = function (sURL) {
    return /(^\w+?:)/.test(sURL) ? RegExp.$1 : '';
};

/**
 * 获取url中hash值(#something)
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getHash = function (sURL) {
    return /#.+$/.exec(sURL) || '';
};

/**
 * 获取含端口的主机名
 * @param  String sURL  [URL地址]
 * @return String host  [含端口的主机名]
 */
urlParse.getHost = function (sURL) {
    var
        sOrigin = urlParse.getOrigin(sURL),
        hasProtocal = !!urlParse.getProtocol(sURL),
        auth = urlParse.getAuth(sOrigin),
        start = urlParse.hasAuth(sOrigin) ? sOrigin.lastIndexOf('@') + 1: 0;

    return hasProtocal ? sOrigin.substr(start).replace(/^\w+?:\/{2,3}/, '') : '';
};

/**
 * [getHostName description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getHostName = function (sURL) {
    return urlParse.getHost(sURL).split(':')[0] || '';
};

/**
 * [getAuth description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getAuth = function (sURL) {
    var
        sOrigin = urlParse.getOrigin(sURL),
        hasAuth = urlParse.hasAuth(sOrigin),
        end = sOrigin.lastIndexOf('@');
    return hasAuth ? sOrigin.substr(0, end).replace(/^\w+?:(?:\/{2,3})?/, '') : '';
    debugger;
};

/**
 * [getPort description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getPort = function (sURL) {
    var sPort = urlParse.getHost(sURL).split(':')[1];
    return ( !isNaN(sPort) && sPort >= 0 && sPort <= 65535 ) ? sPort : '';
};

/**
 * [getPath description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getPath = function (sURL) {
    var
        rorigin = /^\w+?:\/{2,3}?[^~`!@#$%^&*\(\)\{\}\[\]<>?,;'"\/\\]+/,
        rhash = /#.+$/,
        hasProtocal = urlParse.getProtocol(sURL),
        path = sURL.replace(rorigin, '').replace(rhash, '');
        path = path === '' && hasProtocal ? '/' : path;
    return path;
};

/**
 * [getPathName description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getPathName = function(sURL) {
    return urlParse.getPath(sURL).replace(/\?[^#]+/, '');
};

/**
 * [getSearch description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getSearch = function (sURL) {
    return /(\?[^#]+)/.test(sURL) ? RegExp.$1 : '';
};

/**
 * [getQuery description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getQuery = function(sSearch, isObject) {
    return !isObject ? sSearch.substr(1) : getParams(sSearch);
}

/**
 * [getSlashesLength description]
 * @param  {[type]} sURL [description]
 * @return {[type]}      [description]
 */
urlParse.getSlashesLength = function(sURL) {
    return ( /^\w+?:(\/{2,3})/.test(sURL +'') ? RegExp.$1 : '' ).length;
};

/**
 * [hasAuth description]
 * @param  {[type]}  sURL [description]
 * @return {Boolean}      [description]
 */
urlParse.hasAuth = function (sURL) {
    return sURL.lastIndexOf('@') > 0;
};

/**
 * [hasSlashes description]
 * @param  {[type]}  sURL [description]
 * @return {Boolean}      [description]
 */
urlParse.hasSlashes = function (sURL) {
    return urlParse.getSlashesLength(sURL) > 0;
};