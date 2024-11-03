import { initializeApp, getApp, getApps, deleteApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyBcgaRc52zpo-7XhqNwbOfZfoOBzTLE-Mo',
    authDomain: 'flashcards-9d658.firebaseapp.com',
    projectId: "flashcards-9d658",
    storageBucket: 'flashcards-9d658.appspot.com',
    messagingSenderId: "308921878646",
    appId: '1:308921878646:web:59ec309dbcebbf8ca47757'
};

let firebaseApp;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp();
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}


export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);