import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database"

// Firebase configuration
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "...",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth()
const db = getDatabase(app)

// login function
const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    console.log("Zalogowano:", userCredential.user)
  } catch (error) {
    console.error("Błąd logowania:", error)
  }
}

// logout function
const signOutUser = async () => {
  try {
    await signOut(auth)
    console.log("Wylogowano")
  } catch (error) {
    console.error("Błąd wylogowania:", error)
  }
}

// user log
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in!")
    console.log(`User: ${user.email}`)
  } else {
    console.log("No user")
  }
})



// index.js
export { auth, app, analytics, signIn, signOutUser, db, ref, get}
