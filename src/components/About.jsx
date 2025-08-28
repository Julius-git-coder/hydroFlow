import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useState } from "react";
import AboutItems from "./AboutItems";

const About = ({ showButton }) => {
  const [log, setLog] = useState(false);

  return (
    // Backdrop with blur
    <div>
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur flex top-0 justify-center items-start z-50 overflow-hidden">
        {/* Modal/content */}
        <div className="shadow-lg bg-white max-w-[23.5rem] md:max-w-[100.5rem] w-full mx-auto p-6 rounded-md h-full ">
          <div className="flex border-b">
            <h1 className="flex w-15 mt-" onClick={showButton}>
              <MdOutlineArrowBackIosNew className="text-xs mt-0.5" />
              <span className="text-xs ml-2"> Back</span>
            </h1>
            {/* login section */}
            <h2
              onMouseEnter={() => setLog(true)}
              onMouseLeave={() => setLog(false)}
              className="bg-red-600  text-white text-xs rounded-2xl px-3 py-1 mx-[12rem] mb-1 md:mx-[90rem] cursor-pointer"
            >
              LogOut
            </h2>
          </div>

          {/* Animated logout message */}
          <div
            className={`text-xs relative ml-[9rem] md:ml-[85rem] transform transition-all duration-500 ${
              log
                ? "translate-y-1 mb-1 opacity-100"
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
