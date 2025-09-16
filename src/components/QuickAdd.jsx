
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Modal,
  useTheme,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import AddIntakeModal from "./AddIntakeModal";
import { containers } from "../constants/DrinkSources";

const QuickAdd = () => {
  const { addLog } = useAppContext();
  const [openAddIntake, setOpenAddIntake] = useState(false);

  // Popover state
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverMsg, setPopoverMsg] = useState("");

  const handleOpenAddIntake = () => setOpenAddIntake(true);
  const handleCloseAddIntake = () => setOpenAddIntake(false);

  const theme = useTheme();

  const handleAddWater = (event, volume, label) => {
    addLog(volume, label.toLowerCase());
    setPopoverMsg(`+${volume}ml added 💧`);
    setAnchorEl(event.currentTarget);

    // Auto-close popup after 1.5s
    setTimeout(() => {
      setAnchorEl(null);
    }, 1500);
  };

  return (
    <>
      <Box
        mt={4}
        p={2}
        borderRadius={2}
        boxShadow={2}
        bgcolor={theme.palette.background.paper}
      >
        <Typography variant="h6" fontWeight="bold">
          Quick Add
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Tap a container to log your water intake
        </Typography>

        <Grid container spacing={2} mt={1}>
          {containers.slice(0, 4).map((item, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Paper
                elevation={1}
                onClick={(e) => handleAddWater(e, item.volume, item.label)}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Box mb={1}>{item.icon}</Box>
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                  {item.volume}ml
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background.paper,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.text.secondary,
            },
          }}
          onClick={handleOpenAddIntake}
          startIcon={<AddIcon />}
        >
          Add Custom Amount
        </Button>
      </Box>

      <Modal
        open={openAddIntake}
        onClose={handleCloseAddIntake}
        aria-labelledby="Add Intake"
        aria-describedby="Select a preset size or enter a custom amount"
      >
        <AddIntakeModal handleClose={handleCloseAddIntake} />
      </Modal>

      {/* Popover feedback anchored to clicked card */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        disableRestoreFocus
      >
        <Box px={2} py={1}>
          <Typography variant="body2" color="success.main">
            {popoverMsg}
          </Typography>
        </Box>
      </Popover>
    </>
  );
};

export default QuickAdd;
