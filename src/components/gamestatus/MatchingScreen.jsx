import { useEffect, useMemo, useState } from "react";

const avatars = [1, 2, 3, 4, 5].map((id) => `/chibi/${id}.png`);

const MatchingScreen = ({ onCancel }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setElapsed((current) => current + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const avatarTrack = useMemo(
    () =>
      [...avatars, ...avatars, ...avatars].map((avatar, index) => ({
        avatar,
        label: `P${index + 1}`,
      })),
    []
  );

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-blue-300/20 bg-slate-950/70 p-6 text-white shadow-2xl shadow-blue-950/40 backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_42%)]" />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-44 w-[140%] -translate-y-1/2 -rotate-12 rounded-full bg-blue-500/10 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-blue-200/70">
              Searching
            </p>
            <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Dang tim doi thu
            </h1>
          </div>
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-red-300/60 hover:bg-red-500/10 hover:text-red-200"
            onClick={onCancel}
          >
            Huy
          </button>
        </div>

        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/20 py-5">
          <div className="matching-avatar-track flex w-max gap-5 px-5">
            {avatarTrack.map((item, index) => (
              <div
                key={`${item.avatar}-${index}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 shadow-lg shadow-black/20"
              >
                <img
                  src={item.avatar}
                  alt="avatar"
                  className="h-11 w-11 rounded-full border border-blue-200/40 object-cover"
                />
                <span className="text-xs font-bold text-slate-200">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="matching-clock relative flex h-48 w-48 items-center justify-center rounded-full sm:h-56 sm:w-56">
            <div className="absolute inset-4 rounded-full border border-blue-300/30" />
            <div className="absolute inset-9 rounded-full border border-cyan-300/25" />
            <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-white/10 bg-slate-950/80 shadow-2xl shadow-blue-950/50 sm:h-36 sm:w-36">
              <span className="font-mono text-3xl font-black text-white">
                {minutes}:{seconds}
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-blue-200/80">
                Matching
              </span>
            </div>
          </div>
        </div>

        <p className="mt-7 text-center text-sm text-slate-400">
          Dang ghep ban voi nguoi choi phu hop...
        </p>
      </div>
    </div>
  );
};

export default MatchingScreen;
