import { LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signout } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

const Person = () => {
  const { user, isAuthenticated, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (token) {
        await signout(token);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      logout();
      navigate("/");
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <header className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-black/10">
        <div>
          <p className="text-sm font-semibold text-white">Caro Online</p>
          <p className="text-xs text-slate-400">Vui long dang nhap de choi</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Dang nhap
        </button>
      </header>
    );
  }

  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 shadow-lg shadow-black/10">
      <div className="flex min-w-0 items-center gap-3">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || "Player"}
            className="h-11 w-11 rounded-md border border-white/20 object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-slate-800">
            <UserRound className="h-5 w-5 text-slate-300" />
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {user.name || user.email || "Player"}
          </p>
          <p className="text-xs text-slate-400">San sang vao tran</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-200"
      >
        <LogOut className="h-4 w-4" />
        Dang xuat
      </button>
    </header>
  );
};

export default Person;
