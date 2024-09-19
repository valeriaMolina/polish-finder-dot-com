<template>
  <div class="card h-100 bg-color">
    <img
      v-if="!pictureUrl"
      :src="config.IMG_NOT_AVAILABLE"
      class="card-img-top"
      alt="Unavailable"
    />
    <img v-else :src="pictureUrl" class="card-img-top" alt="Polish" />
    <div class="card-body d-flex flex-column">
      <div class="mb-auto">
        <p class="fs-5">{{ polishName }}</p>
      </div>

      <div>
        <p class="brand-name my-0">{{ brandName }}</p>
      </div>
    </div>
    <div class="card-footer">
      <p class="text-start mb-0"><i class="bi bi-heart"></i></p>
    </div>
  </div>
</template>

<script setup>
import config from '@/config'
const props = defineProps(['polishName', 'brandName', 'pictureUrl'])
</script>

<style scoped>
.bg-color {
  background-color: #ececec;
}

.brand-name {
  font-weight: bold;
}
</style>
