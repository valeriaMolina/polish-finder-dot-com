<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import navigation from './components/Navigation.vue';
import foot from './components/Foot.vue';
import { Popover } from 'bootstrap';

onMounted(() => {
    // Initialize Bootstrap Popover Component
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach((e) => {
        new Popover(e);
    });
});
</script>

<template>
    <div class="app">
        <div id="content-wrapper">
            <navigation></navigation>
            <router-view></router-view>
        </div>

        <foot id="main-footer"></foot>
    </div>
</template>

<style scoped>
#content-wrapper {
    flex: 1;
    /* This makes sure that the content wrapper expands to fill the available space,
     pushing the footer to the bottom of the viewport if the content is short. */
}

#main-footer {
    /* Your existing footer styles */
    align-items: center;
    position: relative; /* Changed from fixed to relative */
    width: 100%;
    padding-left: 2%;
    padding-right: 2%;
    background-color: #f8f9fa;
}
</style>
