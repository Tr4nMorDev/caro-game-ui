import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signup } from "../api/authApi";
import { overlayVariants, formVariants } from "../untils/motion";
import BackgroundFirst from "../components/BackgroundFirst";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await signup(formData);
      console.log("Signup success:", result);
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error.message);
    }
  };

  return (
    <>
      <BackgroundFirst />

      <motion.div
        className="fixed inset-0 z-10 bg-black/25"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      />

      <motion.div
        className="fixed inset-0 z-20 flex items-center justify-center px-4"
        onClick={() => navigate("/")}
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <div
          className="auth-warp-form w-full max-w-md rounded-2xl border border-white/20 bg-slate-950/55 p-8 text-white shadow-2xl shadow-black/40 backdrop-blur-md"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="auth-warp-content">
            <h2 className="mb-6 text-center text-3xl font-bold">Create Account</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="rounded border border-white/15 bg-white/10 px-4 py-2 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded border border-white/15 bg-white/10 px-4 py-2 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="rounded border border-white/15 bg-white/10 px-4 py-2 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="submit"
                className="rounded bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-semibold text-white transition hover:opacity-90"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-400 underline hover:text-purple-200">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SignupPage;
