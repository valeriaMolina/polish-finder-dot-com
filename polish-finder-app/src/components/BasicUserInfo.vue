<template>
    <div>
        <h1>User Information</h1>
        <div class="edit-profile form-group">
            <h3>Profile Settings</h3>
            <div class="row align-items-start p-2">
                <div class="nice-form-group py-1">
                    <label>Username</label>
                    <input disabled type="text" :value="userName" />
                </div>
                <div>
                    <button class="btn btn-outline-secondary">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// User data needs to be passed on via props to this component
// todo: add this logic

const userName = 'Vale';
const email = 'vale@example.com';
</script>
