(function () {
  YZ.Control.Coordinates =  YZ.Control.extend({
    initialize: function (options) {
      YZ.setOptions(this, options)
    },
    onAdd: function (map) {
      this._map = map
      var _this = this
      this._map.on('mousemove', e => this.updateCoords(e, _this))
    },
    onRemove: function () {

    },
    createUi: function (position) {
      var pane = document.getElementsByClassName('yzmap-coordinates')[0]
      if (!pane) {
        pane = YZ.DomUtil.create('div', 'yzmap-coordinates', document.getElementsByClassName('yzmap-control-container')[0])
      }
      pane.innerText = `${this.x.toFixed(6)}, ${this.y.toFixed(6)}`
      pane.style.position = 'absolute'
      pane.style.top = `${position[1]-10}px`
      pane.style.left = `${position[0]+10}px`
      pane.style.zIndex = 999
    },
    updateCoords: function (e, that) {
      var event = e || window.event
      this.x = event.latlng.lng
      this.y = event.latlng.lat
      that.createUi([event.originalEvent.clientX, event.originalEvent.clientY])
    }
  })
  YZ.control.coordinates = function (options) {
    return new YZ.Control.Coordinates(options)
  }
})()