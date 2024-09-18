<template>
  <div id="polishes" class="d-flex flex-column align-items-center px-3 py-5">
    <div class="container mb-3">
      <h1>Polishes</h1>
      <p>Browse all our available nail polish</p>
    </div>
    <div
      class="white-bg container border shadow rounded row row-cols-1 row-cols-md-5 g-2 px-3 py-3"
    >
      <PolishCard></PolishCard>
      <PolishCard></PolishCard>
      <PolishCard></PolishCard>
      <PolishCard></PolishCard>
      <PolishCard></PolishCard>
    </div>
  </div>
</template>

<script setup>
import PolishCard from '@/components/PolishCard.vue'
</script>

<style scoped>
#polishes {
  background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
}

.white-bg {
  background-color: #f8f9fa;
}
</style>
