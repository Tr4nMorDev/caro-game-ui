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
  const turnLabel = currentTurn === youAre ? "Your Turn" : "Opponent Turn";

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
    <div className="cyber-game-screen playgame-cyber-main h-full min-h-0">
      <div className="cyber-topline">
        <div className="flex items-center gap-5">
          <p>
            <span className="text-lime-300">{youAre}</span> symbol
          </p>
          <p>
            <span>{turnLabel}</span> active
          </p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <p>mode: pvp</p>
          <p>board: 20x20</p>
        </div>
      </div>

      <div className="cyber-game-grid">
        <section className="cyber-game-board-zone">
          <div className="cyber-game-versus">
            <PlayerPanel
              player={you}
              symbol={youAre}
              timer={myTimer}
              active={currentTurn === youAre}
              align="left"
            />
            <div className="cyber-vs-mark">vs</div>
            <PlayerPanel
              player={opponent}
              symbol={youAre === "X" ? "O" : "X"}
              timer={opponentTimer}
              active={currentTurn !== youAre}
              align="right"
            />
          </div>

          <div className="caro-board-shell playgame-board-wrap cyber-game-board-shell">
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
        </section>

        <aside className="cyber-quest-panel cyber-game-side">
          <div className="cyber-quest-title">Live Match</div>
          <p className="cyber-label mt-4">turn status</p>
          <h2>{turnLabel}</h2>
          <p className="cyber-label mt-5">match id</p>
          <p className="cyber-body">{matchId || "syncing"}</p>
          <p className="cyber-label mt-5">objective</p>
          <p className="cyber-body">Create a five-stone sequence before the opponent completes theirs.</p>

          <button type="button" className="cyber-cancel-button" onClick={onExitGame}>
            Exit Match
          </button>
        </aside>
      </div>
    </div>
  );
};

const PlayerPanel = ({ player, symbol, timer, active, align }) => (
  <div
    className={`cyber-game-player-panel flex items-center gap-3 px-3 py-2 ${
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
