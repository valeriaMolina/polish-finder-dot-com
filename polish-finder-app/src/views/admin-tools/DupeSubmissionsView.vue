<template>
    <div class="container-fluid">
        <AdminNav activeLink="submissions"></AdminNav>
        <div class="border rounded px-3 py-3 mx-1 my-3">
            <h4>Dupes</h4>
            <p>Here you can manage dupe submissions.</p>
        </div>
        <div v-if="isLoading">
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="staus">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div v-else class="row px-3 my-3">
            <SubmissionsListDupe
                :submissions="dupeSubmissions"
                @update-list="refreshSubmissions()"
            ></SubmissionsListDupe>
        </div>
    </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue';
import SubmissionsListDupe from '@/components/admin-components/SubmissionsListDupe.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import { getDupeSubmissions } from '@/apis/submissionsAPI';

const router = useRouter();
const authStore = new useAuthStore();
const isLoading = ref(true);
const dupeSubmissions = ref([]);

onMounted(async () => {
    try {
        if (submissions) {
            const submissions = await getDupeSubmissions();
            dupeSubmissions.value = submissions;
            isLoading.value = false;
        }
    } catch (error) {
        if (error.message === 'MissingTokenError') {
            // redirect to login page
            authStore.clearSessionData();
            router.push({ name: 'Home' });
        }
    }
});

const refreshSubmissions = async () => {
    isLoading.value = true;
    const submissions = await getDupeSubmissions();
    dupeSubmissions.value = submissions;
    isLoading.value = false;
};
</script>
