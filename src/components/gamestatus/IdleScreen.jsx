import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IdleScreen = ({ onFindMatch, onPlayCaro }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = async (action) => {
    setIsVisible(false); // trigger fade-out
    setTimeout(() => {
      action(); // call parent callback
    }, 400); // match exit duration
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#0f172a] to-[#0f172a] text-white font-sans px-4">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-5xl font-extrabold mb-10">🎮 CỜ CARO ONLINE</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl px-8">
              {/* Matchmaking Panel */}
              <motion.div
                className="bg-black bg-opacity-30 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-3xl font-bold mb-2">🎯 Tìm Trận Đấu</h2>
                <p className="text-gray-300 mb-4">
                  Tham gia chiến đấu cùng người chơi thật
                </p>
                <button
                  className="w-full py-3 bg-green-600 hover:bg-green-500 rounded-xl text-xl font-semibold shadow-lg cursor-pointer"
                  onClick={() => handleClick(onFindMatch)}
                >
                  🔍 Bắt đầu tìm trận
                </button>
              </motion.div>

              {/* AI Mode Panel */}
              <motion.div
                className="bg-black bg-opacity-30 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform "
                whileHover={{ scale: 1.05 }}
              >
                <h2 className="text-3xl font-bold mb-2">🤖 Chế Độ AI</h2>
                <p className="text-gray-300 mb-4">
                  Chơi với máy để luyện tập kỹ năng
                </p>
                <button
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-xl font-semibold shadow-lg cursor-pointer"
                  onClick={() => handleClick(onPlayCaro)}
                >
                  🕹️ Chơi ngay
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IdleScreen;
