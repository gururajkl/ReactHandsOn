import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-zyj4DMhUNcbU0kD1xc6vqN1buY-BAUw",
  authDomain: "crwn-cloth-db-26100.firebaseapp.com",
  projectId: "crwn-cloth-db-26100",
  storageBucket: "crwn-cloth-db-26100.firebasestorage.app",
  messagingSenderId: "288872376201",
  appId: "1:288872376201:web:7002d854b392b913d16358",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  } else {
    console.log("User already exists");
  }

  return userDocRef;
};
