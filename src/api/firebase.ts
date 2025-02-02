import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { getDatabase, ref, get, push, set } from "firebase/database"

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
    console.log("Login:", userCredential.user)
  } catch (error) {
    console.error("Login error:", error)
  }
}

// logout function
const signOutUser = async () => {
  try {
    await signOut(auth)
    console.log("Logout")
  } catch (error) {
    console.error("Logout error:", error)
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


const addAuction = async (auctionData: any) => {
  try {
    const newAuctionRef = push(ref(db, "auctions"))
    await set(newAuctionRef, auctionData)
    return newAuctionRef.key
  } catch (error) {
    console.error("Błąd przy dodawaniu aukcji:", error)
    return null
  }
}

const deleteAuctionFromFirebase = async (auctionId: string) => {
  try {
    const auctionRef = ref(db, `auctions/${auctionId}`);
    await set(auctionRef, null); 
    console.log(`Aukcja ${auctionId} została usunięta z Firebase.`);
    return true;
  } catch (error) {
    console.error("Błąd podczas usuwania aukcji z Firebase:", error);
    return false;
  }
};

export { auth, app, analytics, signIn, signOutUser, db, ref, get, addAuction, deleteAuctionFromFirebase}
