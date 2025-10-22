import { useState, useEffect } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import AboutItems from "./AboutItems";
import useAuthStore from "/Store/useAuthStore"; // ✅import store

const About = ({ showButton }) => {
  const [confirmLogout, setConfirmLogout] = useState(false); //  track logout state
  const logout = useAuthStore((state) => state.logout); //  get logout fn

  const handleLogoutClick = () => {
    if (!confirmLogout) {
      // first click → show confirmation
      setConfirmLogout(true);
    } else {
      // second click → actually logout
      logout();
    }
  };

  //  hide confirmation after 5s
  useEffect(() => {
    if (confirmLogout) {
      const timer = setTimeout(() => {
        setConfirmLogout(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmLogout]);

  return (
    // Backdrop with blur
    <div>
      <div className="fixed inset-0 bg-white backdrop-blur flex top-0 justify-center items-start z-50 overflow-hidden">
        {/* Modal/content */}
        <div className="shadow-lg bg-white w-full h-full p-6 rounded-md">
          <div className="flex justify-between items-center border-b border-b-gray-400">
            {/* Back button */}
            <h1
              className="flex w-15 text-black cursor-pointer"
              onClick={showButton}
            >
              <MdOutlineArrowBackIosNew className="text-xs mt-0.5" />
              <span className="text-xs ml-2"> Back</span>
            </h1>

            {/* logout button with popup */}
            <div className="relative flex flex-col items-center">
              <h2
                onClick={handleLogoutClick}
                className="bg-red-600 text-white mb-1 text-xs rounded-2xl px-2 py-0.5 md:px-3 md:py-0.5 cursor-pointer"
              >
                LogOut
              </h2>

              {/* Popup message */}
              <div
                className={`absolute top-5.5 mb-2 bg-gray-800 text-white text-xs shadow-md px-3 py-1 rounded-lg transition-all duration-300 ease-in-out whitespace-normal max-w-[200px] text-center left-1/2 -translate-x-1/2
                  ${
                    confirmLogout
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
              >
                Are you sure? Click again to confirm.
              </div>
            </div>
          </div>

          {/* main content */}
          <AboutItems />
        </div>
      </div>
    </div>
  );
};

export default About;
