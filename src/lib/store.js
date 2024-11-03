import { writable } from "svelte/store";

export let userId = writable("");

export function getID() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        if (localStorage?.getItem("userID")) {
            userId.set(localStorage.getItem("userID"));
        }
    }
}

export const firebaseConfig = {

    apiKey: "AIzaSyBcgaRc52zpo-7XhqNwbOfZfoOBzTLE-Mo",

    authDomain: "flashcards-9d658.firebaseapp.com",

    projectId: "flashcards-9d658",

    storageBucket: "flashcards-9d658.appspot.com",

    messagingSenderId: "308921878646",

    appId: "1:308921878646:web:59ec309dbcebbf8ca47757"

};

export function getLocalStorage() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        if (localStorage?.getItem("userID")) {
            userId.set(localStorage.getItem("userID"));
        }
    }
}

export function syncLocalStorage(value) {
    localStorage?.setItem("userID", value)
}