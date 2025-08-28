import { create } from "zustand";
import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

let unsubscribeListener = null; // 🔹 to clean up Firestore listener when user switches

const useUsersStore = create((set, get) => ({
  users: [],

  // 🔹 Real-time fetch of only the logged-in user's users
  fetchUsers: async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        set({ users: [] }); // clear immediately when logged out
        if (unsubscribeListener) unsubscribeListener(); // stop old listener
        return;
      }

      // Stop any existing listener before starting a new one
      if (unsubscribeListener) unsubscribeListener();

      const q = query(
        collection(db, "users"),
        where("isDeleted", "==", false),
        where("userId", "==", currentUser.uid) // ✅ filter by logged-in user
      );

      // 🔹 Real-time listener
      unsubscribeListener = onSnapshot(q, (snapshot) => {
        const usersData = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        set({ users: usersData });
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  // 🔹 Add a new user (attach owner UID)
  addNewUser: async (newUser) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userWithFlag = {
        ...newUser,
        isDeleted: false,
        userId: currentUser.uid, // ✅ associate with logged-in user
      };

      await addDoc(collection(db, "users"), userWithFlag);
      // no need to manually update state — onSnapshot listener updates automatically
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },

  // 🔹 Edit user
  editUser: async (userId, newDetails) => {
    try {
      await updateDoc(doc(db, "users", userId), newDetails);
      // onSnapshot will update state automatically
    } catch (error) {
      console.error("Error editing user:", error);
    }
  },

  // 🔹 Soft delete user
  deleteUser: async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), { isDeleted: true });
      // onSnapshot will update state automatically
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  },
}));

export default useUsersStore;
