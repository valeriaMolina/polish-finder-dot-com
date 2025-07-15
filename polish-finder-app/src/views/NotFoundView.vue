<template>
    <div class="d-flex flex-column align-items-center px-3 py-5 background-div">
        <div class="border shadow rounded container py-5 notfound white-bg">
            <h1>Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <router-link class="button-54 mx-2 btn-color" to="/">Home</router-link>
        </div>
    </div>
</template>

<style scoped>
.notfound {
    text-align: center;
}

.btn-color {
    background-color: pink;
}

.white-bg {
    background-color: #ececec;
}

.background-div {
    background: linear-gradient(
        179.7deg,
        rgb(248, 126, 126) -0.5%,
        rgb(251, 206, 143) 35.3%,
        rgb(184, 252, 233) 67.2%,
        rgb(118, 162, 229) 92.3%
    );
}
</style>
