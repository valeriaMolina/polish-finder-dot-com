<template>
  <div class="col">
    <div class="card vw-20">
      <a :href="website">
        <img :src="logoUrl" class="card-img-top brand-logo-img" alt="Brand Logo" />
      </a>
      <div class="card-body">
        <h5 class="card-title">{{ brandName }}</h5>
        <p class="card-text">
          {{ description }}
        </p>
        <div class="row grid gap-0 column-gap-1">
          <a :href="productsLink" class="col btn btn-primary">All products</a>
          <a :href="addPolishLink" class="col btn btn-success">Add a polish</a>
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
</style>
