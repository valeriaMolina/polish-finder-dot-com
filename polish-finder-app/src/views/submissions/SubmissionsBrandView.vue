<template>
  <div id="main-div-brand-submit" class="d-flex flex-column align-items-center px-3 py-5">
    <Modal ref="thisModal"></Modal>
    <div class="pt-2">
      <form
        id="form-register"
        class="border shadow rounded px-1 py-4"
        novalidate
        @submit.prevent="submit"
      >
        <div class="my-3 px-5 text-center">
          <h2>Submit a new brand</h2>
        </div>
        <div class="my-4 px-4">
          <h4>Submission Guidelines</h4>
          <p>Before submitting a new brand, please make sure:</p>
          <ul>
            <li>
              The brand is not already in our database. You can search for existing
              <router-link to="/brands">here</router-link>.
            </li>
            <li>
              You provide as much information as possible to help us accurately add the brand.
            </li>
          </ul>
        </div>
        <div class="d-flex flex-column mb-3 mx-2" id="brand-name-div">
          <label for="brand-name" class="form-label custom-label-size" id="brand-name-label"
            >Brand Name</label
          >
          <input
            type="text"
            class="custom-input"
            id="brand-name"
            v-model="newBrand.brandName"
            @focus="focus('brand-name-div')"
            @blur="blur('brand-name-div')"
            required
          />
          <small>Enter the full name of the brand</small>
        </div>
        <div class="d-flex flex-column mb-3 mx-2" id="brand-url-div">
          <label for="url-input" class="form-label custom-label-size" id="brand-url-label"
            >Brand URL</label
          >
          <input
            type="url"
            class="custom-input"
            id="url-input"
            v-model="newBrand.brandUrl"
            @focus="focus('brand-url-div')"
            @blur="blur('brand-url-div')"
            required
          />
          <small>Provide the official website URL of the brand (if available)</small>
        </div>
        <div class="d-flex justify-content-center mx-2">
          <button id="button-submit" type="submit" class="btn mb-3 w-50">Submit Brand</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Modal from '@/components/Modal.vue'

onMounted(() => {
  // check if there is a user logged in
  const button = document.getElementById('button-submit')
  if (!authStore.getIsLoggedIn) {
    showModal()
    button.disabled = true
  }
})

const authStore = useAuthStore()

let thisModal = ref(null)

function showModal() {
  thisModal.value.show()
}

const newBrand = reactive({
  brandName: ref(''),
  brandUrl: ref('')
})

const focus = (divId) => {
  const div = document.getElementById(divId)
  const label = div.getElementsByTagName('label')[0]
  const input = div.getElementsByTagName('input')[0]
  input.style.borderBottom = '2px solid #212529'
  label.classList.add('custom-focus')
}

const blur = (divId) => {
  const div = document.getElementById(divId)
  const label = div.getElementsByTagName('label')[0]
  const input = div.getElementsByTagName('input')[0]
  const span = div.getElementsByTagName('small')[0]
  // check for input
  if (input.value.trim() === '') {
    label.classList.remove('custom-focus')
  }
  // check the validity of the input
  if (!input.checkValidity()) {
    input.style.borderBottom = '2px solid red'
    span.style.color = 'red'
  } else {
    input.style.borderBottom = '2px solid green'
    span.style.color = 'green'
  }
}

// event handler for form submission
const submit = async () => {
  try {
    // validate that brandName is not empty
    console.log('submitting...')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
label {
  position: absolute;
  transition: all 0.2s ease-in-out 0s;
  transform: translate3d(1px, 4px, 0px);
  font-size: medium;
  z-index: 1;
}
#main-div-brand-submit {
  background: linear-gradient(
    76.5deg,
    rgb(129, 252, 255) 0.4%,
    rgb(255, 175, 207) 49.8%,
    rgb(255, 208, 153) 98.6%
  );
}

#button-submit {
  color: #212529;
  border-color: #212529;
  padding: 0.25em 0.75em;
  background: #bdffe7;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 2px;
  position: relative;
  cursor: pointer;
  display: block;
}

#button-submit:hover {
  background: #9dffdb;
}

#form-register {
  background-color: #ececec;
  color: black;
}

#override-btn:active {
  border-color: #a0c4ff;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
}

.custom-input {
  padding-bottom: 10px;
  border: none;
  outline: none;
  border-bottom: 2px solid #c0c0c0;
  background-color: #ececec;
}
.custom-input:focus {
  border-bottom: 2px solid #8c92ac;
}

.custom-focus {
  position: absolute;
  transition: all 0.2s ease-in-out 0s;
  transform: translate3d(1px, -12px, 0px);
  font-size: 0.77rem;
  z-index: 1;
}
</style>
