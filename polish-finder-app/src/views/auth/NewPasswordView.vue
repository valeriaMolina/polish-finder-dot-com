<template>
    <div class="d-flex flex-column align-items-center px-3 py-5 background">
        <div class="pt-2">
            <div class="border shadow rounded px-3 py-4 white-background">
                <form novalidate @submit.prevent="submit">
                    <div class="my-3 px-5 text-center">
                        <h2>Change your password</h2>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2" id="pwd-div">
                        <label for="input-pwd" class="form-label custom-label-size" id="pwd-label"
                            >New password</label
                        >
                        <div class="d-flex">
                            <input
                                v-model="newPasswordInput.newPassword"
                                :type="togglePasswordVisibility"
                                id="input-new-pwd"
                                class="custom-input flex-fill"
                                placeholder=" "
                                @focus="handleFocusPassword('pwd-div')"
                                @blur="handleBlurPassword('pwd-div')"
                                required
                            />
                            <button
                                class="custom-input"
                                @click.prevent="executetogglePasswordVisibility"
                            >
                                <i :class="togglePasswordVisibilityIcon"></i>
                            </button>
                        </div>
                        <p id="8-char" class="pwd-req">
                            <i class="bi bi-x-lg"></i> Must be at least 8 characters
                        </p>
                        <p id="1-uppercase" class="pwd-req">
                            <i class="bi bi-x-lg"></i> Must include at least one uppercase letter
                        </p>
                        <p id="1-number" class="pwd-req">
                            <i class="bi bi-x-lg"></i> Must include at least one number
                        </p>
                        <p id="1-symbol" class="pwd-req">
                            <i class="bi bi-x-lg"></i> Must include at least one symbol
                        </p>
                    </div>
                    <div class="d-flex flex-column mb-3 mx-2" id="confirm-div">
                        <label
                            for="confirm-pwd"
                            id="confirm-new-pwd-label"
                            class="form-label custom-label-size"
                            >Confirm new password</label
                        >
                        <div class="d-flex">
                            <input
                                :type="toggleConfirmPasswordVisibility"
                                id="input-pwd-confirm"
                                class="custom-input flex-fill"
                                v-model="newPasswordInput.newPasswordConfirm"
                                placeholder=" "
                                @focus="handleFocusConfirmPassword('confirm-div')"
                                @blur="handleBlurConfirmPassword('confirm-div')"
                                required
                            />
                            <button
                                class="custom-input"
                                @click.prevent="executetoggleConfirmPasswordVisibility"
                            >
                                <i :class="toggleConfirmPasswordVisibilityIcon"></i>
                            </button>
                        </div>
                        <span class="pwd-req" id="confirm-sp"
                            ><i class="bi bi-x-lg"></i> Passwords must match</span
                        >
                    </div>
                    <div class="d-flex justify-content-center mx-2">
                        <button id="submit-reset-pwd" class="btn mb-3 w-100">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { verifyPasswordResetToken } from '@/apis/authAPI';

/**
 * New password and new password confirm refs
 */
const newPasswordInput = reactive({
    newPassword: ref(''),
    newPasswordConfirm: ref(''),
});

/**
 * Toggle password visibility and visibility icon refs
 */
const toggleConfirmPasswordVisibility = ref('password');
const togglePasswordVisibility = ref('password');

const toggleConfirmPasswordVisibilityIcon = ref('bi bi-eye-slash');
const togglePasswordVisibilityIcon = ref('bi bi-eye-slash');

/**
 * Password requirements
 */
