<template>
    <div class="col">
        <div class="card vw-20 bg-color">
            <router-link :to="`/brands/${brandId}`"
                ><img :src="logoUrl" class="card-img-top brand-logo-img bg-image" alt="Brand Logo"
            /></router-link>
            <div class="card-body card-name">
                <h5 class="card-title title">
                    <router-link class="brand-link" :to="`/brands/${brandId}`">{{
                        brandName
                    }}</router-link>
                </h5>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['brandId', 'brandName', 'logoUrl']);
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

.brand-link {
    font-weight: bold;
    color: black;
    text-decoration: none;
}

.title:hover {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Add shadow effect on hover */
}
</style>
