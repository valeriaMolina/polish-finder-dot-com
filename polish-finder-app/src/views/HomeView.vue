<script setup></script>

<template>
    <div
        id="rainbow"
        class="d-flex flex-column align-items-center justify-content-center px-3 py-5"
    >
        <div class="d-flex flex-column align-items-center">
            <div class="my-auto text-center align-items-center align-middle">
                <h1>Find your perfect nail polish &#128133;</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
#rainbow {
    background: radial-gradient(
        circle at 10% 20%,
        rgb(222, 168, 248) 0%,
        rgb(168, 222, 248) 21.8%,
        rgb(189, 250, 205) 35.6%,
        rgb(243, 250, 189) 52.9%,
        rgb(250, 227, 189) 66.8%,
        rgb(248, 172, 172) 90%,
        rgb(254, 211, 252) 99.7%
    );
    height: 40vh;
}

h1 {
    font-family: 'Open Sans', sans-serif;
    text-transform: capitalize;
}
</style>
