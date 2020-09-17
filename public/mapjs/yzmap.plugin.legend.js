(function () {

  YZ.Control.Demo = YZ.Control.extend({
    options: {
      position: 'topright'
    },
    initialize: function (options) {
      YZ.Util.extend(this.options, options)
    },
    onAdd: function (map) {
      this._container = YZ.DomUtil.create('div', 'info legend');
                //创建一个图片要素
      var  grades = [0, 10, 20, 50, 100, 200, 500, 1000],
          labels = [],
          from, to;

      for (var i = 0; i < grades.length; i++) {
          from = grades[i];
          to = grades[i + 1];

          labels.push(
              '<div style="float:left"><div style="background:' + this._getColor(from + 1) + ';margin-right:10px;float:left;height:20px;width:20px"></div> ' +
              from + (to ? '&ndash;' + to : '+') + '</div>');
      }
      this._container.innerHTML = labels.join('')
      return this._container
    },
    _getColor: function (d) {
      return d > 1000 ? '#800026' : 
              d > 500 ? '#BD0026' :
              d > 200 ? '#E31A1C' : 
              d > 100 ? '#FC4E2A' : 
              d > 50 ? '#FD8D3C' : 
              d > 20 ? '#FEB24C' : 
              d > 10 ? '#FED976' : 
              '#FFEDA0'
    },
    onRemove: function (map) {

    }
  })

  YZ.control.demo = function (options) {
    return new YZ.Control.Demo(options)
  }

})()