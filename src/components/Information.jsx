import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

const Information = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [showFeedbackToast, setShowFeedbackToast] = useState(false);
  const developerEmail = "dev@synthelytix.com";
  const contactHref = `mailto:${developerEmail}?subject=${encodeURIComponent(
    "Caro Game Support"
  )}&body=${encodeURIComponent(
    "Xin chào dev,\n\nTôi cần hỗ trợ về Caro Game:\n\n"
  )}`;

  const handleGuestLogin = async () => {
    if (isGuestLoading) return;

    const guestId = (crypto.randomUUID?.() || `${Date.now()}${Math.random()}`)
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

  useEffect(() => {
    let hideTimer;
    const showTimer = setInterval(() => {
      setShowFeedbackToast(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        setShowFeedbackToast(false);
      }, 3000);
    }, 10000);

    return () => {
      clearInterval(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <section className="relative h-dvh w-full overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid w-full grid-cols-3 gap-2 sm:flex sm:items-start sm:justify-between sm:gap-4">
        <div className="contents sm:flex sm:flex-wrap sm:gap-3">
          <Link
            to="/signup"
            className="flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-2 text-center text-[11px] font-bold text-white shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-white/15 sm:h-auto sm:px-5 sm:py-3 sm:text-sm"
          >
            Đăng kí
          </Link>
          <Link
            to="/signin"
            className="flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 px-2 text-center text-[11px] font-bold text-white shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-white/15 sm:h-auto sm:px-5 sm:py-3 sm:text-sm"
          >
            Đăng nhập
          </Link>
        </div>

        <div className="group relative sm:ml-auto">
          <button
            type="button"
            className="flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-white/10 px-2 text-center font-mono text-[11px] font-bold text-white shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-white/15 disabled:cursor-wait disabled:opacity-70 sm:h-auto sm:px-5 sm:py-3 sm:text-sm"
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
          >
            {isGuestLoading ? "loading..." : "console"}
          </button>
          <div className="pointer-events-none absolute right-0 top-full mt-2 w-max max-w-[240px] rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-slate-100 opacity-0 shadow-xl shadow-black/30 transition group-hover:opacity-100">
            Tạo tài khoản khách và vào game
          </div>
        </div>
      </div>

      <div className="group absolute bottom-4 left-4 z-10">
        <a
          href={contactHref}
          className="block rounded-xl border border-white/15 bg-white/10 px-4 py-2 font-mono text-xs font-bold text-white/85 shadow-lg shadow-black/25 backdrop-blur-md transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
        >
          {developerEmail}
        </a>
        <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[230px] rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-slate-100 opacity-0 shadow-xl shadow-black/30 transition group-hover:opacity-100">
          Gửi mail feedback cho dev
        </div>
      </div>

      <a
        href={contactHref}
        className={`fixed right-3 top-20 z-20 block max-w-[210px] rounded-xl border border-cyan-300/25 bg-slate-950/85 px-3 py-2 text-right text-[11px] font-bold leading-4 text-cyan-50 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl transition duration-300 sm:hidden ${
          showFeedbackToast
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        }`}
      >
        Gửi feedback trải nghiệm của bạn
      </a>
    </section>
  );
};

export default Information;
