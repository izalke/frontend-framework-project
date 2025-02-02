import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { getDatabase, ref, get, push, set, remove } from "firebase/database";
import firebaseConfig from "./firebaseconfig.json";


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase(app);


const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    await updateProfile(user, { displayName: email });

    
    return user;
  } catch (error) {
   
    throw error;
  }
};


const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    return userCredential.user;
  } catch (error) {
   
    throw error;
  }
};


const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};



const getCurrentUser = (): Promise<{ user: User | null, role: string | null }> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const roleSnapshot = await get(ref(db, `users/${user.uid}/role`));
        const role = roleSnapshot.exists() ? roleSnapshot.val() : "user";
        resolve({ user, role });
      } else {
        resolve({ user: null, role: null });
      }
      unsubscribe();
    });
  });
};


const updateUserProfile = async (newName: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not log in.");

    await updateProfile(user, { displayName: newName });
    return user;
  } catch (error) {
    throw error;
  }
};


const addAuction = async (auctionData: any) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Need to be log in to add auction.");
    }

    const newAuctionRef = push(ref(db, "auctions"));
    await set(newAuctionRef, {
      ...auctionData,
      userId: user.uid,
      createdAt: new Date().toISOString(),
    });

   
    return newAuctionRef.key;
  } catch (error) {
    console.error("Error while adding auction:", error);
    return null;
  }
};


const getAuctions = async () => {
  try {
    const snapshot = await get(ref(db, "auctions"));
    if (!snapshot.exists()) return [];
    
    const auctionsData = snapshot.val();
    return Object.keys(auctionsData).map((key) => ({
      id: key,
      ...auctionsData[key],
    }));
  } catch (error) {
    console.error("Error downloading auction", error);
    return [];
  }
};


const deleteAuctionFromFirebase = async (auctionId: string) => {
  try {
    const auctionRef = ref(db, `auctions/${auctionId}`);
    await remove(auctionRef);

    return true;
  } catch (error) {
  
    return false;
  }
};


export {
  auth,
  app,
  analytics,
  registerUser,
  signIn,
  signOutUser,
  getCurrentUser,
  updateUserProfile,
  db,
  ref,
  get,
  addAuction,
  getAuctions,
  deleteAuctionFromFirebase,
};
