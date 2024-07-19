<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
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
            <a class="nav-link active" aria-current="page" href="">Help</a>
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
              <li><a class="dropdown-item" href="#">Brands</a></li>
              <li><a class="dropdown-item" href="#">Polishes</a></li>
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
          <button class="btn btn-outline-success" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
