import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, Modal, useTheme } from "@mui/material";
import Logo from "/Logo.jpeg";
import { useState } from "react";
import Settings from "./Settings";

const Navbar = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const theme = useTheme();

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.6dvh",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "3rem", borderRadius: "50%", marginLeft: "12px" }}
        />

        <IconButton
          sx={{
          
            padding: "0",
            marginRight: "12px", // add marginRight to push settings icon
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
          size="small"
          onClick={handleOpenSettings}
        >
          <SettingsOutlinedIcon
            sx={{ fontSize: "1.9rem", color: theme.palette.text.primary }}
          />
        </IconButton>
      </nav>

      <Modal
        open={openSettings}
        onClose={handleCloseSettings}
        aria-labelledby="Settings"
        aria-describedby="Customize your hydration tracking experience"
      >
        <Settings handleClose={handleCloseSettings} />
      </Modal>
    </>
  );
};

export default Navbar;
