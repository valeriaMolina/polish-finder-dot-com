<template>
    <div class="background">
        <div class="container py-5">
            <div class="px-4 py-4 shadow rounded white-background">
                <div>
                    <h2 class="text-center">Verify your email to continue using Polish Finder</h2>
                </div>
                <div class="text-start">
                    <p>
                        Before you can start exploring and sharing your favorite nail polishes, we
                        need you to verify your email address.
                    </p>
                    <p>
                        We have sent a verification link to your email. Please click the link in the
                        email to confirm your email address and activate your acount.
                    </p>
                    <p>
                        If you haven't received the email, please check your spam folder or junk
                        folder. If it's still missing, you can request a new verification email
                        using the button below.
                    </p>
                </div>
                <div class="text-center">
                    <router-link
                        to="/resend-verification"
                        class="btn mb-3 w-50"
                        id="colorful-button"
                        >Get new verification link</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.white-background {
    background-color: white;
}

#colorful-button {
    color: #6877f4;
    background: white;
    border-color: #6877f4;
}

#colorful-button:hover {
    border-color: transparent;
    color: white;
    border-color: transparent;
    background: linear-gradient(-225deg, #ff057c 0%, #7c64d5 48%, #4cc3ff 100%);
}

#colorful-button:active {
    border-color: #6050dc;
    background: white;
    color: #6050dc;
}
</style>
