<template>
  <div class="d-flex flex-column align-items-center px-3 py-5">
    <div class="pt-2">
      <form class="border shadow rounded px-1 py-4">
        <div class="my-3 px-5 text-center">
          <h2>Create an Account</h2>
          <h5>Sign up to make contributions and save your favorite polishes.</h5>
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="inputEmail" class="form-label">Email</label>
          <input type="text" placeholder="Email" id="input-email" />
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="input-username" class="form-label">Username</label>
          <input type="text" name="" id="input-username" class="" placeholder="Username" />
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="input-pwd" class="form-label">Password</label>
          <input type="password" id="input-pwd" placeholder="Password" />
        </div>
        <div class="d-flex justify-content-center mx-2">
          <button type="submit" class="btn mb-3 w-100">Create Account</button>
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
