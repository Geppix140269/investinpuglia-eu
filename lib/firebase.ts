// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD5W53Mh-RqugrgyaALsf4ERPKHNiEF4BM",
  authDomain: "invest-in-puglia-eu.firebaseapp.com",
  projectId: "invest-in-puglia-eu",
  storageBucket: "invest-in-puglia-eu.firebasestorage.app",
  messagingSenderId: "515852973978",
  appId: "1:515852973978:web:68df8862710f0b89df5423"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Helper functions for email/password auth
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};