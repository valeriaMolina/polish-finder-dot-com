<template>
  <div class="d-flex flex-column align-items-center px-3 py-5 background">
    <div v-if="sent">
      <div class="pt-2">
        <div class="border shadow rounded px-3 py-4 white-background">
          <h2>Email sent!</h2>
          <p>
            If there is an account associated with the email address or username, you will receive a
            link to reset your password in your inbox.
          </p>
          <p>If you have not received an email, make sure you check your junk or spam folders.</p>
        </div>
      </div>
    </div>
    <div v-else class="pt-2">
      <form
        novalidate
        class="border shadow rounded px-3 py-4 white-background"
        @submit.prevent="submit"
      >
        <div>
          <h2>Need to reset your password?</h2>
          <p>Enter your username or email address to receive a link to change your password</p>
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="" class="form-label custom-label-size">Username or email address</label>
          <input type="text" class="custom-input" v-model="usernameOrEmail" required />
          <span :hidden="isValid" class="error-text">Username or email is required</span>
        </div>
        <div class="d-flex justify-content-center mx-2">
          <button class="btn mb-3 w-50 send-button" type="submit">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const usernameOrEmail = ref('')
const sent = ref(false)
const isValid = ref(true)

const submit = () => {
  // validate input
  if (!usernameOrEmail.value) {
    // display error message
    isValid.value = false
    return
  }
  // Perform password reset logic here
  console.log('Resetting password for', usernameOrEmail.value)
  sent.value = true // Set sent to true to display success message
}
</script>

<style scoped>
.error-text {
  color: red;
}

.send-button {
  border-color: #6877f4;
  color: #6877f4;
}
.send-button:hover {
  background-image: linear-gradient(
    to right,
    #eea2a2 0%,
    #bbc1bf 19%,
    #57c6e1 42%,
    #b49fda 79%,
    #7ac5d8 100%
  );
  border-color: #b49fda;
  color: white;
}
.background {
  background-image: linear-gradient(
    to right,
    #eea2a2 0%,
    #bbc1bf 19%,
    #57c6e1 42%,
    #b49fda 79%,
    #7ac5d8 100%
  );
}

.white-background {
  background: #ececec;
}
</style>
