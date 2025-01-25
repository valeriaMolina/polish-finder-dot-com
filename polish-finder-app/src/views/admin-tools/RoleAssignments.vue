<template>
    <div class="mx-2 my-2">
        <AdminNav activeLink="roles"></AdminNav>
        <div class="border rounded px-3 py-3 mx-1 my-3">
            <h4>Users</h4>
            <p>Here you can manage users and their permissions.</p>
        </div>
        <div id="modal"></div>
        <UpdateRoleModal
            ref="activeUpdateRoleWindow"
            :availableRoles="allRoles"
            :username="selectedUsername"
            :currentRole="currentRole"
            :currentRoleId="currentRoleId"
        ></UpdateRoleModal>
        <div class="my-3">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">User Role ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-for="userRole in userRoles" :key="userRole.user_role_id">
                    <tr>
                        <th scope="row">{{ userRole.user_role_id }}</th>
                        <td>{{ userRole.user.username }}</td>
                        <td>{{ userRole.user.email }}</td>
                        <td>{{ userRole.role.name }}</td>

                        <td>
                            <button
                                class="btn btn-primary"
                                @click.prevent="openUpdateRoleModal(userRole)"
                            >
                                Edit role
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue';
import UpdateRoleModal from '@/components/modals/UpdateRoleModal.vue';
import { fetchAllRoles, fetchAllUserRoles } from '@/apis/rolesAPI';
import { onMounted, ref, reactive } from 'vue';

const allRoles = ref([]);
const userRoles = ref([]);
const selectedUsername = ref('');
const currentRole = ref('');
const currentRoleId = ref(0);
let activeUpdateRoleWindow = ref(null);

onMounted(async () => {
    allRoles.value = await fetchAllRoles();
    userRoles.value = await fetchAllUserRoles();
});
const openUpdateRoleModal = (user) => {
    selectedUsername.value = user.user.username;
    currentRole.value = user.role.name;
    currentRoleId.value = user.role_id;
    activeUpdateRoleWindow.value.show();
};
</script>
