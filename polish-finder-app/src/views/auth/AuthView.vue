<template>
    <div class="d-flex flex-column align-items-center px-3 py-5" id="main-login-div">
        <div class="pt-2">
            <form
                @submit.prevent="submit"
                id="form-login"
                class="border shadow rounded px-3 py-4"
                novalidate
            >
                <div v-show="displayAlert" class="alert alert-danger" role="alert">
                    <p><i class="bi bi-exclamation-triangle"></i> Oops! Something went wrong.</p>
                    <hr />
                    <p class="mb-0">{{ errorMessage }}</p>
                </div>
                <div class="my-3 px-5 text-center">
                    <h2>Welcome Back!</h2>
                    <h3>&#128133;</h3>
                </div>
                <div class="d-flex flex-column mb-3 mx-2">
                    <label for="inputUsername" class="form-label custom-label-size">Username</label>
                    <input
                        v-model="userInput.identifier"
                        type="username"
                        class="custom-input"
                        id="inputUsername"
                        placeholder="Username or Email"
                        required
                    />
                </div>
                <div class="d-flex flex-column mb-3 mx-2">
                    <label for="inputPswd" class="form-label custom-label-size">Password</label>
                    <input
                        id="inputPswd"
                        v-model="userInput.password"
                        type="password"
                        class="custom-input"
                        placeholder="Password"
                        required
                    />
                    <div class="text-end">
                        <p class="p-padding">
                            <router-link class="custom-label-size" to="/password-reset"
                                >I forgot my password</router-link
                            >
                        </p>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="checkRememberUser" />
                        <label for="checkRememberUser" class="form-check-label"
                            >Remember me on this device</label
                        >
                    </div>
                    <div class="d-flex justify-content-center mx-2">
                        <button
                            type="submit"
                            class="rounded w-50"
                            id="btn-login-colorful"
                            :disabled="loading"
                        >
                            <span
                                class="spinner-border spinner-border-sm"
                                :hidden="!loading"
                            ></span>
                            <span :hidden="loading">Sign In</span>
                        </button>
                    </div>
                    <div class="mt-2">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import * as yup from 'yup';

const auth = useAuthStore();
const router = useRouter();

// Define reactive refs for input fields and error message
const errorMessage = ref('');
const userInput = reactive({
    identifier: ref(''),
    password: ref(''),
});
const displayAlert = ref(false);
const loading = ref(false);

let loginSchema = yup.object({
    identifier: yup.string().required('Please enter a username or email'),
    password: yup.string().required('Please enter a password'),
});

// Event handler for form submission

const submit = async () => {
    try {
        loginSchema.validateSync(userInput);
        // disable button while processing
        loading.value = true;
        // call the login function
        await auth.login(userInput.identifier, userInput.password);
        router.push({ name: 'home' });
    } catch (error) {
        errorMessage.value = error.message;
        displayAlert.value = true;
        loading.value = false;
        // if the user is not verified, redirect to verification page
        if (error.message === 'UserNotVerifiedError') {
            // redirect to verification page
            router.push({ name: 'missing-verification' });
        }
    }
};
</script>

<style>
.p-padding {
    padding-top: 5px;
}

.custom-label-size {
    font-size: 14px;
}

.custom-input {
    padding-bottom: 10px;
    border: none;
    outline: none;
    border-bottom: 2px solid #c0c0c0;
    background-color: #ececec;
}
.custom-input:focus {
    border-bottom: 2px solid #8c92ac;
}

#main-login-div {
    background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

#form-login {
    background-color: #ececec;
}

#btn-login-colorful {
    color: #212529;
    border-color: #212529;
    padding: 0.25em 0.75em;
    background: #c6bdff;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 2px;
    position: relative;
    cursor: pointer;
    display: block;
}

#btn-login-colorful:hover {
    background: #aa9dff;
}
</style>
