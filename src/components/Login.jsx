// import React, { useState, useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { BiSolidShow } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

// const Login = ({ onLogin }) => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [check, setCheck] = useState(false);
//   const [show, setShow] = useState(false);
//   const [google, setGoogle] = useState(false);
//   const [loginStatus, setLoginStatus] = useState(null); // null | 'success' | 'failed'

//   const goo = (e) => {
//     e.preventDefault();
//     setGoogle(true);
//     navigate("/");
//   };

//   const showMe = () => {
//     setShow(!show);
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     if (!name || !email || !password || !confirmPassword || !check) {
//       alert("Please fill all the fields");
//       setLoginStatus("failed");
//     } else if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       setLoginStatus("failed");
//     } else {
//       console.log("Form submitted");
//       setLoginStatus("success");
//       if (onLogin) onLogin();
//       navigate("/");
//     }
//   };

//   // 👇 Auto-hide message after 10 seconds
//   useEffect(() => {
//     if (loginStatus) {
//       const timer = setTimeout(() => {
//         setLoginStatus(null);
//       }, 10000); // 10 seconds
//       return () => clearTimeout(timer); // clean up
//     }
//   }, [loginStatus]);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 gap-5 bg-blue-950 text-white">
//       <form
//         onSubmit={submit}
//         className="bg-white/10 w-full max-w-md rounded-bl-4xl border-t-1 border-t-blue-400 rounded-t-2xl p-5 shadow-2xl border-b-blue-400 border-l-8 border-l-blue-400 border-b-3 border-gray-400"
//       >
//         <h1 className="text-xs text-center font-serif">Sign Up</h1>

//         <div
//           onClick={goo}
//           className="hover:border-1 cursor-pointer border-gray-300 p-2 rounded-2xl mt-5 text-center flex items-center justify-center gap-2"
//         >
//           <FcGoogle className="text-gray-400" />
//           <span className="text-sm sm:text-base">Log in With Your Google</span>
//         </div>

//         <div className="grid grid-cols-1 gap-3 mt-5">
//           <label className="text-sm">Name:</label>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             type="text"
//             placeholder="Enter your name"
//             className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
//           />

//           <label className="text-sm">Email:</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             type="email"
//             placeholder="Enter your email"
//             className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
//           />

//           <label className="text-sm">Password:</label>
//           <div className="relative">
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={show ? "text" : "password"}
//               placeholder="Enter password"
//               className="border-2 border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-400"
//             />
//             <BiSolidShow
//               onClick={showMe}
//               className="absolute top-2 right-2 text-gray-400 cursor-pointer"
//             />
//           </div>

//           <label className="text-sm">Confirm Password:</label>
//           <input
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             type={show ? "text" : "password"}
//             placeholder="Confirm password"
//             className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-400"
//           />
//         </div>

//         <div className="flex items-center mt-4">
//           <input
//             type="checkbox"
//             checked={check}
//             onChange={(e) => setCheck(e.target.checked)}
//             className="mr-2"
//           />
//           <p className="text-sm">
//             I agree with <span className="text-blue-400 underline">Terms</span>{" "}
//             and <span className="text-blue-400 underline">Privacy</span>
//           </p>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-400 text-white w-full py-2 rounded mt-6 hover:bg-blue-500 transition-colors"
//         >
//           Sign Up
//         </button>

//         {/* ✅ Status Messages */}
//         {loginStatus === "failed" && (
//           <div className="text-red-500 mt-3 text-center">
//             Login Failed.. <span className="mb-1 animate-ping">⚠️</span>
//           </div>
//         )}

//         {loginStatus === "success" && (
//           <div className="text-green-400 mt-3 text-center">
//             Login Successful <span className="mb-1 animate-bounce">✅</span>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { BiSolidShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);
  const [google, setGoogle] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null); // null | 'success' | 'failed'

  const goo = (e) => {
    e.preventDefault();
    google;
    setGoogle(true);
    navigate("/");
  };

  const showMe = () => {
    setShow(!show);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !check) {
      alert("Please fill all the fields");
      setLoginStatus("failed");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoginStatus("failed");
    } else {
      setLoginStatus("success");
      if (onLogin) onLogin();

      // Wait 3 seconds before navigating
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  // Auto-hide failed message after 10 seconds
  useEffect(() => {
    if (loginStatus === "failed") {
      const timer = setTimeout(() => {
        setLoginStatus(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [loginStatus]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 gap-5  md:bg-black text-white overflow-hidden  ">
      <img
        src="/Logo.jpeg"
        className="absolute h-full w-full object-cover md:hidden block z-[-1] "
        alt="Background"
      />
      <form
        onSubmit={submit}
        className="bg-transparent text-black  w-full max-w-md rounded-bl-4xl   bg-none md:bg-[url('/Logo.jpeg')] md:bg-cover md:bg-center md:bg-no-repeat   border-t-blue-400 rounded-tr-4xl p-9  shadow-4xl border-b-blue-400 border-r-blue-400 border-r-1 border-gray-400"
      >
        <h1 className="text-xs text-center font-serif">Sign Up</h1>

        <div
          onClick={goo}
          className="border-1 cursor-pointer border-gray-300 p-2 rounded-2xl mt-5 text-center flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-gray-400" />
          <span className="text-sm sm:text-base font-bold">
            Log in With Your Google
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-5">
          <label className="text-sm">Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="border-2 border-gray-300 p-2 hover:scale-110 duration-1000 rounded focus:outline-none focus:border-blue-400"
          />

          <label className="text-sm">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="border-2 border-gray-300 p-2 rounded hover:scale-110 duration-1000 focus:outline-none focus:border-blue-400"
          />

          <label className="text-sm">Password:</label>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              className="border-2 border-gray-300 p-2 w-full hover:scale-110 duration-1000 rounded focus:outline-none focus:border-blue-400"
            />
            <BiSolidShow
              onClick={showMe}
              className="absolute top-2 right-2 text-gray-400 cursor-pointer"
            />
          </div>

          <label className="text-sm">Confirm Password:</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            className="border-2 border-gray-300 p-2 hover:scale-110 duration-1000 rounded focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={check}
            onChange={(e) => setCheck(e.target.checked)}
            className="mr-2 hover:scale-110 duration-1000"
          />
          <p className="text-sm">
            I agree with <span className="text-blue-900 underline">Terms</span>{" "}
            and <span className="text-blue-900 underline">Privacy</span>
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-400 text-white w-full py-2 rounded mt-6 hover:bg-blue-500 transition-colors"
        >
          Sign Up
        </button>

        {/* ✅ Status Messages */}
        {loginStatus === "failed" && (
          <div className="text-red-600 mt-3 text-center">
            Login Failed <span className="mb-1 animate-ping">⚠️</span>
          </div>
        )}

        {loginStatus === "success" && (
          <div className="text-blue-800 mt-3 text-center">
            Login Successful... <span className="mb-1 animate-bounce">✅</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
