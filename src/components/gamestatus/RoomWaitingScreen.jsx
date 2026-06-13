import { Copy, LogOut, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const waitingNodes = [1, 2, 3, 4, 5, 1, 2, 3].map((id, index) => ({
  id: `waiting-node-${index}`,
  avatar: `/chibi/${id}.png`,
}));

const RoomWaitingScreen = ({ roomCode, onCancel }) => {
  const { user } = useAuth();
  const [elapsed, setElapsed] = useState(0);
  const rankPoints = user?.rank?.points ?? 1000;

  useEffect(() => {
    const timer = setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  const handleCopyRoom = async () => {
    try {
      await navigator.clipboard?.writeText(roomCode);
    } catch (error) {
      console.error("Copy room code failed", error);
    }
  };

  return (
    <div className="cyber-room-waiting-screen playgame-cyber-main h-full min-h-0">
      <div className="cyber-topline">
        <div className="flex items-center gap-5">
          <p>
            <span className="text-lime-300">{rankPoints.toLocaleString("en-US")}</span> point rank
          </p>
          <p>
            <span className="text-lime-300">private</span> room
          </p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <p>room: {roomCode}</p>
          <p>waiting: {minutes}:{seconds}</p>
        </div>
      </div>

      <div className="cyber-room-waiting-grid">
        <section className="cyber-room-waiting-core">
          <div className="cyber-hero-copy">
            <h1>Private room opened inside the caro network</h1>
            <p>Share the room code and wait for your opponent to connect</p>
          </div>

          <div className="cyber-room-code-panel">
            <p className="cyber-label">room code</p>
            <strong>{roomCode}</strong>
            <button type="button" onClick={handleCopyRoom}>
              <Copy className="h-4 w-4" />
              Copy Code
            </button>
          </div>

          <div className="cyber-room-waiting-lane" aria-label="Waiting players">
            {waitingNodes.map((node) => (
              <div key={node.id} className="cyber-room-waiting-node">
                <img src={node.avatar} alt="Waiting player avatar" />
              </div>
            ))}
          </div>
        </section>

        <aside className="cyber-quest-panel cyber-room-waiting-status">
          <div className="cyber-quest-title">Waiting Room</div>
          <p className="cyber-label mt-4">host</p>
          <h2>{user?.name || "Player"}</h2>

          <p className="cyber-label mt-5">status</p>
          <p className="cyber-body">
            Room is active. The match starts when another player joins with this code.
          </p>

          <div className="cyber-room-status-card">
            <UsersRound className="h-5 w-5" />
            <span>1 / 2 players connected</span>
          </div>

          <button type="button" className="cyber-room-cancel-button" onClick={onCancel}>
            <LogOut className="h-4 w-4" />
            Leave Room
          </button>
        </aside>
      </div>
    </div>
  );
};

export default RoomWaitingScreen;
