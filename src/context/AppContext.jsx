import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { parseISO, differenceInCalendarDays, isSameDay } from "date-fns";
import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SunnyIcon from "@mui/icons-material/Sunny";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpacityIcon from "@mui/icons-material/Opacity";

import { auth } from "../../Service/firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  writeBatch,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AppContext = createContext();
const db = getFirestore();

export const AppProvider = ({ children }) => {
  const [baseGoal, setBaseGoal] = useState("2000");

  const [hydrationData, setHydrationData] = useState(() => {
    const stored = localStorage.getItem("aquatrack_history");
    return stored ? JSON.parse(stored) : [];
  });

  const [weatherAdjustment, setWeatherAdjustment] = useState(0);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("aquatrack_dark_mode");
    return stored === "true";
  });
  useEffect(() => {
    localStorage.setItem("aquatrack_dark_mode", darkMode);
  }, [darkMode]);

  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem("aquatrack_mute");
    return stored === "true";
  });
  const toggleMute = () => {
    setIsMuted((prev) => {
      const updated = !prev;
      localStorage.setItem("aquatrack_mute", updated);
      return updated;
    });
  };

  // Persist local cache
  useEffect(() => {
    localStorage.setItem("aquatrack_history", JSON.stringify(hydrationData));
  }, [hydrationData]);

  // Load hydration logs from Firestore on auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setHydrationData([]);
        return;
      }

      const q = query(
        collection(db, "users", user.uid, "intakes"),
        orderBy("timestamp", "asc")
      );
      const snapshot = await getDocs(q);

      const logs = snapshot.docs.map((d) => d.data());

      const grouped = logs.reduce((acc, log) => {
        const date = log.date;
        if (!acc[date]) acc[date] = { date, totalIntake: 0, logs: [] };
        acc[date].totalIntake += Number(log.amount || 0);
        acc[date].logs.push(log);
        return acc;
      }, {});
      setHydrationData(Object.values(grouped));
    });

    return unsubscribe;
  }, []);

  // Add intake log
  const addLog = async (amount, type) => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;

    const today = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newLog = {
      amount: Number(amount),
      type,
      time,
      date: today,
      timestamp: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "users", uid, "intakes"), newLog);
    } catch (e) {
      console.error("Error saving intake:", e);
    }

    setHydrationData((prev) => {
      const existingDay = prev.find((entry) => entry.date === today);
      if (existingDay) {
        return prev.map((entry) =>
          entry.date === today
            ? {
                ...entry,
                totalIntake: Number(entry.totalIntake) + Number(amount),
                logs: [...entry.logs, newLog],
              }
            : entry
        );
      }
      return [
        ...prev,
        { date: today, totalIntake: Number(amount), logs: [newLog] },
      ];
    });
  };

  // ✅ Delete a single log
  const deleteLog = async (timestamp) => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;

    const q = query(
      collection(db, "users", uid, "intakes"),
      where("timestamp", "==", timestamp)
    );
    const snap = await getDocs(q);

    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(doc(db, "users", uid, "intakes", d.id)));
    await batch.commit();

    setHydrationData((prev) =>
      prev
        .map((entry) => {
          const newLogs = entry.logs.filter(
            (log) => log.timestamp !== timestamp
          );
          return {
            ...entry,
            logs: newLogs,
            totalIntake: newLogs.reduce((sum, l) => sum + l.amount, 0),
          };
        })
        .filter((entry) => entry.logs.length > 0)
    );
  };

  // ✅ Reset today’s logs
  const resetToday = async () => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;
    const today = new Date().toISOString().split("T")[0];

    const q = query(
      collection(db, "users", uid, "intakes"),
      where("date", "==", today)
    );
    const snap = await getDocs(q);
    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(doc(db, "users", uid, "intakes", d.id)));
    await batch.commit();

    setHydrationData((prev) => prev.filter((entry) => entry.date !== today));
  };

  // ✅ Reset all logs
  const resetLogs = async () => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;

    const snap = await getDocs(collection(db, "users", uid, "intakes"));
    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(doc(db, "users", uid, "intakes", d.id)));
    await batch.commit();

    setHydrationData([]);
  };

  // Achievements
  const achievements = useMemo(() => {
    const today = new Date();
    const sortedData = [...hydrationData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let currentStreak = 1;
    const reversedData = [...sortedData].reverse();

    for (let i = 1; i < reversedData.length; i++) {
      const prevDate = parseISO(reversedData[i].date);
      const currDate = parseISO(reversedData[i - 1].date);
      const dayDiff = differenceInCalendarDays(prevDate, currDate);

      if (dayDiff === 1) {
        currentStreak++;
      } else if (dayDiff > 1 || differenceInCalendarDays(today, currDate) > 1) {
        break;
      }
    }

    const todayData = sortedData.find((day) =>
      isSameDay(parseISO(day.date), today)
    );
    const todayGoalPercent = todayData
      ? Math.round((todayData.totalIntake / baseGoal) * 100)
      : 0;
    const goalAchievedToday = todayData?.totalIntake >= baseGoal;
    const todayLogs = todayData?.logs || [];

    const consistencyProgress = Math.min(todayLogs.length, 5);

    const earlyBird = todayLogs.some((log) => {
      const [time, meridian] = log.time.split(" ");
      const [hour] = time.split(":");
      const hour24 = meridian === "PM" && +hour < 12 ? +hour + 12 : +hour;
      return hour24 < 9;
    });

    return [
      {
        key: "streak_master",
        title: "Streak Master",
        description: "Maintain a 3-day streak",
        progress: `${Math.min(currentStreak, 3)}/3 days`,
        achieved: currentStreak >= 3,
        icon: <BoltIcon fontSize="medium" />,
      },
      {
        key: "goal_achiever",
        title: "Goal Achiever",
        description: "Reach your daily goal",
        progress: `${todayGoalPercent}%`,
        achieved: !!goalAchievedToday,
        icon: <EmojiEventsIcon fontSize="medium" />,
      },
      {
        key: "early_bird",
        title: "Early Bird",
        description: "Drink water before 9 AM",
        progress: earlyBird ? "✔️" : "Not yet",
        achieved: earlyBird,
        icon: <SunnyIcon fontSize="medium" />,
      },
      {
        key: "consistency_king",
        title: "Consistency King",
        description: "Drink 5+ times in a day",
        progress: `${consistencyProgress}/5 times`,
        achieved: consistencyProgress >= 5,
        icon: <CalendarTodayIcon fontSize="medium" />,
      },
      {
        key: "hydration_hero",
        title: "Hydration Hero",
        description: "Drink 150% of your daily goal",
        progress: `${todayGoalPercent}%`,
        achieved: todayGoalPercent >= 150,
        icon: <OpacityIcon fontSize="medium" />,
      },
    ];
  }, [hydrationData, baseGoal]);

  return (
    <AppContext.Provider
      value={{
        baseGoal,
        setBaseGoal,
        hydrationData,
        setHydrationData,
        addLog,
        deleteLog, // ✅ exposed
        resetToday,
        resetLogs,
        achievements,
        weatherAdjustment,
        setWeatherAdjustment,
        darkMode,
        setDarkMode,
        isMuted,
        toggleMute,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
