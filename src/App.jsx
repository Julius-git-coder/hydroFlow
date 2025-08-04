// // import HydrationSummary from "./components/HydrationSummary";
// // import Navbar from "./components/Navbar";
// // import { Box } from "@mui/material";
// // import QuickAdd from "./components/QuickAdd";
// // import Footer from "./components/Footer";
// // import TabBar from "./components/TabBar/TabBar";
// // import WeatherBasedHydration from "./components/WeatherBasedHydration";
// // import { useEffect } from "react";
// // import { useAppContext } from "../context/AppContext";
 
// // function App() {

// //   const { isMuted } = useAppContext();

// //   useEffect(() => {
// //     if ("Notification" in window && Notification.permission !== "granted") {
// //       Notification.requestPermission();
// //     }

// //     const interval = setInterval(() => {
// //       if (
// //         !navigator.onLine &&
// //         Notification.permission === "granted" &&
// //         !isMuted
// //       ) {
// //         new Notification("You're offline. Don't forget to drink water!");
// //       }
// //     }, 1000 * 60 * 60);

// //     return () => clearInterval(interval);
// //   }, [isMuted]);

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100dvh",
// //         display: "flex",
// //         flexDirection: "column",
// //       }}
// //     >
// //       <Box
// //         sx={{
// //           width: {
// //             xs: "100dvw",
// //             md: "80dvw",
// //           },
// //           margin: "0 auto",
// //           mt: 2,
// //           flexGrow: 1, // take up all available space
// //         }}
// //       >
// //         <Navbar />
// //         <Box
// //           sx={{
// //             px: "1rem",
// //           }}
// //         >
// //           <HydrationSummary />
// //           <WeatherBasedHydration />
// //           <QuickAdd />
// //           <TabBar />
// //         </Box>
// //       </Box>
// //       <Footer />
// //     </Box>
// //   );
// // }

// // export default App;
// import HydrationSummary from "./components/HydrationSummary";
// import Navbar from "./components/Navbar";
// import { Box } from "@mui/material";
// import QuickAdd from "./components/QuickAdd";
// import Footer from "./components/Footer";
// import TabBar from "./components/TabBar/TabBar";
// import WeatherBasedHydration from "./components/WeatherBasedHydration";
// import { useEffect } from "react";
// import { useAppContext } from "../context/AppContext";

// function App() {
//   const { isMuted } = useAppContext();

//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }

//     const interval = setInterval(() => {
//       if (
//         !navigator.onLine &&
//         Notification.permission === "granted" &&
//         !isMuted
//       ) {
//         new Notification("You're offline. Don't forget to drink water!");
//       }
//     }, 1000 * 60 * 60); // every 1 hour

//     return () => clearInterval(interval);
//   }, [isMuted]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100dvh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           width: {
//             xs: "100dvw",
//             md: "80dvw",
//           },
//           margin: "0 auto",
//           mt: 2,
//           flexGrow: 1,
//         }}
//       >
//         <Navbar />
//         <Box sx={{ px: "1rem" }}>
//           <HydrationSummary />
//           <WeatherBasedHydration />
//           <QuickAdd />
//           <TabBar />
//         </Box>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// export default App;


// import HydrationSummary from "./components/HydrationSummary";
// import Navbar from "./components/Navbar";
// import { Box } from "@mui/material";
// import QuickAdd from "./components/QuickAdd";
// import Footer from "./components/Footer";
// import TabBar from "./components/TabBar/TabBar";
// import WeatherBasedHydration from "./components/WeatherBasedHydration";
// import { useEffect } from "react";
// import { useAppContext } from "./context/AppContext";

// function App() {
//   const { isMuted } = useAppContext();

//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }

