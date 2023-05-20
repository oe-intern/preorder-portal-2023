<template lang="pug">
Header
.d-flex.under-header(style="background-color: white;")
  .content-app
    router-view.content
</template>

<script setup >
import Header from './Header.vue';
</script>

<style scope lang="scss">
@import "@/scss/variables.scss";

.under-header {
  padding-top: $header-height;
  height: 100vh;
  .nav-app {
    overflow: auto;
    height: 100%;
    width: $nav-width;
    border-right: 1px solid $border-color;
  }

  .content-app {
    flex: 1;

    .content {
      padding-bottom: 120px;
    }
  }
}
</style>
