<template>
    <div class="background-gradient">
        <div class="container py-5">
            <div class="px-4 py-4 shadow rounded white-bg">
                <div>
                    <h2 class="text-center">Email Verification</h2>
                </div>

                <div class="text-center">
                    <div :hidden="!isLoading">
                        <div class="spinner-border" aria-hidden="true"></div>
                        <p>Verifying your email...</p>
                    </div>

                    <div :hidden="isLoading">
                        <div v-if="verificationSuccess">
                            <h4>Your email has been verified &#127881;</h4>
                            <p>Please use the link below to sign in to your account.</p>
                            <router-link to="/login" class="btn mb-3 w-25" id="btn-login-colorful"
                                >Sign In</router-link
                            >
                        </div>
                        <div v-else>
                            <div class="">
                                <div class="text-start">
                                    <h4>Verification Failed</h4>
                                    <p>
                                        The link may have expired or you are using an invalid token.
                                    </p>
                                    <p>
                                        Please check your email for the verification link and try
                                        again. If you have not received it, you may need to request
                                        a new one.
                                    </p>
                                </div>

                                <router-link
                                    to="/resend-verification"
                                    class="btn mb-3 w-25"
                                    id="colorful-button"
                                    >Request a new verification email</router-link
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';

const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const verificationSuccess = ref(false);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

onMounted(() => {
    const verifyToken = route.query.token;
    if (verifyToken) {
        sleep(2000).then(async () => {
            try {
                await authStore.verifyUser(verifyToken);
                verificationSuccess.value = true;
                isLoading.value = false;
            } catch (error) {
                console.log(error);
                error.value = error || 'Failed to verify email.';
                isLoading.value = false;
            }
        });
    } else {
        router.push('/');
    }
});
</script>

<style scoped>
#colorful-button {
    color: #6877f4;
    background: white;
    border-color: #6877f4;
}

#colorful-button:hover {
    border-color: transparent;
    color: white;
    border-color: transparent;
    background: linear-gradient(-225deg, #ff057c 0%, #7c64d5 48%, #4cc3ff 100%);
}

#colorful-button:active {
    border-color: #6050dc;
    background: white;
    color: #6050dc;
}

.white-bg {
    background: white;
}

.background-gradient {
    background: linear-gradient(
        109.6deg,
        rgb(123, 90, 224) 11.2%,
        rgb(164, 46, 253) 32.6%,
        rgb(213, 56, 234) 62.7%,
        rgb(251, 138, 52) 100.2%
    );
}
</style>
