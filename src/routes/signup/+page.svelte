<script>
    import { initializeApp } from 'firebase/app';
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
    import { getFirestore, doc, setDoc } from 'firebase/firestore';
    import { userId, firebaseConfig } from '../store'
    import { onMount } from 'svelte';

    let firebaseApp = initializeApp(firebaseConfig);
    let tempID;
    userId.subscribe( (val) => { tempID = val })
    
    onMount( () => {
        if (tempID) {
            changeWindow("/catalog");
        }
    })

    let email;
    let password;
    let fullName;
    let repassword;

    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        if (localStorage?.getItem("userID")) {
            userId.set(localStorage.getItem("userID"));
        }
    }
    
    function syncLocalStorage() {
        localStorage?.setItem("userID", $userId)
    }
    

    function submitForm() {

        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        if (repassword != password) {
            alert("Passwords don't match!")
            return;
        }

        const auth=getAuth();
        const db=getFirestore();


        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
        const user = userCredential.user;  

        const userData = {
            email: email,
            fullname: fullName,
            proStatus: false
        };

        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData); // Wait for Firestore operation to complete
        console.log("Account Info Added");
        userId.set(user.uid);
        syncLocalStorage();
        changeWindow("/catalog");
        })
        .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
            alert("Email already exists!");
            changeWindow("/login")
        } else {
            alert("Error creating user!")
            console.error(error); // Log the error for debugging
        }
        });
    }

    function changeWindow(changing) {
        window.location.href = changing;
    }

</script>


<a href="/"><button id="back"><i class="fa-solid fa-rotate-left"></i>Back</button></a>
<div id="signup">
    <h2>Sign Up:</h2>
    
    <div id="signup-form">
        <p>First Name:</p>
        <input type="text" id="full_name" placeholder="John Doe" bind:value={fullName}>
        <p>Email:</p>
        <input type="email" id="email" placeholder="example@123.com" bind:value={email}>
        <p>Password:</p>
        <input type="password" id="password" placeholder="Must Contain letters and numbers" bind:value={password}>
        <p>Re-Enter Password:</p>
        <input type="password" id="re-password" placeholder="Enter Same Password as Above" bind:value={repassword}>
    </div>
    <div id="buttons">
        <button id="signupBTN" value="signupBTN" on:click={submitForm}>Sign Up</button>
        <br>
        <hr>
        <br>
        <h4>Already Have an Account?:</h4>
        <a href="/login"><button>Login</button></a>
    </div>
</div>


<style>
* {
    color: white;
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
    margin: 2em auto;
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
    margin: 1em 3%;
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

#warning-popup {
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
}

@keyframes fadeout {
    0% {opacity: 95%;}
    50% {opacity: 75%;}
    100% {opacity: 0%;}
}
</style>