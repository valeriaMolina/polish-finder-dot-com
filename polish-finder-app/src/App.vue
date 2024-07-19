<script setup>
import { RouterView } from 'vue-router'
import navigation from './components/Navigation.vue'
</script>

<template>
  <div class="root">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>
