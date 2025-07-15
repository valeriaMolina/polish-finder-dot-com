<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';

const router = useRouter();
let modalObj = ref(null);
let thisModal = null;

onMounted(() => {
    thisModal = new Modal(modalObj.value);
});

onUnmounted(() => {
    thisModal.hide();
});

function _show() {
    thisModal.show();
}

defineExpose({ show: _show });

// button behavior
function redirectToLogin() {
    router.push('/login');
}
function redirectToRegister() {
    router.push('/register');
}
</script>

<template>
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby=""
        aria-hidden="true"
        ref="modalObj"
        data-bs-backdrop="static"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Log in to continue</h5>
                </div>
                <div class="modal-body">
                    <p>
                        We're excited to see you contribute to the Polish Finder community! To help
                        us maintain the quality of submissions, we require users to log in or create
                        an account to add new brands and polishes.
                    </p>
                    <p>If you already have an account, please log in to continue.</p>
                    <p>
                        New here? Sign up to join our community and start contributing to the
                        community.
                    </p>
                    <p>
                        By logging in, you will be able to keep track of your submissions,
                        favorites, and more!
                    </p>
                </div>
                <div class="modal-footer">
                    <button
                        data-bs-dismiss="modal"
                        class="rounded"
                        id="register"
                        @click.prevent="redirectToRegister"
                    >
                        Register
                    </button>
                    <button
                        data-bs-dismiss="modal"
                        class="rounded"
                        id="login"
                        @click.prevent="redirectToLogin"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#login {
    color: #212529;
    border-color: #212529;
    padding: 0.25em 0.75em;
    background: #caffbf;
    position: relative;
    cursor: pointer;
    display: block;
}

#login:hover {
    background: #adff9d;
}

#register {
    color: #212529;
    border-color: #212529;
    padding: 0.25em 0.75em;
    background: #ffc6ff;
    position: relative;
    cursor: pointer;
    display: block;
}

#register:hover {
    background: #ffa6ff;
}
</style>
