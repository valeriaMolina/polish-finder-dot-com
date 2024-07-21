<script setup>
import { RouterView } from 'vue-router'
import navigation from './components/Navigation.vue'
import foot from './components/Foot.vue'
</script>

<template>
  <div class="root">
    <div id="content-wrapper">
      <navigation></navigation>
      <router-view></router-view>
    </div>

    <foot id="main-footer"></foot>
  </div>
</template>

<style scoped>
#content-wrapper {
  flex: 1;
  /* This makes sure that the content wrapper expands to fill the available space,
     pushing the footer to the bottom of the viewport if the content is short. */
}

#main-footer {
  /* Your existing footer styles */
  align-items: center;
  position: relative; /* Changed from fixed to relative */
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
  background-color: #f8f9fa;
}
</style>
