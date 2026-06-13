import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const avatars = [1, 2, 3, 4, 5].map((id) => `/chibi/${id}.png`);

const MatchingScreen = ({ onCancel }) => {
  const { user } = useAuth();
  const [elapsed, setElapsed] = useState(0);
  const [localTime, setLocalTime] = useState(() => getTimeLabel());

  useEffect(() => {
    const elapsedTimer = setInterval(() => {
      setElapsed((current) => current + 1);
    }, 1000);
    const clockTimer = setInterval(() => setLocalTime(getTimeLabel()), 1000);

    return () => {
      clearInterval(elapsedTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const avatarTrack = useMemo(
    () =>
      [...avatars, ...avatars, ...avatars, ...avatars].map((avatar, index) => ({
        avatar,
        label: `NODE-${String(index + 1).padStart(2, "0")}`,
      })),
    []
  );

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  const rankPoints = user?.rank?.points ?? 1000;

  return (
    <div className="cyber-matching-screen playgame-cyber-main h-full min-h-0">
      <div className="cyber-topline">
        <div className="flex items-center gap-5">
          <p>
            <span className="text-lime-300">{rankPoints.toLocaleString("en-US")}</span> point rank
          </p>
          <p>
            <span className="text-lime-300">matching</span> active
          </p>
        </div>
        <div className="flex items-center gap-5 text-right">
          <p>queue: pvp</p>
          <p>server time: 6:42</p>
          <p>local time: {localTime}</p>
        </div>
      </div>

      <div className="cyber-matching-grid">
        <section className="cyber-matching-core">
          <div className="cyber-hero-copy">
            <h1>
              Searching for a compatible opponent inside the caro network
            </h1>
            <p>Matchmaking queue is scanning active sockets</p>
          </div>

          <div className="cyber-matching-arena">
            <div className="cyber-avatar-lane cyber-avatar-lane-top">
              <div className="matching-avatar-track">
                {avatarTrack.map((item, index) => (
                  <AvatarNode key={`top-${item.label}-${index}`} item={item} />
                ))}
              </div>
            </div>

            <div className="cyber-matching-clock matching-clock">
              <div className="cyber-clock-inner">
                <span>
                  {minutes}:{seconds}
                </span>
                <small>Searching</small>
              </div>
            </div>

            <div className="cyber-avatar-lane cyber-avatar-lane-bottom">
              <div className="matching-avatar-track matching-avatar-track-reverse">
                {avatarTrack.map((item, index) => (
                  <AvatarNode key={`bottom-${item.label}-${index}`} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="cyber-match-tabs">
            <div className="cyber-tab-active">
              <span>Waiting</span>
              <small>Opponent discovery</small>
            </div>
            <div>
              <span>Socket</span>
              <small>Connection alive</small>
            </div>
            <div>
              <span>Redis</span>
              <small>Queue sync</small>
            </div>
          </div>
        </section>

        <aside className="cyber-quest-panel cyber-matching-status">
          <div className="cyber-quest-title">Active Queue</div>
          <p className="cyber-label mt-4">queue name</p>
          <h2>PvP Matchmaking</h2>

          <p className="cyber-label mt-5">status</p>
          <p className="cyber-body">
            Your socket has joined the matchmaking pool. The server is pairing
            you with another available player.
          </p>

          <p className="cyber-label mt-5">elapsed</p>
          <div className="cyber-match-elapsed">
            {minutes}:{seconds}
          </div>

          <button type="button" onClick={onCancel} className="cyber-cancel-button">
            <X className="h-4 w-4" />
            Cancel Queue
          </button>
        </aside>
      </div>
    </div>
  );
};

const AvatarNode = ({ item }) => (
  <div className="cyber-avatar-node">
    <img src={item.avatar} alt={item.label} />
    <span>{item.label}</span>
  </div>
);

const getTimeLabel = () => {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default MatchingScreen;
