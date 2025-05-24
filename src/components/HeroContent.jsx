import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import {
  slideInFromTop,
  slideInFromRight,
  slideInFromLeft,
} from "../untils/motion";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-10 md:mt-20 w-full z-[30] ml-0 md:ml-20"
    >
      {/* Left content */}
      <div className="w-full flex flex-col gap-5 justify-center text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-2 px-3 rounded-full border border-[#7042f88b] opacity-[0.9] flex items-center"
        >
          <SparklesIcon className="text-[#b49bff] mr-2 h-8 w-8 md:h-10 md:w-10" />
          <h1 className="Welcome-text text-sm md:text-base">Caro-Reaction</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-4 md:mt-6 text-3xl md:text-6xl font-bold text-white max-w-full md:max-w-[600px]"
        >
          <span>
            Welcome Play
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Caro{" "}
            </span>
            with group 14
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-400 my-4 md:my-5 max-w-full md:max-w-[600px]"
        >
          Game được xây dựng với mục đích học tập kết nối mọi người giải trí
          trong những giờ học căng thẳng .
        </motion.p>

        <Link
          to="/signup"
          className="py-2 px-4 text-sm md:text-base button-primary text-center text-white cursor-pointer rounded-full border border-[#7042f88b] max-w-[150px] md:max-w-[200px]"
        >
          Sign up
        </Link>
        <Link
          to="/signin"
          className="py-2 px-4 text-sm md:text-base button-primary text-center text-white cursor-pointer rounded-full border border-[#7042f88b] max-w-[150px] md:max-w-[200px]"
        >
          Sign in
        </Link>
      </div>

      {/* Right image */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-auto mt-10 md:mt-0 justify-center items-center"
      >
        <img
          src="/mainIconsdark.svg"
          alt="work icons"
          className="w-[250px] md:w-[400px] lg:w-[650px] h-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
