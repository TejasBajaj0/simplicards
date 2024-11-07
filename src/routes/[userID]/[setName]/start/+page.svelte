<script>
    import "../../../../app.css"
    import { page } from '$app/stores'
    import { initializeApp } from 'firebase/app';
    import { getDoc, doc, getFirestore } from "firebase/firestore";
    import { getAuth } from 'firebase/auth';
    import { userId, getID, firebaseConfig, mobileDeviceTest } from '$lib/store'
    import { onMount } from 'svelte';


    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth()

    const pageUserID = JSON.stringify($page.params.userID).substring(1, 29);
    const pageSetName = JSON.stringify($page.params.setName).substring(1, JSON.stringify($page.params.setName).length - 1);

    getID();

    let tempID;
    let tempFieldValues;
    let mobileCheck = false;

    let cards = [];

    let counter = 0;
    let currentCardKey;
    let currentCardValue;

    let currentSide;


    onMount( () => {
        if (mobileDeviceTest()) {
            mobileCheck = true
            return;
        }
        userId.subscribe( (val) => {
            tempID = val;
        })
        if (tempID) {
            const docRef = doc(db, "users", pageUserID);
            getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    for (const [fieldName, fieldValue] of Object.entries(userData)) {
                            if (fieldName === pageSetName) {
                                tempFieldValues = fieldValue;
                            }
                    }
                    if (!tempFieldValues) {
                        window.location.href = "/doesntexist"
                    }
                    for (let key in tempFieldValues) {
                        if (key !== "description"){
                            cards.push([key, tempFieldValues[key]]);
                        }
                    }
                    currentCardKey = cards[counter][0];
                    currentCardValue = cards[counter][1];
                    currentSide = currentCardKey;
                } else {
                    console.log("No such document!");
                    window.location.href = "/doesntexist";
                }
            })
        } else {
            window.location.href = "/login";
        }
    })

    function flip() {
        if (currentSide === currentCardKey) {
            currentSide = currentCardValue;
        } else {
            currentSide = currentCardKey;
        }
    }

    function update() {
        currentCardKey = cards[counter][0];
        currentCardValue = cards[counter][1];
        currentSide = currentCardKey;
    }

    function next() {
        if (counter < cards.length - 1) {
            counter += 1;
        }
        update()
    }

    function previous() {
        if (counter > 0) {
            counter -= 1;
        }
        update()
    }

</script>

<h1>{pageSetName}</h1>
<div id="displayCard" on:click={flip} title="Click to Flip">
    <h1>{currentSide}</h1>
</div>

<div id="buttons">
    <button on:click={next}>Next</button>
    <button on:click={previous}>Previous</button>
</div>
<style>
    * {
        text-align: center;
    }

    :root {
        --card-text-size: 2em;
    }

    #displayCard {
        width: 35em;
        height: 18em;
        margin: 5vh auto;
        background-color: #212121;
        border-radius: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.99vmax;
        font-family: Patrick Hand;
        user-select: none;
    }

    #displayCard:hover {
        cursor: pointer;
    }

    button {
        width: 25%;
        height: 50px;
        display: inline;
    }
</style>