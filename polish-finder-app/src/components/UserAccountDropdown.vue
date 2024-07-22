<template>
  <div class="dropdown">
    <button
      type="button"
      class="btn btn-primary dropdown-toggle rounded-pill"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      <i class="bi bi-person"></i>
      {{ userName }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <router-link to="/account" v-slot="{ account }">
          <button type="button" class="dropdown-item" @click="account">
            <i class="bi me-2 bi-person-circle"></i>My Account
          </button>
        </router-link>
      </li>
      <li>
        <button class="dropdown-item">
          <i class="bi me-2 bi-chat-square-heart"></i>My Wishlist
        </button>
      </li>
      <li>
        <button class="dropdown-item"><i class="bi me-2 bi-collection"></i>My Collection</button>
      </li>
      <li>
        <button class="dropdown-item">
          <i class="bi me-2 bi-patch-plus-fill"></i>My Submissions
        </button>
      </li>
      <li>
        <button class="dropdown-item"><i class="bi me-2 bi-gear-fill"></i>Settings</button>
      </li>
      <li>
        <button class="dropdown-item"><i class="bi me-2 bi-box-arrow-left"></i>Sign Out</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: { type: String, required: true }
})
</script>

<style scoped>
.usr-btn {
  text-decoration: none;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>
