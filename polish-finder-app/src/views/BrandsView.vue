<template>
  <div class="container">
    <h1>Brands</h1>
    <p>Browse all our available brands. Can't find the brand the brand? Let us know!</p>
    <ul v-for="brand in brands.getBrands" :key="brand.brand_id">
      <li>{{ brand.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBrandStore } from '../stores/brands'
const brands = useBrandStore()
brands.fetchAllBrands()
</script>
