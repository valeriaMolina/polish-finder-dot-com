import { useAuthStore } from '../stores/auth';

export function isAuthenticated() {
    // Todo? check if user is authenticated using backend API
    const authStore = useAuthStore();
    return authStore.isLoggedIn;
}
