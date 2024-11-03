<script>
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { userId, getID, firebaseConfig } from '../store';
import { onMount } from 'svelte';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

getID();

let tempID;
let docRef;
let maxCardLimit = 150;
let counter = 3;
let tbody;

onMount( async () => {
    userId.subscribe( (val) => { tempID = val });
    if (tempID) {
        docRef = doc(db, 'users', tempID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.proStatus === true) {
                maxCardLimit = 1000;
            }
        }
    }
    tbody = document.getElementById("tbody");
})

function addLine() {
    if (counter > maxCardLimit || counter === maxCardLimit) {
        alert('You have reached the maximum number of cards');
        return;
    }
    counter += 1
    tbody.insertAdjacentHTML("beforeend", `<tr class="s-SUdKbrhE3DBq"><td class="s-SUdKbrhE3DBq"># ${counter}</td><td class="s-SUdKbrhE3DBq"><input class="s-SUdKbrhE3DBq" type="text" class="inputs"></td><td class="s-SUdKbrhE3DBq"><input class="s-SUdKbrhE3DBq" type="text" class="inputs"></td></tr>`);
    window.scrollTo(0, document.body.scrollHeight);
}

function removeLine() {
    if (counter > 3) {
        counter = counter - 1;
        tbody.lastChild.remove();
    }
}

function saveData() {
  const inputs = document.querySelectorAll(".inputs"); // Get all input elements
  const title = document.getElementById("title").value;
  const dscrptn = document.getElementById("description").value;

  if (title === "email" || title === "fullname") {
    alert("Title can't be 'email' or 'fullname'!");
    return;
  } else if (title === "" ) {
    alert("Title can't be empty!");
    return;
  } else if (title.length > 100) {
    alert("Title can't be longer than 85 characters!");
    return;
  }

  if (!tempID) {
    console.error("Missing userId. Please ensure user is logged in.");
    window.location.href = "/login";
  }

  const newData = { [title] : {description : dscrptn}}; // Create an object to store key-value pairs
  let keyTemp = "";
  let valueTemp = "";

  inputs.forEach((element, index) => {
    if (index % 2 === 0) { // If even index, consider it a key
      keyTemp = element.value;
    } else { // If odd index, consider it a value
      valueTemp = element.value;

      if (keyTemp != "") { // Only add key-value pair if a key exists
        newData[title][keyTemp] = valueTemp;
        keyTemp = ""; // Reset keyTemp for the next pair
        valueTemp = "";
      } else {
        console.warn(`Missing key for value: ${valueTemp}. Skipping this pair.`);
      }
    }
  });

  // Update the Firestore document with the `newData` object
  setDoc(docRef, newData, { merge: true }) // Merge to preserve existing data
    .then(() => {
      window.location.href = "/catalog";
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
}
</script>
<main>
    <h2>Name Your Flashcard Set!</h2>
    <input id="title">
    <h3>Enter a Description (Optional) :</h3>
    <textarea name="Description" id="description"></textarea>
    <div class="borderarea">
    <table id="table">
        <thead>
            <tr>
                <th>Card #</th>
                <th>Front:</th>
                <th>Back:</th>
            </tr>
        </thead>
        <tbody id="tbody">
            <tr>
                <td>#1</td>
                <td><input type="text" class="inputs"></td>
                <td><input type="text" class="inputs"></td>
            </tr>
            <tr>
                <td>#2</td>
                <td><input type="text" class="inputs"></td>
                <td><input type="text" class="inputs"></td>
            </tr>
            <tr>
                <td>#3</td>
                <td><input type="text" class="inputs"></td>
                <td><input type="text" class="inputs"></td>
            </tr>
        </tbody>
    </table>
    <div class="button-container">
        <button id="button-add" on:click={addLine}><i class="fa-solid fa-plus"></i></button>
        <button id="button-remove" on:click={removeLine}><i class="fa-solid fa-minus"></i></button>
    </div>
</div>

    <div id="bottomBTN">
        <button id="submit" on:click={saveData}>Save</button>
        <p>or</p>
        <button id="reset">Reset</button>
    </div>
</main>

<style>
* {
    color: white;
    margin: 0;
}

main {
    background-image: linear-gradient(to bottom, rgb(130, 36, 158), rgb(160, 75, 75));
    min-height: 63em;
}

table {
    margin: 2em auto;
    font-size: 1.5em;
    width: 95%;
    text-align: center;
}

table input {
    width: 85%;
    height: 3em;
    margin: 1em auto;
}

table, th, td {
    border: 2px solid black;
    border-collapse: collapse;
    padding: 10px;
}

h2, h3 {
    text-align: center;
    font-family: Patrick Hand;
    padding: 0.5em;
}

h2 {
    font-size: 3.5em;
}

h3 {
    margin-top: 2em;
}

input, textarea {
    width: 40%;
    margin: 0 auto;
    text-align: center;
    background-color: #161616;
}

textarea, #title {
    margin-left: 29.5%;
}

#description {
    height: 200px;
    text-align: left;
}

#title {
    text-align: center;
    height: 50px;
    font-size: 2em;
}

.button-container {
    text-align: center;
}

#button-add,
#button-remove {
    border: none;
    height: 5em;
    width: 5em;
    border-radius: 15px;
    margin: 1em;
}

#button-add {
    background-color: green;
}

#button-remove {
    background-color: red;
}

#button-add:hover {
    background-color: darkgreen;
    cursor: pointer;
}

#button-remove:hover {
    background-color: darkred;
    cursor: pointer;
}

.borderarea {
    border: 5px solid white;
    width: 50%;
    margin: 0 auto;
    margin-top: 1em;
    margin-bottom: 1em;
}

/* #warning {
    position: absolute;
    background-color: rgb(250, 50, 50);
    margin: 0 auto;
    z-index: -2;
    width: 49%;
    text-align: center;
    border-radius: 15px;
    animation: fadeOut 5s linear forwards;
    display: none;
} */

@keyframes fadeOut {
    0% {
        opacity: 1;
        z-index: 2;
    }

    75% {
        opacity: 0.75;
        z-index: 2;
    }

    100% {
        opacity: 0;
        z-index: -2;
    }
}

#bottomBTN {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    cursor: default;
}

#bottomBTN p {
    font-size: 1.5em;
    margin: 0 1%;
    margin-top: 30px;
}

#bottomBTN button {
    border-radius: 15px;
    border: whitesmoke 2px solid;
    background-color: rgb(130, 36, 158);
    font-size: 1.5em;
    padding: 0 15px;
    margin-top: 30px;
    margin-bottom: 40px;
}

#bottomBTN button:hover {
    background-color: whitesmoke;
    border: rgb(130, 36, 158) 2px solid;
    color: rgb(130, 36, 158);
    cursor: pointer;
}
</style>