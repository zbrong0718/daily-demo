(function(global, factory) {
  if ( typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(global, true);
  } else {
    factory(global);
  }
})(this, function(global, noGlobal) {
  'use strict';

  function DatePicker(options) {
    if(this instanceof DatePicker) {
      return new DatePicker(options);
    }
    this.init(options);
  }
  DatePicker.prototype = {
    init: function(options) {
      this.opts = Object.prototype.toString.call(options).slice(8, -1) === 'Object' ? options : [];
      this.input = this.opts.input;
      this.prevBtn = this.opts.prevBtn;
      this.nextBtn = this.opts.nextBtn;
      this.daysItem = this.opts.daysItem;
      this.fx = this.opts.fx;
      this.renderer = this.opts.renderer;
      this.render();
      this.bindEvent();
    },

    getMonthData: function() {
      return {
        year: year,
        month: month,
        days: days
      };
    },

    createDOM: function(template) {
      var html = typeof this.renderer === 'function' ? this.renderer(template) : template;
      this.wrapper.innerHTML = html;
    },
  };


  var Calendar = function(year, month, day) {
    this.dateTime = new Date(year, month + 1, day);
  };

  Calendar.prototype = {
    format: function(formatter) {
      var format = formatter || 'YYYY-MM-DD hh:mm:ss';
      var pad = function(n) { return n < 10 ? '0' + n : n; };
      var oDate = this.dateTime;
      var o = {
        'YYYY': oDate.getFullYear(),
        'MM': oDate.getMonth() + 1,
        'DD': oDate.getDate(),
        'dd': oDate.getDay(),
        'hh': oDate.getHours()
      };
      for (var str in o) {
        
      }
    }
  };
});