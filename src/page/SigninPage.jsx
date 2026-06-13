import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { overlayVariants, formVariants } from "../untils/motion";
import { googleLogin, signin, trackGoogleLogin } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";
import BackgroundFirst from "../components/BackgroundFirst";
import { getTrackingContext } from "../utils/tracking";

const SigninPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signin(formData);
      login({ token: data.token, user: data.user });
      navigate("/gameplay");
    } catch (error) {
      console.error("Signin error:", error.message);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      console.log("Google OAuth:", credentialResponse);
      const data = await googleLogin(credentialResponse.credential);
      console.log("Signin success:", data);
      login({ token: data.token, user: data.user });

      try {
        await trackGoogleLogin(data.token, {
          ...getTrackingContext(),
          location: window.location.href,
        });
      } catch (error) {
        console.error("Google login tracking error:", error.message);
      }

      navigate("/gameplay");
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google OAuth failed");
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
            <h2 className="mb-6 text-center text-3xl font-bold">Sign In</h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                Sign In
              </button>
            </form>

            <div className="my-4 flex flex-col items-center justify-center gap-3">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </div>

            <p className="mt-4 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-purple-400 underline hover:text-purple-200">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SigninPage;
