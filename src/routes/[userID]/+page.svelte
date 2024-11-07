<script>
    import { page } from '$app/stores';
    import { initializeApp } from 'firebase/app';
    import { getDoc, doc, getFirestore } from "firebase/firestore";
    import { getAuth } from "firebase/auth";
    import { userId, getID, firebaseConfig, logOut } from '$lib/store'
    import { onMount } from 'svelte';
    import '../../app.css'

    const pageUserID = JSON.stringify($page.params.userID).substring(1, 29);

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth();

    getID()

    let tempID;
    let userName;
    let counter = 0;

    onMount(async () => {
            userId.subscribe(async (val) => { 
            tempID = val;
        })
        const docRef = doc(db, "users", pageUserID);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                userName = userData.fullname;
                for (const [fieldName, fieldValue] of Object.entries(userData)) {
                    counter += 1
                }
                counter -= 3;
            } else {
                console.log("No such document!");
                window.location.href = "/doesntexist";
            }
        })
        .catch((error) => {
            console.error(error);
        })
    });

</script>

<nav>
    <ul>
        <li><a href = "/">Home</a></li>
        <li><a href = "/catalog">Flashcards</a></li>
        {#if tempID}
        <li class="loginsignup" id="signoutBTN"><a on:click={logOut(tempID, auth)} href="/">Sign Out</a></li>
        {/if}    
    </ul>
</nav>
<h1>{userName}</h1>
<h2>This user has {counter} set(s)!</h2>

<style>
    nav {
        background-image: linear-gradient(to bottom right, rgb(51, 51, 209), rgb(130,51,209));
    }

    
    nav a:hover {
        background-color: rgb(63, 63, 223);
        height: 100%;
        border-radius: 5px;
    }

    #signoutBTN {
        float: right;
        background-color: black;
        border-radius: 50px;
        margin: 3px 10px;
    }

    #signoutBTN:hover a {
        background-color: white;
        color: black;
        border-radius: 50px;
        cursor: pointer;
    }
</style>