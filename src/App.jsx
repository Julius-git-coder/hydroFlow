// App.js
import HydrationSummary from "./components/HydrationSummary";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import QuickAdd from "./components/QuickAdd";
import Footer from "./components/Footer";
import TabBar from "./components/TabBar/TabBar";
import WeatherBasedHydration from "./components/WeatherBasedHydration";
import { useEffect, useState } from "react";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import useAuthStore from "../Store/useAuthStore";
import { Routes, Route, Navigate } from "react-router-dom";
import Age from "./components/Age";
import Slider from "./components/Slider";
function App() {
  const { isMuted } = useAppContext();
  const [userInteracted, setUserInteracted] = useState(false);
  const { isAuthenticated, initialize, initializing } = useAuthStore();
  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);
  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);
    window.addEventListener("click", handleInteraction, { once: true });
    return () => window.removeEventListener("click", handleInteraction);
  }, []);
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("🔔 Notification permission status:", permission);
      });
    }
    const playNotificationSound = () => {
      if (!userInteracted) {
        console.warn("🔇 Cannot play audio. User hasn't interacted yet.");
        return;
      }
      const audio = new Audio("/notification.mp3");
      audio.play().catch((error) => {
        console.error("🔇 Sound play failed:", error);
      });
    };
    const interval = setInterval(() => {
      console.log("🔁 Checking for offline + mute status");
      if (
        !navigator.onLine &&
        Notification.permission === "granted" &&
        !isMuted
      ) {
        new Notification("You're offline. Don't forget to drink water!", {
          icon: "/Logo.jpeg",
        });
        playNotificationSound();
        if (navigator.vibrate) {
          navigator.vibrate([2000]);
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isMuted, userInteracted]);
  // Show nothing while Firebase is checking auth
  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="/Logo.jpeg "
          className="h-20 w-20 rounded-full animate-bounce md:h-30 md:w-30"
        />
      </div>
    );
  }
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Box
                  sx={{
                    width: {
                      xs: "100dvw",
                      md: "80dvw",
                    },
                    margin: "0 auto",
                    mt: 2,
                    flexGrow: 1,
                  }}
                >
                  <Navbar />
                  <Box
                    sx={{
                      px: "1rem",
                    }}
                  >
                    <HydrationSummary />
                    <WeatherBasedHydration />
                    <QuickAdd />
                    <TabBar />
                  </Box>
                </Box>
                <Footer />
              </>
            ) : (
              <Navigate to="/Slider" replace />
            )
          }
        />
        <Route path="/Age" element={<Age />} />
        <Route path="/Slider" element={<Slider />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Box>
  );
}
export default App;
