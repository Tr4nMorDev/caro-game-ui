import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

const Information = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  const handleGuestLogin = async () => {
    if (isGuestLoading) return;

    const guestId = (
      crypto.randomUUID?.() || `${Date.now()}${Math.random()}`
    )
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 12);

    const guestData = {
      name: `Guest ${guestId.slice(0, 6)}`,
      email: `guest-${guestId}@console.local`,
      password: `guest-${guestId}`,
    };

    try {
      setIsGuestLoading(true);
      const result = await signup(guestData);
      login({ token: result.token, user: result.user });
      navigate("/gameplay");
    } catch (error) {
      console.error("Guest login error:", error.message);
    } finally {
      setIsGuestLoading(false);
    }
  };

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
            className="cursor-pointer rounded-xl border border-white/15 bg-white/10 px-5 py-3 font-mono text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:bg-white/15 disabled:cursor-wait disabled:opacity-70"
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
          >
            {isGuestLoading ? "loading..." : "console->"}
          </button>
          <div className="pointer-events-none absolute right-0 top-full mt-2 w-max max-w-[240px] rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-slate-100 opacity-0 shadow-xl shadow-black/30 transition group-hover:opacity-100">
            Tạo tài khoản khách và vào game
          </div>
        </div>
      </div>
    </section>
  );
};

export default Information;
