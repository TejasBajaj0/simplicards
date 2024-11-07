<script>
    import { page } from '$app/stores';
    import { initializeApp } from 'firebase/app';
    import { getDoc, doc, getFirestore } from "firebase/firestore";
    import { getAuth } from 'firebase/auth';
    import { userId, getID, firebaseConfig, logOut } from '$lib/store'
    import { onMount } from 'svelte';
    import '../../../app.css'

    const pageUserID = JSON.stringify($page.params.userID).substring(1, 29);
    const SetName = JSON.stringify($page.params.setName);
    const pageSetName = SetName.substring(1, SetName.length - 1);

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth()

    getID()

    let tempID;
    let author;
    let title;
    let description;

    onMount(async () => {
            userId.subscribe(async (val) => { 
            tempID = val;
        })
        const docRef = doc(db, "users", pageUserID);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                author = userData.fullname;
                for (const [fieldName, fieldValue] of Object.entries(userData)) {
                        if (fieldName === pageSetName) {
                            title = fieldName;
                            description = fieldValue.description;
                        }
                }
                if (!title && !description) {
                    window.location.href = "/doesntexist"
                }
            } else {
                console.log("No such document!");
                window.location.href = "/doesntexist";
            }
        })
        .catch((error) => {
            console.error(error);
        })
    });

    function start() {
        window.location.href = `/${pageUserID}/${pageSetName}/start`
    }

</script>

<body>
    <nav>
        <ul>
            <li><a href = "/">Home</a></li>
            <li><a href = "/catalog">Flashcards</a></li>
            {#if tempID}
            <li class="loginsignup" id="signoutBTN"><a on:click={logOut(tempID, auth)} href="">Sign Out</a></li>
            {/if}    
        </ul>
    </nav>
    
    <div id="flexbox">
        <h1>{title}</h1>
        <h3>Author: <a href='/{pageUserID}'>{author}</a></h3>
        <button on:click={start} title="-Start-"><i class="fa-solid fa-play"></i></button>
    </div>
    <div id="description">
        <h2>Description:</h2>
        <h3>{description}</h3>
    </div>
</body>


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

    button {
        width: 30%;
        height: 50px;
        margin: 2em auto;
        background-color: rgb(27, 160, 27);
        border: none;
        border-radius: 25px;
        padding: 10px;
    }

    button i {
        margin: 0 5px;
        font-size: 1.5em;
    } 
    
    button:hover {
        background-color: rgb(27, 120, 27); 
        cursor: pointer;
    }

    #flexbox, #description {
        display: grid;
        align-items: center;
        width: 90%;
        background-color: #0a0a0a;
        margin: 2em auto;
        border-radius: 25px;
        min-height:20em;
    }

    #description {
        background-color: #929292;
        margin-top: 0.5em;
        min-height: 10em;
    }

    #flexbox a {
        text-decoration: none;
        color: #0aaaff;
    }

    #flexbox a:hover {
        color: #0affff;
        text-decoration: underline;
    }

    h1 {
        font-size: 3em;
    }
    h1, h2, h3 {
        text-align: center;
    }
</style>