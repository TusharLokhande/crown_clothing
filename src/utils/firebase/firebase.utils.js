import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNHiymxVp41DSM1E0WNA7UCJyM8uHtpaw",
  authDomain: "e-comm-d8254.firebaseapp.com",
  projectId: "e-comm-d8254",
  storageBucket: "e-comm-d8254.appspot.com",
  messagingSenderId: "396177558224",
  appId: "1:396177558224:web:67aa07c7afc7c0154d6cd5",
};

//SDK
const firebaseApp = initializeApp(firebaseConfig);

//Authentication
const gooogleProvider = new GoogleAuthProvider();

gooogleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, gooogleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, gooogleProvider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//Database
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfomration = {}
) => {
  if (!userAuth) return;
  //doc(db, collections, uid)
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  //data from doc
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfomration,
      });
    } catch (error) {
      console.log("Error in creating a user: ", error.message);
    }
  }

  //if data exits
  return userDocRef;
};

//SIGN OUT USER
export const signOutUser = async () => await signOut(auth);

//It will call the callback whenever the onAuthState changes.
//e.g.: When user sign in/sign-out consider as the auth change, so it will call the callback.
export const onAuthStateChangeListener = (callback) =>
  onAuthStateChanged(auth, callback);
