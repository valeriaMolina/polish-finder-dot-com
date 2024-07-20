<template>
  <div id="main-register-div" class="d-flex flex-column align-items-center px-3 py-5">
    <div class="pt-2">
      <form id="form-register" class="border shadow rounded px-1 py-4">
        <div class="my-3 px-5 text-center">
          <h2>Create an Account</h2>
          <h5>Sign up to make contributions and save your favorite polishes.</h5>
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="inputEmail" class="form-label custom-label-size">Email</label>
          <input type="text" placeholder="Email" id="input-email" class="custom-input" />
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="input-username" class="form-label custom-label-size">Username</label>
          <input
            type="text"
            name=""
            id="input-username"
            class="custom-input"
            placeholder="Username"
          />
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="input-pwd" class="form-label custom-label-size">Password</label>
          <input type="password" id="input-pwd" class="custom-input" placeholder="Password" />
        </div>
        <div class="d-flex justify-content-center mx-2">
          <button id="btn-register-colorful" type="submit" class="btn mb-3 w-100">
            Create Account
          </button>
        </div>
        <div class="mx-2">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
        <div class="mx-2">
          <p>By clicking "Create account" I accept the Terms of Service</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
#main-register-div {
  background: linear-gradient(90deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%);
}

#form-register {
  background-color: #ececec;
}
</style>
