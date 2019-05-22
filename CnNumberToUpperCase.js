function DX(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
    var unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0) {
        n = n.substring(0, p) + n.substr(p+1, 2);
    }
    unit = unit.substr(unit.length - n.length);

    for (var i=0; i < n.length; i++) {
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);    
    }
    return str.replace(/零(?:仟|佰|拾|角)/g, "零")
    .replace(/(?:零)+/g, "零")
    .replace(/零(兆|万|亿|元)/g, "$1")
    .replace(/(兆|亿)万/g, "$1")
    .replace(/(京|兆)亿/g, "$1")
    .replace(/(京)兆/g, "$1")
    .replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟")
    .replace(/^元零?|零分/g, "")
    .replace(/(元)$/g, "$1整");
}