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
                    <h5>Your Submission Is Already Pending Review!</h5>
                </div>
                <div class="modal-body">
                    <p>
                        It looks like a submission already exists and it's currently pending review
                        by our moderators. Thank you for your enthusiasm and effort to contribute to
                        the community!
                    </p>
                    <p>
                        Once approved, the entry will appear on the database. If you have additional
                        details to share, feel free to reach out to us!
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
import { Modal } from 'bootstrap';
import { onMounted, onUnmounted, ref } from 'vue';

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
