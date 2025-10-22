import { create } from "zustand";
import { auth } from "../Service/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// 🔹 Map Firebase Auth errors to friendly messages
const mapAuthError = (error) => {
  switch (error.code) {
    case "auth/invalid-credential":
      return "Invalid email or password. Please try again.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Try again.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was canceled. Please try again.";
    case "auth/popup-blocked":
      return "Popup was blocked by your browser. Allow popups and try again.";
    default:
      return "Something went wrong. Please check your network and try again.";
  }
};

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  initializing: true,

  // 🔑 Initialize Firebase Auth Listener
  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          id: user.uid,
          email: user.email,
          name: user.displayName || user.email?.split("@")[0],
          photoURL: user.photoURL || null,
          emailVerified: user.emailVerified,
          createdAt: user.metadata.creationTime,
        };

        set({
          user: userData,
          isAuthenticated: true,
          initializing: false,
        });
        // Set hasLoggedIn flag in localStorage
        localStorage.setItem("hasLoggedIn", "true");
      } else {
        set({
          user: null,
          isAuthenticated: false,
          initializing: false,
        });
      }
    });

    return unsubscribe;
  },

  // 🔑 Register new user
  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (name) {
        await updateProfile(user, { displayName: name });
      }

      localStorage.setItem("hasLoggedIn", "true"); // Set hasLoggedIn on successful registration
      set({ isLoading: false });
    } catch (error) {
      set({ error: mapAuthError(error), isLoading: false });
    }
  },

  // 🔑 Login with email/password
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("hasLoggedIn", "true"); // Set hasLoggedIn on successful login
      set({ isLoading: false });
    } catch (error) {
      set({ error: mapAuthError(error), isLoading: false });
    }
  },

  // 🔑 Google Sign In / Sign Up (Popup + Persistence)
  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence); // ✅ store in localStorage
      await signInWithPopup(auth, provider);
      localStorage.setItem("hasLoggedIn", "true"); // Set hasLoggedIn on successful Google login
      set({ isLoading: false });
    } catch (error) {
      set({ error: mapAuthError(error), isLoading: false });
    }
  },

  // 🔑 Logout
  logout: async () => {
    await signOut(auth);
    set({ user: null, isAuthenticated: false });
    // Note: hasLoggedIn in localStorage persists to keep Old User button enabled
  },
}));

export default useAuthStore;
