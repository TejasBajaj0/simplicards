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

    apiKey: private,

    authDomain: private,

    projectId: private,

    storageBucket: private,

    messagingSenderId: private,

    appId: private

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
