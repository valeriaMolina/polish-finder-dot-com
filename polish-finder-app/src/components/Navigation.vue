<template>
  <nav class="navbar navbar-expand-lg navbar-special-bg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Polish Finder</a>
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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/help">Help</a>
          </li>
          <li class="nav-item dropdown">
            <button
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Explore
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/brands">Brands</a></li>
              <li><a class="dropdown-item" href="/polishes">Polishes</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <button
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Contribute
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Submit a brand</a></li>
              <li><a class="dropdown-item" href="#">Add polishes</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <router-link to="/register" v-slot="{ register }"
            ><button
              id="register-btn"
              class="btn btn-outline-register mx-2"
              type="button"
              @click="register"
            >
              Register
            </button></router-link
          >

          <router-link to="/login" v-slot="{ navigate }">
            <button class="btn btn-outline-sign-in" type="button" @click="navigate">Sign In</button>
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
