// AppContext.js or the context provider code
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { parseISO, differenceInCalendarDays, isSameDay } from "date-fns";
import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SunnyIcon from "@mui/icons-material/Sunny";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpacityIcon from "@mui/icons-material/Opacity";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { auth } from "../../Service/FirebaseConfig";
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
const MAX_DAILY_WATER = 5000; // Enforce 5000ml cap for net water intake
const MAX_DAILY_CAFFEINE = 400; // Enforce 400mg cap for daily caffeine intake
export const AppProvider = ({ children }) => {
  const [baseGoal, setBaseGoal] = useState(() => {
    const stored = localStorage.getItem("aquatrack_base_goal");
    return stored ? stored : "2500";
  });
  useEffect(() => {
    localStorage.setItem("aquatrack_base_goal", baseGoal);
  }, [baseGoal]);
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
  // Warning modal state with type
  const [warning, setWarning] = useState({
    open: false,
    message: "",
    type: "",
  });
  const showWarning = useCallback((msg, type) => {
    if (isMuted) return; // Suppress warnings if muted
    setWarning({ open: true, message: msg, type: type });
  }, [isMuted]);
  const closeWarning = () => setWarning({ open: false, message: "", type: "" });
  // Offline status
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  // Persist local cache
  useEffect(() => {
    localStorage.setItem("aquatrack_history", JSON.stringify(hydrationData));
  }, [hydrationData]);
  // Load hydration and caffeine logs from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setHydrationData([]);
        return;
      }
      if (!isOnline) {
        showWarning(
          "You are offline. Data will sync when you're back online.",
          "offline"
        );
        return;
      }
      try {
        const q = query(
          collection(db, "users", user.uid, "intakes"),
          orderBy("timestamp", "asc")
        );
        const snapshot = await getDocs(q);
        const logs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        const grouped = logs.reduce((acc, log) => {
          const date = log.date;
          if (!acc[date]) {
            acc[date] = {
              date,
              totalIntake: 0,
              caffeineIntake: 0,
              caffeineOffset: 0,
              logs: [],
              caffeineLogs: [],
            };
          }
          if (log.caffeine) {
            acc[date].caffeineIntake += Number(log.caffeine || 0);
            acc[date].caffeineOffset += Math.round(
              Number(log.caffeine || 0) * 1.2
            );
            acc[date].caffeineLogs.push(log);
          } else {
            acc[date].totalIntake += Number(log.amount || 0);
            acc[date].logs.push(log);
          }
          return acc;
        }, {});
        setHydrationData(Object.values(grouped));
      } catch (e) {
        console.error("Error loading data:", e);
        showWarning(
          "Failed to load data. Please check your connection.",
          "error"
        );
      }
    });
    return unsubscribe;
  }, [isOnline, showWarning]);
  // Utility: get today's net intake
  const getTodayNetIntake = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayData = hydrationData.find((d) => d.date === today);
    return todayData
      ? Number(todayData.totalIntake) - Number(todayData.caffeineOffset || 0)
      : 0;
  };
  // Utility: get today's total caffeine intake
  const getTodayCaffeineIntake = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayData = hydrationData.find((d) => d.date === today);
    return todayData ? Number(todayData.caffeineIntake || 0) : 0;
  };
  // Add water intake with limit
  const addLog = async (amount, type) => {
    if (!auth.currentUser) return;
    if (!isOnline) {
      showWarning(
        "You are offline. Water intake will sync when you're back online.",
        "offline"
      );
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const currentNetIntake = getTodayNetIntake();
    if (currentNetIntake + Number(amount) > MAX_DAILY_WATER) {
      showWarning(
        <span style={{ fontSize: "0.75rem" }}>
          Drinking too much water can cause water intoxication (hyponatremia), a
          condition where blood sodium levels drop dangerously low.
        </span>,
        "water"
      );
      return;
    }
    const uid = auth.currentUser.uid;
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
      showWarning("Failed to save water intake. Please try again.", "error");
      return;
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
        {
          date: today,
          totalIntake: Number(amount),
          caffeineIntake: 0,
          caffeineOffset: 0,
          logs: [newLog],
          caffeineLogs: [],
        },
      ];
    });
  };
  // Add caffeine intake with limit
  const addCaffeineLog = async (caffeine, type, volume = null) => {
    if (!auth.currentUser) return;
    if (!isOnline) {
      showWarning(
        "You are offline. Caffeine intake will sync when you're back online.",
        "offline"
      );
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const caffeineAmount = Number(caffeine);
    const currentCaffeineIntake = getTodayCaffeineIntake();
    if (currentCaffeineIntake + caffeineAmount > MAX_DAILY_CAFFEINE) {
      showWarning(
        <span style={{ fontSize: "0.75rem" }}>
          Exceeding 400mg of caffeine per day may lead to side effects like
          anxiety, insomnia, or increased heart rate. Stay safe!
        </span>,
        "caffeine"
      );
      return;
    }
    const offset = Math.round(caffeineAmount * 1.2);
    const uid = auth.currentUser.uid;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newLog = {
      caffeine: caffeineAmount,
      amount: volume,
      type: type?.toLowerCase() || "custom",
      time,
      date: today,
      timestamp: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, "users", uid, "intakes"), newLog);
    } catch (e) {
      console.error("Error saving caffeine intake:", e);
      showWarning("Failed to save caffeine intake. Please try again.", "error");
      return;
    }
    setHydrationData((prev) => {
      const existingDay = prev.find((entry) => entry.date === today);
      if (existingDay) {
        return prev.map((entry) =>
          entry.date === today
            ? {
                ...entry,
                caffeineIntake:
                  Number(entry.caffeineIntake || 0) + caffeineAmount,
                caffeineOffset: Number(entry.caffeineOffset || 0) + offset,
                caffeineLogs: [...(entry.caffeineLogs || []), newLog],
              }
            : entry
        );
      }
      return [
        ...prev,
        {
          date: today,
          totalIntake: 0,
          caffeineIntake: caffeineAmount,
          caffeineOffset: offset,
          logs: [],
          caffeineLogs: [newLog],
        },
      ];
    });
  };
  // Delete intake (water or caffeine)
  const deleteLog = async (timestamp) => {
    if (!auth.currentUser) return;
    if (!isOnline) {
      showWarning(
        "You are offline. Deletion will sync when you're back online.",
        "offline"
      );
      return;
    }
    const uid = auth.currentUser.uid;
    const q = query(
      collection(db, "users", uid, "intakes"),
      where("timestamp", "==", timestamp)
    );
    try {
      const snap = await getDocs(q);
      const batch = writeBatch(db);
      snap.forEach((d) => batch.delete(doc(db, "users", uid, "intakes", d.id)));
      await batch.commit();
      setHydrationData((prev) =>
        prev
          .map((entry) => {
            const isCaffeineLog = entry.caffeineLogs?.some(
              (log) => log.timestamp === timestamp
            );
            if (isCaffeineLog) {
              const newCaffeineLogs = entry.caffeineLogs.filter(
                (log) => log.timestamp !== timestamp
              );
              const newCaffeineIntake = newCaffeineLogs.reduce(
                (sum, l) => sum + Number(l.caffeine || 0),
                0
              );
              const newCaffeineOffset = Math.round(newCaffeineIntake * 1.2);
              return {
                ...entry,
                caffeineLogs: newCaffeineLogs,
                caffeineIntake: newCaffeineIntake,
                caffeineOffset: newCaffeineOffset,
              };
            } else {
              const newLogs = entry.logs.filter(
                (log) => log.timestamp !== timestamp
              );
              return {
                ...entry,
                logs: newLogs,
                totalIntake: newLogs.reduce(
                  (sum, l) => sum + Number(l.amount),
                  0
                ),
              };
            }
          })
          .filter(
            (entry) => entry.logs.length > 0 || entry.caffeineLogs?.length > 0
          )
      );
    } catch (e) {
      console.error("Error deleting intake:", e);
      showWarning("Failed to delete intake. Please try again.", "error");
    }
  };
  // Update intake (water or caffeine)
  const updateLog = async (timestamp, newAmount, newType) => {
    if (!auth.currentUser) return;
    if (!isOnline) {
      showWarning(
        "You are offline. Updates will sync when you're back online.",
        "offline"
      );
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const todayData = hydrationData.find((d) => d.date === today);
    const isCaffeineLog = todayData?.caffeineLogs?.some(
      (l) => l.timestamp === timestamp
    );
    const uid = auth.currentUser.uid;
    const q = query(
      collection(db, "users", uid, "intakes"),
      where("timestamp", "==", timestamp)
    );
    try {
      const snap = await getDocs(q);
      if (isCaffeineLog) {
        const oldLog = todayData.caffeineLogs.find(
          (l) => l.timestamp === timestamp
        );
        const oldCaffeine = oldLog ? Number(oldLog.caffeine) : 0;
        const newCaffeine = Number(newAmount);
        const currentCaffeineIntake = getTodayCaffeineIntake();
        const newCaffeineTotal =
          currentCaffeineIntake - oldCaffeine + newCaffeine;
        if (newCaffeineTotal > MAX_DAILY_CAFFEINE) {
          showWarning(
            <span style={{ fontSize: "0.75rem" }}>
              Exceeding 400mg of caffeine per day may lead to side effects like
              anxiety, insomnia, or increased heart rate. Stay safe!
            </span>,
            "caffeine"
          );
          return;
        }
        const newOffset = Math.round(newCaffeine * 1.2);
        const oldOffset = Math.round(oldCaffeine * 1.2);
        const currentNetIntake =
          Number(todayData.totalIntake) - Number(todayData.caffeineOffset || 0);
        if (currentNetIntake + oldOffset - newOffset > MAX_DAILY_WATER) {
          showWarning(
            <div style={{ textAlign: "center", width: "100%" }}>
              🚫 Drink Safely, Stay Safe!
            </div>,
            "water"
          );
          return;
        }
        const batch = writeBatch(db);
        snap.forEach((d) =>
          batch.update(doc(db, "users", uid, "intakes", d.id), {
            caffeine: newCaffeine,
            type: newType,
            amount: oldLog.amount, // Preserve volume
          })
        );
        await batch.commit();
        setHydrationData((prev) =>
          prev.map((entry) =>
            entry.date === today
              ? {
                  ...entry,
                  caffeineLogs: entry.caffeineLogs.map((log) =>
                    log.timestamp === timestamp
                      ? { ...log, caffeine: newCaffeine, type: newType }
                      : log
                  ),
                  caffeineIntake:
                    Number(entry.caffeineIntake) - oldCaffeine + newCaffeine,
                  caffeineOffset:
                    Number(entry.caffeineOffset) - oldOffset + newOffset,
                }
              : entry
          )
        );
      } else {
        const oldLog = todayData?.logs.find((l) => l.timestamp === timestamp);
        const oldAmount = oldLog ? Number(oldLog.amount) : 0;
        const currentNetIntake =
          Number(todayData?.totalIntake || 0) -
          Number(todayData?.caffeineOffset || 0);
        const newTotal = currentNetIntake - oldAmount + Number(newAmount);
        if (newTotal > MAX_DAILY_WATER) {
          showWarning(
            <div style={{ textAlign: "center", width: "100%" }}>
              🚫 Drink Safely, Stay Safe!
            </div>,
            "water"
          );
          return;
        }
        const batch = writeBatch(db);
        snap.forEach((d) =>
          batch.update(doc(db, "users", uid, "intakes", d.id), {
            amount: Number(newAmount),
            type: newType,
          })
        );
        await batch.commit();
        setHydrationData((prev) =>
          prev.map((entry) =>
            entry.date === today
              ? {
                  ...entry,
                  logs: entry.logs.map((log) =>
                    log.timestamp === timestamp
                      ? { ...log, amount: Number(newAmount), type: newType }
                      : log
                  ),
                  totalIntake: entry.logs.reduce(
                    (sum, l) =>
                      l.timestamp === timestamp
                        ? sum + Number(newAmount)
                        : sum + Number(l.amount),
                    0
                  ),
                }
              : entry
          )
        );
      }
    } catch (e) {
      console.error("Error updating intake:", e);
      showWarning("Failed to update intake. Please try again.", "error");
    }
  };
  // Export data as CSV
  const exportData = () => {
    console.log("Starting exportData...");
    if (!auth.currentUser) {
      showWarning("Please log in to export your data.", "auth");
      console.log("Export failed: User not authenticated");
      return;
    }
    if (!hydrationData || hydrationData.length === 0) {
      showWarning("No data available to export.", "no-data");
      console.log("Export failed: No hydration data available");
      return;
    }
    try {
      console.log("Processing hydrationData:", hydrationData);
      // Validate and combine water and caffeine logs
      const allLogs = hydrationData
        .flatMap((day) => {
          if (!day.date || typeof day.date !== "string") {
            console.warn("Invalid day entry, missing date:", day);
            return [];
          }
          const waterLogs = (day.logs || []).map((log) => {
            if (!log.time || !log.type || log.amount === undefined) {
              console.warn("Invalid water log:", log);
              return null;
            }
            return {
              date: day.date,
              time: log.time,
              type: log.type,
              waterAmount: Number(log.amount) || 0,
              caffeineAmount: 0,
            };
          });
          const caffeineLogs = (day.caffeineLogs || []).map((log) => {
            if (!log.time || !log.type || log.caffeine === undefined) {
              console.warn("Invalid caffeine log:", log);
              return null;
            }
            return {
              date: day.date,
              time: log.time,
              type: log.type,
              waterAmount: Number(log.amount) || 0,
              caffeineAmount: Number(log.caffeine) || 0,
            };
          });
          return [...waterLogs, ...caffeineLogs].filter((log) => log !== null);
        })
        .sort((a, b) => {
          try {
            return (
              new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
            );
          } catch (e) {
            console.warn("Error sorting logs:", a, b, e);
            return 0;
          }
        });
      if (allLogs.length === 0) {
        showWarning("No valid data to export after validation.", "no-data");
        console.log("Export failed: No valid logs after filtering");
        return;
      }
      console.log("Generated logs for CSV:", allLogs);
      // Create CSV content
      const headers = [
        "Date",
        "Time",
        "Type",
        "Water Amount (ml)",
        "Caffeine Amount (mg)",
      ];
      const csvRows = [
        headers.join(","),
        ...allLogs.map((log) =>
          [
            log.date,
            log.time,
            `"${log.type.replace(/"/g, '""')}"`, // Escape quotes in type
            log.waterAmount,
            log.caffeineAmount,
          ].join(",")
        ),
      ];
      const csvContent = csvRows.join("\n");
      console.log("CSV content generated:", csvContent);
      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `hydration_data_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("Export completed successfully");
    } catch (e) {
      console.error("Error exporting data:", e);
      showWarning("Failed to export data. Please try again.", "error");
    }
  };
  // Import data from CSV
  const importData = async (file) => {
    console.log("Starting importData...");
    if (!auth.currentUser) {
      showWarning("Please log in to import your data.", "auth");
      console.log("Import failed: User not authenticated");
      return;
    }
    if (!isOnline) {
      showWarning(
        "You are offline. Data import will be available when you're back online.",
        "offline"
      );
      console.log("Import failed: Offline mode");
      return;
    }
    if (!file || file.type !== "text/csv") {
      showWarning("Please upload a valid CSV file.", "invalid-file");
      console.log("Import failed: Invalid file type");
      return;
    }
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const rows = text.split("\n").map((row) => row.trim());
        if (rows.length < 2) {
          showWarning("CSV file is empty or invalid.", "invalid-csv");
          console.log("Import failed: Empty or invalid CSV");
          return;
        }
        // Validate headers
        const headers = rows[0].split(",").map((h) => h.trim());
        const expectedHeaders = [
          "Date",
          "Time",
          "Type",
          "Water Amount (ml)",
          "Caffeine Amount (mg)",
        ];
        if (!expectedHeaders.every((h, i) => headers[i] === h)) {
          showWarning("CSV file has incorrect headers.", "invalid-csv");
          console.log("Import failed: Incorrect headers", headers);
          return;
        }
        // Parse CSV data
        const newLogs = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row) continue;
          const [date, time, type, waterAmount, caffeineAmount] = row
            .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
            .map((item) => item.trim().replace(/^"|"$/g, ""));
          // Validate date and time
          if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            console.warn("Invalid date format in row:", row);
            continue;
          }
          if (!/^\d{1,2}:\d{2}\s*(AM|PM)?$/i.test(time)) {
            console.warn("Invalid time format in row:", row);
            continue;
          }
          // Validate amounts
          const water = Number(waterAmount);
          const caffeine = Number(caffeineAmount);
          if (isNaN(water) || isNaN(caffeine)) {
            console.warn("Invalid amount in row:", row);
            continue;
          }
          // Generate unique timestamp for each log
          const timestamp = new Date(`${date} ${time}`).toISOString();
          newLogs.push({
            date,
            time,
            type: type || "custom",
            amount: water > 0 ? water : undefined,
            caffeine: caffeine > 0 ? caffeine : undefined,
            timestamp,
          });
        }
        if (newLogs.length === 0) {
          showWarning("No valid data found in the CSV file.", "invalid-csv");
          console.log("Import failed: No valid data in CSV");
          return;
        }
        // Check daily limits
        const groupedByDate = newLogs.reduce((acc, log) => {
          if (!acc[log.date]) {
            acc[log.date] = { water: 0, caffeine: 0, logs: [] };
          }
          if (log.caffeine) {
            acc[log.date].caffeine += log.caffeine;
          } else {
            acc[log.date].water += log.amount;
            acc[log.date].caffeine += log.caffeine || 0;
          }
          acc[log.date].logs.push(log);
          return acc;
        }, {});
        for (const date in groupedByDate) {
          const day = groupedByDate[date];
          const netWater = day.water - Math.round(day.caffeine * 1.2);
          if (netWater > MAX_DAILY_WATER) {
            showWarning(
              `Water intake for ${date} exceeds the daily limit of ${MAX_DAILY_WATER}ml.`,
              "water"
            );
            console.log("Import failed: Water limit exceeded for", date);
            return;
          }
          if (day.caffeine > MAX_DAILY_CAFFEINE) {
            showWarning(
              `Caffeine intake for ${date} exceeds the daily limit of ${MAX_DAILY_CAFFEINE}mg.`,
              "caffeine"
            );
            console.log("Import failed: Caffeine limit exceeded for", date);
            return;
          }
        }
        // Save to Firestore
        const uid = auth.currentUser.uid;
        const batch = writeBatch(db);
        newLogs.forEach((log) => {
          const docRef = doc(collection(db, "users", uid, "intakes"));
          batch.set(docRef, log);
        });
        await batch.commit();
        // Update local state
        setHydrationData((prev) => {
          const grouped = newLogs.reduce((acc, log) => {
            if (!acc[log.date]) {
              acc[log.date] = {
                date: log.date,
                totalIntake: 0,
                caffeineIntake: 0,
                caffeineOffset: 0,
                logs: [],
                caffeineLogs: [],
              };
            }
            if (log.caffeine) {
              acc[log.date].caffeineIntake += Number(log.caffeine);
              acc[log.date].caffeineOffset += Math.round(
                Number(log.caffeine) * 1.2
              );
              acc[log.date].caffeineLogs.push(log);
            } else {
              acc[log.date].totalIntake += Number(log.amount);
              acc[log.date].logs.push(log);
            }
            return acc;
          }, {});
          // Merge with existing data
          const merged = { ...grouped };
          prev.forEach((day) => {
            if (!merged[day.date]) {
              merged[day.date] = { ...day };
            } else {
              merged[day.date].totalIntake += day.totalIntake;
              merged[day.date].caffeineIntake += day.caffeineIntake;
              merged[day.date].caffeineOffset += day.caffeineOffset;
              merged[day.date].logs.push(...day.logs);
              merged[day.date].caffeineLogs.push(...day.caffeineLogs);
            }
          });
          return Object.values(merged).sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
        });
        showWarning("Data imported successfully!", "success");
        console.log("Import completed successfully");
      };
      reader.onerror = () => {
        showWarning("Failed to read the CSV file. Please try again.", "error");
        console.log("Import failed: FileReader error");
      };
      reader.readAsText(file);
    } catch (e) {
      console.error("Error importing data:", e);
      showWarning("Failed to import data. Please try again.", "error");
    }
  };
  // Reset functions
  const resetToday = async () => {
    if (!auth.currentUser) return;
    if (!isOnline) {
      showWarning(
        "You are offline. Reset will sync when you're back online.",
        "offline"
      );
      return;
    }
    const uid = auth.currentUser.uid;
    const today = new Date().toISOString().split("T")[0];
    try {
      const q = query(
        collection(db, "users", uid, "intakes"),
        where("date", "==", today)
      );
      const snap = await getDocs(q);
      const batch = writeBatch(db);
      snap.forEach((d) => batch.delete(doc(db, "users", uid, "intakes", d.id)));
      await batch.commit();
      setHydrationData((prev) => prev.filter((entry) => entry.date !== today));
    } catch (e) {
      console.error("Error resetting today:", e);
      showWarning("Failed to reset today's data. Please try again.", "error");
    }
  };
  const resetLogs = async () => {
    if (!auth.currentUser) return;
    if (!isOnline) {
      showWarning(
        "You are offline. Reset will sync when you're back online.",
        "offline"
      );
      return;
    }
    const uid = auth.currentUser.uid;
    try {
      const snap = await getDocs(collection(db, "users", uid, "intakes"));
      const batch = writeBatch(db);
      snap.forEach((d) => batch.delete(doc(db, "users", uid, "intakes", d.id)));
      await batch.commit();
      setHydrationData([]);
    } catch (e) {
      console.error("Error resetting logs:", e);
      showWarning("Failed to reset all data. Please try again.", "error");
    }
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
    const netIntake = todayData
      ? Number(todayData.totalIntake) - Number(todayData.caffeineOffset || 0)
      : 0;
    const todayGoalPercent = todayData
      ? Math.round((netIntake / baseGoal) * 100)
      : 0;
    const goalAchievedToday = netIntake >= baseGoal;
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
  // Define dialog title content to avoid inline JSX issues
  const getDialogTitle = () => {
    const titles = {
      "no-data": "No Data to Export",
      auth: "Authentication Required",
      caffeine: "Caffeine Limit Exceeded",
      water: "Water Limit Exceeded",
      offline: "Offline Mode",
      "invalid-file": "Invalid File Type",
      "invalid-csv": "Invalid CSV Format",
      success: "Import Successful",
      error: "Error",
    };
    return (
      <>
        ⚠️{" "}
        <span style={{ fontSize: "0.75rem" }}>
          {titles[warning.type] || "Error"}
        </span>
      </>
    );
  };
  return (
    <AppContext.Provider
      value={{
        baseGoal,
        setBaseGoal,
        hydrationData,
        addLog,
        addCaffeineLog,
        deleteLog,
        updateLog,
        exportData,
        importData,
        resetToday,
        resetLogs,
        weatherAdjustment,
        setWeatherAdjustment,
        darkMode,
        setDarkMode,
        isMuted,
        toggleMute,
        achievements,
        MAX_DAILY_WATER,
        MAX_DAILY_CAFFEINE,
        isOnline,
      }}
    >
      {children}
      <Dialog open={warning.open} onClose={closeWarning}>
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          <Typography>{warning.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWarning} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(AppContext);
