<script>
    import { userId, getID, firebaseConfig } from '$lib/store'
    import { initializeApp } from 'firebase/app';
    import { getFirestore, doc, getDoc } from 'firebase/firestore';
    import { getAuth, signOut } from 'firebase/auth';
    import { onMount } from 'svelte';

    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth();
    
    getID();

    let tempID; 
    let name;
    let storedData = [];
    let setsCount = 0;

    // if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    //     if (localStorage?.getItem("userID")) {
    //         userId.set(localStorage.getItem("userID"));
    //     }
    // }

    onMount(async () => {
            userId.subscribe(async (val) => { 
            tempID = val;
        })
        if (tempID) {
            const docRef = doc(db, "users", tempID);
            getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    name = userData.fullname;
                    storedData = [];
                    for (const [fieldName, fieldValue] of Object.entries(userData)) {
                        storedData.push([fieldName, fieldValue.description])
                        setsCount += 1;
                    }
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error(error);
            })
        } else {
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
    });

    function logOut() {
        if (tempID) {
            localStorage?.removeItem("userID");
            userId.set("");
            signOut(auth);
        }
    }

    function rerouteNew() {
        if (tempID) {
            window.location.href = "/new";
        }
    }

</script>
<main>
    <nav>
        <ul>
            <li><a href = "/">Home</a></li>
            <li><a href = "/catalog">Flashcards</a></li>
            <li class="loginsignup" id="signoutBTN"><a on:click={logOut} href="/">Sign Out</a></li>
        </ul>
    </nav>

    {#if name !== undefined}
        <h2 id="name-welcome">Welcome: { name }!</h2>

    {:else}
        <h2 id="name-welcome">Welcome!</h2>
    {/if}

    <div class="add">
        <button id="create-button" on:click={rerouteNew}><i class="fa-solid fa-plus"></i>New</button>
    </div>

    <div class="all-sets">
        <ul id="display-sets">
            {#each storedData as item}
                {#if item[0] != "email" && item[0] != "proStatus" && item[0] != "fullname"}
                    <li on:click={window.location.href = `/${tempID}/${item[0]}`}>
                        <h3><strong>{item[0]}</strong></h3>
                        <h5>{item[1]}</h5>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </li>
                {/if}
            {/each}
            {#if setsCount == 3}
                <h4>Looks you currently don't have any sets. Create A New One Above!</h4>
            {/if}
        </ul>
    </div>
</main>

<style>
    /* Add CSS styles here */
    
nav {
    background-image: linear-gradient(to bottom right, rgb(51, 51, 209), rgb(130,51,209));
}

nav a:hover {
    background-color: rgb(63, 63, 223);
    height: 100%;
    border-radius: 5px;
}

h2 {
    font-size: 3em;
    margin: 20px 0;
    margin-left: 25px;
    font-family: Patrick Hand;
    font-weight: 500;
}

#name-welcome {
    text-align: center;
    font-size: 3.5em;
    font-weight: 900;
}

h2:hover {
    cursor: default;
}

#create-button i {
    margin: 0;
    padding: 0;
    padding: 0 5px;
}

#create-button {
    width: 150px;
    border-radius: 25px;
    background-color: gray;
    border: none;
    height: 50px;
    font-size: 1em;
    background-color: rgb(50, 150, 50);
    box-shadow: 0 0px 30px rgba(50, 150, 50, 0.75);
    color: white;
}

.add {
    padding: 2% 4%;
    padding-bottom: 1%;
}

#create-button:hover {
    background-color: green;
    cursor: pointer;
    box-shadow: 0 0 40px rgba(0, 128, 0, 0.5);
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

#display-sets li {
    text-decoration: none;
    list-style-type: none;
    font-family: Nerko One;
    overflow: hidden;
    border-radius: 25px;
    margin: 2.5% 8%;
    box-shadow: 10px 10px 5px black;
    background-color: #111111;
    min-height: 75px;
    max-height: 150px;
    position: relative;
    z-index: 1;
}

#display-sets h3 {
    font-size: 3em;
    padding: 0.25em 2%;
    margin: 0;
}

#display-sets h5 {
    font-size: 1.5em;
    max-width: 92%;
    padding: 0.5em 2%;
    margin: 0;
    color: #afafaf;
}

#display-sets i {
    font-size: 1.5em;
    position: absolute;
    float: right;
    padding: 20px;
    top: 50%;
    right: 4%;
    transform: translateY(-50%);
    z-index: 2;
}

@keyframes enlargeOnHover {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.03);
    }
}

#display-sets li:hover {
    background-color: rgb(60, 60, 220);
    overflow: auto;
    -webkit-overflow: scroll;
    cursor: pointer;
    box-shadow: 10px 10px 10px black;
    animation: enlargeOnHover 0.2s ease-out forwards;
}

#display-sets i:hover {
    color: rgb(197, 197, 255);
    font-size: 1.75em;
}

h4 {
    font-family: Patrick Hand, sans-serif;
    font-size: 1.5em;
}
</style>