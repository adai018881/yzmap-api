(function () {
  YZ.Handler.ContextMenu = YZ.Handler.extend({
    initialize: function (map) {
      YZ.Handler.prototype.initialize.call(this, map);
      this._map = map
      debugger
    },
    addHooks: function () {
      debugger
    },
    removeHooks: function () {

    },
    createContextMenu: function () {
      var container = map._container
      var contextMenu = YZ.DomUtil.create('div', 'yzmap-context-menu', container)
    }
  })
  YZ.handler.contextmenu = function () {
    return new YZ.Handler.ContextMenu()
  }
})()