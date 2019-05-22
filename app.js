(function() {
  function changeFontSize() {
    var html  = document.documentElement;
    html.style.fontSize = window.innerWidth / 3 + 'px';
    return window.onresize !== changeFontSize ? changeFontSize : void 0;
  }
  window.onresize = changeFontSize();
  
  Array.prototype.forEach = [].forEach || function(callback, thisArg) {
    var i = 0, len = this.length, args = [].slice.call(arguments, 2);
    while( i < len ) {
      args.unshift(arr[i], i, arr);
      callback.apply(thisArg, args);
      ++i;
    }
  };

  var
    delBtn = document.getElementById('delBtn'),
    selectBtn = document.getElementById('selectBtn'),
    oUl = document.getElementsByTagName('ul')[0],
    mark = false,
    selectedArr = [],
    oLi = []
  ;

  function init() {
    createStyle();
    createDOM();
    setPosition();
    bindEvent();
  }
  function createStyle() {
    var style =stylesheet();
    style.add(
      'body, ul, ul li {margin: 0; padding: 0}',
      'body {background-color: #000; font-family: Arial, "Helvetica Neue", Helvetica, "Microsoft YaHei", sans-serif; font-size: .16rem;}',
      'a {text-decoration: none;}',
      'header {background-color: #333; height: .4rem; text-align: center; line-height: .4rem;}',
      'header a, header span {font-size: 0.14492753623188406rem; color: #fff; width: 1rem; position: absolute; top: 0;}',
      'header a:first-child {left: 0; display: none;}',
      'header span {left: 1rem;}',
      'header a:last-child {right: 0;}',
      'section ul {list-style: none; position: relative;}',
      'section ul li {width: 1rem; height: 1rem; border: 1px solid #ccc; box-sizing: border-box; position: absolute; background-color: #f1f1f1; text-align: center; line-height: 1rem; transition: left 1s, top 1s;}',
      'section ul li img {display: block; width: 100%;height: 100%;}',
      'section ul li.selected {opacity: 0.5;}',
      'footer {width: 100%;height: .5rem; line-height: .5rem; position: fixed; bottom: 0; background-color: #333; color: #fff; text-align: center;}',
      'footer a {color: #fff; display: block; width: 1.5rem; position: absolute; top: 0;}',
      'footer a:first-child {left: 0;}',
      'footer a:last-child {right: 0;}'
    );
  }

  function createDOM() {
    var html = [], i = 0;
    for(; i < 4 ; i++ ) {
      html.push('<li> <img src="demo/img/' + (i+1) + '.jpg"></li>');
    }
    oUl.innerHTML = html.join('\r\n');
    oLi = oLi.slice.call( oUl.getElementsByTagName('li') );
  }

  function bindEvent() {
    selectBtn.addEventListener('click', selectClick, false);
    delBtn.addEventListener('click', delSelected, false);
    oLi.forEach(function(e) {
      e.mark = false;
      e.addEventListener('click', select ,false);
    });
  }

  function selectClick() {
    if(!mark) {
      this.innerHTML = '取消';
    } else {
      selectedArr.forEach(function(e) {
        e.mark = false;
        e.className = '';
      });
      selectedArr.length = 0;
      delBtn.style.display = 'none';
      this.innerHTML = '选择';
    }
    mark = !mark;
  }

  function select() {
    if(!mark) return;
    if ( !this.mark ) {
      kclass(this).addClass('selected');
      selectedArr.push(this);
    } else {
      kclass(this).removeClass('selected');
      removeItem(selectedArr, this);
    }
    this.mark = !this.mark;
    delBtn.style.display = ['none', 'block'][selectedArr.length > 0 ? 1 : 0];
  }

  function delSelected() {
    while(selectedArr.length) {
      var item = selectedArr.pop();
      oUl.removeChild(item);
      removeItem(oLi, item);
    }
    this.style.display = 'none';
    selectClick.call(selectBtn);
    setPosition();
  }

  function setPosition() {
    oLi.forEach(function(e, i) {
      setCss( e , {
        left: (i % 3) + 'rem' ,
        top: (Math.floor( i / 3 ))  + 'rem'
      });
    });
  }

  function setCss(obj, css) {
    if ( obj.nodeType && obj.nodeType === 1 ) {
      if (typeof css === 'string'){
        obj.style.cssText += css;
      }else if(css.toString() === '[object Object]'){
        for( var s in css ) {
          obj.style[s] = css[s];
        }
      }
    }
  }

  function removeItem(arr, item) {
    if ( !Array.isArray(arr) ) return;
    var index = arr.indexOf(item);
    if ( ~index ) {
      return arr.splice(index, 1);
    }
  }

  function kclass(el) {
    var clsList = el.className ? el.className.split(' ') : [];

    var
    filter = function(e) {
      return e;
    },
    update = function() {
      debug();
      el.className = clsList.join(' ');
    },
    hasClass = function(cls) {
      cls = filter(cls);
      return !!~index(cls);
    },
    index = function(cls) {
      cls = filter(cls);
      return clsList.indexOf ? clsList.indexOf(cls) : function(){
        var i = 0, len = clsList.length;
        while( i < len ) {
          if ( clsList[i] === cls ) {
            return i;
          }
          ++i;
        }
        return -1;
      }();
    },
    addClass = function(cls) {
      cls = filter(cls);
      removeClass(cls);
      clsList.push.apply(clsList, cls.split(' '));
      update();
    },
    removeClass = function(cls) {
      cls = filter(cls);
      var clses = cls.split(' ');
      while ( clses.length ) {
        cls = clses.pop();
        if ( hasClass(cls) ) {
          clsList.splice(index(cls), 1);
        }
      }
      update();
    },
    debug = function() {
      if (!window.enable_debug) return;
      console.log(clsList);
    };
    debug();
    return {
      hasClass: hasClass,
      addClass: addClass,
      removeClass: removeClass
    };
  }

  function stylesheet(s) {
    var
    head = document.head || document.getElementsByTagName('head')[0],
    style = s || document.createElement('style'),
    records = s && s.innerHTML ? style.innerHTML.split('\r\n') : [],
    total = records.length;
    style.type = 'text/css';
    style.setAttribute('app-style', '');
    head.appendChild(style);

    var add = function() {
      records.push.apply(records, arguments);
      total = records.length;
      update();
      return total - 1;
    }, remove = function(n) {
      n < total && records.splice(n, 1);
      update();
    }, update = function() {
      style.innerHTML = records.join('\r\n');
    };
    return {
      add: add,
      remove: remove
    }
  }
  
  init();
})();