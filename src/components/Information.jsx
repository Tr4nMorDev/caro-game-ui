import { Link } from "react-router-dom";

const Information = () => {
  return (
    <section className="min-h-screen w-full px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex w-full items-start justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Link
            to="/signup"
            className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-white/15"
          >
            Đăng kí
          </Link>
          <Link
            to="/signin"
            className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-white/15"
          >
            Đăng nhập
          </Link>
        </div>

        <div className="group relative">
          <button
            type="button"
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-mono text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-white/15"
          >
            console-&gt;
          </button>
          <div className="pointer-events-none absolute right-0 top-full mt-2 w-max max-w-[220px] rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-slate-100 opacity-0 shadow-xl shadow-black/30 transition group-hover:opacity-100">
            Đăng nhập với tư cách khách
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
