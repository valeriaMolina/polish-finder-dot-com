<template>
    <div class="container-fluid">
        <AdminNav activeLink="admin"></AdminNav>
        <div class="border rounded px-3 py-3 mx-1 my-3">
            <h4>Dashboard</h4>
            <p>
                Welcome to the admin dashboard. Here you can manage user feedback, role assignments,
                and submissions.
            </p>
        </div>
    </div>
</template>

<script setup>
import AdminNav from '@/components/admin-components/AdminNav.vue';
</script>
