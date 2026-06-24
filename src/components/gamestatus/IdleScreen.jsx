import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ChatInput, ServerChat } from "./tab_chat/ServerChat";

const tabs = ["Beginning", "Shop", "Server Chat", "Achievements", "Creations", "Games"];
const disabledTabs = new Set(["Shop", "Achievements", "Creations", "Games"]);
const shopItems = [
  {
    id: "nebula-frame",
    title: "Nebula Avatar Frame",
    eyebrow: "Cosmetic item",
    description: "A soft purple avatar frame for cyber-style players.",
    price: "250 coins",
    image: "/main/1.webp",
  },
  {
    id: "chibi-scout",
    title: "Chibi Scout",
    eyebrow: "Avatar pack",
    description: "A compact chibi avatar pack built for mobile profiles.",
    price: "180 coins",
    image: "/chibi/1.webp",
  },
  {
    id: "chibi-guardian",
    title: "Chibi Guardian",
    eyebrow: "Avatar pack",
    description: "A defensive avatar pack for steady caro players.",
    price: "220 coins",
    image: "/chibi/2.webp",
  },
  {
    id: "rank-boost",
    title: "Rank Glow",
    eyebrow: "Profile effect",
    description: "A glowing title effect for your leaderboard badge.",
    price: "320 coins",
    image: "/chibi/3.webp",
  },
];

const IdleScreen = ({ onFindMatch, onPlayCaro, onCreateRoom, onJoinRoom }) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("Beginning");
  const [selectedShopId, setSelectedShopId] = useState(shopItems[0].id);
  const [localTime, setLocalTime] = useState(() => getTimeLabel());
  const selectedShopItem =
    shopItems.find((item) => item.id === selectedShopId) || shopItems[0];
  const rankPoints = user?.rank?.points ?? 1000;

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
                  <span className="text-lime-300">{rankPoints.toLocaleString("en-US")}</span> point rank
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
                <div className="cyber-tab-content">
                  {activeTab === "Shop" ? (
                    <ShopView
                      items={shopItems}
                      selectedItem={selectedShopItem}
                      onSelect={setSelectedShopId}
                    />
                  ) : activeTab === "Server Chat" ? (
                    <div className="cyber-server-chat-view">
                      <ServerChat />
                    </div>
                  ) : (
                    <>
                      <div className="cyber-hero-copy">
                        <h1>
                          Swimming through a vast network of interconnected devices and
                          servers, spreading joy across the globe
                        </h1>
                        <p>Artwork generated with Midjourney</p>
                      </div>

                      <div className="cyber-image-frame">
                        <img
                          src="/main/1.webp"
                          alt="Purple cyber whale caro artwork"
                          decoding="async"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="cyber-tab-footer">
                  {activeTab === "Server Chat" && <ChatInput />}

                  <div className="cyber-tab-row" aria-label="Gameplay tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => {
                          if (!disabledTabs.has(tab)) setActiveTab(tab);
                        }}
                        disabled={disabledTabs.has(tab)}
                        aria-disabled={disabledTabs.has(tab)}
                        title={disabledTabs.has(tab) ? "Coming soon" : undefined}
                        className={[
                          activeTab === tab ? "cyber-tab-active" : "",
                          disabledTabs.has(tab) ? "cyber-tab-disabled" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <span>{tab}</span>
                        <small>
                          {tab === "Beginning"
                            ? "Start your connection"
                            : tab === "Shop"
                              ? "Upgrade your setup"
                              : tab === "Server Chat"
                                ? "Talk with lobby"
                              : "System record"}
                        </small>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <aside className="cyber-side-panel">
                <div className="cyber-quest-panel">
                  <div className="cyber-quest-title">Synthelytix</div>
                  <p className="cyber-label mt-4">cyberpunk caro network</p>
                  <h2>Play Caro Online Instantly</h2>

                  <p className="cyber-label mt-5">quick start</p>
                  <p className="cyber-body">
                    A cyberpunk online caro network for fast PvP matches, AI practice,
                    and private rooms. No account required.
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
                      description="Coming soon"
                      onClick={() => handleClick(onPlayCaro)}
                      disabled
                    />
                    <ActionButton
                      title="Create Room"
                      description="Host a private match"
                      onClick={() => handleClick(onCreateRoom)}
                    />
                    <ActionButton
                      title="Join Room"
                      description="Enter a room code"
                      onClick={() => handleClick(onJoinRoom)}
                    />
                  </div>

                  <p className="cyber-label mt-5">rewards</p>
                  <div className="mt-2 flex gap-2">
                    <span className="cyber-reward">XP</span>
                    <span className="cyber-reward">+25</span>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActionButton = ({ title, description, onClick, disabled = false }) => (
  <button
    type="button"
    onClick={disabled ? undefined : onClick}
    disabled={disabled}
    aria-disabled={disabled}
    title={disabled ? "Coming soon" : undefined}
    className={`cyber-action-button${disabled ? " cyber-action-disabled" : ""}`}
  >
    <span>
      <strong>{title}</strong>
      <small>{description}</small>
    </span>
    <ChevronRight className="h-4 w-4" />
  </button>
);

const ShopView = ({ items, selectedItem, onSelect }) => (
  <div className="cyber-shop-view">
    <div className="cyber-hero-copy cyber-shop-copy">
      <p>{selectedItem.eyebrow}</p>
      <h1>{selectedItem.title}</h1>
      <p>{selectedItem.description}</p>
    </div>

    <div className="cyber-shop-stage">
      <img src={selectedItem.image} alt={selectedItem.title} decoding="async" />
      <div className="cyber-shop-price">
        <span>Price</span>
        <strong>{selectedItem.price}</strong>
      </div>
    </div>

    <div className="cyber-shop-carousel" aria-label="Shop items">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={selectedItem.id === item.id ? "cyber-shop-card-active" : ""}
        >
          <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
          <span>
            <strong>{item.title}</strong>
            <small>{item.price}</small>
          </span>
        </button>
      ))}
    </div>
  </div>
);

const getTimeLabel = () => {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default IdleScreen;
