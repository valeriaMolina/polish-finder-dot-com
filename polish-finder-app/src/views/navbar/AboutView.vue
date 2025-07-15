<template>
    <div class="about-page-background-gradient">
        <div class="container py-5">
            <div class="hero-section">
                <h1 class="main-header text-center py-3">About Polish Finder</h1>
            </div>
            <div class="px-4 py-4 about-page-text shadow rounded">
                <h3>Hey there, welcome!</h3>
                <p>
                    I'm so glad you're here! Nail Polish Finder is my passion project, created for
                    people who love nail polish just as much as I do. I know the struggle of
                    searching for that perfect shade or trying to find a close match to a
                    discontinued favorite. This website is all about making that search easier and
                    way more fun.
                </p>
                <h4>My Mission</h4>
                <p>
                    I want Polish Finder to be your go-to spot for all things nail polish. Here's
                    what you can do:
                </p>
                <ul>
                    <li>
                        Use the advanced search to find polishes based on brand, type, color, and
                        formula.
                    </li>
                    <li>
                        Save favorites to keep track of your favorite polishes in one convenient
                        place.
                    </li>
                    <li>Add new polishes and brands to the database to help the community grow.</li>
                </ul>
                <h4>The Journey</h4>
                <p>
                    This started as a project to combine my love for nail polish and my passion for
                    coding. I've coded everything from scratch, from the user-friendly interface to
                    the back-end that makes the search and recommendations work smoothly.
                </p>
                <h3>Cool Features</h3>
                <ul>
                    <li>
                        <span>Advanced Search <a href="/">></a>:</span>
                        Easily find nail polishes similar to the ones you love.
                    </li>
                    <li>
                        <span>User Submissions <a href="/">></a>:</span>
                        Help build the database by adding new polishes and brands.
                    </li>
                </ul>
                <h4>Join the Fun</h4>
                <p>
                    Your feedback and contributions will help me improve and expand Polish Finder,
                    making it the ultimate resource for nail polish enthusiasts everywhere.
                </p>
                <h4>Submit Feedback</h4>
                <p>
                    Your feedback is incredibly important to me. If you have any suggestions, ideas
                    for new features, or just want to share your thoughts on how to make Nail Polish
                    Finder better, please let me know! You can submit your feedback
                    <a href="/">here.</a>
                </p>
                <h4>Support the Project</h4>
                <p>
                    Keeping Polish Finder up and running comes with its costs, and I could really
                    use your help. If you enjoy using the site and would like to support its
                    continued development and hosting, please consider making a donation. Every
                    little bit helps and is greatly appreciated!
                </p>
                <a href="https://ko-fi.com/Q5Q510RQ2O" target="_blank"
                    ><button id="kofi-btn" class="btn rounded-pill shadow">
                        <img
                            src="/kofi-logo.webp"
                            class="px-1 h-logo img-fluid"
                            alt="Kofi Logo"
                        />Buy me a coffee
                    </button></a
                >
                <h4>Open Source and Contributions</h4>
                <p>
                    Polish Finder is an open source project, and I welcome contributions from the
                    community. If you're a developer and would like to contribute, check out the
                    project on GitHub. Whether it's fixing bugs, adding new features, or improving
                    documentation, your help is invaluable.
                </p>
                <!-- Place this tag where you want the button to render. -->
                <a href="https://github.com/valeriaMolina/polish-finder-dot-com"
                    ><button id="gh-btn" class="btn rounded-pill shadow">
                        <img
                            src="/github-mark-white.png"
                            alt="GitHub Logo"
                            class="px-1 img-fluid h-logo"
                        />View on GitHub
                    </button></a
                >
            </div>
        </div>
    </div>
</template>

<script setup>
const githubUrl = import.meta.env.VITE_GITHUB_REPO_URL;
</script>

<style scoped>
.about-page-text {
    background: white;
}

.about-page-background-gradient {
    background: linear-gradient(
        102.7deg,
        rgb(253, 218, 255) 8.2%,
        rgb(223, 173, 252) 19.6%,
        rgb(173, 205, 252) 36.8%,
        rgb(173, 252, 244) 73.2%,
        rgb(202, 248, 208) 90.9%
    );
}

span {
    font-weight: bold;
}

.h-logo {
    height: 25px;
    padding-bottom: 3px;
}

#gh-btn {
    background: #010409;
    color: white;
    padding: 1%;
}

#gh-btn:hover {
    background: #1e2023;
}

#kofi-btn {
    color: white;
    background: #29abe0;
    border: 0px;
    height: 36px;
}

#kofi-btn:hover {
    background: skyblue;
}
</style>
