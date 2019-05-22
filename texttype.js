var ATE;
(function() {
  function unique(arr) {
    var i = -1, length = arr.length, ret = [];
    while( ++i < length ) {
      if ( arr[i] && ret.indexOf( arr[i] ) ) {
        ret.push( arr[i] );
      }
    }
    return arr;
  }

  function wrapLink(el, linkAttr) {
    var a = document.createElement('a');
    for( var prop in linkAttr ) {
      a[ prop ] = linkAttr[ prop ];
    }
    var parent = el.parentNode || el.parentElement;
    a.appendChild( el );
    parent.appendChild( a );
    return a;
  }

  ATE = function(options) {
    this.el = options.el;
    this.style = options.style;
    this.data = unique( options.data || [] );
    this._index = 0;
    this._charIndex = 0;
    this.run();
  };

  ATE.init = function(options) {
    return new this(options);
  }

  ATE.prototype = {
    constructor: ATE,
    _appendText: function() {
      var el = this.el, char = this._getChar();
      el.innerText += char;
      return !char;
    },

    _backspace: function() {
      var el = this.el;
      el.innerText = el.innerText.slice(0, -1);
      return !el.innerText.length;
    },

    _getText: function() {
      var item = this.data[ this._index ] || '',
      link = this.el.parentNode.nodeName === 'A' ? this.el.parentNode : wrapLink(this.el, {
        target: '_blank',
        className: this.style
      });

      if( typeof item === 'string' ) {
        item = { text: item, href: '#'};
      }
      
      link.href = item.href;

      return item.text;
    },

    _getChar: function() {
      var text = this._getText();
      return this._charIndex < text.length ? text[ this._charIndex++ ] : '';
    },

    _next: function() {
      var length = +this.data.length;
      this._index = (++this._index) % length;
      this._charIndex = 0;
    },

    run: function() {
      var
        state = 'loading',
        delay = 150,
        self = this,
        cursorShow = 1,
        cursorStyle = ['transparent', '#000'],
        isEnd = false,

        actions = {
          'loading': function() {
            if ( self._appendText() ) {
              isEnd = true;
              state = 'completed';
              delay = 5000;
              setTimeout( cursorShine, 500 );
            }

            else if ( isEnd ) {
              isEnd = false;
              delay = 150;
            }
          },

          'completed': function() {
            if ( self._backspace() ) {
              isEnd = true;
              state = 'loading';
              delay = 500;
              self._next();
              setTimeout( cursorShine, 500 );
            }

            else if ( isEnd ) {
              isEnd = false;
              delay = 50;
            }
          }
        },

        cursorShine = function() {
          self.el.style.borderColor = cursorStyle[ cursorShow ];
          if ( isEnd ) {
            self.el.style.borderColor = cursorStyle[ cursorShow ];
            cursorShow ^= 1;
            setTimeout( cursorShine, 500 );
          }
        },

        timeoutHandler = function() {
          actions[ state ]();
          setTimeout( timeoutHandler, delay );
        };

      setTimeout( timeoutHandler, delay );
    }
  }

})();