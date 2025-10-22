/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Typography, Grid, Paper, Chip, useTheme } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { parseISO, differenceInCalendarDays } from "date-fns";
import PropTypes from "prop-types";

const Stat = ({ label, value, theme }) => {
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minWidth: 120,
        p: 2,
        borderRadius: 2,
        bgcolor: isDark ? theme.palette.background.paper : "#f9f9f9",
        textAlign: "center",
        boxShadow: isDark ? 3 : 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography fontWeight="bold" color="text.primary">
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  theme: PropTypes.object.isRequired,
};

const AchievementsTab = () => {
  const { hydrationData, baseGoal, achievements } = useAppContext();
  const theme = useTheme();
  
  // Extract theme values to avoid calling hooks in map
  const primaryLight = theme.palette.primary.light;
  const backgroundPaper = theme.palette.background.paper;
  const primaryMain = theme.palette.primary.main;
  const textPrimary = theme.palette.text.primary;
  
  // Extract achievements rendering to avoid hooks in map
  const renderAchievements = () => {
    return achievements.map((ach, i) => (
      <Grid size={{ xs: 6, md: 3 }} key={i}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            textAlign: "center",
            borderRadius: 2,
            bgcolor: ach.achieved
              ? primaryLight
              : backgroundPaper,
            color: ach.achieved
              ? primaryMain
              : textPrimary,
            border: `1px solid ${
              ach.achieved
                ? primaryMain
                : theme.palette.divider
            }`,
          }}
        >
          <Box
            sx={{
              mb: 1,
              display: "flex",
              justifyContent: "center",
              color: ach.achieved
                ? primaryMain
                : theme.palette.grey[400],
            }}
          >
            {ach.icon}
          </Box>
          <Typography fontWeight="bold" variant="body2">
            {ach.title}
          </Typography>
          <Typography variant="body2" mb={1}>
            {ach.description}
          </Typography>
          {ach.achieved ? (
            <Chip
              label="Unlocked"
              sx={{
                bgcolor: "#000000",
                color: "#FFFFFF",
                fontWeight: "bold",
                borderRadius: "999px",
                fontSize: "0.75rem",
                px: 1.5,
              }}
            />
          ) : (
            <Chip
              label={ach.progress}
              size="small"
              variant="outlined"
              sx={{
                mt: 1,
              }}
            />
          )}
        </Paper>
      </Grid>
    ));
  };

  const sortedData = [...hydrationData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const totalWater = sortedData.reduce((sum, day) => sum + day.totalIntake, 0);
  const daysTracked = sortedData.length;

  //  Tracked streak (3 consecutive days of logging, regardless of goal met)
  let trackedStreak = 1;
  let maxTrackedStreak = 1;

  for (let i = 1; i < sortedData.length; i++) {
    const prevDate = parseISO(sortedData[i - 1].date);
    const currDate = parseISO(sortedData[i].date);

    const dayDiff = differenceInCalendarDays(currDate, prevDate);

    if (dayDiff === 1) {
      trackedStreak++;
      maxTrackedStreak = Math.max(maxTrackedStreak, trackedStreak);
    } else if (dayDiff > 1) {
      trackedStreak = 1; // streak broken
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Your Achievements
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Track your hydration milestones and earn badges
      </Typography>

      <Grid container spacing={2}>
        {renderAchievements()}
      </Grid>

      {/* Lifetime Stats */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Lifetime Stats
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stat
              label="Total Water"
              value={`${totalWater.toLocaleString()}ml`}
              theme={theme}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stat label="Days Tracked" value={daysTracked} theme={theme} />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stat label="Best Streak" value={`${maxTrackedStreak} days`} theme={theme} />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stat
              label="Goals Met"
              value={
                sortedData.filter((day) => day.totalIntake >= baseGoal).length
              }
              theme={theme}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AchievementsTab;
