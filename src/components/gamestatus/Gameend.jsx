import React from "react";

const GameEnd = ({ isWinner, onReplay }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="backdrop-blur-md bg-[#03001417] shadow-lg shadow-[#2A0E61]/50 border border-[#7042f861] rounded-full px-8 py-4 text-white flex flex-col items-center gap-3">
        <h2 className={`text-xl font-semibold ${isWinner ? "text-green-400" : "text-red-400"}`}>
          {isWinner ? "🎉 Bạn đã chiến thắng!" : "😢 Bạn đã thua!"}
        </h2>
        <button
          onClick={onReplay}
          className="px-5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-200 text-sm"
        >
          Thoát
        </button>
      </div>
    </div>
  );
};

export default GameEnd;
