// Login.js
import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ import animation
import useAuthStore from "../../Store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    navigate("/"); // ✅ redirect after login
  };

  return (
    <div className="flex justify-center items-center text-black h-screen bg-gray-100">
      {/* ✅ Animate X-axis entry */}
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-[19rem] md:max-w-[30rem]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 flex">
              <img
                src="/eror.jpeg"
                className="h-4 m-[0.1rem] animate-pulse"
                alt="warning"
              />
              {error}
            </p>
          )}
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
