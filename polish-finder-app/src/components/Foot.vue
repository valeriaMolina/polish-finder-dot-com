<template>
    <div id="main-footer" class="border-top">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-2">
            <div class="text-body-secondary">
                <ul class="nav list-unstyled d-flex">
                    <li class="ms-2">About</li>
                    <li class="ms-2">Privacy Policy</li>
                    <li class="ms-2">Terms of service</li>
                    <li class="ms-2">Cookie policy</li>
                    <li class="ms-2">Help center</li>
                    <li class="ms-2">Contact</li>
                </ul>
            </div>
            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3">
                    <a :href="discordLink">
                        <DiscordIcon class="bi" width="24" height="24" />
                    </a>
                </li>
                <li class="ms-3">
                    <a :href="githubLink">
                        <GitHubIcon class="bi" width="24" height="24" />
                    </a>
                </li>
                <li class="ms-2">
                    <a :href="kofiLink"
                        ><img
                            class="bi logo"
                            src="../assets/Logo_white_stroke@2x.png"
                            alt="Kofi Logo"
                    /></a>
                </li>
            </ul>
        </footer>
        <hr />
        <div class="ms-2">
            <span class="mb-3 mb-md-0 text-body-secondary"
                ><i class="bi bi-c-circle"></i> Polish Finder by Valeria Molina. Made with ❤️ for
                the nail polish community.</span
            >
        </div>
    </div>
</template>

<script setup>
import DiscordIcon from '../assets/discord-mark-blue.svg';
import GitHubIcon from '../assets/github-mark.svg';
const discordLink = import.meta.env.VITE_DISCORD_INVITE_LINK;
const githubLink = import.meta.env.VITE_GITHUB_REPO_URL;
const kofiLink = import.meta.env.VITE_KOFI_LINK;
</script>

<style>
.logo {
    width: 34.86px;
    height: 24px;
}
</style>
