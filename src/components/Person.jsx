import { LogOut, Pencil, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signout, updateAvatar } from "../api/authApi";
import { useAudio } from "../contexts/AudioContext";
import { useAuth } from "../contexts/AuthContext";

const chibiAvatars = [1, 2, 3, 4, 5].map((id) => ({
  image: `/chibi/${id}.webp`,
  value: `/chibi/${id}.png`,
}));

const getAvatarImageSrc = (avatar) => {
  const chibiMatch = avatar?.match(/^\/chibi\/([1-5])\.png$/);
  return chibiMatch ? `/chibi/${chibiMatch[1]}.webp` : avatar;
};

const Person = () => {
  const { user, isAuthenticated, logout, token, updateUser } = useAuth();
  const { musicEnabled, toggleMusic } = useAudio();
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const navigate = useNavigate();
  const rankPoints = user?.rank?.points ?? 1000;

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

  const openAvatarPicker = () => {
    setProfileName(user?.name || "");
    setSelectedAvatar(user?.avatar || chibiAvatars[0].value);
    setIsAvatarPickerOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!token || isSavingAvatar) return;

    try {
      setIsSavingAvatar(true);
      const result = await updateAvatar(token, selectedAvatar, profileName);
      updateUser(result.user);
      setIsAvatarPickerOpen(false);
    } catch (error) {
      console.error("Update profile error:", error.message);
    } finally {
      setIsSavingAvatar(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <aside className="playgame-cyber-profile playgame-card flex min-h-0 flex-col justify-between p-4">
        <div>
          <p className="cyber-label">status</p>
          <p className="text-sm font-semibold text-white">Caro Online</p>
          <p className="mt-1 text-xs text-slate-400">Please sign in to play</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="playgame-primary-button"
        >
          Sign in
        </button>
      </aside>
    );
  }

  return (
    <>
      <aside className="playgame-cyber-profile playgame-card flex min-h-0 flex-col justify-between gap-4 p-4">
        <div className="playgame-profile-summary space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-black text-lime-300">{rankPoints.toLocaleString("en-US")}</p>
              <p className="cyber-label -mt-1">point rank</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-lime-300">1,425</p>
              <p className="cyber-label -mt-1">coins awarded</p>
            </div>
          </div>

          <button
            type="button"
            onClick={openAvatarPicker}
            className="group cyber-avatar-frame relative block w-full focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
            title="Change avatar"
          >
            {user.avatar ? (
              <img
                src={getAvatarImageSrc(user.avatar)}
                alt={user.name || "Player"}
                decoding="async"
                className="aspect-square w-full object-cover transition group-hover:brightness-110"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center bg-slate-950/70">
                <UserRound className="h-12 w-12 text-slate-300" />
              </div>
            )}
            <span className="pointer-events-none absolute bottom-2 right-2 border border-fuchsia-300 bg-black/70 px-2 py-1 text-[10px] font-black uppercase text-fuchsia-100 opacity-0 transition group-hover:opacity-100">
              edit
            </span>
          </button>

          <div className="space-y-3">
            <div>
              <p className="cyber-label">name</p>
              <p className="truncate text-base font-black uppercase text-fuchsia-300">
                {user.name || user.email || "Player"}
              </p>
            </div>
            <div>
              <p className="cyber-label">occupation</p>
              <p className="text-sm font-black uppercase text-fuchsia-300">Caro Player</p>
            </div>
            <div>
              <p className="cyber-label">corporation</p>
              <p className="text-sm font-black uppercase text-fuchsia-300">Synthelytix</p>
            </div>
            <div>
              <p className="cyber-label">availability</p>
              <button
                type="button"
                onClick={openAvatarPicker}
                className="cyber-strip-button mt-1 w-full"
                title="Change display name"
              >
                <Pencil className="h-3 w-3" />
                open for edit
              </button>
              <div className="playgame-profile-settings mt-2">
                <button
                  type="button"
                  onClick={() => setIsProfileSettingsOpen((value) => !value)}
                  className="cyber-strip-button w-full justify-between"
                  aria-expanded={isProfileSettingsOpen}
                >
                  <span>setting</span>
                  <span className="text-sm leading-none transition duration-300">⚙</span>
                </button>
                <div
                  className={`playgame-audio-settings mt-2 space-y-1.5 ${
                    isProfileSettingsOpen ? "playgame-audio-settings-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSoundEffectsEnabled((value) => !value)}
                    className="playgame-audio-row"
                    aria-pressed={soundEffectsEnabled}
                  >
                    <span>Sound Effects</span>
                    <span>{soundEffectsEnabled ? "on" : "off"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleMusic}
                    className="playgame-audio-row"
                    aria-pressed={musicEnabled}
                  >
                    <span>Music</span>
                    <span>{musicEnabled ? "on" : "off"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="playgame-profile-actions space-y-4">
          <div className="playgame-profile-motto">
            <p className="cyber-label">motto:</p>
            <p className="mt-1 text-[11px] uppercase leading-5 tracking-[0.16em] text-slate-300">
              place five stones before the network reads your mind.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="cyber-strip-button w-full justify-center"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {isAvatarPickerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm"
          onClick={() => setIsAvatarPickerOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-fuchsia-300/20 bg-slate-950/80 p-5 text-white shadow-2xl shadow-purple-950/40"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Edit Profile</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Update your display name and choose a chibi avatar for your account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAvatarPickerOpen(false)}
                className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-bold text-slate-200">
                Display Name
              </span>
              <input
                type="text"
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                maxLength={32}
                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                placeholder="Enter display name"
              />
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {chibiAvatars.map((avatar) => (
                <button
                  key={avatar.value}
                  type="button"
                  disabled={isSavingAvatar}
                  onClick={() => setSelectedAvatar(avatar.value)}
                  className={`rounded-xl border p-2 transition hover:-translate-y-1 hover:border-fuchsia-300 hover:bg-white/10 disabled:cursor-wait disabled:opacity-70 ${
                    selectedAvatar === avatar.value
                      ? "border-fuchsia-300 bg-fuchsia-300/15"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <img
                    src={avatar.image}
                    alt="Chibi avatar"
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={isSavingAvatar}
              onClick={handleSaveProfile}
              className="mt-4 w-full rounded-lg bg-fuchsia-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-fuchsia-200 disabled:cursor-wait disabled:opacity-70"
            >
              {isSavingAvatar ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Person;
