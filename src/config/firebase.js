import firebase from 'firebase/compat/app';

import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyCHHK62NJg5dNJR61zA6zaj6HP-o4y2v0w",
    authDomain: "una-sporca-storia.firebaseapp.com",
    projectId: "una-sporca-storia",
    storageBucket: "una-sporca-storia.appspot.com",
    messagingSenderId: "1031452213300",
    appId: "1:1031452213300:web:58838790f0b2c381f68a61",
    measurementId: "G-ST2BK6LY21"
});

const auth = firebase.auth();

export {firebase, auth}