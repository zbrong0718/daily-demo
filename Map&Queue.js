var Queue = (function() {
  function createClass(name, fnc, context) {
    context = context || this;
    if ( fnc.name === name && name.firstLetter.isUpperCase() ) {
      context[ name ] = fnc;
    }
    return fnc;
  }

  function Map() {
    var maps = [];
    var index = function(key) {
      var i = 0, length = maps.length, map;
      while( i < length ) {
        map = maps[i];
        if ( map && maps[i].key === key ) {
          return i;
        }
        i++;
      }
      return -1;
    };

    this.get = function(key) {
      return maps[ index(key) ].value;
    };

    this.set = function(key, value) {
      var map;
      if ( this.has(key) ) {
        map = maps[ index(key) ];
        map[ key ] = value;
      } else {
        maps.push({key: key, value: value});
      }
      return this;
    };

    this.has = function(key) {
      return index(key) > -1;
    };
  }

  var items = new Map();
  function Queue() {
    items.set(this, []);
  }
  Queue.prototype = {
    enqueue: function(el) {
      var q = items.get(this);
      q.push(el);
    }, 
    dequeue: function() {
      return items.get(this).shift();
    },
    isEmpty: function() {
      return this.size() === 0;
    },
    size: function() {
      return items.get(this).length;
    },
    print: function() {
      var q = items.get(this);
      console.log(q.join());
    }
  };
  return Queue;
})();