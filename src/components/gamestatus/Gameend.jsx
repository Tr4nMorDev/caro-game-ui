import { RotateCcw } from "lucide-react";

const GameEnd = ({ isWinner, onReplay }) => {
  const resultLabel = isWinner ? "Victory" : "Defeat";
  const statusText = isWinner ? "Connection Secured" : "Node Overrun";
  const description = isWinner
    ? "You completed the caro sequence and locked the board before your opponent."
    : "The opponent completed a stronger sequence. Return to lobby and rebuild your line.";

  return (
    <div className={`cyber-result-screen playgame-cyber-main h-full min-h-0 ${isWinner ? "cyber-result-win" : "cyber-result-lose"}`}>
      <div className="cyber-topline">
        <div className="flex items-center gap-5">
          <p>
            <span className={isWinner ? "text-lime-300" : "text-red-300"}>
              {isWinner ? "+25" : "-"}
            </span>{" "}
            rating
          </p>
          <p>
            <span>{resultLabel}</span> report
          </p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <p>match status: closed</p>
          <p>reward sync: ready</p>
        </div>
      </div>

      <section className="cyber-result-grid">
        <div className="cyber-result-main">
          <p className="cyber-label">match result</p>
          <h1>{resultLabel}</h1>
          <h2>{statusText}</h2>
          <p className="cyber-result-desc">{description}</p>

          <div className="cyber-result-stats">
            <div>
              <span>Mode</span>
              <strong>PvP</strong>
            </div>
            <div>
              <span>Board</span>
              <strong>15x15</strong>
            </div>
            <div>
              <span>Rank</span>
              <strong>{isWinner ? "Updated" : "Pending"}</strong>
            </div>
          </div>

          <button type="button" onClick={onReplay} className="cyber-result-button">
            <RotateCcw className="h-4 w-4" />
            Return Lobby
          </button>
        </div>

        <aside className="cyber-quest-panel cyber-result-side">
          <div className="cyber-quest-title">Battle Log</div>
          <p className="cyber-label mt-4">summary</p>
          <p className="cyber-body">
            Match record has been finalized. Socket session can be released and
            the player may enter a new queue.
          </p>

          <p className="cyber-label mt-5">next action</p>
          <div className="cyber-reward mt-2">
            {isWinner ? "Claim momentum" : "Retry queue"}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default GameEnd;
