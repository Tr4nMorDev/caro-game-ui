import { useState } from "react";
import { Socials } from "../untils/constants";
import "../App.css";
import { Menu, X } from "lucide-react"; // Icon menu, bạn cần cài `lucide-react`

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full fixed top-0 z-50 backdrop-blur-md bg-[#03001417] shadow-lg shadow-[#2A0E61]/50">
      <div className="flex items-center justify-between px-6 py-4 md:px-20 h-[65px]">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Tr4nMorDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-1 border-2 border-white rounded">
              <img
                src="/avata.png"
                alt="logo"
                width={50}
                height={50}
                className="rounded hover:animate-slowspin"
              />
            </div>
          </a>
          <a
            className="ml-2 font-bold  md:block text-gray-300"
            href="https://github.com/Tr4nMorDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tr4nMorDev
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-6 px-6 py-2 border border-[#7042f861] bg-[#0300145e] rounded-full text-gray-200">
            <a
              href="https://github.com/Tr4nMorDev"
              target="_blank"
              rel="noopener noreferrer"
            >
              About me
            </a>
            <a
              href="https://github.com/Tr4nMorDev/dys-ni.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              ____UI____
            </a>
            <a
              href="https://github.com/Tr4nMorDev/dys-mi.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              Server
            </a>
          </div>
          <div className="flex gap-4">
            {Socials.map((social) => (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
              >
                <img
                  src={social.src}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start px-6 py-4 bg-[#0a0117] text-gray-200 gap-4">
          <a
            href="https://github.com/Tr4nMorDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            About me
          </a>
          <a
            href="https://github.com/Tr4nMorDev/dys-ni.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            ____UI____
          </a>
          <a
            href="https://github.com/Tr4nMorDev/dys-mi.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            Server
          </a>
          <div className="flex gap-4 mt-2">
            {Socials.map((social) => (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
              >
                <img
                  src={social.src}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
