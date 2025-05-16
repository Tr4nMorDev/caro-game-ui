import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import {
  slideInFromTop,
  slideInFromRight,
  slideInFromLeft,
} from "../untils/motion";

// Các animation đơn giản hóa để dùng được trong JSX

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-50 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] rounded-full border border-[#7042f88b] opacity-[0.9] flex items-center"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-10 w-10" />
          <h1 className="Welcome-text text-[13px]">Caro-Reaction</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
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
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Game được conect bằng cách chung routers wifi các bạn có thể sử dụng
          wifi public UTH để chơi chung với nhau qua ip . Thành tích sau khi khi
          thắng bên phải .
        </motion.p>

        <motion.a
          variants={slideInFromLeft(1)}
          className="py-2 button-primary text-center text-white cursor-pointer rounded-full border border-[#7042f88b] max-w-[200px]"
          href="#"
        >
          Learn More!
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <img
          src="/mainIconsdark.svg"
          alt="work icons"
          height="650"
          width="650"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
