function define(name, callback) {
  var mod = {};
  callback(require, mod.exports, mod);
  require.module[ name ] = mod.exports;
}

function require(name) {
  return require.module[ name ] || {};
}

require.module = {};

define('colorUtil', function(require, exports, module) {
  function randomColor() {
    var colors = [], color, colorHex, i = 0;
    while( i < 3 ) {
      color = Math.floor( Math.random() * 255 );
      colors.push(color);
      i++;
    }
    color = colors.join(',');
    return {
      rgb: 'rgb(' + color + ')',
      hex: rgb2hex(color)
    }; 
  }

  function rgb2hex(color) {
    if ( color.indexOf('rgb(') == 0 ) {
      color = color.slice(4, -1);
    }
    var rgb = color.split(','), colorCode = '#', i = 0;
    while( rgb.length ) {
      var tmp = ( +rgb.shift() ).toString(16);
      tmp = tmp.length < 2 ? '0' + tmp : tmp;
      colorCode += tmp;
    }
    return colorCode;
  }

  module.exports = {
    randomColor: randomColor,
    rgb2hex: rgb2hex
  }
});