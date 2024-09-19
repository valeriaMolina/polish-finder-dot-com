<template>
  <div class="col card-height">
    <div class="card card-height bg-color">
      <img
        v-if="!pictureUrl"
        :src="config.IMG_NOT_AVAILABLE"
        class="card-img-top"
        alt="Unavailable"
      />
      <img v-else :src="pictureUrl" class="card-img-top" alt="Polish" />
      <div class="card-body">
        <div class="px-0">
          <div class="row align-items-start">
            <div class="col">
              <p class="fs-5 mb-0">{{ polishName }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0">{{ brandName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <p class="text-start mb-0"><i class="bi bi-heart"></i></p>
      </div>
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

.card-height {
  height: 100%;
}
</style>
