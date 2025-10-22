// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   useTheme,
//   IconButton,
// } from "@mui/material";
// import { useAppContext } from "../../context/AppContext";
// import { isToday, parseISO } from "date-fns";
// import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

// import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
// import ScienceIcon from "@mui/icons-material/Science";
// import CategoryIcon from "@mui/icons-material/Category";
// import OpacityIcon from "@mui/icons-material/Opacity";
// import LocalCafeIcon from "@mui/icons-material/LocalCafe";
// import WineBarIcon from "@mui/icons-material/WineBar";
// import DeleteIcon from "@mui/icons-material/Delete";

// const getIntakeIcon = (type) => {
//   switch (type) {
//     case "glass":
//       return <LocalDrinkIcon color="primary" />;
//     case "small bottle":
//       return <ScienceIcon color="primary" />;
//     case "regular bottle":
//       return <CategoryIcon color="primary" />;
//     case "large bottle":
//       return <OpacityIcon color="primary" />;
//     case "coffee mug":
//       return <LocalCafeIcon color="primary" />;
//     case "milk glass":
//       return <WineBarIcon color="primary" />;
//     default:
//       return <LocalDrinkIcon color="primary" />;
//   }
// };

// const COLORS = ["#1976d2", "#e0e0e0"];

// const TodayTab = () => {
//   const { hydrationData, baseGoal, deleteLog } = useAppContext();
//   const theme = useTheme();

//   const todayLogs =
//     hydrationData.find((d) => isToday(parseISO(d.date)))?.logs || [];

//   const totalConsumed = todayLogs.reduce((sum, log) => sum + log.amount, 0);
//   const percentage = (totalConsumed / baseGoal) * 100;

//   const pieData =
//     percentage >= 100
//       ? [
//           { name: "Completed", value: 100 },
//           { name: "Extra", value: percentage - 100 },
//         ]
//       : [
//           { name: "Consumed", value: percentage },
//           { name: "Remaining", value: 100 - percentage },
//         ];

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h6" fontWeight="bold">
//         Today's Log
//       </Typography>
//       <Typography variant="body2" color="text.secondary" gutterBottom>
//         Your water intake throughout the day
//       </Typography>

//       {todayLogs.length === 0 ? (
//         <Typography variant="body2" color="text.secondary">
//           No logs yet.
//         </Typography>
//       ) : (
//         <>
//           <Box sx={{ height: 220, my: 4, px: 2 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   innerRadius={65}
//                   outerRadius={85}
//                   paddingAngle={3}
//                   dataKey="value"
//                   startAngle={90}
//                   endAngle={-270}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                   <Label
//                     value={
//                       percentage >= 100
//                         ? "Target\nCompleted"
//                         : `${Math.round(percentage)}%`
//                     }
//                     position="center"
//                     dy={4}
//                     style={{
//                       fill: theme.palette.text.primary,
//                       fontSize: "1rem",
//                       whiteSpace: "pre-line",
//                       textAlign: "center",
//                       lineHeight: 1.4,
//                     }}
//                   />
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>

//             {percentage > 100 && (
//               <Typography
//                 variant="body2"
//                 color="success.main"
//                 textAlign="center"
//                 mt={2}
//                 fontWeight="bold"
//               >
//                 +{totalConsumed - baseGoal}ml extra consumed
//               </Typography>
//             )}
//           </Box>

//           <List disablePadding>
//             {todayLogs.map((log, idx) => (
//               <Paper
//                 key={idx}
//                 sx={{
//                   p: 1.5,
//                   my: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   borderRadius: 2,
//                 }}
//               >
//                 <Box display="flex" alignItems="center" gap={1}>
//                   {getIntakeIcon(log.type)}
//                   <Box>
//                     <Typography fontWeight="bold">{log.amount}ml</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {log.time}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Box display="flex" alignItems="center" gap={1}>
//                   <Typography variant="caption" fontWeight="bold">
//                     +{Math.round((log.amount / baseGoal) * 100)}%
//                   </Typography>
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => deleteLog(log.timestamp)}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </Box>
//               </Paper>
//             ))}
//           </List>
//         </>
//       )}
//     </Box>
//   );
// };

// export default TodayTab;


// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   useTheme,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import { useAppContext } from "../../context/AppContext";
// import { isToday, parseISO } from "date-fns";
// import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

// import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
// import ScienceIcon from "@mui/icons-material/Science";
// import CategoryIcon from "@mui/icons-material/Category";
// import OpacityIcon from "@mui/icons-material/Opacity";
// import LocalCafeIcon from "@mui/icons-material/LocalCafe";
// import WineBarIcon from "@mui/icons-material/WineBar";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import React from "react";

