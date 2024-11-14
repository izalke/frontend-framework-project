import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7ani7955scwzBk6FMOAU0d0KWXcjDkT8",
  authDomain: "car-shop-17548.firebaseapp.com",
  databaseURL: "https://car-shop-17548-default-rtdb.firebaseio.com",
  projectId: "car-shop-17548",
  storageBucket: "car-shop-17548.appspot.com",
  messagingSenderId: "763251747121",
  appId: "1:763251747121:web:064a3d4983123e864c6810",
  measurementId: "G-X1WWPW60WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase(app);

// login function
const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Zalogowano:", userCredential.user);
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };
  
  // logout function
 const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("Wylogowano");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };



// user log
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log('logged in!');
    console.log(`User: ${user.email}`);
  } else {
    console.log('No user');
  }
});

// index.js
export { auth, app, analytics, signIn, signOutUser, db, ref, get};

