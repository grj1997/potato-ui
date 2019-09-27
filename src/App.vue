<template>
  <div id="app">
    <card-input v-model="card" placeholder="证件号码"/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {
    },
    data () {
      return {
        card: ''
      }
    }
  }
</script>

<style lang="scss">
  #app {
  }
</style>
