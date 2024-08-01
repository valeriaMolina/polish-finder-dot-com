<template>
  <div class="dropdown">
    <button
      type="button"
      class="dropdown-toggle button-54"
      id="user-button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      data-bs-auto-close="outside"
    >
      <i class="bi bi-emoji-smile"></i>
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
        <router-link to="/wishlist" v-slot="{ wishlist }">
          <button class="dropdown-item" @click="wishlist">
            <i class="bi me-2 bi-chat-square-heart"></i>My Wishlist
          </button>
        </router-link>
      </li>
      <li>
        <router-link to="/my-collection" v-slot="{ collection }">
          <button class="dropdown-item" @click="collection">
            <i class="bi me-2 bi-collection"></i>My Collection
          </button>
        </router-link>
      </li>
      <li>
        <router-link to="/submissions" v-slot="{ submissions }">
          <button class="dropdown-item">
            <i class="bi me-2 bi-patch-plus-fill" @click="submissions"></i>My Submissions
          </button>
        </router-link>
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
#user-button {
  background-color: #90e0ef;
  text-transform: lowercase;
}

#user-button:hover {
  background-color: #69c0ea;
}

.usr-btn {
  text-decoration: none;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>
