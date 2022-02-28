import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCHKKbSsysyogRCfl3oXvVI_EERbMOJyWk",
    authDomain: "newsapp-d2b37.firebaseapp.com",
    projectId: "newsapp-d2b37",
    storageBucket: "newsapp-d2b37.appspot.com",
    messagingSenderId: "922708714264",
    appId: "1:922708714264:web:224f60a14f140006bc346d"
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);