<template>
  <div class="test">
    <p-soft-keyboard v-model="text"></p-soft-keyboard>
  </div>
</template>
<!--test-->
<script>
  export default {
    name: "test",
    components: {},
    data() {
      return {
        text: ''
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .test {
  }
</style>