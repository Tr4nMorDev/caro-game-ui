import React from "react";
import { startMatchmaking } from "../../api/authApi";
import { useAuth } from "../../contexts/AuthContext";
const IdleScreen = ({ onFindMatch }) => {
  return (
    <div className="text-center px-4">
      <h1 className="text-3xl md:text-4xl font-light mb-4">
        Sẵn sàng chơi cờ caro?
      </h1>
      <button
        className="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-md text-white text-lg"
        onClick={onFindMatch}
      >
        Tìm trận
      </button>
    </div>
  );
};

export default IdleScreen;
