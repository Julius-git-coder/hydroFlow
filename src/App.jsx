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
import Signup from "./components/Signup";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { isMuted } = useAppContext();
  const [userInteracted, setUserInteracted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
    }, 30000);

    return () => clearInterval(interval);
  }, [isMuted, userInteracted]);

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
            loggedIn ? (
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
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route
          path="/signup"
          element={<Signup onSignup={() => setLoggedIn(true)} />}
        />
      </Routes>
    </Box>
  );
}

export default App;
