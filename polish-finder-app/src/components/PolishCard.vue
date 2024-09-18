<template>
  <div class="col">
    <div class="card vw-20 bg-color">
      <img :src="pictureUrl" class="card-img-top" alt="" />
      <div class="card-body">
        <div class="container px-0">
          <div class="row align-items-start">
            <div class="col">
              <p class="fs-5 mb-0">{{ polishName }}</p>
            </div>
            <div class="col">
              <p class="text-end mb-0"><i class="bi bi-heart"></i></p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0">{{ brandName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['polishName', 'brandName', 'pictureUrl'])
</script>

<style scoped>
.bg-color {
  background-color: #ececec;
}
</style>
