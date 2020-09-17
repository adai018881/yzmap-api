(function () {
  YZ.Control.ToolBar = YZ.Control.extend({
    initialize: function (options) {
      YZ.setOptions(this, options)
    },
    onAdd: function (map) {
      this._map = map
      this._container = YZ.DomUtil.create('div', 'yzmap-toolbar-container')
      this._container.id = this.options.id
      for (let i = 0; i < this.options.buttonList.length; i++) {
        this._createBtn(`${this.options.buttonList[i].name}`, `${this.options.buttonList[i].class}`, this._buttonClick, this._container)
      }
      const fullscreen = YZ.control.fullscreen({container: this._container})
      fullscreen.addTo(this._map)
      return this._container
    },
    _createBtn (title, className, fn, containter) {
      var link = YZ.DomUtil.create('a', className, containter)
      link.href = '#'
      link.title = title
      link.innerText = title
      YZ.DomEvent.on(link, 'click', YZ.DomEvent.stop)
                .on(link, 'click', fn, this)
      return link
    },
    _buttonClick: function (e) {
      if (e.target.getAttribute('class') === 'yzmap-zoom-in') {
        this._map.zoomIn()
      }
      if (e.target.getAttribute('class') === 'yzmap-zoom-out') {
        this._map.zoomOut()
      }
      if (e.target.getAttribute('class') === 'yzmap-layer') {
        console.log(1)
      }
    },
    onRemove: function () {
      
    }
  })
  YZ.control.toolbar = function (options) {
    return new YZ.Control.ToolBar(options)
  }
}) ()