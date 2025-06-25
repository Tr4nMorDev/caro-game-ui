import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

const size = 20;

const InGameScreen = ({
  onExitGame,
  youAre,
  players,
  socket,
  matchId,
  opponentId,
  onReplay
}) => {
  const { user } = useAuth();
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [myTimer, setMyTimer] = useState(30);
  const [opponentTimer, setOpponentTimer] = useState(30);
  const [isWin, setisWin] = useState(false);
  const [winerId, setWinerId] = useState();

  const you = players?.[youAre];
  const opponent = players?.[youAre === "X" ? "O" : "X"];

  // Bộ đếm thời gian cho người chơi hiện tại
  useEffect(() => {
    if (currentTurn === youAre) {
      setMyTimer(30);
      const interval = setInterval(() => {
        setMyTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setOpponentTimer(30);
      const interval = setInterval(() => {
        setOpponentTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTurn, youAre]);

  // Khi có nước đi mới từ socket
  useEffect(() => {
    const handleMoveMade = ({ index, symbol, nextTurn, isWin, winnerId }) => {
      if (isWin) {
        setisWin(true);
        setWinerId(winnerId);
      }
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[index] = symbol;
        return newBoard;
      });
      setCurrentTurn(nextTurn);
    };

    socket.on("moveMade", handleMoveMade);
    return () => socket.off("moveMade", handleMoveMade);
  }, [socket]);

  const handleClick = (index) => {
    if (!currentTurn || board[index] !== null || currentTurn !== youAre) return;

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[index] = youAre;
      return newBoard;
    });

    socket.emit("makeMove", { matchId, index, symbol: youAre });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-10">
        {/* Your Info */}
        <div
          className={`flex items-center gap-2 p-2 rounded ${
            currentTurn === youAre ? "ring-4 ring-green-400" : ""
          }`}
        >
          <div className="text-white text-sm text-center">
            <div className="font-bold">{you?.name}</div>
            <div className="bg-teal-400 rounded px-2 text-sm text-black font-semibold">
              {currentTurn === youAre ? `${myTimer}s` : "Chờ..."}
            </div>
          </div>
          <img
            src={you?.avatar}
            alt="Your Avatar"
            className="w-10 h-10 rounded-full ring-4 ring-teal-400"
          />
          <div className="text-2xl">{youAre === "X" ? "❌" : "⭕"}</div>
        </div>

        {/* Opponent Info */}
        <div
          className={`flex items-center gap-2 p-2 rounded ${
            currentTurn !== youAre ? "ring-4 ring-green-400" : ""
          }`}
        >
          <div className="text-2xl">{youAre === "X" ? "⭕" : "❌"}</div>
          <img
            src={opponent?.avatar}
            alt="Opponent Avatar"
            className="w-10 h-10 rounded-full ring-4 ring-teal-400"
          />
          <div className="text-white text-sm text-center">
            <div className="font-bold">{opponent?.name}</div>
            <div className="bg-teal-400 rounded px-2 text-sm text-black font-semibold">
              {currentTurn !== youAre ? `${opponentTimer}s` : "Chờ..."}
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
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
              style={{ fontSize: 20, fontWeight: "bold" }}
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
