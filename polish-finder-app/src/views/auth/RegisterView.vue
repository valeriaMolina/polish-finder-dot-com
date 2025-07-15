<template>
    <div id="main-register-div" class="d-flex flex-column align-items-center px-3 py-5">
        <div class="pt-2">
            <form
                id="form-register"
                class="border shadow rounded px-1 py-4"
                novalidate
                @submit.prevent="submit"
            >
                <div class="my-3 px-5 text-center">
                    <h2>Create an Account</h2>
                    <h5>Sign up to make contributions and save your favorite polishes.</h5>
                </div>
                <div class="d-flex flex-column mb-3 mx-2" id="email-div">
                    <label for="input-email" class="form-label custom-label-size" id="email-label"
                        >Email</label
                    >
                    <input
                        v-model="userInput.email"
                        type="email"
                        placeholder=" "
                        id="input-email"
                        class="custom-input"
                        @focus="handleFocus('email-div')"
                        @blur="handleBlur('email-div')"
                        required
                    />

                    <span id="span-email" class="error"></span>
                </div>
                <div class="d-flex flex-column mb-3 mx-2 has-validation" id="username-div">
                    <label for="input-username" class="form-label custom-label-size" id="usr-label"
                        >Username</label
                    >
                    <input
                        v-model="userInput.username"
                        pattern=".{3,}"
                        type="text"
                        name=""
                        id="input-username"
                        class="custom-input"
                        placeholder=" "
                        required
                        @focus="handleFocus('username-div')"
                        @blur="handleBlur('username-div')"
                    />

                    <span id="span-user" class="error"></span>
                </div>
                <div class="d-flex flex-column mb-3 mx-2" id="pwd-div">
                    <label for="input-pwd" class="form-label custom-label-size" id="pwd-label"
                        >Password</label
                    >
                    <div class="d-flex">
                        <input
                            v-model="userInput.password"
                            :type="togglePasswordVisibility"
                            id="input-pwd"
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
                        id="confirm-pwd-label"
                        for="input-pwd-confirm"
                        class="form-label custom-label-size"
                        >Confirm password</label
                    >
                    <div class="d-flex">
                        <input
                            v-model="userInput.confirmPassword"
                            :type="toggleConfirmPasswordVisibility"
                            id="input-pwd-confirm"
                            class="custom-input flex-fill"
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
                    <button id="btn-register-colorful" class="rounded w-50" type="submit">
                        Create Account
                    </button>
                </div>
                <div class="mx-2">
                    <p>Already have an account? <router-link to="/login">Log In</router-link></p>
                </div>
                <div class="mx-2">
                    <p>By clicking "Create account", I accept the Terms of Service</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import * as yup from 'yup';

const userInput = reactive({
    username: ref(''),
    email: ref(''),
    password: ref(''),
    confirmPassword: ref(''),
});

const toggleConfirmPasswordVisibility = ref('password');
const togglePasswordVisibility = ref('password');

const toggleConfirmPasswordVisibilityIcon = ref('bi bi-eye-slash');
const togglePasswordVisibilityIcon = ref('bi bi-eye-slash');

const errorMessages = (input) => {
    // get the id of the input field
    const id = input.id;
    if (id === 'input-email') {
        if (input.value.trim() === '') {
            return 'Email is required';
        } else {
            return 'Please enter a valid email address';
        }
    }
    if (id === 'input-username') {
        if (input.value.trim() === '') {
            return 'Username is required';
        } else {
            return 'Username must be at least 3 characters long';
        }
    }

    if (id === 'input-pwd-confirm') {
        if (input.value.trim() === '') {
            return 'Please re-enter your password';
        } else {
            return 'Passwords must match';
        }
    }
};

let registerSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    passwordConfirm: yup.string().oneOf([ref('password'), null], 'Passwords must match'),
});

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

// event handler for form submission
const submit = async () => {
    try {
        console.log(userInput);
        registerSchema.validateSync(userInput);
    } catch (error) {
        console.error(error.message);
        console.error('Bad input');
    }
};

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

/**
 * FOCUS AND BLUR EVENT HANDLERS
 */
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
        const text = errorMessages(input);
        span.textContent = text;
    } else {
        input.style.borderBottom = '2px solid green';
        span.style.display = 'none';
    }
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
    if (input.value === userInput.password && input.value.trim() !== '') {
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
 * Watches the password field and updates the requirements icons accordingly.
 */
watch(
    () => userInput.password,
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
    () => userInput.confirmPassword,
    (newPassword) => {
        const span = document.getElementById('confirm-sp');
        if (newPassword === userInput.password && newPassword.trim() !== '') {
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

<style>
#main-register-div {
    background: linear-gradient(90deg, #b566e9 0%, #adf499 50%, #fcb045 100%);
}

#form-register {
    background-color: #ececec;
}

#btn-register-colorful {
    color: #212529;
    border-color: #212529;
    padding: 0.25em 0.75em;
    background: #ffbde9;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 2px;
    position: relative;
    cursor: pointer;
    display: block;
}

#btn-register-colorful:hover {
    background: #ff9dde;
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
</style>
