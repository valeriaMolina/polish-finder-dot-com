<template>
  <div class="d-flex flex-column align-items-center px-3 py-5" id="main-login-div">
    <div class="pt-2">
      <form id="form-login" class="border shadow rounded px-3 py-4">
        <div class="my-3 px-5 text-center">
          <h2>Welcome Back!</h2>
          <h3>&#128133;</h3>
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="inputUsername" class="form-label custom-label-size">Username</label>
          <input
            type="username"
            class="custom-input"
            id="inputUsername"
            placeholder="Username or Email"
          />
        </div>
        <div class="d-flex flex-column mb-3 mx-2">
          <label for="inputPswd" class="form-label custom-label-size">Password</label>
          <input type="password" class="custom-input" placeholder="Password" />
          <div class="text-end">
            <p class="p-padding"><a class="custom-label-size" href="">I forgot my password</a></p>
          </div>
        </div>
        <div class="mb-3 form-check mx-2">
          <input type="checkbox" class="form-check-input" id="checkRememberUser" />
          <label for="checkRememberUser" class="form-check-label">Remember me on this device</label>
        </div>
        <div class="d-flex justify-content-center mx-2">
          <button type="submit" class="btn mb-3 w-100" id="btn-login-colorful">Sign In</button>
        </div>
        <div class="mx-2">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.p-padding {
  padding-top: 5px;
}

.custom-label-size {
  font-size: 14px;
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

#main-login-div {
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

#form-login {
  background-color: #ececec;
}
</style>
