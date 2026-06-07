const GameEnd = ({ isWinner, onReplay }) => {
  return (
    <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 text-center shadow-2xl shadow-black/20">
      <h2
        className={`text-2xl font-bold ${
          isWinner ? "text-emerald-300" : "text-red-300"
        }`}
      >
        {isWinner ? "Ban da chien thang" : "Ban da thua"}
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Ket thuc tran dau. Quay lai san cho de bat dau tran moi.
      </p>
      <button
        type="button"
        onClick={onReplay}
        className="mt-6 rounded-md bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
      >
        Quay lai
      </button>
    </div>
  );
};

export default GameEnd;
