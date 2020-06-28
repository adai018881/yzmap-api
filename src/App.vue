<template>
  <div id="app">
    <Map msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style>
html, body, #app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
</style>
