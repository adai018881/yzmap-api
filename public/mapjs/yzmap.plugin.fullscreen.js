(function () {
  YZ.Control.FullScreen = YZ.Control.extend({
    options: {
      position: 'topleft',
      title: '全屏',
      titleCancel: '取消全屏',
      forceSeparateButton: false,
      forcePseudoFullscreen: false,
      fullscreenElement: false
    },
    initialize: function (options) {
      YZ.setOptions(this, options)
    },
    onAdd: function (map) {
      var className = 'yzmap-control-zoom-fullscreen', container, content = '';
      if (this.options.container && !this.options.forceSeparateButton) {
        container = this.options.container;
      // if (map.zoomControl && !this.options.forceSeparateButton) {
        // container = map.zoomControl._container;
      // }
      } else {
        container = YZ.DomUtil.create('div', 'yzmap-bar');
      }
      
      if (this.options.content) {
        content = this.options.content;
      } else {
        className += ' fullscreen-icon';
      }
  
      this._createButton(this.options.title, className, content, container, this.toggleFullScreen, this);
      this._map.fullscreenControl = this;
  
      this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this);
  
      return container;
    },
    
    onRemove: function (map) {
      YZ.DomEvent
        .off(this.link, 'click', YZ.DomEvent.stopPropagation)
        .off(this.link, 'click', YZ.DomEvent.preventDefault)
        .off(this.link, 'click', this.toggleFullScreen, this);
      
      YZ.DomEvent
        .off(this._container, fullScreenApi.fullScreenEventName, YZ.DomEvent.stopPropagation)
        .off(this._container, fullScreenApi.fullScreenEventName, YZ.DomEvent.preventDefault)
        .off(this._container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this);
      
      YZ.DomEvent
        .off(document, fullScreenApi.fullScreenEventName, YZ.DomEvent.stopPropagation)
        .off(document, fullScreenApi.fullScreenEventName, YZ.DomEvent.preventDefault)
        .off(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, this);
    },
    
    _createButton: function (title, className, content, container, fn, context) {
      this.link = YZ.DomUtil.create('a', className, container);
      this.link.href = '#';
      this.link.title = title;
      this.link.innerHTML = content;
  
      this.link.setAttribute('role', 'button');
      this.link.setAttribute('aria-label', title);
  
      YZ.DomEvent
        .on(this.link, 'click', YZ.DomEvent.stopPropagation)
        .on(this.link, 'click', YZ.DomEvent.preventDefault)
        .on(this.link, 'click', fn, context);
      
      YZ.DomEvent
        .on(container, fullScreenApi.fullScreenEventName, YZ.DomEvent.stopPropagation)
        .on(container, fullScreenApi.fullScreenEventName, YZ.DomEvent.preventDefault)
        .on(container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);
      
      YZ.DomEvent
        .on(document, fullScreenApi.fullScreenEventName, YZ.DomEvent.stopPropagation)
        .on(document, fullScreenApi.fullScreenEventName, YZ.DomEvent.preventDefault)
        .on(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);
  
      return this.link;
    },
    
    toggleFullScreen: function () {
      var map = this._map;
      map._exitFired = false;
      if (map._isFullscreen) {
        if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
          fullScreenApi.cancelFullScreen();
        } else {
          YZ.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'yzmap-pseudo-fullscreen');
        }
        map.fire('exitFullscreen');
        map._exitFired = true;
        map._isFullscreen = false;
      }
      else {
        if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
          fullScreenApi.requestFullScreen(this.options.fullscreenElement ? this.options.fullscreenElement : map._container);
        } else {
          YZ.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'yzmap-pseudo-fullscreen');
        }
        map.fire('enterFullscreen');
        map._isFullscreen = true;
      }
    },
    
    _toggleTitle: function () {
      this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel;
    },
    
    _handleFullscreenChange: function () {
      var map = this._map;
      map.invalidateSize();
      if (!fullScreenApi.isFullScreen() && !map._exitFired) {
        map.fire('exitFullscreen');
        map._exitFired = true;
        map._isFullscreen = false;
      }
    }
  });
  
  YZ.Map.include({
    toggleFullscreen: function () {
      this.fullscreenControl.toggleFullScreen();
    }
  });
  
  YZ.Control.FullScreen.addInitHook(function () {
    if (this.options.fullscreenControl) {
      this.addControl(YZ.control.fullscreen());
    }
  });
  
  YZ.control.fullscreen = function (options) {
    return new YZ.Control.FullScreen(options);
  };

  var fullScreenApi = { 
    supportsFullScreen: false,
    isFullScreen: function () { return false; }, 
    requestFullScreen: function () {}, 
    cancelFullScreen: function () {},
    fullScreenEventName: '',
    prefix: ''
  },
  browserPrefixes = 'webkit moz o ms khtml'.split(' ');
  
  // check for native support
  if (typeof document.exitFullscreen !== 'undefined') {
    fullScreenApi.supportsFullScreen = true;
  } else {
    // check for fullscreen support by vendor prefix
    for (var i = 0, il = browserPrefixes.length; i < il; i++) {
      fullScreenApi.prefix = browserPrefixes[i];
      if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') {
        fullScreenApi.supportsFullScreen = true;
        break;
      }
    }
    if (typeof document['msExitFullscreen'] !== 'undefined') {
      fullScreenApi.prefix = 'ms';
      fullScreenApi.supportsFullScreen = true;
    }
  }
  
  // update methods to do something useful
  if (fullScreenApi.supportsFullScreen) {
    if (fullScreenApi.prefix === 'ms') {
      fullScreenApi.fullScreenEventName = 'MSFullscreenChange';
    } else {
      fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
    }
    fullScreenApi.isFullScreen = function () {
      switch (this.prefix) {
        case '':
          return document.fullscreen;
        case 'webkit':
          return document.webkitIsFullScreen;
        case 'ms':
          return document.msFullscreenElement;
        default:
          return document[this.prefix + 'FullScreen'];
      }
    };
    fullScreenApi.requestFullScreen = function (el) {
      switch (this.prefix) {
        case '':
          return el.requestFullscreen();
        case 'ms':
          return el.msRequestFullscreen();
        default:
          return el[this.prefix + 'RequestFullScreen']();
      }
    };
    fullScreenApi.cancelFullScreen = function () {
      switch (this.prefix) {
        case '':
          return document.exitFullscreen();
        case 'ms':
          return document.msExitFullscreen();
        default:
          return document[this.prefix + 'CancelFullScreen']();
      }
    };
  }

  // jQuery plugin
  if (typeof jQuery !== 'undefined') {
    jQuery.fn.requestFullScreen = function () {
      return this.each(function () {
        var el = jQuery(this);
        if (fullScreenApi.supportsFullScreen) {
          fullScreenApi.requestFullScreen(el);
        }
      });
    };
  }

  // export api
  window.fullScreenApi = fullScreenApi;
})();