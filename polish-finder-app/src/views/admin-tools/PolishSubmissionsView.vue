<template>
    <div class="container-fluid">
        <AdminNav activeLink="submissions"></AdminNav>
        <div class="border rounded px-3 py-3 mx-1 my-3">
            <h4>Polish Submissions</h4>
            <p>Here you can review polish submissions from users.</p>
        </div>
        <div v-if="isLoading">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="row px-3 my-3">
            <SubmissionListPolish :submissions="polishSubmissions"></SubmissionListPolish>
        </div>
    </div>
</template>

<script setup>
import SubmissionListPolish from '@/components/admin-components/SubmissionListPolish.vue';
import AdminNav from '@/components/admin-components/AdminNav.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getPolishSubmissions } from '@/apis/submissionsAPI';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(true);
const polishSubmissions = ref([]);

onMounted(async () => {
    try {
        const submissions = await getPolishSubmissions();
        polishSubmissions.value = submissions;
        isLoading.value = false;
    } catch (error) {
        if (error.message === 'MissingTokenError') {
            // redirect to login page
            authStore.clearSessionData();
            router.push({ name: 'Home' });
        }
    }
});
</script>
