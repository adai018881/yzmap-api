<template>
  <div class="map-parent">
    <div ref="map" :id="mapId" class="map"></div>
  </div>
</template>
<style lang="scss" scoped>

.map-parent{
  position: absolute;
  height: 100%;
  width: 100%;
}
.map{
  position: absolute!important;
  height: 100%;
  width: 100%;
}

</style>

<script>

export default {
  name: 'CommonMap',
  data () {
    return {
      map: null,
      mapId: '',
    }
  },
  computed: {
  },
  beforeMount () {
    this.mapId = `map`
  },
  mounted () {
    this.initMap()
  },
  props: {
    
  },
  methods: {
    initMap () {
      /*eslint-disable */
      this.map = new YZ.map(this.mapId, {
        center: [28.21, 113],
        editable: true,
        zoom: 5,
        doubleClickZoom: false,
        zoomControl: false,
        zoomsliderControl: true,
        contextmenu: true,
        contextmenuWidth: 140,
        contextmenuItems: [
          {
            text: 'Show coordinates',
            icon: 'images/zoom-in.png',
            // callback: this.showCoordinates
          }, {
            text: 'Center map here',
            icon: 'images/zoom-in.png',
            // callback: this.centerMap
          }, {
            text: 'Zoom in',
            icon: 'images/zoom-in.png',
            // callback: this.zoomIn
          }, {
            text: 'Zoom out',
            icon: 'images/zoom-out.png',
            // callback: this.zoomOut
          }
        ]
      })
      const baseMap = new YZ.tileLayer.baseMap({
        maxZoom: 18,
        minZoom: 3
      })
      baseMap.addTo(this.map)
      // this.map.setMinZoom(3)
      // this.map.on('enterFullscreen', function(){
      //   if(window.console) window.console.log('enterFullscreen');
      // })
      // this.map.on('exitFullscreen', function(){
      //   if(window.console) window.console.log('exitFullscreen');
      // })
      const customToolbar = YZ.control.toolbar({
        position: 'topright',
        id: "yzmap-custom-toolbar",
        buttonList:[
          {type: 'zoomin', class: 'yzmap-zoom-in', name: '放大'},
          {type: 'zoomout', class: 'yzmap-zoom-out', name: '缩小'},
          {type: 'layer', class: 'yzmap-layer', name: '图层'},
          {type: 'search', class: 'yzmap-search', name: '查询'},
          {type: 'draw', class: 'yzmap-draw', name: '绘制'},
          {type: 'fullscreen', class: 'yzmap-fullscreen', name: '全屏'},
          {type: 'history', class: 'yzmap-history', name: '历史'},
          {type: 'locate', class: 'yzmap-locate', name: '定位'},
        ]
      })
      customToolbar.addTo(this.map)
      const coordsPane = YZ.control.coordinates()
      coordsPane.addTo(this.map)
      // this.map.addControl(new YZ.Control.Zoomslider());
    }
  },
  watch: {
  }
}
</script>
