{
  let round = Math.round;
  function rgb2hsv(r, g, b) {
    let min, max, h, s, v; 
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);
    v = round( max / 255 * 100 );
    s = round( ( max - min ) / max * 100 );
    if ( r === max ) {
      h = round(( g - b ) / ( max - min ) * 60);
    }
    if ( g === max ) {
      h = 120 + round(( b - r ) / ( max - min ) * 60);
    }
    if ( b === max ) {
      h = 240 + round(( r - g ) / ( max - min ) * 60);
    }
    if ( h < 0 ) {
      h = h + 360;
    }
    return 'hsb(' + [h, s + '%', v + '%'].join(', ') + ')';
  }

  function hsv2rgb(h, s, v) {
    let r, g, b, i, f, x, y, z;
    if ( s && s.indexOf && s.indexOf('%') === s.length - 1) {
      s = s.slice(0, -1) / 100;
    }
    if ( v && v.indexOf && v.indexOf('%') === v.length - 1) {
      v = v.slice(0, -1) / 100;
    }
    if ( s === 0 ) {
      rgb = v;
    } else {
      h /= 60;
    }
    i = parseInt(h);
    f = h - i;
    x = v * ( 1 - s );
    y = v * ( 1 - s * f);
    z = v * ( 1 - s * ( 1 - f ) );
    eval([
      'r = v; g = z; b = x;',
      'r = y; g = v; b = x;',
      'r = x; g = v; b = z;',
      'r = x; g = y; b = v;',
      'r = z; g = x; b = v;',
      'r = v; g = x; b = y;'
      ][i]);
    r = round(r * 255);
    g = round(g * 255);
    b = round(b * 255);
    return 'rgb(' + [r,g,b].join(', ') + ')';
  }
}