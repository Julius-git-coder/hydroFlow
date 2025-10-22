import { Box, Typography, Grid, Paper, Chip } from "@mui/material";
import { parseISO, differenceInCalendarDays } from "date-fns";
import PropTypes from "prop-types";

export default function AchievementsTab({ hydrationData, baseGoal, achievements }) {

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
        {achievements.map((ach) => (
          <Grid size={{ xs: 6, md: 3 }} key={ach.key}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 2,
                bgcolor: (theme) =>
                  ach.achieved
                    ? theme.palette.primary.light
                    : theme.palette.background.paper,
                color: (theme) =>
                  ach.achieved
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                border: (theme) =>
                  `1px solid ${
                    ach.achieved
                      ? theme.palette.primary.main
                      : theme.palette.divider
                  }`,
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  color: (theme) =>
                    ach.achieved
                      ? theme.palette.primary.main
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
        ))}
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
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stat label="Days Tracked" value={daysTracked} />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stat label="Best Streak" value={`${maxTrackedStreak} days`} />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Stat
              label="Goals Met"
              value={
                sortedData.filter((day) => day.totalIntake >= baseGoal).length
              }
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function Stat({ label, value }) {

  return (
    <Box
      sx={{
        minWidth: 120,
        p: 2,
        borderRadius: 2,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.background.paper
            : "#f9f9f9",
        textAlign: "center",
        boxShadow: (theme) => (theme.palette.mode === "dark" ? 3 : 2),
        border: (theme) => `1px solid ${theme.palette.divider}`,
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
}

Stat.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

AchievementsTab.propTypes = {
  hydrationData: PropTypes.array.isRequired,
  baseGoal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  achievements: PropTypes.array.isRequired,
};