//     const interval = setInterval(() => {
//       if (
//         !navigator.onLine &&
//         Notification.permission === "granted" &&
//         !isMuted
//       ) {
//         new Notification("You're offline. Don't forget to drink water!");
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [isMuted]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100dvh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           width: {
//             xs: "100dvw",
//             md: "80dvw",
//           },
//           margin: "0 auto",
//           mt: 2,
//           flexGrow: 1,
//         }}
//       >
//         <Navbar />
//         <Box
//           sx={{
//             px: "1rem",
//           }}
//         >
//           <HydrationSummary />
//           <WeatherBasedHydration />
//           <QuickAdd />
//           <TabBar />
//         </Box>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// export default App;

// import HydrationSummary from "./components/HydrationSummary";
// import Navbar from "./components/Navbar";
// import { Box } from "@mui/material";
// import QuickAdd from "./components/QuickAdd";
// import Footer from "./components/Footer";
// import TabBar from "./components/TabBar/TabBar";
// import WeatherBasedHydration from "./components/WeatherBasedHydration";
// import { useEffect } from "react";
// import { useAppContext } from "./context/AppContext";

// function App() {
//   const { isMuted } = useAppContext();

//   useEffect(() => {
//     // ✅ Request notification permission on mount
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission().then((permission) => {
//         console.log("Notification permission status:", permission);
//       });
//     }

//     const interval = setInterval(() => {
//       console.log("🔁 Checking for offline + mute status");

//       // ✅ Notify if offline, granted permission, and not muted
//       if (
//         "Notification" in window &&
//         !navigator.onLine &&
//         Notification.permission === "granted" &&
//         !isMuted
//       ) {
//         new Notification("🚰 You're offline. Don't forget to drink water!");
//       }
//     }, 2000); // ⏱️ 2 seconds (testing only)

//     return () => clearInterval(interval);
//   }, [isMuted]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100dvh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           width: {
//             xs: "100dvw",
//             md: "80dvw",
//           },
//           margin: "0 auto",
//           mt: 2,
//           flexGrow: 1,
//         }}
//       >
//         <Navbar />
//         <Box sx={{ px: "1rem" }}>
//           <HydrationSummary />
//           <WeatherBasedHydration />
//           <QuickAdd />
//           <TabBar />
//         </Box>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// export default App;
// import HydrationSummary from "./components/HydrationSummary";
// import Navbar from "./components/Navbar";
// import { Box } from "@mui/material";
// import QuickAdd from "./components/QuickAdd";
// import Footer from "./components/Footer";
// import TabBar from "./components/TabBar/TabBar";
// import WeatherBasedHydration from "./components/WeatherBasedHydration";
// import { useEffect } from "react";
// import { useAppContext } from "./context/AppContext";

// function App() {
//   const { isMuted } = useAppContext();

//   useEffect(() => {
//     // ✅ Request notification permission on mount
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission().then((permission) => {
//         console.log("Notification permission status:", permission);
//       });
//     }

//     const interval = setInterval(() => {
//       console.log("🔁 Checking for offline + mute status");

//       if (
//         "Notification" in window &&
//         Notification.permission === "granted" &&
//         !isMuted
//       ) {
//         // For testing: show notification regardless of online status
//         new Notification("🚰 Test: Don't forget to drink water!");
//       }
//     }, 5000); // ⏱️ Every 5 seconds (for testing)

//     return () => clearInterval(interval);
//   }, [isMuted]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100dvh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           width: {
//             xs: "100dvw",
//             md: "80dvw",
//           },
//           margin: "0 auto",
//           mt: 2,
//           flexGrow: 1,
//         }}
//       >
//         <Navbar />
//         <Box sx={{ px: "1rem" }}>
//           <HydrationSummary />
//           <WeatherBasedHydration />
//           <QuickAdd />
//           <TabBar />
//         </Box>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// export default App;


// import HydrationSummary from "./components/HydrationSummary";
// import Navbar from "./components/Navbar";
// import { Box } from "@mui/material";
// import QuickAdd from "./components/QuickAdd";
// import Footer from "./components/Footer";
// import TabBar from "./components/TabBar/TabBar";
// import WeatherBasedHydration from "./components/WeatherBasedHydration";
// import { useEffect, useRef } from "react";
// import { useAppContext } from "./context/AppContext";

// function App() {
//   const { isMuted } = useAppContext();

//   // Ref for the audio element
//   const audioRef = useRef(null);

//   useEffect(() => {
//     // ✅ Request permission on mount
//     if ("Notification" in window && Notification.permission === "default") {
//       Notification.requestPermission().then((permission) => {
//         console.log("Notification permission status:", permission);
//       });
//     }

//     const interval = setInterval(() => {
//       console.log("🔁 Checking for offline + mute status");

//       if (
//         "Notification" in window &&
//         !navigator.onLine &&
//         Notification.permission === "granted" &&
//         !isMuted
//       ) {
//         // ✅ Trigger notification
//         new Notification("🚰 You're offline. Don't forget to drink water!");

//         // ✅ Play sound
//         if (audioRef.current) {
//           audioRef.current.play().catch((err) => {
//             console.warn("🔇 Sound playback blocked:", err);
//           });
//         }
//       }
//     }, 10000); // ⏱️ 10 seconds for testing; increase later

//     return () => clearInterval(interval);
//   }, [isMuted]);

//   return (
//     <>
//       {/* ✅ Hidden audio element for sound */}
//       <audio ref={audioRef} src="/notification.mp3" preload="auto" />

//       <Box
//         sx={{
//           minHeight: "100dvh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             width: {
//               xs: "100dvw",
//               md: "80dvw",
//             },
//             margin: "0 auto",
//             mt: 2,
//             flexGrow: 1,
//           }}
//         >
//           <Navbar />
//           <Box sx={{ px: "1rem" }}>
//             <HydrationSummary />
//             <WeatherBasedHydration />
//             <QuickAdd />
//             <TabBar />
//           </Box>
//         </Box>
//         <Footer />
//       </Box>
//     </>
//   );
// }

// export default App;


import HydrationSummary from "./components/HydrationSummary";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import QuickAdd from "./components/QuickAdd";
import Footer from "./components/Footer";
import TabBar from "./components/TabBar/TabBar";
import WeatherBasedHydration from "./components/WeatherBasedHydration";
import { useEffect, useState } from "react";
import { useAppContext } from "./context/AppContext";

function App() {
  const { isMuted } = useAppContext();
  const [userInteracted, setUserInteracted] = useState(false);

  // Detect first user interaction (required to unlock audio)
  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);
    window.addEventListener("click", handleInteraction, { once: true });

    return () => window.removeEventListener("click", handleInteraction);
  }, []);

  useEffect(() => {
    // Request permission for notifications
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

      const audio = new Audio("/notification.mp3"); // File in public folder
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
;

        // Sound + vibration
        playNotificationSound();

        if (navigator.vibrate) {
          navigator.vibrate([2000]);
        }
      }
    }, 10000); // set to 10s for testing. Change to 3600000 (1 hr) later

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
    </Box>
  );
}

export default App;

