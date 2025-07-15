<template>
    <div id="bg-color" class="container border shadow rounded g-2 py-3 mt-3">
        <div class="px-3">
            <h1>Dupes</h1>
            <hr />
            <p>Do you know a dupe? Add it here!</p>
            <div class="row row-cols-md-6">
                <div v-for="polish in props.duplicates" :key="polish.polish_id">
                    <PolishCard
                        :id="polish.polish_id"
                        :polishName="polish.name"
                        :brandName="polish.brand.name"
                        :pictureUrl="polish.image_url"
                        :isLiked="likedPolishes.includes(polish.polish_id)"
                        @update:is-liked="updateLikeStatus()"
                    ></PolishCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getUserLikes } from '@/apis/likesAPI';
import PolishCard from './PolishCard.vue';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const likedPolishes = ref([]);
const router = useRouter();

const props = defineProps({
    duplicates: {
        type: Array,
        required: true,
    },
});

onMounted(async () => {
    if (authStore.getIsLoggedIn) {
        const likes = await getUserLikes(authStore.getEmail);
        likedPolishes.value = likes.map((like) => like.polish_id);
    }
});

const updateLikeStatus = async () => {
    if (authStore.getIsLoggedIn) {
        try {
            const likes = await getUserLikes(authStore.getEmail);
            likedPolishes.value = likes.map((like) => like.polish_id);
        } catch (error) {
            console.error('Failed to update likes:', error);
            if (error.message === 'InvalidToken') {
                // clear session data and reroute
                authStore.clearSessionData();
                router.push('/login');
            }
        }
    } else {
        router.push('/login');
    }
};
</script>

<style>
#bg-color {
    background-color: #f8f9fa;
}
</style>
