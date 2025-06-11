import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { redirect } from "react-router-dom";
import IdleScreen from "./IdleScreen";
import { io, Socket } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "";
const InGameScreen = ({ onExitGame, youAre, players }) => {
  const { user, token } = useAuth();
  const size = 20;
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [turnX, setTurnX] = useState(true); // true: X, false: O
  const socket = io(API_BASE_URL, {
    transports: ["websocket"],
    query: { token },
  });

  // Xác định bạn và đối thủ
  const opponent = players?.[youAre === "X" ? "O" : "X"];
  const you = players?.[youAre];

  const handleClick = (index) => {
    if (!isMyTurn || board[index] !== null) return;
    socket.emit("makeMove", { matchId, index, symbol: youAre });
  };
  useEffect(() => {
    socket.on("moveMade", ({ index, symbol }) => {
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[index] = symbol;
        return newBoard;
      });
      setIsMyTurn(symbol !== youAre); // Nếu vừa đánh thì hết lượt
    });

    return () => {
      socket.off("moveMade");
    };
  }, []);
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Thông tin người chơi */}
      <div className="flex items-center justify-center gap-10">
        {/* Chính bạn */}
        <div className="flex items-center gap-2">
          <div className="text-white text-sm text-center">
            <div className="font-bold">{you?.name}</div>
            <div className="bg-gray-800 rounded px-2 text-sm">04:58</div>
          </div>
          <img
            src={you?.avatar}
            alt="Your Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-2xl">{youAre === "X" ? "❌" : "⭕"}</div>
        </div>

        {/* Đối thủ */}
        <div className="flex items-center gap-2">
          <div className="text-2xl">{youAre === "X" ? "⭕" : "❌"}</div>
          <img
            src={opponent?.avatar}
            alt="Opponent Avatar"
            className="w-10 h-10 rounded-full ring-4 ring-teal-400"
          />
          <div className="text-white text-sm text-center">
            <div className="font-bold">{opponent?.name}</div>
            <div className="bg-teal-400 rounded px-2 text-sm text-black font-semibold">
              04:59
            </div>
          </div>
        </div>
      </div>

      {/* Bàn cờ */}
      <div
        className="border-4 border-black inline-block rounded-md bg-white"
        style={{ width: 640, height: 640 }}
      >
        <div
          className="grid grid-cols-20 grid-rows-20"
          style={{ width: "100%", height: "100%" }}
        >
          {board.map((cell, i) => (
            <div
              key={i}
              onClick={() => handleClick(i)}
              className="border border-black flex items-center justify-center cursor-pointer select-none"
              style={{ fontSize: 20, fontWeight: "bold", userSelect: "none" }}
            >
              {cell === "X" && (
                <span className="text-red-600" style={{ fontSize: 22 }}>
                  X
                </span>
              )}
              {cell === "O" && (
                <span className="text-blue-600" style={{ fontSize: 22 }}>
                  O
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Nút thoát trận */}
      <button
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={onExitGame}
      >
        Thoát trận
      </button>
    </div>
  );
};

export default InGameScreen;
