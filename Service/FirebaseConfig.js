

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk6GTxD-yr_5gtAwRpSk2D0L0lofG11WQ",
  authDomain: "aquatrack-34a8b.firebaseapp.com",
  projectId: "aquatrack-34a8b",
  storageBucket: "aquatrack-34a8b.firebasestorage.app",
  messagingSenderId: "839061131699",
  appId: "1:839061131699:web:9eee6a7689f20a8fa93bc6",
  measurementId: "G-CSMKECYZXS",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Analytics safely (avoid SSR issues)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

// ✅ Firestore
const db = getFirestore(app);

// ✅ Auth
const auth = getAuth(app);

// 🔹 Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// ✅ Function: Register/Login with Google
const registerWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google user signed in:", user);
    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

export { db, auth, analytics, registerWithGoogle };
