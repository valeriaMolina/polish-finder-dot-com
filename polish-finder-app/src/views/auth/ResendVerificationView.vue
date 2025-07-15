<template>
    <div class="background-gradient d-flex flex-column align-items-center px-3 py-5">
        <div class="pt-2">
            <div
                class="border shadow rounded px-1 py-4 verification-success"
                :hidden="!emailSubmitted"
            >
                <div class="my-3 px-5 text-center"><h2>Email Verification Sent</h2></div>
                <div class="d-flex flex-column mb-3 mx-2">
                    <p>
                        If an account with that email exists, we've sent a new verification link.
                        Please check your inbox and follow the instructions to verify your email
                        address.
                    </p>
                    <p>
                        It may take up to 10 minutes for the email to arrive. Be sure to check your
                        spam or junk folder if you don't see it.
                    </p>
                </div>
            </div>
            <form
                id="resend-verification"
                class="border shadow rounded px-1 py-4"
                novalidate
                :hidden="emailSubmitted"
                @submit.prevent="submit"
            >
                <div class="my-3 px-5 text-center">
                    <h2>Resend Verification Email</h2>
                </div>
                <div class="d-flex flex-column mb-3 mx-2" id="email-div">
                    <label for="input-email" class="from-label custom-label-size" id="email-label"
                        >Email</label
                    >
                    <input
                        type="email"
                        id="input-email"
                        placeholder=" "
                        class="custom-input"
                        v-model="userInput.email"
                        @focus="handleFocus('email-div')"
                        @blur="handleBlur('email-div')"
                        required
                    />
                    <span id="span-email" class="error"></span>
                </div>
                <div class="d-flex justify-content-center mx-2">
                    <button
                        id="colorful-button"
                        :disabled="!isFormValid"
                        type="submit"
                        class="btn mb-3 w-100"
                    >
                        Send verification
                        <span class="spinner-border spinner-border-sm" :hidden="!loading"></span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { resendVerification } from '../../apis/authAPI';
import * as yup from 'yup';

const userInput = reactive({
    email: ref(''),
});

const emailSubmitted = ref(false);

const loading = ref(false);

let emailVerificationSchema = yup.object({
    email: yup.string().email().required('Email is required'),
});

const isFormValid = computed(() => {
    try {
        emailVerificationSchema.validateSync(userInput);
        return true;
    } catch (error) {
        return false;
    }
});

// event handlers
const submit = async () => {
    loading.value = true;
    emailVerificationSchema.validateSync(userInput);
    await resendVerification(userInput.email);
    loading.value = false;
    emailSubmitted.value = true;
};

const handleFocus = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const input = div.getElementsByTagName('input')[0];
    input.style.borderBottom = '2px solid #8c92ac';
    label.classList.add('custom-focus');
};

const handleBlur = (divId) => {
    const div = document.getElementById(divId);
    // get the input, label and span within this div
    const input = div.getElementsByTagName('input')[0];
    const label = div.getElementsByTagName('label')[0];
    const span = div.getElementsByTagName('span')[0];

    // check for input
    if (input.value.trim() === '') {
        label.classList.remove('custom-focus');
    }
    // check the validity of the input
    if (!input.checkValidity()) {
        input.style.borderBottom = '2px solid red';
        span.style.display = 'block';
        span.style.color = 'red';
        // determine text for span
        if (input.value.trim() === '') {
            span.textContent = 'Email is required';
        } else {
            span.textContent = 'Please enter a valid email address';
        }
    } else {
        input.style.borderBottom = '2px solid green';
        span.style.display = 'none';
    }
};
</script>

<style scoped>
.background-gradient {
    background: radial-gradient(
        circle at 0.8% 3.1%,
        rgb(255, 188, 224) 0%,
        rgb(170, 165, 255) 46%,
        rgb(165, 255, 205) 100.2%
    );
}

label {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, 4px, 0px);
    font-size: medium;
    z-index: 1;
}

.custom-focus {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, -12px, 0px);
    font-size: 0.77rem;
    z-index: 1;
}

#resend-verification {
    background-color: #ececec;
}

.verification-success {
    background-color: #ececec;
}

#colorful-button {
    color: #6877f4;
    background: white;
    border-color: #6877f4;
}

#colorful-button:hover {
    border-color: transparent;
    color: white;
    border-color: transparent;
    background: radial-gradient(
        circle at 0.8% 3.1%,
        rgb(255, 188, 224) 0%,
        rgb(170, 165, 255) 46%,
        rgb(165, 255, 205) 100.2%
    );
}

#colorful-button:active {
    border-color: #6050dc;
    background: white;
    color: #6050dc;
}
</style>
