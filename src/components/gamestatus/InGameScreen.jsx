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
    <div className="playgame-board-screen flex w-full flex-col items-center justify-center gap-2 sm:gap-3">
      <div className="grid w-full max-w-3xl grid-cols-2 gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3">
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
        className="caro-board-shell playgame-board-wrap"
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
              disabled={board[index] !== null || currentTurn !== youAre}
            >
              {cell === "X" && <span className="caro-mark caro-mark-x">X</span>}
              {cell === "O" && <span className="caro-mark caro-mark-o">O</span>}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="playgame-danger-button"
        onClick={onExitGame}
      >
        Thoat tran
      </button>
    </div>
  );
};

const PlayerPanel = ({ player, symbol, timer, active, align }) => (
  <div
    className={`playgame-player-panel flex items-center gap-3 px-3 py-2 ${
      active ? "playgame-player-panel-active" : ""
    } ${align === "right" ? "sm:justify-end" : ""}`}
  >
    {align === "right" && <SymbolBadge symbol={symbol} />}
    <img
      src={player?.avatar}
      alt={player?.name || "Player"}
      className="h-10 w-10 rounded-md border border-fuchsia-200/25 object-cover shadow-lg shadow-purple-950/20"
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
      symbol === "X" ? "playgame-symbol-x" : "playgame-symbol-o"
    }`}
  >
    {symbol}
  </span>
);

export default InGameScreen;