const passwordRequirements = [
    { regex: /.{8,}/, message: 'Password must be at least 8 characters long', id: '8-char' },
    {
        regex: /[A-Z]/,
        message: 'Password must contain at least one uppercase letter',
        id: '1-uppercase',
    },
    { regex: /[0-9]/, message: 'Password must contain at least one number', id: '1-number' },
    {
        regex: /[@$!%*?&#]/,
        message: 'Password must contain at least one special character',
        id: '1-symbol',
    },
];

const route = useRoute();
const router = useRouter();

/**
 * onMounted hook to check if token is provided in the route parameters
 */
onMounted(async () => {
    const token = route.params.token;
    if (token) {
        // verify that the token is valid
        try {
            await verifyPasswordResetToken(token);
        } catch (error) {
            console.error(error.message);
            router.push({ name: 'auth' });
        }
    } else {
        // Redirect to login page if token is not provided
        router.push({ name: 'auth' });
    }
});

/**
 * Submit method to handle password reset
 */
const submit = async () => {
    try {
        // check if requirements have been met
        const requirements = passwordRequirements.filter((req) =>
            req.regex.test(newPasswordInput.newPassword)
        );
        if (
            requirements.length === passwordRequirements.length &&
            newPasswordInput.newPassword === newPasswordInput.newPasswordConfirm
        ) {
            // TODO: Implement password reset logic using the provided new password
            console.log('Success');
        }
    } catch (error) {
        console.error(error.message);
    }
};

/**
 * Event hnandlers for password visibility toggle
 */
// event handler for password visibility toggle
const executetoggleConfirmPasswordVisibility = () => {
    toggleConfirmPasswordVisibility.value =
        toggleConfirmPasswordVisibility.value === 'password' ? 'text' : 'password';
    toggleConfirmPasswordVisibilityIcon.value =
        toggleConfirmPasswordVisibility.value === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye';
};

const executetogglePasswordVisibility = () => {
    togglePasswordVisibility.value =
        togglePasswordVisibility.value === 'password' ? 'text' : 'password';
    togglePasswordVisibilityIcon.value =
        togglePasswordVisibility.value === 'password' ? 'bi bi-eye-slash' : 'bi bi-eye';
};

const handleFocusPassword = (divId) => {
    const div = document.getElementById(divId);
    // get the input, label and p elements
    const label = div.getElementsByTagName('label')[0];
    const p = div.getElementsByTagName('p');
    const input = div.getElementsByTagName('input')[0];
    const button = div.getElementsByTagName('button')[0];

    label.classList.add('custom-focus');
    button.style.borderBottom = '2px solid #8c92ac';
    input.style.borderBottom = '2px solid #8c92ac';
    for (let pElements of p) {
        pElements.style.display = 'block';
    }
};

const handleFocusConfirmPassword = (divId) => {
    const div = document.getElementById(divId);
    const label = div.getElementsByTagName('label')[0];
    const span = div.getElementsByTagName('span')[0];
    const input = div.getElementsByTagName('input')[0];
    const button = div.getElementsByTagName('button')[0];

    label.classList.add('custom-focus');
    input.style.borderBottom = '2px solid #8c92ac';
    button.style.borderBottom = '2px solid #8c92ac';
    span.style.display = 'block';
    span.style.color = 'red';
};

const handleBlurConfirmPassword = (divId) => {
    const div = document.getElementById(divId);
    const input = div.getElementsByTagName('input')[0];
    const label = div.getElementsByTagName('label')[0];
    const button = div.getElementsByTagName('button')[0];

    if (input.value.trim() === '') {
        label.classList.remove('custom-focus');
    }
    if (input.value === newPasswordInput.newPassword && input.value.trim() !== '') {
        input.style.borderBottom = '2px solid green';
        button.style.borderBottom = '2px solid green';
    } else {
        input.style.borderBottom = '2px solid red';
        button.style.borderBottom = '2px solid red';
    }
};

const handleBlurPassword = (divId) => {
    const div = document.getElementById(divId);
    const input = div.getElementsByTagName('input')[0];
    const label = div.getElementsByTagName('label')[0];
    const button = div.getElementsByTagName('button')[0];

    if (input.value.trim() === '') {
        label.classList.remove('custom-focus');
    }
    // check if the password is valid
    const reqs = passwordRequirements.filter((req) => req.regex.test(input.value));
    if (reqs.length === passwordRequirements.length) {
        input.style.borderBottom = '2px solid green';
        button.style.borderBottom = '2px solid green';
    } else {
        input.style.borderBottom = '2px solid red';
        button.style.borderBottom = '2px solid red';
    }
};

/**
 * Watchers for password and confirm password inputs
 */
watch(
    () => newPasswordInput.newPassword,
    (newPassword) => {
        const metRequirements = passwordRequirements.filter((req) => req.regex.test(newPassword));
        metRequirements.forEach((req) => {
            const paragraph = document.getElementById(req.id);
            paragraph.style.color = 'green';
            const oldIcon = paragraph.getElementsByTagName('i')[0];
            const newIcon = document.createElement('i');
            newIcon.classList.add('bi', 'bi-check-lg');
            newIcon.id = 'succes-icon';
            paragraph.replaceChild(newIcon, oldIcon);
        });
        const unmetRequirements = passwordRequirements.filter(
            (req) => !req.regex.test(newPassword)
        );
        unmetRequirements.forEach((req) => {
            const paragraph = document.getElementById(req.id);
            paragraph.style.color = 'red';
            const oldIcon = paragraph.getElementsByTagName('i')[0];
            const newIcon = document.createElement('i');
            newIcon.classList.add('bi', 'bi-x-lg');
            newIcon.id = 'error-icon';
            paragraph.replaceChild(newIcon, oldIcon);
        });
    }
);

watch(
    () => newPasswordInput.newPasswordConfirm,
    (newPassword) => {
        const span = document.getElementById('confirm-sp');
        if (newPassword === newPasswordInput.newPassword && newPassword.trim() !== '') {
            span.style.color = 'green';
            const oldIcon = span.getElementsByTagName('i')[0];
            const newIcon = document.createElement('i');
            newIcon.classList.add('bi', 'bi-check-lg');
            newIcon.id = 'succes-icon';
            span.replaceChild(newIcon, oldIcon);
        } else {
            span.style.color = 'red';
            const oldIcon = span.getElementsByTagName('i')[0];
            const newIcon = document.createElement('i');
            newIcon.classList.add('bi', 'bi-x-lg');
            newIcon.id = 'error-icon';
            span.replaceChild(newIcon, oldIcon);
        }
    }
);
</script>

<style scoped>
#submit-reset-pwd {
    border-color: #6877f4;
    color: #6877f4;
    letter-spacing: 44%;
}

#submit-reset-pwd:hover {
    background: radial-gradient(
        circle at 4.3% 10.7%,
        rgb(138, 118, 249) 13.6%,
        rgb(75, 252, 149) 100.7%
    );
    color: white;
}

.background {
    background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
}

.white-background {
    background: #ececec;
}

.pwd-req {
    color: red;
    font-size: 0.8rem;
    margin-bottom: 0px;
    display: none;
}

label {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, 4px, 0px);
    font-size: medium;
    z-index: 1;
}

form > div > span.error {
    display: none;
    font-size: 0.8em;
}

.custom-focus {
    position: absolute;
    transition: all 0.2s ease-in-out 0s;
    transform: translate3d(1px, -12px, 0px);
    font-size: 0.77rem;
    z-index: 1;
}
</style>
