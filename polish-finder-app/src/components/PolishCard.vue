<template>
    <div class="card h-100 bg-color">
        <router-link :to="`/polishes/${id}`">
            <img
                v-if="!pictureUrl"
                :src="config.IMG_NOT_AVAILABLE"
                class="card-img-top"
                alt="Unavailable"
            />
            <img v-else :src="pictureUrl" class="card-img-top" alt="Polish" />
        </router-link>

        <div class="card-body d-flex flex-column">
            <div class="mb-auto">
                <p class="fs-5">
                    <router-link class="polish-link" :to="`/polishes/${id}`">{{
                        polishName
                    }}</router-link>
                </p>
            </div>

            <div>
                <p class="brand-name my-0">{{ brandName }}</p>
            </div>
        </div>
        <div class="card-footer">
            <p class="text-start mb-0">
                <button class="like-button" @click.prevent="handleLike">
                    <i id="heartIcon" :class="iconClass"></i>
                </button>
            </p>
        </div>
    </div>
</template>

<script setup>
import config from '@/config';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { likePolish, removeLike } from '@/apis/likesAPI';

const authStore = useAuthStore();
const props = defineProps(['id', 'polishName', 'brandName', 'pictureUrl', 'isLiked']);
const emit = defineEmits(['update:isLiked']);
const router = useRouter();
const iconClass = ref(props.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart');

const handleLike = async () => {
    // check if user is logged in
    // if not, display a login modal or redirect to login page
    // if user is logged in, toggle the like icon and update the polish's like count
    // update the icon color based on the current state
    if (authStore.getIsLoggedIn) {
        // send like request to server
        try {
            const email = authStore.getEmail;
            if (props.isLiked) {
                // undo the like if the user previously liked the polish
                await removeLike(email, props.id);
            } else {
                // like the polish if the user has not previously liked it
                await likePolish(email, props.id);
            }
            // emit update to parent component
            emit('update:isLiked');
        } catch (error) {
            console.error('Error liking polish: ', error);
            if (error.message === 'InvalidToken') {
                // clear session data and redirect to login page
                authStore.clearSessionData();
                router.push('/login');
            }
        }
    } else {
        // redirect to login page
        router.push('/login');
    }
};

// watch for changes in the isLiked prop to update the icon class
watch(
    () => props.isLiked,
    (newVal) => {
        iconClass.value = newVal ? 'bi bi-heart-fill' : 'bi bi-heart';
    }
);
</script>

<style scoped>
.bg-color {
    background-color: #ececec;
}

.brand-name {
    font-weight: bold;
}

.like-button {
    border: none;
    background: none;
}

#heartIcon {
    font-size: 20px;
    color: #f00;
}

.polish-link {
    text-decoration: none;
    color: black;
}
</style>
