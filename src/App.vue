<template>
  <div id="app">
    <router-view id="app-view"/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {},
    data () {
      return {}
    },
    methods:{
    }
  }
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
  html,body{
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: hidden;
    overflow-x: auto;
  }
  body{
    min-width: 1100px;
    margin: 0;
    color: #323233;
    font-size: 16px;
    background-color: #f7f8fa;
    -webkit-font-smoothing: antialiased;
  }
  pre, .card{
    background-color: #fff !important;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
  }
  .card{
    padding: 24px;
  }

</style>
