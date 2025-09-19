import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, Modal, useTheme } from "@mui/material";
import Logo from "/Logo.jpeg";
import { useState } from "react";
import Settings from "./Settings";
import About from "./About";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const [show, setShow] = useState(false);
  const showButton = () => setShow(!show); // toggle About component

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <nav
      
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.6dvh",
        }}
      >
        <span
          className="text-xs"
          onClick={showButton}
          style={{ cursor: "pointer" }}
        >
          <h1
            className={`text-xs md:block xl:left-[11.9rem] md:text-center ${
              isDarkMode ? "text-white" : "text-blue-950"
            }`}
          >
            <img
              className="md:pr-5 p-0 absolute"
              src={Logo}
              alt="Logo"
              style={{
                height: "3rem",
                borderRadius: "50%",
                marginLeft: "12px",
              }}
            />
            H<span className="md:pl-6 pl-7">droFlow</span>
          </h1>
        </span>

        <IconButton
          sx={{
            padding: "0",
            marginRight: "12px",
            "&:focus": { outline: "none" },
            "&:focus-visible": { outline: "none" },
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

      {/* Animate About on Y-axis */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <About showButton={showButton} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
