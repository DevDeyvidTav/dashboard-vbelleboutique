// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1Y7T7DMh_FS_8dVEXKow_ejATEIqdlXE",
  authDomain: "v-belle-boutique.firebaseapp.com",
  projectId: "v-belle-boutique",
  storageBucket: "v-belle-boutique.appspot.com",
  messagingSenderId: "264170824991",
  appId: "1:264170824991:web:20bfbef31443d8e190bc2a",
  measurementId: "G-1C2EV1CT4G"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);



export async function signIn(email: string, password: string){
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}