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

  const handleClick = async (action) => {
    await action();
    setIsVisible(false);
  };

  return (
    <div className="flex w-full justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="w-full max-w-6xl overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-slate-950/45 p-4 shadow-2xl shadow-purple-950/40 backdrop-blur-xl sm:p-5 lg:p-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-fuchsia-200/70">
                  Caro Match Hub
                </p>
                <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                  Leaderboard
                </h1>
              </div>

              <div className="flex rounded-lg border border-fuchsia-300/25 bg-white/5 p-1 text-sm font-bold text-white">
                <span className="rounded-md px-5 py-2 text-slate-300">Home</span>
                <span className="rounded-md bg-fuchsia-300 px-5 py-2 text-slate-950 shadow-lg shadow-fuchsia-900/30">
                  Play
                </span>
                <span className="rounded-md px-5 py-2 text-slate-300">Rank</span>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_310px]">
              <section className="min-h-[520px] rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5">
                <div className="mb-5 flex w-fit rounded-lg border border-white/10 bg-white/10 p-1 text-xs font-bold">
                  <span className="rounded-md bg-gradient-to-r from-fuchsia-400 to-rose-300 px-5 py-2 text-white">
                    Weekly
                  </span>
                  <span className="px-5 py-2 text-slate-300">Monthly</span>
                  <span className="px-5 py-2 text-slate-300">All-Time</span>
                </div>

                <div className="grid min-h-[270px] grid-cols-3 items-end gap-3 px-1 sm:px-8">
                  <PodiumCard
                    rank="No.2"
                    name="PvP"
                    height="h-36 sm:h-44"
                    color="from-fuchsia-500 to-purple-500"
                    icon={<Swords className="h-7 w-7" />}
                  />
                  <PodiumCard
                    rank="No.1"
                    name="Find Match"
                    height="h-52 sm:h-64"
                    color="from-orange-400 via-fuchsia-400 to-violet-500"
                    icon={<Trophy className="h-9 w-9" />}
                    featured
                  />
                  <PodiumCard
                    rank="No.3"
                    name="AI"
                    height="h-28 sm:h-36"
                    color="from-indigo-400 to-cyan-300"
                    icon={<Bot className="h-7 w-7" />}
                  />
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-slate-950/45">
                  <div className="grid grid-cols-[1fr_auto] px-4 py-3 text-xs font-bold text-slate-300">
                    <span>Rank & User</span>
                    <span>Point</span>
                  </div>
                  <div className="space-y-2 p-3">
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
                </div>
              </section>

              <aside className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 shadow-xl shadow-black/20">
                <div className="mb-4 rounded-xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm font-black text-white">Console Player</p>
                  <p className="mt-1 text-xs text-slate-300">Ready for a fast match</p>
                </div>

                <div className="space-y-3">
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
    className="group flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 text-left transition hover:border-fuchsia-200/50 hover:bg-white/15"
  >
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accent} text-slate-950`}>
      {icon}
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-sm font-black text-white">{title}</span>
      <span className="mt-1 block text-xs leading-5 text-slate-300">{description}</span>
    </span>
    <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-white" />
  </button>
);

export default IdleScreen;
