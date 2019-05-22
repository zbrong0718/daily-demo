function splitByLength(str, sliceLen) {
  var aTmp = String(str).split(''), i = aTmp.length;
  while( (i -= sliceLen) >= 0 ) {
    aTmp.splice( i, 0, ',' );
  }

  return aTmp.join('').split(',');
}

function splitByLength(str, sliceLen) {
  var tmp = String(str), length = tmp.length, partLen = ~~( length / sliceLen ) + ( length % sliceLen ), i = 0, ret = [];
  while( ++i < partLen ) {
    ret.unshift( tmp.slice( -sliceLen * i ) );
    tmp = tmp.slice(0, -sliceLen * i );
  }
  return ret;
}