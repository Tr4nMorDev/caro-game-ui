import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
// Thay YOUR_GITHUB_CLIENT_ID và YOUR_REDIRECT_URI thành thật tế của bạn
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
};

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const SignupPage = () => {
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google OAuth Success:", credentialResponse);
    // gửi token lên backend xác thực
  };

  const handleGoogleLoginError = () => {
    console.log("Google OAuth Failed");
  };

  // Hàm chuyển hướng đến GitHub OAuth URL
  const handleGitHubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      GITHUB_REDIRECT_URI
    )}&scope=user:email`;
    window.location.href = githubAuthUrl;
  };

  return (
    <>
      {/* Overlay mờ */}
      <motion.div
        className="fixed inset-0 bg-black backdrop-blur-sm z-10"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

      {/* Form với animation */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center px-4 z-20"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <div className="bg-[#1f1f1f] p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Đăng ký tài khoản
          </h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="px-4 py-2 rounded bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className="px-4 py-2 rounded bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 py-2 px-4 rounded text-white font-semibold hover:opacity-90 transition"
            >
              Đăng ký
            </button>
          </form>

          <div className="my-4 flex flex-col gap-3 justify-center items-center">
            {/* Nút đăng nhập Google OAuth */}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />

            {/* Nút đăng nhập GitHub OAuth */}
            <button
              onClick={handleGitHubLogin}
              className="mt-2 bg-gray-800 hover:bg-gray-700 transition rounded px-4 py-2 flex items-center gap-2 text-white font-semibold"
            >
              <svg
                height="20"
                width="20"
                viewBox="0 0 16 16"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.62 7.62 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.001 8.001 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Đăng nhập bằng GitHub
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Đã có tài khoản?{" "}
            <Link
              to="/"
              className="text-purple-400 underline hover:text-purple-200"
            >
              Quay lại trang chủ
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default SignupPage;
