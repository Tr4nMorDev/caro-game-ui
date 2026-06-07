import { Bot, Swords } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
            className="w-full max-w-4xl rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20 sm:p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold tracking-normal text-white sm:text-4xl">
                Co Caro Online
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Chon che do choi va bat dau tran dau.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ModeCard
                icon={<Swords className="h-6 w-6" />}
                title="Dau voi nguoi choi"
                description="Tim doi thu ngau nhien va vao tran PvP."
                buttonLabel="Tim tran"
                buttonClass="bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                onClick={() => handleClick(onFindMatch)}
              />
              <ModeCard
                icon={<Bot className="h-6 w-6" />}
                title="Choi voi AI"
                description="Tap luyen nhanh voi ban co 15x15."
                buttonLabel="Choi ngay"
                buttonClass="bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                onClick={() => handleClick(onPlayCaro)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ModeCard = ({
  icon,
  title,
  description,
  buttonLabel,
  buttonClass,
  onClick,
}) => (
  <motion.div
    className="flex min-h-52 flex-col justify-between rounded-lg border border-white/10 bg-slate-950/40 p-5"
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
  >
    <div>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-cyan-200">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
    <button
      type="button"
      className={`mt-6 w-full rounded-md px-4 py-3 text-sm font-bold transition ${buttonClass}`}
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  </motion.div>
);

export default IdleScreen;
