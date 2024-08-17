<template>
  <div class="background-gradient">
    <div class="container py-5">
      <div class="px-4 py-4 shadow rounded white-bg">
        <div>
          <h2 class="text-center">Email Verification</h2>
        </div>

        <div class="text-center">
          <div v-if="isLoading">
            <div class="spinner-border" aria-hidden="true"></div>
            <p>Verifying your email...</p>
          </div>
          <div v-else-if="error">{{ error }}</div>
          <div v-else>
            <h4>Your email has been verified &#127881;</h4>
            <p>Please use the link below to sign in to your account.</p>
            <router-link to="/login" class="btn mb-3 w-25" id="btn-login-colorful"
              >Sign In</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const isLoading = ref(true)
const error = ref(null)
const route = useRoute()
const router = useRouter()

const verifyEmail = async (token) => {}

onMounted(() => {
  const verifyToken = route.query.token
  if (verifyToken) {
    console.log(verifyToken)
  } else {
    router.push('/')
  }
})
</script>

<style scoped>
.white-bg {
  background: white;
}

.background-gradient {
  background: linear-gradient(
    109.6deg,
    rgb(123, 90, 224) 11.2%,
    rgb(164, 46, 253) 32.6%,
    rgb(213, 56, 234) 62.7%,
    rgb(251, 138, 52) 100.2%
  );
}
</style>
