<script>
      import { initializeApp } from "firebase/app";
      import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
      import { userId, firebaseConfig } from '$lib/store'
      import { onMount } from "svelte";

      const firebaseApp = initializeApp(firebaseConfig);
      const auth = getAuth();
      let tempID;
      userId.subscribe( (val) => { tempID = val })

      onMount(() => {
        if (tempID) {
            window.location.href = "/catalog";
        }
      })

    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        if (localStorage?.getItem("userID")) {
            userId.set(localStorage.getItem("userID"));
        }
    }

    
    function syncLocalStorage() {
        localStorage?.setItem("userID", $userId)
    }

    let email;
    let password;
    let errorCode;

    function logIn() {
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            userId.set(user.uid);
            syncLocalStorage();
            changeWindow("/catalog");
        })
        .catch((error) => {
            alert("Error ", error);
        })
    }

    function changeWindow(changing) {
        window.location.href = changing;
    }
</script>

<main>
    <a href="/"><button id="back"><i class="fa-solid fa-rotate-left"></i>Back</button></a>
    <!-- <div id="warning-popup"><h3> {$errorCode} </h3></div>     -->
    <div id="signup">
        <h2>Log In:</h2>


        <div id="signup-form">
            <p>Email:</p>
            <input type="email" id="lemail" placeholder="example@123.com" title="Email:" bind:value={email}>
            <p>Password:</p>
            <input id="lpassword" type="password" placeholder="Must be longer than 8 characters" bind:value={password}>

        </div>
        <div id="buttons">
            <button id="signinBTN" on:click={logIn}>Log In</button>
            <br>
            <hr>
            <br>
            <h4>Don't Yet Have an Account?: </h4>
            <a href="/signup"><button>Sign Up</button></a>
        </div>
    </div>
</main>

<style>
    * {
        color: #fff;
    }
    
    main {
        background-color: #161616;
    }

    #back {
        width: 10em;
        height: 5em;
        background-color: #2f2f2f;
        border-radius: 15px;
        border: none;
        padding: 10px;
        font-size: 1em;
        text-align: center;
    }

    #back i {
        padding-right:10px;
    }

    #back:hover {
        background-color: #4b4b4b;
    }


    #signup {
        background-color: gray;
        margin: auto;
        margin-top: 7em;
        margin-bottom: 7em;
        width: 50%;
        padding: 40px;
        border-radius: 25px;
        z-index: 1;
    }

    #signup h2 {
        margin: 40px;
        padding-bottom: 10px;
        font-size: 2.5em;
        text-align: center;
        font-family: Nerko One, sans-serif;
    }

    #signup-form input {
        color: black;
        width: 90%;
        padding: 5px;
        margin: 20px 3.5%;
    }

    #buttons {
        margin: 20px auto;
        width: 100%;

    }

    #buttons button {
        width: 75px;
        height: 25px;
        border-radius: 15px;
        background-color: rgb(130, 36, 158);
        margin: 10px 45%;
    }

    #buttons h4 {
        color: white;
        text-align: center;
    }

    br, hr {
        width: 100%;
    }

    /* #warning-popup {
        display: none;
        margin-left: 24.5%;
        width: 50%;
        background-color: rgb(223, 43, 43);
        border-radius: 30px;
        text-align: center;
        font-size: 1em;
        padding: 10px;
        position: absolute;
        opacity: 95%;
        animation: fadeout 4.5s ease-in 0s 1 forwards;
    } */

    @keyframes fadeout {
        0% {opacity: 95%;}
        50% {opacity: 75%;}
        100% {opacity: 0%;}
    }
</style>