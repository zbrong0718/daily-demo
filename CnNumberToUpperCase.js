function num2CNnum (num) {
    num = +num || 0;
    num = num.toFixed(2);
    // 整数部分
    var sIntPart = num.substr(0, num.length - 3);
    // 小数部分
    var sDecimalPart = +num.slice(-2) ? num.slice(-2) : '';
    // 大写汉字数字
    var aCNNumbers = [ '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' ];
    // 大写整数单位
    var aUnits = [ '元', '拾', '佰', '仟', '万', '拾万', '佰万', '仟万', '亿', '拾亿', '佰亿', '仟亿', '兆', '拾兆', '佰兆', '仟兆' ];
    // 小数单位
    var aDecimalUnits = ['角','分'];
    var ret = '', curNum, unit, sNumber, iIntLen = sIntPart.length,

    // 整数部分
    len = iIntLen, unitLen = aUnits.length, i = 0;
    while(len) {
        curNum = +sIntPart[ i++ ];
        unit = aUnits[ len - 1 ];
        sNumber = aCNNumbers[ curNum ];
        ret += sNumber + unit;
        len --;
    }

    // 小数部分
    len = sDecimalPart.length; unitLen = aDecimalUnits.length; i = 0;
    while(len) {
        curNum = +sDecimalPart[ i++ ];
        unit = curNum ? aDecimalUnits[ unitLen - len ] : '';
        ret += aCNNumbers[ curNum ] + unit;
        len--;
    }

    return unit === '元' ? ret + '整' : ret;
}