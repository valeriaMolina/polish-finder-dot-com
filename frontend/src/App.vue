<script setup>
import IconComponent from './assets/logo.svg';
</script>

<template>
  <div class="header">
    <div id="main-header" class="main-header">
      <div class="container">
        <div class="logo">
          <a href="index.html"> <IconComponent></IconComponent></a>
        </div>
        <div class="menu">
          <nav>
            <ul id="navigation">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="#">Explore</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Sign In</a>
              </li>
              <li>
                <a href="#">Contribute</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <div class="main-area">
    <div class="container">
      <h3>What polish are you looking for today?</h3>
    </div>
    <div class="search">
      <form action="#">
        <input type="text" placeholder="Search for a polish" />
        <div class="search-button">
          <button class="main-search-button">Search</button>
        </div>
      </form>
    </div>
  </div>
</template>
