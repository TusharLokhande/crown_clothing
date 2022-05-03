// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  //doc(db, collections, uid)
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  //data from doc
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  //

  //if user's does not exits it will return true
  //create /set the document from the data from the userAuth in my collections
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error in creating a user: ", error.message);
    }
  }

  //if data exits
  return userDocRef;
};
