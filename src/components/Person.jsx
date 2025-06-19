import { useState, useEffect } from "react";
import { Socials } from "../untils/constants";
import "../App.css";
import { Menu, X } from "lucide-react"; // Icon menu, bạn cần cài `lucide-react`
import { useAuth } from "../contexts/AuthContext";
import { signout } from "../api/authApi";
import { useNavigate } from "react-router-dom"; // ✅ sửa ở đây
const Navbar = () => {
  const { user, isAuthenticated, logout, token } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.avatar) {
      setAvatarUrl(user.avatar);
    }
  }, [user?.avatar]);

  const handleLogout = async () => {
    try {
      await signout(token); // Gọi API để logout (nếu có xử lý backend)
      logout(); // Xoá token + user ở frontend
      navigate("/"); // Quay lại trang chủ
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error.message);
    }
  };
  return (
    <div className="w-full fixed top-0 z-50 backdrop-blur-md bg-[#03001417] shadow-lg shadow-[#2A0E61]/50">
      <div className="flex items-center justify-between px-6 py-4 md:px-20 h-[65px]">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="p-1 border-2 border-white rounded">
            {user?.avatar && (
              <img
                src={avatarUrl}
                alt="avatar"
                width={50}
                height={50}
                className="rounded hover:animate-slowspin"
              />
            )}
          </div>
          <a
            className="ml-2 font-bold  md:block text-gray-300"
            href="https://github.com/Tr4nMorDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.name}
          </a>
        </div>

        {/* Desktop Menu */}
        <div className=" md:flex items-center gap-10">
          <div className="flex items-center gap-6 px-6 py-2 border border-[#7042f861] bg-[#0300145e] rounded-full text-gray-200 cursor-pointer">
            <span onClick={handleLogout}>Đăng xuất</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
