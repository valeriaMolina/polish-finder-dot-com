<template>
  <div id="main-footer" class="border-top">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-2">
      <div class="col-md-4 d-flex align-items-center">
        <span class="mb-3 mb-md-0 text-body-secondary">Created by Valeria Molina</span>
      </div>
      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a :href="discordLink">
            <DiscordIcon class="bi" width="24" height="24" />
          </a>
        </li>
        <li class="ms-3">GitHub</li>
        <li class="ms-3">Kofi</li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import DiscordIcon from '../assets/discord-mark-blue.svg'
const discordLink = import.meta.env.VITE_DISCORD_INVITE_LINK
</script>
