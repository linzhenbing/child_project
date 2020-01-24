<template>
  <div id="app">
    <router-view class="animated fadeIn"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  #app {
    font-family: 微软雅黑,'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: lighter;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  #app a{
    text-decoration: none;
  }

</style>
