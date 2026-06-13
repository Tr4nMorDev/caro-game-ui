import { LogOut, MoveRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const JoinRoomScreen = ({ onCancel }) => {
  const { user } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const rankPoints = user?.rank?.points ?? 1000;

  const normalizedRoomCode = roomCode.trim().toUpperCase();
  const canJoin = normalizedRoomCode.length >= 4;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canJoin) return;
    console.log("Join room pending backend:", normalizedRoomCode);
  };

  return (
    <div className="cyber-room-join-screen playgame-cyber-main h-full min-h-0">
      <div className="cyber-topline">
        <div className="flex items-center gap-5">
          <p>
            <span className="text-lime-300">{rankPoints.toLocaleString("en-US")}</span> point rank
          </p>
          <p>
            <span className="text-lime-300">join</span> private room
          </p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <p>mode: room code</p>
          <p>status: standby</p>
        </div>
      </div>

      <div className="cyber-room-join-grid">
        <section className="cyber-room-join-core">
          <div className="cyber-hero-copy">
            <h1>Connect to a private caro room</h1>
            <p>Enter the room code shared by the host to request access</p>
          </div>

          <form className="cyber-room-join-panel" onSubmit={handleSubmit}>
            <p className="cyber-label">room code</p>
            <input
              type="text"
              value={roomCode}
              maxLength={8}
              onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
              placeholder="ENTER CODE"
              aria-label="Room code"
              autoFocus
            />
            <button type="submit" disabled={!canJoin}>
              <MoveRight className="h-4 w-4" />
              Join Room
            </button>
          </form>
        </section>

        <aside className="cyber-quest-panel cyber-room-join-status">
          <div className="cyber-quest-title">Join Room</div>
          <p className="cyber-label mt-4">player</p>
          <h2>{user?.name || "Player"}</h2>

          <p className="cyber-label mt-5">status</p>
          <p className="cyber-body">
            This is the room entry state. Backend validation and socket join will be wired next.
          </p>

          <button type="button" className="cyber-room-cancel-button" onClick={onCancel}>
            <LogOut className="h-4 w-4" />
            Back To Lobby
          </button>
        </aside>
      </div>
    </div>
  );
};

export default JoinRoomScreen;
