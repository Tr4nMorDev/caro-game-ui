import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { overlayVariants, formVariants } from "../untils/motion";
import { useNavigate } from "react-router-dom";
import { googleLogin, signin } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";
import BackgroundFirst from "../components/BackgroundFirst";
const SigninPage = () => {
  const { user, isAuthenticated, logout, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  }); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value   });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signin(formData);
      // Lưu token vào localStorage (hoặc context)
      login({ token: data.token, user: data.user });
      navigate("/gameplay");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      console.log("Google OAuth : ", credentialResponse);
      const data = await googleLogin(credentialResponse.credential);
      console.log("Đăng nhập thành công:", data);
      login({ token: data.token, user: data.user });
      navigate("/gameplay");
    } catch (err) {
      console.error("Lỗi gửi token lên backend:", err.message);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google OAuth Failed");
  };

  return (
    <>
      <BackgroundFirst />

      <motion.div
        className="fixed inset-0 z-10 bg-black/25"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

      <motion.div
        className="fixed inset-0 z-20 flex items-center justify-center px-4"
        onClick={() => navigate("/")}
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <div
          className="w-full max-w-md rounded-2xl border border-white/20 bg-slate-950/55 p-8 text-white shadow-2xl shadow-black/40 backdrop-blur-md"
          onClick={(event) => event.stopPropagation()}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Đăng nhập</h2>

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
              placeholder="Mật khẩu"
              className="rounded border border-white/15 bg-white/10 px-4 py-2 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 py-2 px-4 rounded text-white font-semibold hover:opacity-90 transition"
            >
              Đăng nhập
            </button>
          </form>

          <div className="my-4 flex flex-col gap-3 justify-center items-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />

          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Chưa có tài khoản?{" "}
            <Link
              to="/signup"
              className="text-purple-400 underline hover:text-purple-200"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default SigninPage;