// const getIntakeIcon = (type) => {
//   switch (type) {
//     case "glass":
//       return <LocalDrinkIcon color="primary" />;
//     case "small bottle":
//       return <ScienceIcon color="primary" />;
//     case "regular bottle":
//       return <CategoryIcon color="primary" />;
//     case "large bottle":
//       return <OpacityIcon color="primary" />;
//     case "coffee mug":
//       return <LocalCafeIcon color="primary" />;
//     case "milk glass":
//       return <WineBarIcon color="primary" />;
//     default:
//       return <LocalDrinkIcon color="primary" />;
//   }
// };

// const COLORS = ["#1976d2", "#e0e0e0"];

// const TodayTab = () => {
//   const { hydrationData, baseGoal, deleteLog, updateLog } = useAppContext();
//   const theme = useTheme();

//   const todayLogs =
//     hydrationData.find((d) => isToday(parseISO(d.date)))?.logs || [];

//   const totalConsumed = todayLogs.reduce((sum, log) => sum + log.amount, 0);
//   const percentage = (totalConsumed / baseGoal) * 100;

//   const pieData =
//     percentage >= 100
//       ? [
//           { name: "Completed", value: 100 },
//           { name: "Extra", value: percentage - 100 },
//         ]
//       : [
//           { name: "Consumed", value: percentage },
//           { name: "Remaining", value: 100 - percentage },
//         ];

//   // --- Edit state ---
//   const [editLog, setEditLog] = React.useState(null);
//   const [editAmount, setEditAmount] = React.useState("");
//   const [editType, setEditType] = React.useState("");

//   const handleEditOpen = (log) => {
//     setEditLog(log);
//     setEditAmount(log.amount);
//     setEditType(log.type);
//   };

//   const handleEditSave = () => {
//     if (editLog) {
//       updateLog(editLog.timestamp, editAmount, editType);
//     }
//     setEditLog(null);
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h6" fontWeight="bold">
//         Today's Log
//       </Typography>
//       <Typography variant="body2" color="text.secondary" gutterBottom>
//         Your water intake throughout the day
//       </Typography>

//       {todayLogs.length === 0 ? (
//         <Typography variant="body2" color="text.secondary">
//           No logs yet.
//         </Typography>
//       ) : (
//         <>
//           <Box sx={{ height: 220, my: 4, px: 2 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   innerRadius={65}
//                   outerRadius={85}
//                   paddingAngle={3}
//                   dataKey="value"
//                   startAngle={90}
//                   endAngle={-270}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                   <Label
//                     value={
//                       percentage >= 100
//                         ? "Target\nCompleted"
//                         : `${Math.round(percentage)}%`
//                     }
//                     position="center"
//                     dy={4}
//                     style={{
//                       fill: theme.palette.text.primary,
//                       fontSize: "1rem",
//                       whiteSpace: "pre-line",
//                       textAlign: "center",
//                       lineHeight: 1.4,
//                     }}
//                   />
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>

//             {percentage > 100 && (
//               <Typography
//                 variant="body2"
//                 color="success.main"
//                 textAlign="center"
//                 mt={2}
//                 fontWeight="bold"
//               >
//                 +{totalConsumed - baseGoal}ml extra consumed
//               </Typography>
//             )}
//           </Box>

//           <List disablePadding>
//             {todayLogs.map((log, idx) => (
//               <Paper
//                 key={idx}
//                 sx={{
//                   p: 1.5,
//                   my: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   borderRadius: 2,
//                 }}
//               >
//                 <Box display="flex" alignItems="center" gap={1}>
//                   {getIntakeIcon(log.type)}
//                   <Box>
//                     <Typography fontWeight="bold">{log.amount}ml</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {log.time}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 <Box display="flex" alignItems="center" gap={1}>
//                   <Typography variant="caption" fontWeight="bold">
//                     +{Math.round((log.amount / baseGoal) * 100)}%
//                   </Typography>
//                   {/* ✅ Edit button */}
//                   <IconButton
//                     size="small"
//                     color="primary"
//                     onClick={() => handleEditOpen(log)}
//                   >
//                     <EditIcon fontSize="small" />
//                   </IconButton>
//                   {/* Delete button */}
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => deleteLog(log.timestamp)}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </Box>
//               </Paper>
//             ))}
//           </List>
//         </>
//       )}

//       {/* --- Edit Dialog --- */}
//       <Dialog open={!!editLog} onClose={() => setEditLog(null)}>
//         <DialogTitle>Edit Intake</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Amount (ml)"
//             type="number"
//             fullWidth
//             margin="normal"
//             value={editAmount}
//             onChange={(e) => setEditAmount(e.target.value)}
//           />
//           <TextField
//             select
//             label="Type"
//             fullWidth
//             margin="normal"
//             value={editType}
//             onChange={(e) => setEditType(e.target.value)}
//           >
//             <MenuItem value="glass">Glass</MenuItem>
//             <MenuItem value="small bottle">Small Bottle</MenuItem>
//             <MenuItem value="regular bottle">Regular Bottle</MenuItem>
//             <MenuItem value="large bottle">Large Bottle</MenuItem>
//             <MenuItem value="coffee mug">Coffee Mug</MenuItem>
//             <MenuItem value="milk glass">Milk Glass</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditLog(null)}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditSave}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default TodayTab;



