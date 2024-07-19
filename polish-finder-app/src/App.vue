<script setup>
import { RouterView } from 'vue-router'
import navigation from './components/Navigation.vue'
import foot from './components/Foot.vue'
</script>

<template>
  <div class="root">
    <navigation></navigation>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>
