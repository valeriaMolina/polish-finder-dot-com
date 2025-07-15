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
                    <h5 class="modal-title" id="exampleModalLabel">
                        <i class="bi bi-exclamation-triangle"></i> Oops! Something went wrong
                    </h5>
                </div>
                <div class="modal-body">
                    <p>We encountered an issue processing your request. Please try again later.</p>
                    <p>
                        If the problem persists, feel free to reach out to our support team—we’re
                        here to help!
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
