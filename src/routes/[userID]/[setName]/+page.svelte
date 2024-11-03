<script>
    import { page } from '$app/stores';
    import { initializeApp } from 'firebase/app';
    import { getDoc, doc, getFirestore } from "firebase/firestore";
    import { userId, getID, firebaseConfig } from '$lib/store'
    import { onMount } from 'svelte';

    const pageUserID = JSON.stringify($page.params.userID).substring(1, 29);
    const pageSetName = JSON.stringify($page.params.setName); // REMOVE "

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore();

    getID()

    let tempID;

    onMount(async () => {
            userId.subscribe(async (val) => { 
            tempID = val;
        })
        const docRef = doc(db, "users", pageUserID);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data(); // .pageSetName
                console.log(userData);
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error(error);
        })
    });

</script>

<h1>Hey!</h1>
<h2>{pageUserID}</h2>
<h3>{pageSetName}</h3>


<style>
    h2 {
        color: blue;
    }
    h3 {
        color: red;
    }
</style>