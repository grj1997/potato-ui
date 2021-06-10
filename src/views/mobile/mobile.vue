<template>
  <div class="mobile">
    <router-view />
  </div>
</template>
<!--手机-->
<script>
  export default {
    name: "mobile",
    components: {},
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss">
  .mobile {
    padding: 16px;
  }
  html,body{
    margin: 0;
  }
</style>