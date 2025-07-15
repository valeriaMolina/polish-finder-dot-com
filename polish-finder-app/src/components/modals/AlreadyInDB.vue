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
                    <h5>This Entry Already Exists in Our Database!</h5>
                </div>
                <div class="modal-body">
                    <p>It seems that this is already part of our collection.</p>
                    <p>
                        Feel free to explore the database to discover similar polishes or contribute
                        something new. Your efforts help make Polish Finder even better!
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
