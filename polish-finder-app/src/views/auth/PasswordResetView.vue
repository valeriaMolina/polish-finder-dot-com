<template>
    <div class="d-flex flex-column align-items-center px-3 py-5 background">
        <div v-if="sent">
            <div class="pt-2">
                <div class="border shadow rounded px-3 py-4 white-background">
                    <h2>Email sent!</h2>
                    <p>
                        If there is an account associated with the email address or username, you
                        will receive a link to reset your password in your inbox.
                    </p>
                    <p>
                        If you have not received an email, make sure you check your junk or spam
                        folders.
                    </p>
                </div>
            </div>
        </div>
        <div v-else class="pt-2">
            <form
                novalidate
                class="border shadow rounded px-3 py-4 white-background"
                @submit.prevent="submit"
            >
                <div>
                    <h2>Need to reset your password?</h2>
                    <p>
                        Enter your username or email address to receive a link to change your
                        password
                    </p>
                </div>
                <div class="d-flex flex-column mb-3 mx-2" id="request-div">
                    <label
                        for="identifier"
                        id="identifier-label"
                        class="form-label custom-label-size"
                        >Username or email address</label
                    >
                    <input
                        id="identifier"
                        type="text"
                        class="custom-input"
                        @focus="handleFocus('request-div')"
                        @blur="handleBlur('request-div')"
                        v-model="usernameOrEmail"
                        placeholder=" "
                        required
                    />
                    <span :hidden="isValid" class="error-text" id="error-span"
                        >Username or email is required</span
                    >
                </div>
                <div class="d-flex justify-content-center mx-2">
                    <button :disabled="sending" class="btn mb-3 w-50 send-button" type="submit">
                        Send
                        <div
                            :hidden="!sending"
                            class="spinner-border spinner-border-sm"
                            role="status"
                        ></div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { forgotPassword } from '@/apis/authAPI';

const usernameOrEmail = ref('');
const sent = ref(false);
const isValid = ref(true);
const sending = ref(false);

const handleFocus = (divId) => {
    const div = document.getElementById(divId);
    // get the input, label and span
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];

    label.classList.add('custom-focus');
    input.style.borderBottom = '2px solid #8c92ac';
};

const handleBlur = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];

    if (input.value.trim() === '') {
        label.classList.remove('custom-focus');
    }
    if (!input.checkValidity()) {
        input.style.borderBottom = '2px solid red';
    } else {
        input.style.borderBottom = '2px solid green';
    }
};

const submit = async () => {
    // validate input
    if (!usernameOrEmail.value) {
        // display error message
        isValid.value = false;
        return;
    } else {
        sending.value = true;
        // disable button and show loading spinner
        try {
            await forgotPassword(usernameOrEmail.value);
            sent.value = true;
        } catch (err) {
            sending.value = false;
            alert('Failed to send email. Please try again later.');
        }
    }
};
</script>

<style scoped>
label {
    position: absolute;
    transition: all 0.25s ease-in-out 0s;
    transform: translate3d(1px, 4px, 0px);
    font-size: medium;
    z-index: 1;
}

.error-text {
    color: red;
}

.send-button {
    border-color: #6877f4;
    color: #6877f4;
}
.send-button:hover {
    background-image: linear-gradient(
        to right,
        #eea2a2 0%,
        #bbc1bf 19%,
        #57c6e1 42%,
        #b49fda 79%,
        #7ac5d8 100%
    );
    border-color: #b49fda;
    color: white;
}
.background {
    background-image: linear-gradient(
        to right,
        #eea2a2 0%,
        #bbc1bf 19%,
        #57c6e1 42%,
        #b49fda 79%,
        #7ac5d8 100%
    );
}

.white-background {
    background: #ececec;
}

.custom-focus {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, -12px, 0px);
    font-size: 0.77rem;
    z-index: 1;
}
</style>
