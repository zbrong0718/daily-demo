JSON.isJSON = function (json) {
    if(typeof json === 'object') return true;
    try {
        return JSON.parse(json) && true;
    } catch (ex) {
        return false;
    }
};