<template>
    <div id="gradient-bg" class="d-flex flex-column align-items-center px-3 py-5">
        <div class="container mb-3">
            <h1>Brands</h1>
            <p>
                Browse all our available brands. Did we miss something?
                <router-link to="/contribute/new/brand">Add it here!</router-link>
            </p>
        </div>
        <div
            class="white-bg container border shadow rounded row row-cols-1 row-cols-md-5 g-2 px-3 py-3"
        >
            <div v-for="brand in brands" :key="brand.brand_id">
                <brandcard
                    :brandId="brand.brand_id"
                    :brandName="brand.name"
                    :logoUrl="brand.logo_url"
                ></brandcard>
            </div>
        </div>
    </div>
</template>

<script setup>
const brands = ref([]);
// call the action

import brandcard from '../components/BrandCard.vue';
import { onMounted, ref } from 'vue';
import { fetchBrands } from '@/apis/brandAPI';

// TODO
// need to add the filtered list functionality
// like the one in polishes view

onMounted(async () => {
    const allBrands = await fetchBrands();
    brands.value = allBrands.sort((a, b) => a.name.localeCompare(b.name));
});
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
