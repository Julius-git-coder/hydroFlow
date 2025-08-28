import { create } from "zustand";
import { auth } from "../service/firebaseConfig"; // ✅ fixed path
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
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
          emailVerified: user.emailVerified,
          createdAt: user.metadata.creationTime,
        };

        set({
          user: userData,
          isAuthenticated: true,
          initializing: false,
        });
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

      set({ isLoading: false });
    } catch (error) {
      set({ error: mapAuthError(error), isLoading: false });
    }
  },

  // 🔑 Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      set({ isLoading: false });
    } catch (error) {
      set({ error: mapAuthError(error), isLoading: false });
    }
  },

  // 🔑 Logout
  logout: async () => {
    await signOut(auth);
  },
}));

export default useAuthStore;
