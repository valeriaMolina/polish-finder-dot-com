<template>
  <div id="gradient-bg" class="d-flex flex-column align-items-center px-3 py-5">
    <div class="container mb-3">
      <h1>Brands</h1>
      <p>
        Browse all our available brands. Did we miss something?
        <a href="/contribute/new/brand">Add it here!</a>
      </p>
      <div class="w-100">
        <div class="w-50 nice-form-group mx-auto">
          <input class="" type="search" placeholder="Search for a brand" />
        </div>
      </div>
    </div>

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
    brandName: 'Mooncat',
    logoUrl: 'https://pbs.twimg.com/profile_images/1642361828742135810/usny3nXI_400x400.jpg',
    description: 'Mooncat is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://www.mooncat.com/'
  },
  {
    brand_id: 3,
    brandName: 'Cirque Colors',
    logoUrl:
      'https://scontent-bos5-1.xx.fbcdn.net/v/t39.30808-6/307069019_5801564766542702_8403181506303224879_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=j5EIFkxX8IkQ7kNvgEa1ItH&_nc_ht=scontent-bos5-1.xx&oh=00_AYDpe7B2MNbjdYE1Z2osw3riS3zw3nZMUtbz8b88QEj6yQ&oe=66A25E07',
    description: 'Cirque Colors is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://holotaco.com'
  },
  {
    brand_id: 4,
    brandName: 'Cupcake Polish',
    logoUrl:
      'https://scontent-bos5-1.xx.fbcdn.net/v/t39.30808-6/358699176_657833273054312_7028190287804206336_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9BF1dGbLrHUQ7kNvgF_L0XU&_nc_ht=scontent-bos5-1.xx&oh=00_AYBhZNnfFJiN-Ew2YnLGsuwtvg9KOGjnsSX-drnNVyCMhw&oe=66A2893F',
    description: 'Cupcake Polish is a nail polish brand.',
    productsLink: '/',
    addPostLink: '/',
    website: 'https://holotaco.com'
  }
]
</script>

<style scoped>
@import url('../../node_modules/nice-forms.css/dist/nice-forms.css');
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
