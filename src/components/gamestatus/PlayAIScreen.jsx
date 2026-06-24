import { Bot, UserRound } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
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
  const turnLabel = currentTurn === "X" ? "Your Turn" : "AI Turn";

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

  const handleClick = useCallback((index) => {
    if (!socket || board[index] || gameOver || currentTurn !== "X") return;

    const nextBoard = [...board];
    nextBoard[index] = "X";
    setBoard(nextBoard);
    setCurrentTurn("O");
    socket.emit("move", { index, board: nextBoard });
  }, [board, currentTurn, gameOver, socket]);

  return (
    <div className="cyber-game-screen playgame-cyber-main h-full min-h-0">
      <div className="cyber-topline">
        <div className="flex items-center gap-5">
          <p>
            <span className="text-lime-300">X</span> symbol
          </p>
          <p>
            <span>{gameOver ? "Finished" : turnLabel}</span> active
          </p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <p>mode: AI</p>
          <p>board: 15x15</p>
        </div>
      </div>

      <div className="cyber-game-grid">
        <section className="cyber-game-board-zone">
          <div className="cyber-game-versus">
            <AiPlayerPanel
              icon={<UserRound className="h-5 w-5" />}
              name={user?.name || "Ban"}
              symbol="X"
              timer={myTimer}
              active={currentTurn === "X"}
            />
            <div className="cyber-vs-mark">vs</div>
            <AiPlayerPanel
              icon={<Bot className="h-5 w-5" />}
              name="AI"
              symbol="O"
              timer={aiTimer}
              active={currentTurn === "O"}
              align="right"
            />
          </div>

          <div className="cyber-game-board-scroll">
            <div className="caro-board-shell playgame-board-wrap-ai cyber-game-board-shell">
              <BoardGrid
                board={board}
                size={size}
                isInteractive={!gameOver && currentTurn === "X"}
                onCellClick={handleClick}
              />
            </div>
          </div>
        </section>

        <aside className="cyber-quest-panel cyber-game-side">
          <div className="cyber-quest-title">AI Session</div>
          <p className="cyber-label mt-4">turn status</p>
          <h2>{gameOver ? "Game Finished" : turnLabel}</h2>
          <p className="cyber-label mt-5">objective</p>
          <p className="cyber-body">Practice clean attack lines against the AI node.</p>
          {gameOver && <div className="cyber-reward mt-4">Match Closed</div>}

          <button type="button" className="cyber-cancel-button" onClick={handleDeleteRedis}>
            Exit Match
          </button>
        </aside>
      </div>
    </div>
  );
};

const AiPlayerPanel = ({ icon, name, symbol, timer, active, align }) => (
  <div
    className={`cyber-game-player-panel flex items-center gap-3 px-3 py-2 ${
      active ? "playgame-player-panel-active" : ""
    } ${align === "right" ? "sm:justify-end" : ""}`}
  >
    {align === "right" && <SymbolBadge symbol={symbol} />}
    <div className="playgame-player-icon flex h-10 w-10 items-center justify-center rounded-md border border-fuchsia-200/25 bg-slate-950/70 text-slate-200 shadow-lg shadow-purple-950/20">
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

const BoardGrid = memo(({ board, size, isInteractive, onCellClick }) => (
  <div
    className="caro-board-grid"
    style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
  >
    {board.map((cell, index) => (
      <CaroCell
        key={index}
        cell={cell}
        index={index}
        disabled={Boolean(cell) || !isInteractive}
        onCellClick={onCellClick}
      />
    ))}
  </div>
));

BoardGrid.displayName = "BoardGrid";

const CaroCell = memo(({ cell, index, disabled, onCellClick }) => (
  <button
    type="button"
    onClick={() => onCellClick(index)}
    className={`caro-cell ${cell ? "caro-cell-filled" : ""}`}
    disabled={disabled}
  >
    {cell === "X" && <span className="caro-mark caro-mark-x">X</span>}
    {cell === "O" && <span className="caro-mark caro-mark-o">O</span>}
  </button>
));

CaroCell.displayName = "CaroCell";

const SymbolBadge = ({ symbol }) => (
  <span
    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-black ${
      symbol === "X" ? "playgame-symbol-x" : "playgame-symbol-o"
    }`}
  >
    {symbol}
  </span>
);

export default PlayAIScreen;
