<template>
  <nav class="navbar navbar-expand-lg navbar-special-bg">
    <div class="container-fluid">
      <a class="button-54 navbar-brand" href="/">Polish Finder</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active apply-font" aria-current="page" to="/about"
              >About
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <button
              class="nav-link dropdown-toggle apply-font"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Explore
            </button>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/brands">Brands</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/polishes">Polishes</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/search/dupes">Dupes</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <button
              class="nav-link dropdown-toggle apply-font"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Contribute
            </button>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/contribute/new/brand"
                  >Submit a brand</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/contribute/new/polish"
                  >Add polishes</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/">Submit feedback</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div v-if="isLoggedIn">
          <UserAccountDropdown></UserAccountDropdown>
        </div>
        <div v-else>
          <router-link to="/register" v-slot="{ register }"
            ><button class="button-54 btn-color-register mx-2" type="button" @click="register">
              Register
            </button></router-link
          >
          <router-link to="/login" v-slot="{ navigate }">
            <button class="button-54 btn-color-login mx-2" type="button" @click="navigate">
              Sign In
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import UserAccountDropdown from '../components/UserAccountDropdown.vue'

// reactivity setup
const isLoggedIn = computed(() => useAuthStore().isLoggedIn)
</script>

<style>
/* CSS */
.button-54 {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow:
    1px 1px 0px 0px,
    2px 2px 0px 0px,
    3px 3px 0px 0px,
    4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  background: #f3c17c;
  transition: background 0.2s ease-in-out;
}

.button-54:hover {
  background: #f0ad4f;
}

.button-54:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

@media (min-width: 768px) {
  .button-54 {
    padding: 0.25em 0.75em;
  }
}

.btn-color-register {
  background: #ffc6ff;
}
.btn-color-register:hover {
  background: #f4a0fa;
}

.btn-color-login {
  background: #caffbf;
}
.btn-color-login:hover {
  background: #99fa84;
}

.apply-font {
  font-family: 'Open Sans', sans-serif;
  text-transform: uppercase;
}
</style>
