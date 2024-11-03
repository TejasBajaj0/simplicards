<script>
    import { writable } from 'svelte/store'
    import { onMount } from 'svelte';

    let userID = 0;

</script>
<header>
    <nav>
        <ul>
            <li><a href="/">
                <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="frame1">
                        <rect id="Back" x="119.603" y="15" width="60" height="100" rx="5" transform="rotate(60 119.603 15)" fill="#3F3F3F"/>
                        <rect id="Rectangle3" x="81.2787" y="2" width="60" height="100" rx="5" transform="rotate(40 81.2787 2)" fill="#707070"/>
                        <rect id="Rectangle2" x="41.202" y="3" width="60" height="100" rx="5" transform="rotate(20 41.202 3)" fill="#C8C8C8"/>
                        <rect id="Front" x="3" y="17" width="60" height="100" rx="5" fill="white"/>
                    </g>
                </svg>
            </a></li>
            <li id="flashcardBTN"><a href="/catalog">Flashcards</a></li>
            <li id="signupRedir" class="loginsignup"><a href="/signup">Sign Up</a></li>
            <li id="loginRedir" class="loginsignup"><a href="/login">Log In</a></li>
        </ul>
    </nav>

    <div style="position: relative;">
        <h1>Welcome to Simplicards</h1>
        <h2 class="subtitle">Flashcards <u class="subtitle-underline">Simplified</u></h2>
        <div class="custom-shape-divider-bottom-1726447416">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
        </div>
    </div>
</header>

<style>
    /* Scoped styles (CSS from index.css) */
    * {
        overflow: hidden;
    }
    .loginsignup {
        float: right;
        background-color: black;
        border-radius: 50px;
        margin: 0 10px;
        margin-top: 5px;
        height: 60px;
    }

    .loginsignup:hover a {
        background-color: white;
        color: black;
        border-radius: 50px;
        height: 30px;
    }

    nav #flashcardBTN:hover {
        background-color: rgb(63, 63, 223);
        height: 100%;
        border-radius: 5px;
    }

    nav svg {
        width: 3em;
        height: 3em;
        transform: translate(10%, 0%);
    }

    rect {
        transform-origin: bottom right;
    }

    #Rectangle2 {
        transform: rotate(0deg) translateX(-38px) translateY(14px) scale(0);
    }

    #Rectangle3 {
        transform: rotate(0deg) translateX(-80px) translateY(14px) scale(0);
    }

    #Back {
        transform: rotate(0deg) translateX(-115px) translateY(0px) scale(0);
    }

    @keyframes fanOut2 {
        0% {
            transform: rotate(0deg) translateX(-38px) translateY(14px);
        }

        100% {
            transform: rotate(10deg) translateX(-38px) translateY(30px);
        }
    }

    @keyframes fanOut3 {
        0% {
            transform: rotate(0deg) translateX(-80px) translateY(14px);
        }

        100% {
            transform: rotate(20deg) translateX(-80px) translateY(45px);
        }
    }

    @keyframes fanOut4 {
        0% {
            transform: rotate(0deg) translateX(-115px) translateY(0px);
        }

        100% {
            transform: rotate(30deg) translateX(-115px) translateY(45px);
        }
    }

    #Back {
        animation: fanOut4 0.8s ease-out forwards;
        animation-delay: 1s;
    }

    #Rectangle3 {
        animation: fanOut3 0.8s ease-out forwards;
        animation-delay: 0.75s;
    }

    #Rectangle2 {
        animation: fanOut2 0.8s ease-out forwards;
        animation-delay: 0.5s;
    }

    header {
        background-image: linear-gradient(to bottom right, rgb(51, 51, 209), rgb(130,51,209));
    }

    header h1 {
        font-size: 5em;
        padding-top: 5%;
        padding-bottom: 5%;
    }

    header h2, u {
        color: black;
    }

    header h1, h2, u {
        font-family: 'Nerko One', cursive;
        text-align: center;
    }

    .subtitle {
        font-size: 2em;
        padding-bottom: 7em;
    }

    .subtitle-underline {
        text-decoration: underline;
        font-size: 1.5em;
    }

    .custom-shape-divider-bottom-1726447416 svg {
        position: relative;
        display: block;
        width: 120%;
        height: 66px;
        overflow: hidden;
        animation: waves 5s ease infinite;
    }

    .custom-shape-divider-bottom-1726447416 .shape-fill {
        fill: #161616;
        overflow: hidden;
    }

    @keyframes waves {
        0% {
            transform: translate(-10%, 0);
        }

        50% {
            transform: translate(0%, 5%);
        }

        100% {
            transform: translate(-10%, 0);
        }
    }
</style>

