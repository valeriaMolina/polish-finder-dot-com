<template>
  <div id="gradient-bg" class="d-flex flex-column align-items-center px-3 py-5">
    <h1>Brands</h1>
    <p>
      Browse all our available brands. Did we miss something?
      <a href="/contribute/new/brand">Add it here!</a>
    </p>
    <div
      class="white-bg container border shadow rounded row row-cols-1 row-cols-md-4 g-2 px-3 py-3"
    >
      <div v-for="brand in sampleBrands" :key="brand.brand_id">
        <brandcard
          :brandName="brand.brandName"
          :logoUrl="brand.logoUrl"
          :description="brand.description"
          :productsLink="brand.productsLink"
          :addPostLink="brand.addPostLink"
          :website="brand.website"
        ></brandcard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBrandStore } from '../stores/brands'
const brands = useBrandStore()
// brands.fetchAllBrands()

import brandcard from '../components/BrandCard.vue'

const sampleBrands = [
  {
    brand_id: 1,
    brandName: 'Holo Taco',
    logoUrl:
      'https://yt3.googleusercontent.com/ytc/AIdro_nO9IAQvKjM7rQw4ay7axHuWe9UH4VQFvDUjz0_aQ48jg=s900-c-k-c0x00ffffff-no-rj',
    description: 'Holo Taco is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://holotaco.com'
  },
  {
    brand_id: 2,
    brandName: 'Holo Taco',
    logoUrl:
      'https://yt3.googleusercontent.com/ytc/AIdro_nO9IAQvKjM7rQw4ay7axHuWe9UH4VQFvDUjz0_aQ48jg=s900-c-k-c0x00ffffff-no-rj',
    description: 'Holo Taco is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://holotaco.com'
  },
  {
    brand_id: 3,
    brandName: 'Holo Taco',
    logoUrl:
      'https://yt3.googleusercontent.com/ytc/AIdro_nO9IAQvKjM7rQw4ay7axHuWe9UH4VQFvDUjz0_aQ48jg=s900-c-k-c0x00ffffff-no-rj',
    description: 'Holo Taco is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://holotaco.com'
  },
  {
    brand_id: 4,
    brandName: 'Holo Taco',
    logoUrl:
      'https://yt3.googleusercontent.com/ytc/AIdro_nO9IAQvKjM7rQw4ay7axHuWe9UH4VQFvDUjz0_aQ48jg=s900-c-k-c0x00ffffff-no-rj',
    description: 'Holo Taco is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://holotaco.com'
  },
  {
    brand_id: 5,
    brandName: 'Holo Taco',
    logoUrl:
      'https://yt3.googleusercontent.com/ytc/AIdro_nO9IAQvKjM7rQw4ay7axHuWe9UH4VQFvDUjz0_aQ48jg=s900-c-k-c0x00ffffff-no-rj',
    description: 'Holo Taco is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://holotaco.com'
  }
]
</script>

<style scoped>
#gradient-bg {
  background: linear-gradient(
    110.5deg,
    rgba(248, 196, 249, 0.66) 22.8%,
    rgba(253, 122, 4, 0.15) 64.6%
  );
}

.white-bg {
  background-color: white;
}
</style>