import {
  Box,
  Typography,
  Paper,
  List,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { isToday, parseISO } from "date-fns";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import ScienceIcon from "@mui/icons-material/Science";
import CategoryIcon from "@mui/icons-material/Category";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import WineBarIcon from "@mui/icons-material/WineBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

const getIntakeIcon = (type) => {
  switch (type) {
    case "glass":
      return <LocalDrinkIcon color="primary" />;
    case "small bottle":
      return <ScienceIcon color="primary" />;
    case "regular bottle":
      return <CategoryIcon color="primary" />;
    case "large bottle":
      return <OpacityIcon color="primary" />;
    case "coffee mug":
      return <LocalCafeIcon color="primary" />;
    case "milk glass":
      return <WineBarIcon color="primary" />;
    default:
      return <LocalDrinkIcon color="primary" />;
  }
};

const COLORS = ["#1976d2", "#e0e0e0"];

const TodayTab = () => {
  const { hydrationData, baseGoal, deleteLog, updateLog } = useAppContext();
  const theme = useTheme();

  const todayLogs =
    hydrationData.find((d) => isToday(parseISO(d.date)))?.logs || [];

  // ✅ enforce numbers
  const totalConsumed = todayLogs.reduce(
    (sum, log) => sum + Number(log.amount),
    0
  );
  const percentage = (totalConsumed / Number(baseGoal)) * 100;

  const pieData =
    percentage >= 100
      ? [
          { name: "Completed", value: 100 },
          { name: "Extra", value: percentage - 100 },
        ]
      : [
          { name: "Consumed", value: percentage },
          { name: "Remaining", value: 100 - percentage },
        ];

  // --- Edit state ---
  const [editLog, setEditLog] = React.useState(null);
  const [editAmount, setEditAmount] = React.useState("");
  const [editType, setEditType] = React.useState("");

  const handleEditOpen = (log) => {
    setEditLog(log);
    setEditAmount(log.amount);
    setEditType(log.type);
  };

  const handleEditSave = () => {
    if (editLog) {
      updateLog(editLog.timestamp, Number(editAmount), editType); // ✅ ensure number
    }
    setEditLog(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Today’s Log
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your water intake throughout the day
      </Typography>

      {todayLogs.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No logs yet.
        </Typography>
      ) : (
        <>
          <Box sx={{ height: 220, my: 4, px: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <Label
                    value={
                      percentage >= 100
                        ? "Target\nCompleted"
                        : `${Math.round(percentage)}%`
                    }
                    position="center"
                    dy={4}
                    style={{
                      fill: theme.palette.text.primary,
                      fontSize: "1rem",
                      whiteSpace: "pre-line",
                      textAlign: "center",
                      lineHeight: 1.4,
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {percentage > 100 && (
              <Typography
                variant="body2"
                color="success.main"
                textAlign="center"
                mt={2}
                fontWeight="bold"
              >
                +{totalConsumed - baseGoal}ml extra consumed
              </Typography>
            )}
          </Box>

          <List disablePadding>
            {todayLogs.map((log, idx) => (
              <Paper
                key={idx}
                sx={{
                  p: 1.5,
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderRadius: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {getIntakeIcon(log.type)}
                  <Box>
                    <Typography fontWeight="bold">
                      {Number(log.amount)}ml
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.time}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="caption" fontWeight="bold">
                    +{Math.round((Number(log.amount) / Number(baseGoal)) * 100)}
                    %
                  </Typography>
                  {/* Edit button */}
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditOpen(log)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {/* Delete button */}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => deleteLog(log.timestamp)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </List>
        </>
      )}

      {/* --- Edit Dialog --- */}
      <Dialog open={!!editLog} onClose={() => setEditLog(null)}>
        <DialogTitle>Edit Intake</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount (ml)"
            type="number"
            fullWidth
            margin="normal"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
          <TextField
            select
            label="Type"
            fullWidth
            margin="normal"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
          >
            <MenuItem value="glass">Glass</MenuItem>
            <MenuItem value="small bottle">Small Bottle</MenuItem>
            <MenuItem value="regular bottle">Regular Bottle</MenuItem>
            <MenuItem value="large bottle">Large Bottle</MenuItem>
            <MenuItem value="coffee mug">Coffee Mug</MenuItem>
            <MenuItem value="milk glass">Milk Glass</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditLog(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodayTab;
