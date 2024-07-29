<template>
  <div class="col">
    <div class="card vw-20 bg-color">
      <a :href="website">
        <img :src="logoUrl" class="card-img-top brand-logo-img bg-image" alt="Brand Logo" />
      </a>
      <div class="card-body">
        <h5 class="card-title">{{ brandName }}</h5>
        <p class="card-text">
          {{ description }}
        </p>
        <div class="row grid gap-0 column-gap-1">
          <a :href="productsLink" class="col btn btn-primary">Profile</a>
          <div class="col">
            <a :href="addPolishLink" class="btn btn-success"><i class="bi bi-plus-square"></i></a>
            <a href="" class="btn btn-danger"><i class="bi bi-heart"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  'brandName',
  'logoUrl',
  'description',
  'productsLink',
  'addPolishLink',
  'website'
])
</script>

<style scoped>
.brand-logo-img {
  max-width: 100%;
  height: auto;
}

.bg-color {
  background-color: #ece6f7;
}

.bg-image {
  background-color: white;
}
</style>
