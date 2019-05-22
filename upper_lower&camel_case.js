var o = {};
['Upper','Lower'].forEach(function(item, i) {
  const gap = 32 * ( [-1, 1][i] );
  const min = 65 + 32 * i;
  const max = min + 25;
  this['to' + item + 'Case'] =  function(str) {
    var ret = '';
    str += '';
    for(let j=0; j<str.length; j++) {
      let charCode = str.charCodeAt(j) + gap;
      if ( charCode >=min && charCode <= max ) {
        ret += String.fromCharCode(charCode);
      } else {
        ret += str[j];
      }
    }
    return ret;
  };
}, o);
o.toCamelCase = o.toHumpCase = function(str) {
  str += '';
  return this.toUpperCase( str[0] ) + this.toLowerCase( str.slice(1) );
}

{
  let _ = Array(21).fill('-');
  _.splice(_.length / 2, 1, '%s');
  const tmp = _.join('');
  let list = [];
  let factory = (tag, ...fn) => (
    function() {
      console.log(tmp, tag);
      console.time(tag)
      fn.forEach( cb=> cb() );
      console.timeEnd(tag);
    }
    );

  function add(tag, ...fn) {
    let cb = factory(tag, ...fn);
    list.push({tag, fn: cb});
  }

  function test(tag) {
    list.find( o=>o.tag === tag ).fn();
  }

  var show;
  let _show = ()=> list;
  let showing = false;
  o.__defineSetter__('logmode', function(x) {
    x = x && true;
    show = x ? _show : void 0;
    showing = x;
  });
  o.__defineGetter__('logmode', function() {
    return showing;
  });
}

{
  const text = 'AbCdEfGhIjKlMnOpQrStUvWxYz0123456789';

  add('native', () => 
    console.log(text.toUpperCase(), text.toLowerCase())
    );
  add('mine', () =>
    console.log(o.toUpperCase(text), o.toLowerCase(text))
    )
  
}