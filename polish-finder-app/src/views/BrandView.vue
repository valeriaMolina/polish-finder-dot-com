<template>
  <div>
    <h1>{{ brand.name }}</h1>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useBrandStore } from '../stores/brands'
import { useRoute } from 'vue-router'

const route = useRoute()
const brands = useBrandStore()
const brand = ref({})

onMounted(() => {
  console.log('Checking if brand is populated...')
  const exists = brands.getBrandById(parseInt(route.params.brandId))
  if (exists) {
    console.log('Brand is already populated:', exists)
    brand.value = exists
  } else {
    console.log('Call API')
  }
})
</script>
