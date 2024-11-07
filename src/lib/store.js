import { writable } from "svelte/store";
import { signOut } from "firebase/auth";

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

export function logOut(tempID, auth) {
    if (tempID) {
        localStorage?.removeItem("userID");
        userId.set("");
        signOut(auth);
    }
}

export function mobileDeviceTest() {
    let details = navigator.userAgent; 
    let regexp = /android|iphone|kindle|ipad/i; 
    let isMobileDevice = regexp.test(details)

    if (isMobileDevice) {
        return true;
    } else {
        return false;
    }
}
