import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { move } from "../../api/authApi";
import {OutPlayWithAI} from "../../api/authApi"

const size = 15;

const PlayAIScreen = ({ onReplay , socket , data }) => {
  const { user, token } = useAuth();
  const [board, setBoard] = useState(data?.board || Array(size * size).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [myTimer, setMyTimer] = useState(30);
  const [aiTimer, setAiTimer] = useState(30);
  useEffect(() => {
  console.log("data:", data.board);
}, [data]);

  const handleDeleteRedis = async () => {
      const result = await OutPlayWithAI(token);
      console.log(result)
      onReplay()
  };
  useEffect(() => {
    if (gameOver) return;
    if (currentTurn === "X") {
      setMyTimer(30);
      const interval = setInterval(() => {
        setMyTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setAiTimer(30);
      const interval = setInterval(() => {
        setAiTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentTurn, gameOver]);
  // 
  useEffect(() => {
  if (!socket) return;

  const handleMoveMade = ({ index, symbol, nextTurn, isWin, winnerId }) => {
    setBoard(prev => {
      const newBoard = [...prev];
      newBoard[index] = symbol;
      return newBoard;
    });

    setCurrentTurn(nextTurn || null);

    if (isWin) {
      setGameOver(true);
      console.log("Winner:", winnerId);
    }
  };

  socket.on("AImove", handleMoveMade);
  return () => socket.off("AImove", handleMoveMade);
}, [socket]);
    

  const handleClick = (index) => {
  if (board[index] || gameOver || currentTurn !== "X") return;

  const newBoard = [...board];
  newBoard[index] = "X";
  setBoard(newBoard);
  setCurrentTurn("O");
  console.log("index gửi đi :" , index , newBoard);
  socket.emit("move", { index, board: newBoard });
};

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-10">
        {/* Player Info */}
        <div className={`flex items-center gap-2 p-2 rounded ${currentTurn === "X" ? "ring-4 ring-green-400" : ""}`}>
          <div className="text-white text-sm text-center">
            <div className="font-bold">{user?.name || "Bạn"}</div>
            <div className="bg-teal-400 rounded px-2 text-sm text-black font-semibold">
              {currentTurn === "X" ? `${myTimer}s` : "Chờ..."}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full ring-4 ring-teal-400 bg-white flex items-center justify-center text-black">
            👤
          </div>
          <div className="text-2xl">❌</div>
        </div>

        {/* AI Info */}
        <div className={`flex items-center gap-2 p-2 rounded ${currentTurn === "O" ? "ring-4 ring-green-400" : ""}`}>
          <div className="text-2xl">⭕</div>
          <div className="w-10 h-10 rounded-full ring-4 ring-teal-400 bg-white flex items-center justify-center text-black">
            🤖
          </div>
          <div className="text-white text-sm text-center">
            <div className="font-bold">AI</div>
            <div className="bg-teal-400 rounded px-2 text-sm text-black font-semibold">
              {currentTurn === "O" ? `${aiTimer}s` : "Chờ..."}
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <div
  className={`grid`}
  style={{
    gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
    width: `${size * 40}px`,
  }}
>
  {board.map((cell, i) => (
    <div
      key={i}
      onClick={() => handleClick(i)}
      className="aspect-square border border-black hover:border-red-500 flex items-center justify-center cursor-pointer select-none"
      style={{ fontSize: 20, fontWeight: "bold" }}
    >
      {cell === "X" && <span className="text-red-600" style={{ fontSize: 18 }}>X</span>}
      {cell === "O" && <span className="text-blue-600" style={{ fontSize: 18 }}>O</span>}
    </div>
  ))}
</div>


      {gameOver && <div className="text-white mt-4 text-lg">Trận đã kết thúc!</div>}

      <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleDeleteRedis}>
        Thoát trận
      </button>
    </div>
  );
};

export default PlayAIScreen;