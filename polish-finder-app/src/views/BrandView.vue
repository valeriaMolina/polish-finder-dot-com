<template>
    <div id="brand" class="d-flex flex-column py-5">
        <div class="row py-3">
            <h1 class="text-center">{{ brandName }}</h1>
        </div>
        <div class="row">
            <div class="col-2 ms-2">
                <div class="white-bg container border shadow rounded row g-2 py-3">
                    <h4 class="text-center">Refine results</h4>
                </div>
            </div>
            <div class="col">
                <div
                    class="white-bg container border shadow rounded row row-cols-md-6 g-2 px-3 py-3"
                >
                    <div v-if="brandPolishes.length === 0">
                        <h4 class="text-center">No polishes found</h4>
                    </div>
                    <div
                        v-else
                        v-for="polish in brandPolishes"
                        :key="polish.polish_id"
                        class="d-flex align-items-stretch"
                    >
                        <PolishCard
                            :brand-name="polish.brand.name"
                            :picture-url="polish.image_url"
                            :polish-name="polish.name"
                            :id="polish.polish_id"
                            :is-liked="likedPolishes.includes(polish.polish_id)"
                            @update:is-liked="updateLikeStatus()"
                        ></PolishCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PolishCard from '@/components/PolishCard.vue';
import { getUserLikes } from '@/apis/likesAPI';
import { getPolishesByBrandId } from '@/apis/polishAPI';
import { useAuthStore } from '@/stores/auth';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

let page = 1;
let timeout = 1000;

// get the brand information
const brandPolishes = ref([]);
const isLoading = ref(false);
const likedPolishes = ref([]);
const brandName = ref('');
const route = useRoute();

const authStore = useAuthStore();

const loadMorePolishes = async () => {
    isLoading.value = true;
    let newLoad = await getPolishesByBrandId(page + 1, 60);
    brandPolishes.value.push(...newLoad.polishes);
    isLoading.value = false;
};

const handleScroll = async (e) => {
    let element = document.getElementById('brand');
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
        await loadMorePolishes();
        page++; // Increment page number for next fetch request.
    }
};

const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

const updateLikeStatus = async () => {
    const likes = await getUserLikes(authStore.getEmail);
    likedPolishes.value = likes.map((like) => like.polish_id);
};

const debounceHandleScroll = debounce(handleScroll, timeout);

onMounted(async () => {
    if (authStore.getIsLoggedIn) {
        const likes = await getUserLikes(authStore.getEmail);
        likedPolishes.value = likes.map((like) => like.polish_id);
    }
    window.addEventListener('scroll', debounceHandleScroll);
    const brandId = route.params.brandId;
    const getContent = await getPolishesByBrandId(brandId, page, 60);
    brandPolishes.value = getContent.rows;
    brandName.value = getContent.brand.name;
});

onUnmounted(() => {
    window.removeEventListener('scroll', debounceHandleScroll);
    brandPolishes.value = [];
});
</script>

<style scoped>
#brand {
    background: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
}

.white-bg {
    background-color: #f8f9fa;
}
</style>
