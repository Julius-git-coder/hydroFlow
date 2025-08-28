import React, { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import AboutItems from "./AboutItems";
import useAuthStore from "/Store/useAuthStore"; // ✅ import store

const About = ({ showButton }) => {
  
  const [log, setLog] = useState(false);
  const logout = useAuthStore((state) => state.logout); // ✅ get logout fn

  return (
    // Backdrop with blur
    <div>
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur flex top-0 justify-center items-start z-50 overflow-hidden">
        {/* Modal/content */}
        <div className="shadow-lg bg-white max-w-[23.5rem] md:max-w-[100.5rem] w-full mx-auto p-6 rounded-md h-full ">
          <div className="flex border-b border-b-gray-400">
            <h1 className="flex w-15 text-black" onClick={showButton}>
              <MdOutlineArrowBackIosNew className="text-xs mt-0.5" />
              <span className="text-xs ml-2"> Back</span>
            </h1>
            {/* login section */}
            <h2
              onMouseEnter={() => setLog(true)}
              onMouseLeave={() => setLog(false)}
              onClick={logout} // ✅ trigger logout
              className="bg-red-600 text-white text-xs rounded-2xl px-3 py-1 mx-[12rem] mb-1 md:mx-[90rem] cursor-pointer"
            >
              LogOut
            </h2>
          </div>

          {/* Animated logout message */}
          <div
            className={`text-xs relative ml-[9rem] md:ml-[85rem] transform transition-all duration-500 ${
              log
                ? "translate-y-1 mb-1 opacity-100 text-xs text-black"
                : "-translate-y-4 opacity-0"
            }`}
          >
            Are you sure you want to log off the app?
          </div>

          {/* main content */}
          <AboutItems />
        </div>
      </div>
    </div>
  );
};

export default About;
