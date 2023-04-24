<template lang="pug">
Header
.d-flex.under-header
  .nav-app.bg-white.d-none.d-md-block
    NavBar
  .content-app
    router-view.content
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from './NavBar.vue';
import Header from './Header.vue';
</script>

<style scope lang="scss">
@import "@/scss/variables.scss";

.under-header {
  padding-top: $header-height;
  height: 100vh;
  overflow: auto;

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

    overflow: auto;
  }
}
</style>
