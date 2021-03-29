import * as firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCa_KSQoeub-vCikpLLzwMNzOBn7MOVz4w",
    authDomain: "signal-clone-b05e5.firebaseapp.com",
    projectId: "signal-clone-b05e5",
    storageBucket: "signal-clone-b05e5.appspot.com",
    messagingSenderId: "693381790584",
    appId: "1:693381790584:web:8a56c752266c53bfbda68d",
    measurementId: "G-VYYN93NGL4"
};
  
//app part
let app;
    //= firebase.initializeApp(firebaseConfig)

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
}
else {
    app = firebase.app()
}

//db
const db = app.firestore();
const auth = firebase.auth();
//const db = 

export { auth, db}