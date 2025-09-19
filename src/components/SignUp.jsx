// Signup.js
import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ import animation
import useAuthStore from "../../Store/useAuthStore";

const Signup = () => {
  const navigate = useNavigate();
  const { register, error, isLoading, loginWithGoogle } = useAuthStore(); // ✅ added loginWithGoogle

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    await register(formData.email, formData.password, formData.name);
    navigate("/"); // ✅ redirect after signup
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-black">
      {/* ✅ Animate X-axis entry */}
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-[19rem] md:max-w-[30rem]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-10 py-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="my-[-1rem]" />
              ) : (
                <Eye className="my-[-1rem]" />
              )}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          {/* ✅ Google Sign Up Button */}
          <button
            type="button"
            onClick={async () => {
              await loginWithGoogle();
              navigate("/"); // redirect after Google signup
            }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-300 bg-white mt-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {error && (
            <p className="text-red-500 text-xs mt-2 flex">
              {error}{" "}
              <img
                src="/eror.jpeg"
                className="h-4 w-4 mt-6 relative left-[-12rem] animate-pulse"
              />
            </p>
          )}
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
