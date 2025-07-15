<template>
    <div class="container-fluid">
        <AdminNav activeLink="submissions"></AdminNav>
        <div class="border rounded px-3 py-3 mx-1 my-3">
            <h4>Brands</h4>
            <p>Here you can review user submissions for brands.</p>
        </div>
        <div v-if="isLoading">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="row px-3 my-3">
            <SubmissionListBrand
                :submissions="brandSubmissions"
                @update-list="refreshSubmissions()"
            ></SubmissionListBrand>
        </div>
    </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue';
import SubmissionListBrand from '@/components/admin-components/SubmissionListBrand.vue';
import { getBrandSubmissions } from '@/apis/submissionsAPI';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(true);
const brandSubmissions = ref([]);

onMounted(async () => {
    try {
        const submissions = await getBrandSubmissions();
        brandSubmissions.value = submissions;
        isLoading.value = false;
    } catch (error) {
        if (error.message === 'InvalidTokenError') {
            // redirect to login page
            authStore.clearSessionData();
            router.push({ name: 'Home' });
        }
    }
});

const refreshSubmissions = async () => {
    isLoading.value = true;
    const submissions = await getBrandSubmissions();
    brandSubmissions.value = submissions;
    isLoading.value = false;
};
</script>
