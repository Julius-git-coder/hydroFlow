// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7ayp0Y8_0ZkpM-ZJgKKNUQqngmmFkaus",
  authDomain: "gen-30-14db4.firebaseapp.com",
  projectId: "gen-30-14db4",
  storageBucket: "gen-30-14db4.firebasestorage.app",
  messagingSenderId: "833108537258",
  appId: "1:833108537258:web:108d26ba172187b55005d3",
  measurementId: "G-6FRLNEG9VY",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Analytics (only if supported — avoids SSR errors)
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

export { db, auth };
