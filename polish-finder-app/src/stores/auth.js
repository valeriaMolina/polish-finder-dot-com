import { defineStore } from 'pinia';
import { sendLogin, sendLogout, verifyUser } from '@/apis/authAPI';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        // initialize state from local storage to enable user to stay logged in
        user: null,
        username: null,
        email: null,
        isUserVerified: false,
    }),
    persist: true,
    actions: {
        async login(username, password) {
            try {
                const user = await sendLogin(username, password);
                this.isLoggedIn = true;
                this.user = user;
                this.username = user.userName;
                this.email = user.userEmail;
                this.isUserVerified = true;
                return user;
            } catch (error) {
                this.isLoggedIn = false;
                this.user = null;
                this.username = null;
                this.email = null;
                this.isUserVerified = false;
                if (error.message === '404') {
                    throw new Error('Username or password is incorrect');
                } else {
                    throw error;
                }
            }
        },
        async logout() {
            try {
                await sendLogout();
                this.isLoggedIn = false;
                this.user = null;
                this.isUserVerified = false;
                this.email = null;
                this.username = null;
            } catch (error) {
                throw new Error('An error occurred while trying to logout: ', error.message);
            }
        },
        async verifyUser(token) {
            try {
                const res = await verifyUser(token);
                if (res.data.isUserVerified) {
                    return 1;
                }
            } catch (error) {
                throw error;
            }
        },
        clearSessionData() {
            this.isLoggedIn = false;
            this.user = null;
            this.isUserVerified = false;
            this.email = null;
            this.username = null;
            localStorage.removeItem('user');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('isUserVerified');
            localStorage.removeItem('isLoggedIn');
        },
    },
    getters: {
        getUsername: (state) => state.username,
        getEmail: (state) => state.email,
        getIsLoggedIn: (state) => state.isLoggedIn,
    },
});
