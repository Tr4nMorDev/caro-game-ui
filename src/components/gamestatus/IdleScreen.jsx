import { Bot, ChevronRight, Crown, Swords, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const leaderboardRows = [
  { name: "Elite Yeon", title: "Legendary Trainer", point: "89.289", level: "Lv.4" },
  { name: "Lutayren Ren", title: "Legendary Trainer", point: "89.289", level: "Lv.2" },
  { name: "Parikos prada", title: "Pro Trainer", point: "89.289", level: "Lv.3" },
];

const IdleScreen = ({ onFindMatch, onPlayCaro }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isRankExpanded, setIsRankExpanded] = useState(false);
  const [mobileTab, setMobileTab] = useState("play");

  const handleClick = async (action) => {
    await action();
    setIsVisible(false);
  };

  return (
    <div className="flex h-full min-h-0 w-full justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="playgame-glass playgame-lobby-panel w-full max-w-6xl p-3 sm:p-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-fuchsia-200/70">
                  Caro Match Hub
                </p>
                <h1 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                  Leaderboard
                </h1>
              </div>

              <div className="flex rounded-lg border border-fuchsia-300/25 bg-white/5 p-1 text-sm font-bold text-white">
                <button
                  type="button"
                  onClick={() => setMobileTab("play")}
                  className={`playgame-tab px-5 py-2 ${
                    mobileTab === "play" ? "playgame-tab-active" : ""
                  }`}
                >
                  Play
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileTab("weekly");
                    setIsRankExpanded(true);
                  }}
                  className={`playgame-tab mx-1 px-5 py-2 ${
                    mobileTab === "weekly" ? "playgame-tab-active" : ""
                  }`}
                >
                  Weekly
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileTab("monthly");
                    setIsRankExpanded(true);
                  }}
                  className={`playgame-tab px-5 py-2 ${
                    mobileTab === "monthly" ? "playgame-tab-active" : ""
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="playgame-lobby-content grid min-h-0 gap-3 sm:gap-4 lg:grid-cols-[1fr_300px]">
              <section
                className={`playgame-card relative order-2 min-h-0 flex-col overflow-hidden p-3 sm:p-4 lg:order-1 lg:flex ${
                  mobileTab === "play" ? "hidden" : "flex"
                }`}
              >
                <div className="playgame-podium grid grid-cols-3 items-end gap-3 px-1 sm:px-6">
                  <PodiumCard
                    rank="No.2"
                    name="PvP"
                    height="h-28 sm:h-36"
                    color="from-fuchsia-500 to-purple-500"
                    icon={<Swords className="h-7 w-7" />}
                  />
                  <PodiumCard
                    rank="No.1"
                    name="Find Match"
                    height="h-40 sm:h-52"
                    color="from-orange-400 via-fuchsia-400 to-violet-500"
                    icon={<Trophy className="h-9 w-9" />}
                    featured
                  />
                  <PodiumCard
                    rank="No.3"
                    name="AI"
                    height="h-24 sm:h-32"
                    color="from-indigo-400 to-cyan-300"
                    icon={<Bot className="h-7 w-7" />}
                  />
                </div>

                <motion.div
                  className={`playgame-rank-sheet ${
                    isRankExpanded ? "playgame-rank-sheet-expanded" : ""
                  } ${mobileTab !== "play" ? "playgame-rank-sheet-mobile-open" : ""
                  }`}
                  drag="y"
                  dragElastic={0.12}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y < -24) setIsRankExpanded(true);
                    if (info.offset.y > 24) setIsRankExpanded(false);
                  }}
                  onClick={() => setIsRankExpanded((current) => !current)}
                >
                  <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-white/25" />
                  <div className="grid grid-cols-[1fr_auto] px-4 py-2 text-xs font-bold text-slate-300">
                    <span>Rank & User</span>
                    <span>{isRankExpanded ? "Close" : "Point"}</span>
                  </div>
                  <div className="playgame-rank-list space-y-1.5 p-2.5">
                    {leaderboardRows.map((row, index) => (
                      <div
                        key={row.name}
                        className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-white/10 px-3 py-2 ${
                          index === 0
                            ? "bg-gradient-to-r from-rose-400/45 via-orange-300/35 to-fuchsia-500/30"
                            : index === 1
                            ? "bg-gradient-to-r from-emerald-300/35 to-rose-300/30"
                            : "bg-white/10"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-sm font-black">
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-white">{row.name}</p>
                            <p className="text-xs text-slate-200/80">
                              {row.level} · {row.title}
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black text-fuchsia-100">
                          {row.point}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </section>

              <aside
                className={`playgame-card order-1 p-3 sm:p-4 lg:order-2 lg:block ${
                  mobileTab === "play" ? "block" : "hidden"
                }`}
              >
                <div className="mb-3 rounded-xl border border-fuchsia-300/20 bg-white/10 p-3 shadow-lg shadow-purple-950/20">
                  <p className="text-sm font-black text-white">Console Player</p>
                  <p className="mt-1 text-xs text-slate-300">Ready for a fast match</p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <ActionCard
                    icon={<Swords className="h-5 w-5" />}
                    title="Tìm trận PvP"
                    description="Ghép với người chơi thật qua matchmaking."
                    onClick={() => handleClick(onFindMatch)}
                    accent="from-fuchsia-400 to-rose-300"
                  />
                  <ActionCard
                    icon={<Bot className="h-5 w-5" />}
                    title="Chơi với AI"
                    description="Vào bàn 15x15 để luyện nhanh."
                    onClick={() => handleClick(onPlayCaro)}
                    accent="from-cyan-300 to-violet-300"
                  />
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PodiumCard = ({ rank, name, height, color, icon, featured }) => (
  <div className="flex flex-col items-center">
    <div
      className={`mb-3 flex items-center justify-center rounded-full border border-white/30 bg-slate-950/70 text-white shadow-lg ${
        featured ? "h-20 w-20" : "h-16 w-16"
      }`}
    >
      {featured ? <Crown className="absolute h-24 w-24 text-yellow-300/25" /> : null}
      <div className="relative z-10">{icon}</div>
    </div>
    <div
      className={`flex w-full max-w-[170px] flex-col items-center justify-end rounded-t-xl bg-gradient-to-b ${color} ${height} px-3 pb-5 text-center shadow-xl shadow-purple-950/30`}
    >
      <span className="text-5xl font-black text-white/85">{featured ? "1" : rank.replace("No.", "")}</span>
      <span className="mt-2 rounded-full bg-white/25 px-3 py-1 text-xs font-black text-white">
        {rank}
      </span>
      <p className="mt-2 text-xs font-bold text-white/90">{name}</p>
    </div>
  </div>
);

const ActionCard = ({ icon, title, description, onClick, accent }) => (
  <button
    type="button"
    onClick={onClick}
    className="playgame-action group flex w-full items-center gap-3 p-3 text-left"
  >
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accent} text-slate-950`}>
      {icon}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-black text-white">{title}</span>
      <span className="mt-1 hidden text-xs leading-5 text-slate-300 sm:block">{description}</span>
    </span>
    <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-white" />
  </button>
);

export default IdleScreen;
