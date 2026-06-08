const GameEnd = ({ isWinner, onReplay }) => {
  return (
    <div className="playgame-glass w-full max-w-md p-6 text-center">
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
        className="playgame-primary-button mt-6"
      >
        Quay lai
      </button>
    </div>
  );
};

export default GameEnd;
