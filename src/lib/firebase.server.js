import { Secret_apiKey, Secret_authDomain, Secret_projectId, Secret_storageBucket, Secret_messagingSenderId, Secret_appId } from "$env/static/private"

export const firebaseConfig = {
    apiKey: Secret_apiKey,
    authDomain: Secret_authDomain,
    projectId: Secret_projectId,
    storageBucket: Secret_storageBucket,
    messagingSenderId: Secret_messagingSenderId,
    appId: Secret_appId
};
