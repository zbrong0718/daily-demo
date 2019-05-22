(function() {
  var _noop = function() {};
  var AjaxUtil = {
    xhr: null,
    formatedParams: null,
    // 基础选项
    options : {
      method: 'get', // 默认提交方法， get post
      url: '', // 请求的路径 required
      params: {}, // 请求的参数
      type: 'text', // 返回的内容类型，text, xml, json
      success: _noop, // 成功回调函数
      failed: _noop, // 失败回调函数
    },
    
    // 创建XMLHttpRequest对象
    createRequest: function() {
      var xhr = this.xhr ? this.xhr : null;

      // 避免重复创建
      if ( xhr ) {
        return this;
      }
      
      try {
        xhr = new XMLHttpRequest();

        if ( xhr.overrideMimeType ) {
          xhr.overrideMimeType('text/xml');
        }
      } catch ( e ) {
        try {
          xhr = new ActiveXObject('Msxml2.XMLHTTP'); //IE6以上版本
        } catch (e) {
          try {
            xhr = new ActiveXObject('Microsoft.XMLHTTP'); //IE6以下版本
          } catch (e) {
            alert('您的浏览器可能不支持Ajax！');
          }
        }
      }

      if ( xhr ) {
        this.xhr = xhr;
      }
      
      return this;
    },

    // 设置基础选项
    setOptions: function(newOptions) {
      for ( var pro in newOptions ) {
        this.options[ pro ] = newOptions[ pro ];
      }
      return this;
    },

    // 序列化请求参数
    serialize: function() {
      var paramsArray, params, methd, paramValue, name;
      paramsArray = [];
      params = this.options.params;
      method = this.options.method.toUpperCase();
      for( name in params ) {
        paramValue = params[ name ];
        
        if ( method === 'GET' ) {
          paramValue = encodeURIComponent( params[ name ] );
        }
        
        paramsArray.push( name + '=' + paramValue );
      }
      this.formatedParams = paramsArray.join('&');
      return this;
    },

    // 状态改变的处理
    _readystatechange: function() {
      // 用于获取返回值
      var self = this, xhr = this.xhr,
      data;
      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200) {
          switch( this.options.type ) {
            case 'xml':
            data = xhr.responseXML;
            break;
            case 'json':
            var jsonText = xhr.responseText;
            try {
              data = JSON.parse(jsonText);
            } catch(e) {
              data = {};
            }
            break;
            default:
            data = xhr.responseText;
            break;
          }
          this.options.success.call( this, data);
        } else {
          this.options.failed.call( this, xhr.status );
        }
      }
    },

    // 真正处理状态
    handleReadyState: function() {
      var self = this, xhr = self.xhr;
      xhr.onreadystatechange = function() {
        self._readystatechange();
      };
      return this;
    },

    send: function() {
      var
      self = this,
      xhr = self.xhr,
      options = self.options,
      method = options.method.toUpperCase(),
      formatedParams = self.formatedParams,
      url = options.url;

      method = ( method === 'GET' || method === 'POST' ) ? method : 'GET';
      url = ( 'GET' === method ) ? ( url + '?' + formatedParams ) : url;
      
      // 建立连接
      xhr.open(method, url, true);

      var sendData = 'POST' === method ? (
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
        formatedParams
        ) : null;

      xhr.send(sendData);
    },

    // 发送Ajax请求
    request: function(options) {

      // 设置参数
      this.setOptions(options)

      // 创建XMLHttpRequest对象
      .createRequest()

      // 状态改变的处理
      .handleReadyState()

      // 序列化参数
      .serialize()

      // 发送数据
      .send();
    }
  };

  window.AjaxUtil = AjaxUtil;
})();
