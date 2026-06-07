import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const MatchingScreen = ({ onCancel }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) return;

    const timerId = setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [countdown]);

  return (
    <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 text-center shadow-2xl shadow-black/20">
      <Loader2 className="mx-auto h-9 w-9 animate-spin text-cyan-300" />
      <h1 className="mt-5 text-2xl font-semibold text-white">Dang tim doi thu</h1>
      <p className="mt-2 text-sm text-slate-400">
        {countdown > 0
          ? `Se tu dong huy sau ${countdown} giay neu chua co tran.`
          : "Da het thoi gian cho."}
      </p>
      <button
        type="button"
        className="mt-6 rounded-md border border-white/10 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-200"
        onClick={onCancel}
      >
        Huy tim tran
      </button>
    </div>
  );
};

export default MatchingScreen;
