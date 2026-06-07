import { useEffect, useState } from "react";

const size = 20;

const InGameScreen = ({
  onExitGame,
  youAre,
  players,
  socket,
  matchId,
}) => {
  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [myTimer, setMyTimer] = useState(30);
  const [opponentTimer, setOpponentTimer] = useState(30);

  const you = players?.[youAre];
  const opponent = players?.[youAre === "X" ? "O" : "X"];

  useEffect(() => {
    const isMyTurn = currentTurn === youAre;
    const interval = setInterval(() => {
      if (isMyTurn) {
        setMyTimer((current) => Math.max(0, current - 1));
      } else {
        setOpponentTimer((current) => Math.max(0, current - 1));
      }
    }, 1000);

    if (isMyTurn) {
      setMyTimer(30);
    } else {
      setOpponentTimer(30);
    }

    return () => clearInterval(interval);
  }, [currentTurn, youAre]);

  useEffect(() => {
    if (!socket) return;

    const handleMoveMade = ({ index, symbol, nextTurn }) => {
      setBoard((previousBoard) => {
        const newBoard = [...previousBoard];
        newBoard[index] = symbol;
        return newBoard;
      });
      setCurrentTurn(nextTurn);
    };

    socket.on("moveMade", handleMoveMade);
    return () => socket.off("moveMade", handleMoveMade);
  }, [socket]);

  const handleClick = (index) => {
    if (!socket || !currentTurn || board[index] !== null || currentTurn !== youAre) {
      return;
    }

    setBoard((previousBoard) => {
      const newBoard = [...previousBoard];
      newBoard[index] = youAre;
      return newBoard;
    });

    socket.emit("makeMove", { matchId, index, symbol: youAre });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <PlayerPanel
          player={you}
          symbol={youAre}
          timer={myTimer}
          active={currentTurn === youAre}
          align="left"
        />
        <div className="hidden text-center text-xs font-semibold uppercase tracking-widest text-slate-500 sm:block">
          vs
        </div>
        <PlayerPanel
          player={opponent}
          symbol={youAre === "X" ? "O" : "X"}
          timer={opponentTimer}
          active={currentTurn !== youAre}
          align="right"
        />
      </div>

      <div
        className="overflow-hidden rounded-lg border border-slate-700 bg-white shadow-2xl shadow-black/30"
        style={{ width: "min(92vw, 640px)" }}
      >
        <div
          className="grid aspect-square"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              className="aspect-square border border-slate-300 text-center text-sm font-bold leading-none transition hover:bg-cyan-50 disabled:cursor-not-allowed sm:text-base"
              disabled={board[index] !== null || currentTurn !== youAre}
            >
              {cell === "X" && <span className="text-red-600">X</span>}
              {cell === "O" && <span className="text-blue-600">O</span>}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="rounded-md border border-red-400/40 px-5 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
        onClick={onExitGame}
      >
        Thoat tran
      </button>
    </div>
  );
};

const PlayerPanel = ({ player, symbol, timer, active, align }) => (
  <div
    className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${
      active
        ? "border-emerald-400/70 bg-emerald-400/10"
        : "border-white/10 bg-white/[0.04]"
    } ${align === "right" ? "sm:justify-end" : ""}`}
  >
    {align === "right" && <SymbolBadge symbol={symbol} />}
    <img
      src={player?.avatar}
      alt={player?.name || "Player"}
      className="h-10 w-10 rounded-md border border-white/20 object-cover"
    />
    <div className={`min-w-0 ${align === "right" ? "sm:text-right" : ""}`}>
      <p className="truncate text-sm font-semibold text-white">
        {player?.name || "Dang cho"}
      </p>
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

export default InGameScreen;
