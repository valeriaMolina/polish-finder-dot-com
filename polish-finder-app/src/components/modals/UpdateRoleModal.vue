<template>
    <div
        class="modal fade"
        id="role-update"
        tabindex="-1"
        aria-hidden="true"
        ref="modalObj"
        data-bs-backdrop="static"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Update role assignment</h5>
                    <button
                        type="button"
                        class="rounded btn-close"
                        aria-label="close"
                        data-bs-dismiss="modal"
                        @click.prevent="clear"
                    ></button>
                </div>
                <div class="modal-body">
                    <p>
                        Selected role: <b>{{ props.currentRole }}</b>
                    </p>
                    <p>
                        Assign access to: <b>{{ props.username }}</b>
                    </p>
                    <p>Select the new role:</p>
                    <div v-for="role in props.availableRoles" :key="role.role_id">
                        <div class="form-check">
                            <input
                                type="radio"
                                class="form-check-input"
                                name="roleAssign"
                                :id="role.role_id"
                                :value="role.role_id"
                                v-model="newRoleId"
                                :checked="checkCurrentRole(role.role_id)"
                            />
                            <label :for="role.role_id" class="form-check-label">{{
                                role.name
                            }}</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        :disabled="!newRoleId || newRoleId === props.currentRoleId"
                        class="btn btn-danger"
                        @click="assignRole()"
                    >
                        Assign
                    </button>

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancel
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
let newRoleId = ref(null);

const props = defineProps({
    availableRoles: { type: Array, required: false },
    username: { type: String, required: true },
    currentRole: { type: String, required: true },
    currentRoleId: { type: Number, required: true },
});

onMounted(() => {
    thisModal = new Modal(modalObj.value);
});

const clear = () => {
    newRoleId.value = null;
};

function _show() {
    thisModal.show();
}

function checkCurrentRole(selectedRole) {
    if (!newRoleId.value) {
        if (selectedRole == props.currentRoleId) {
            return true;
        }
    }
    return selectedRole == newRoleId.value;
}

defineExpose({ show: _show });

const assignRole = () => {
    // Logic to update the role assignment
    console.log('Updating role assignment...');
};
</script>
