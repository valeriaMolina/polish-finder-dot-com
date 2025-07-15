<template>
    <div class="background-color container-fluid py-5">
        <div class="container white-bg border shadow rounded g-2 py-3">
            <div v-if="isLoading">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div v-else class="row row-cols">
                <div class="col d-flex align-items-center">
                    <img
                        v-if="polish.image_url"
                        :src="polish.image_url"
                        class="img-fluid"
                        alt="polish name"
                    />
                    <div v-else class="container-fluid text-center">
                        <i class="bi bi-image large-icon"></i>
                        <p class="large-text">Image not available</p>
                    </div>
                </div>
                <div class="col">
                    <div>
                        <h2>
                            {{ polish.name }}
                            <button class="like-button" @click.prevent="handleLike">
                                <i id="heartIcon" :class="iconClass"></i>
                            </button>
                        </h2>
                        <p>{{ polish.brand.name }}</p>
                        <hr />
                        <div v-if="polish.description">
                            <p>{{ polish.description }}</p>
                        </div>
                        <div v-else>
                            <p>No description available</p>
                        </div>
                    </div>
                    <div>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td>Primary Color</td>
                                    <td>
                                        <span class="badge text-bg-light">{{
                                            polish.color.name
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Secondary Colors</td>
                                    <td>
                                        <span
                                            class="badge text-bg-light"
                                            v-for="(eColor, index) in polish.effectColors"
                                            :key="polish.effectColors[index]"
                                        >
                                            {{ eColor }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Formula</td>
                                    <td>
                                        <span
                                            class="badge text-bg-light"
                                            v-for="(formula, index) in polish.formulas"
                                            :key="polish.formulas[index]"
                                            >{{ formula }}</span
                                        >
                                    </td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td>
                                        <span class="badge text-bg-light">{{
                                            polish.type.name
                                        }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <DupesWindow :duplicates="polish.dupes"></DupesWindow>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findOnePolish } from '@/apis/polishAPI';
import DupesWindow from '@/components/DupesWindow.vue';
import { useAuthStore } from '@/stores/auth';
import { getUserLikes, likePolish, removeLike } from '@/apis/likesAPI';

const route = useRoute();
const router = useRouter();
const polish = ref({});
const isLoading = ref(true);
const likedPolishes = ref([]);
const authStore = useAuthStore();
const isLiked = ref(false);

onMounted(async () => {
    const fetchedPolish = await findOnePolish(route.params.polishId);
    if (fetchedPolish) {
        polish.value = fetchedPolish;
        isLoading.value = false;
    } else {
        // redirect to not found
        router.push({ name: 'not-found' });
    }
    // check if user is logged in and has liked the polish
    if (authStore.getIsLoggedIn) {
        const likes = await getUserLikes(authStore.getEmail);
        likedPolishes.value = likes.map((like) => like.polish_id);
    }
    likedPolishes.value.includes(polish.value.polish_id)
        ? (isLiked.value = true)
        : (isLiked.value = false);
});

const iconClass = computed(() => {
    return isLiked.value ? 'bi bi-heart-fill' : 'bi bi-heart';
});

onUnmounted(() => {
    // cleanup resources here (e.g., cancel API requests)
    isLoading.value = true;
    polish.value = {};
    likedPolishes.value = [];
});

const handleLike = async () => {
    if (authStore.getIsLoggedIn) {
        // send like request to server
        const email = authStore.getEmail;
        try {
            if (isLiked.value) {
                // undo the like
                await removeLike(email, polish.value.polish_id);
                isLiked.value = false;
            } else {
                // like the polish
                await likePolish(email, polish.value.polish_id);
                isLiked.value = true;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            if (error.message === 'InvalidToken') {
                // clear session data
                authStore.clearSession();
                router.push('/login');
            }
        }
    } else {
        // redirect to login page
        router.push('/login');
    }
};
</script>

<style scoped>
.background-color {
    background: linear-gradient(
        106.5deg,
        rgba(255, 215, 185, 0.91) 23%,
        rgba(223, 159, 247, 0.8) 93%
    );
}

.white-bg {
    background-color: #f8f9fa;
}

.large-icon {
    font-size: 5rem;
}

.large-text {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.like-button {
    border: none;
    background: none;
}

#heartIcon {
    font-size: 20px;
    color: #f00;
}
</style>
