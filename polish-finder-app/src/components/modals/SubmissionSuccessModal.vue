<template>
    <div
        class="modal fade"
        tabindex="-1"
        aria-hidden="true"
        ref="modalObj"
        data-bs-backdrop="static"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">&#127881; Submission Received!</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <p>Thank you for sharing your polish passion! &#128133; &#10024;</p>
                    <p>Your submission has been successfully sent and is now pending review.</p>
                    <p>
                        Our team will take a look to make sure everything’s just right before it
                        goes live. You can check the status of your submission anytime on your
                        account’s
                        <router-link to="/submissions">submissions</router-link> page. You’ll be
                        notified via email as soon as it’s approved!
                    </p>
                </div>
                <div class="modal-footer">
                    <button id="close" type="button" class="rounded" data-bs-dismiss="modal">
                        Okay
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Modal } from 'bootstrap';

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
</script>

<style scoped>
#close {
    color: #212529;
    border-color: #212529;
    padding: 0.25em 0.75em;
    background: #caffbf;
    position: relative;
    cursor: pointer;
    display: block;
}

#close:hover {
    background: #adff9d;
}
</style>
