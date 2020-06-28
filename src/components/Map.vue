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
    this.mapId = `map${Math.random()}`
  },
  mounted () {
    this.initMap()
  },
  props: {
    
  },
  methods: {
    initMap () {
      this.map = new YZ.map(this.mapId, {
        center: [28.21, 113],
        editable: true,
        zoom: 5,
        doubleClickZoom: false,
        zoomControl: false
      })
      const baseMap = new YZ.tileLayer.baseMap({
        maxZoom: 18,
        minZoom: 3
      })
      const zoomControl = new YZ.control.zoom({
        zoomInTitle: '放大',
        zoomOutTitle: '缩小'
      })
      zoomControl.setPosition('bottomright')
      zoomControl.addTo(this.map)
      baseMap.addTo(this.map)
      this.map.setMinZoom(3)
    },
  },
  watch: {
  }
}
</script>
