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
      <li><button class="dropdown-item">My Account</button></li>
      <li><button class="dropdown-item">My Wishlist</button></li>
      <li><button class="dropdown-item">My Collection</button></li>
      <li><button class="dropdown-item">My Submissions</button></li>
      <li><button class="dropdown-item">Settings</button></li>
      <li><button class="dropdown-item">Sign Out</button></li>
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
  cursor: pointer;
}
</style>
