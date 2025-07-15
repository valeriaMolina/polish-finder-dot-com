<template>
    <div id="polishes" class="d-flex flex-column py-5">
        <div class="row">
            <div class="col-2 ms-2">
                <div class="white-bg container border shadow rounded row g-2 py-3">
                    <h4 class="text-center">Refine results</h4>
                    <div class="accordion accordion-flush" id="filterAccordion">
                        <div class="accordion-item">
                            <h4 class="accordion-header">
                                <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="false"
                                    aria-controls="collapseOne"
                                >
                                    Brand
                                </button>
                            </h4>
                            <div id="collapseOne" class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    <div class="nice-form-group">
                                        <input
                                            type="text"
                                            placeholder="Brand name"
                                            id="brandSearch"
                                            v-model="brandSearch"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h4 class="acordion-header">
                                <button
                                    class="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                >
                                    Color
                                </button>
                            </h4>
                            <div id="collapseTwo" class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    <div class="nice-form-group">
                                        <input
                                            type="text"
                                            placeholder="Color"
                                            id="colorSearch"
                                            v-model="colorSearch"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div
                    class="white-bg container border shadow rounded row row-cols-md-6 g-2 px-3 py-3"
                >
                    <div
                        v-for="polish in filteredList"
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
                    <div class="container mt-4 text-center">
                        <div class="spinner-border" role="status" :hidden="!isLoading">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PolishCard from '@/components/PolishCard.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { fetchPolish } from '@/apis/polishAPI';
import { getUserLikes } from '@/apis/likesAPI';

let page = 1;
let timeout = 1000;
const polishes = ref([]);
const isLoading = ref(false);
const brandSearch = ref('');
const colorSearch = ref('');
const likedPolishes = ref([]);

const authStore = useAuthStore();

const filteredList = computed(() => {
    if (brandSearch.value === '' && colorSearch.value === '') {
        return polishes.value;
    }

    return polishes.value.filter((polish) => {
        const brand = polish.brand.name.toLowerCase().includes(brandSearch.value.toLowerCase());
        const color = polish.color.name.toLowerCase().includes(colorSearch.value.toLowerCase());
        return brand & color;
    });
});

const loadMorePolishes = async () => {
    isLoading.value = true;
    let newLoad = await fetchPolish(page + 1, 60);
    polishes.value.push(...newLoad.polishes);
    isLoading.value = false;
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

const handleScroll = async (e) => {
    let element = document.getElementById('polishes');
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
        await loadMorePolishes();
        page++; // Increment page number for next fetch request.
    }
};

const debounceHandleScroll = debounce(handleScroll, timeout);

onMounted(async () => {
    if (authStore.getIsLoggedIn) {
        const likes = await getUserLikes(authStore.getEmail);
        likedPolishes.value = likes.map((like) => like.polish_id);
    }
    window.addEventListener('scroll', debounceHandleScroll);
    const polishesFetched = await fetchPolish(page, 60);
    polishes.value = polishesFetched.polishes;
});

onUnmounted(() => {
    window.removeEventListener('scroll', debounceHandleScroll);
    polishes.value = []; // Clear polishes on unmount to prevent memory leakage.
});

const updateLikeStatus = async () => {
    const likes = await getUserLikes(authStore.getEmail);
    likedPolishes.value = likes.map((like) => like.polish_id);
};
</script>

<style scoped>
#polishes {
    background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
}

.white-bg {
    background-color: #f8f9fa;
}

.color-dot {
    height: 12px;
    width: 12px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid black;
    display: inline-block;
}
</style>
