import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const tabs = ["Beginning", "Logs", "Achievements", "Creations", "Games"];

const IdleScreen = ({ onFindMatch, onPlayCaro }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("Beginning");
  const [localTime, setLocalTime] = useState(() => getTimeLabel());

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(getTimeLabel()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = async (action) => {
    await action();
    setIsVisible(false);
  };

  return (
    <div className="h-full min-h-0 w-full">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="playgame-cyber-main h-full min-h-0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="cyber-topline">
              <div className="flex items-center gap-5">
                <p>
                  <span className="text-lime-300">48</span> level
                </p>
                <p>
                  <span className="text-lime-300">1,425</span> coins awarded
                </p>
              </div>
              <div className="flex items-center gap-5 text-right">
                <p>credits</p>
                <p>server time: 6:42</p>
                <p>local time: {localTime}</p>
              </div>
            </div>

            <div className="cyber-content-grid">
              <section className="cyber-hero-panel">
                <div className="cyber-hero-copy">
                  <h1>
                    Swimming through a vast network of interconnected devices and
                    servers, spreading joy across the globe
                  </h1>
                  <p>Artwork generated with Midjourney</p>
                </div>

                <div className="cyber-image-frame">
                  <img src="/main/1.png" alt="Purple cyber whale caro artwork" />
                </div>

                <div className="cyber-tab-row" aria-label="Gameplay tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={activeTab === tab ? "cyber-tab-active" : ""}
                    >
                      <span>{tab}</span>
                      <small>
                        {tab === "Beginning"
                          ? "Start your connection"
                          : "System record"}
                      </small>
                    </button>
                  ))}
                </div>
              </section>

              <aside className="cyber-quest-panel">
                <div className="cyber-quest-title">Active Quest</div>
                <p className="cyber-label mt-4">quest name</p>
                <h2>React Website</h2>

                <p className="cyber-label mt-5">goal</p>
                <p className="cyber-body">
                  Build this website. Implement a full react website with multiple
                  routers, ui elements and rich styling.
                </p>

                <p className="cyber-label mt-5">actions</p>
                <div className="mt-2 space-y-2">
                  <ActionButton
                    title="Find PvP Match"
                    description="Match with a real player"
                    onClick={() => handleClick(onFindMatch)}
                  />
                  <ActionButton
                    title="Play With AI"
                    description="Practice on the 15x15 board"
                    onClick={() => handleClick(onPlayCaro)}
                  />
                </div>

                <p className="cyber-label mt-5">rewards</p>
                <div className="mt-2 flex gap-2">
                  <span className="cyber-reward">XP</span>
                  <span className="cyber-reward">+25</span>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActionButton = ({ title, description, onClick }) => (
  <button type="button" onClick={onClick} className="cyber-action-button">
    <span>
      <strong>{title}</strong>
      <small>{description}</small>
    </span>
    <ChevronRight className="h-4 w-4" />
  </button>
);

const getTimeLabel = () => {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default IdleScreen;
