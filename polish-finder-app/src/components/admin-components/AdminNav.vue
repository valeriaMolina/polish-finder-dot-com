<template>
    <div>
        <h1 class="text-center">Admin Tools</h1>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <router-link id="admin" class="nav-link" to="/admin"
                    ><i class="bi bi-house-heart"></i
                ></router-link>
            </li>
            <li class="nav-item">
                <router-link id="database" class="nav-link" to="/admin/db">Database</router-link>
            </li>
            <li class="nav-item">
                <router-link id="roles" class="nav-link" to="/admin/roles"
                    >Users & Roles</router-link
                >
            </li>
            <li class="nav-item dropdown">
                <a
                    href="#"
                    class="nav-link dropdown-toggle"
                    id="submissions"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                    >Submissions</a
                >
                <ul class="dropdown-menu">
                    <li>
                        <router-link class="dropdown-item" to="/admin/submissions/brands"
                            >Brands</router-link
                        >
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/admin/submissions/dupes"
                            >Dupes</router-link
                        >
                    </li>
                    <li>
                        <router-link class="dropdown-item" to="/admin/submissions/polish"
                            >Polish</router-link
                        >
                    </li>
                </ul>
            </li>
            <li class="nav-items">
                <router-link id="feedback" class="nav-link" to="/admin/feedback"
                    >User feedback</router-link
                >
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    // based on the props, set the active link
    document.getElementById(props.activeLink).classList.add('active');
});

const props = defineProps({
    activeLink: {
        type: String,
        required: true,
    },
});
</script>
