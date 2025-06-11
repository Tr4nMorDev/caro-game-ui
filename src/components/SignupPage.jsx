import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { overlayVariants, formVariants } from "../untils/motion";
const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const result = await signup(formData);
      console.log("Đăng ký thành công:", result);
      navigate("/signin");
    } catch (error) {
      console.error("Lỗi đăng ký:", error.message);
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black backdrop-blur-sm z-10"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      ></motion.div>

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

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Họ và tên"
              className="px-4 py-2 rounded bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="px-4 py-2 rounded bg-[#2a2a2a] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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

          <p className="text-sm text-gray-400 mt-4 text-center">
            Đã có tài khoản?{" "}
            <Link
              to="/signin"
              className="text-purple-400 underline hover:text-purple-200"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default SignupPage;
