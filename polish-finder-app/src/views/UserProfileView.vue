<template>
    <div class="bg-gradient-user-profile">
        <div class="container">
            <h1>Hi, {{ username }}!</h1>
            <p>Did you oil your cuticles today?</p>
        </div>
        <div class="m-2 bg-white shadow rounded row align-items-start">
            <div class="col-2">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a
                            href=""
                            class="nav-link active"
                            @click.prevent="setCurrentComponent('BasicUserInfo')"
                            aria-current="page"
                            >User Profile</a
                        >
                        <a
                            href="#"
                            class="nav-link"
                            @click.prevent="setCurrentComponent('AccountSettings')"
                            >Account Settings</a
                        >
                        <a
                            href="#"
                            class="nav-link"
                            @click.prevent="setCurrentComponent('DataManagement')"
                            >Privacy and Data Management</a
                        >
                        <a
                            href="#"
                            class="nav-link"
                            @click.prevent="setCurrentComponent('SupportAndFeedback')"
                            >Support and Feedback</a
                        >
                    </li>
                </ul>
            </div>
            <div class="col-10">
                <component :is="tabs[currentComponent]" class="tab" />
            </div>
        </div>
    </div>
</template>

<script setup>
import BasicUserInfo from '../components/BasicUserInfo.vue';
import AccountSettings from '../components/AccountSettings.vue';
import DataManagement from '../components/DataManagement.vue';
import SupportAndFeedback from '../components/SupportAndFeedback.vue';
import { ref } from 'vue';
/**
 * check the store for user details
 */
const username = 'Vale';

const currentComponent = ref('BasicUserInfo'); // default component to display

const tabs = {
    BasicUserInfo,
    AccountSettings,
    DataManagement,
    SupportAndFeedback,
};

// Function to change the current component that's being displayed
function setCurrentComponent(componentName) {
    currentComponent.value = componentName;
}
</script>

<style scoped>
.bg-gradient-user-profile {
    background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
}

.bg-white {
    background-color: white;
}

a:hover {
    text-decoration: underline;
}
</style>
