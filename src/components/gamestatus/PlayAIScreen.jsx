import { Bot, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { OutPlayWithAI } from "../../api/authApi";
import { useAuth } from "../../contexts/AuthContext";

const size = 15;

const PlayAIScreen = ({ onReplay, socket, data }) => {
  const { user, token } = useAuth();
  const [board, setBoard] = useState(data?.board || Array(size * size).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [myTimer, setMyTimer] = useState(30);
  const [aiTimer, setAiTimer] = useState(30);

  const handleDeleteRedis = async () => {
    await OutPlayWithAI(token);
    onReplay();
  };

  useEffect(() => {
    if (gameOver) return;

    const isMyTurn = currentTurn === "X";
    const interval = setInterval(() => {
      if (isMyTurn) {
        setMyTimer((current) => {
          if (current <= 1) {
            setGameOver(true);
            return 0;
          }
          return current - 1;
        });
      } else {
        setAiTimer((current) => Math.max(0, current - 1));
      }
    }, 1000);

    if (isMyTurn) {
      setMyTimer(30);
    } else {
      setAiTimer(30);
    }

    return () => clearInterval(interval);
  }, [currentTurn, gameOver]);

  useEffect(() => {
    if (!socket) return;

    const handleMoveMade = ({ index, symbol, nextTurn, isWin }) => {
      setBoard((previousBoard) => {
        const newBoard = [...previousBoard];
        newBoard[index] = symbol;
        return newBoard;
      });

      setCurrentTurn(nextTurn || (symbol === "X" ? "O" : "X"));

      if (isWin) {
        setGameOver(true);
      }
    };

    socket.on("AImove", handleMoveMade);
    return () => socket.off("AImove", handleMoveMade);
  }, [socket]);

  const handleClick = (index) => {
    if (!socket || board[index] || gameOver || currentTurn !== "X") return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setCurrentTurn("O");
    socket.emit("move", { index, board: newBoard });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <AiPlayerPanel
          icon={<UserRound className="h-5 w-5" />}
          name={user?.name || "Ban"}
          symbol="X"
          timer={myTimer}
          active={currentTurn === "X"}
        />
        <div className="hidden text-center text-xs font-semibold uppercase tracking-widest text-slate-500 sm:block">
          vs
        </div>
        <AiPlayerPanel
          icon={<Bot className="h-5 w-5" />}
          name="AI"
          symbol="O"
          timer={aiTimer}
          active={currentTurn === "O"}
          align="right"
        />
      </div>

      <div
        className="caro-board-shell"
        style={{ width: "min(92vw, 600px)" }}
      >
        <div
          className="caro-board-grid"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              className={`caro-cell ${cell ? "caro-cell-filled" : ""}`}
              disabled={Boolean(cell) || gameOver || currentTurn !== "X"}
            >
              {cell === "X" && <span className="caro-mark caro-mark-x">X</span>}
              {cell === "O" && <span className="caro-mark caro-mark-o">O</span>}
            </button>
          ))}
        </div>
      </div>

      {gameOver && (
        <div className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200">
          Tran da ket thuc
        </div>
      )}

      <button
        type="button"
        className="rounded-md border border-red-400/40 px-5 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
        onClick={handleDeleteRedis}
      >
        Thoat tran
      </button>
    </div>
  );
};

const AiPlayerPanel = ({ icon, name, symbol, timer, active, align }) => (
  <div
    className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
      active
        ? "border-emerald-400/70 bg-emerald-400/10"
        : "border-white/10 bg-white/[0.04]"
    } ${align === "right" ? "sm:justify-end" : ""}`}
  >
    {align === "right" && <SymbolBadge symbol={symbol} />}
    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-slate-900 text-slate-200">
      {icon}
    </div>
    <div className={`min-w-0 ${align === "right" ? "sm:text-right" : ""}`}>
      <p className="truncate text-sm font-semibold text-white">{name}</p>
      <p className="text-xs text-slate-400">
        {active ? `${timer}s` : "Cho luot"}
      </p>
    </div>
    {align !== "right" && <SymbolBadge symbol={symbol} />}
  </div>
);

const SymbolBadge = ({ symbol }) => (
  <span
    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-black ${
      symbol === "X"
        ? "bg-red-500/15 text-red-300"
        : "bg-blue-500/15 text-blue-300"
    }`}
  >
    {symbol}
  </span>
);

export default PlayAIScreen;
