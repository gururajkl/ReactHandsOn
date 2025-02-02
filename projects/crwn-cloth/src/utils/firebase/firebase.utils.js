import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-zyj4DMhUNcbU0kD1xc6vqN1buY-BAUw",
  authDomain: "crwn-cloth-db-26100.firebaseapp.com",
  projectId: "crwn-cloth-db-26100",
  storageBucket: "crwn-cloth-db-26100.firebasestorage.app",
  messagingSenderId: "288872376201",
  appId: "1:288872376201:web:7002d854b392b913d16358",
};

// Initialize Firebase.
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDoc(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docsSnapShot) => {
    const { title, items } = docsSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  });

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  } else {
    console.log("User already exists");
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async ({
  email,
  password,
}) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async ({
  email,
  password,
}) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out the auth user.
export const signOutAuthUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
