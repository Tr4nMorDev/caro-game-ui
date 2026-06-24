import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleLogin, signup } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useAudio } from "../contexts/AudioContext";
import { trackEvent } from "../utils/tracking";
// import { trackGoogleLogin } from "../api/authApi";
// import { getTrackingContext } from "../utils/tracking";

const Information = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { musicEnabled, toggleMusic } = useAudio();
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [showFeedbackToast, setShowFeedbackToast] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(true);
  const [localTime, setLocalTime] = useState(() => getTimeLabel());
  const developerEmail = "dev@synthelytix.com";
  const contactHref = `mailto:${developerEmail}?subject=${encodeURIComponent(
    "Caro Game Support"
  )}&body=${encodeURIComponent(
    "Hello dev,\n\nI need support for Caro Game:\n\n"
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
      trackEvent("guest_login_start");
      const result = await signup(guestData);
      login({ token: result.token, user: result.user });
      trackEvent("guest_login_success");
      navigate("/gameplay");
    } catch (error) {
      trackEvent("guest_login_failed", {
        error_message: error.message,
      });
      console.error("Guest login error:", error.message);
    } finally {
      setIsGuestLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const result = await googleLogin(credentialResponse.credential);
      login({ token: result.token, user: result.user });
      trackEvent("google_login_success");

      // Google login tracking disabled.
      // try {
      //   await trackGoogleLogin(result.token, {
      //     ...getTrackingContext(),
      //     location: window.location.href,
      //   });
      // } catch (error) {
      //   console.error("Google login tracking error:", error.message);
      // }

      navigate("/gameplay");
    } catch (error) {
      trackEvent("google_login_failed", {
        error_message: error.message,
      });
      console.error("Google login error:", error.message);
    }
  };

  const handleGoogleLoginError = () => {
    trackEvent("google_login_failed", {
      error_message: "oauth_client_error",
    });
    console.error("Google OAuth failed");
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

  useEffect(() => {
    const timer = setInterval(() => setLocalTime(getTimeLabel()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-dvh w-full overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
      <div className="absolute left-4 right-4 top-4 z-20 flex items-start justify-between gap-3">
        <div className="group relative h-9 w-[160px] overflow-hidden sm:w-[180px]">
          <div className="cyber-home-button pointer-events-none flex h-full items-center justify-center px-4 py-2">
            google login
          </div>
          <div className="absolute inset-0 opacity-0">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              text="signin_with"
              theme="filled_black"
              shape="pill"
              size="medium"
              width="180"
            />
          </div>
        </div>

        <div className="group relative">
          <button
            type="button"
            className="cyber-home-button flex h-9 w-[120px] cursor-pointer items-center justify-center px-4 py-2 text-center disabled:cursor-wait disabled:opacity-70"
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
          >
            {isGuestLoading ? "loading..." : "console"}
          </button>
          <div className="pointer-events-none absolute right-0 top-full mt-2 w-max max-w-[240px] rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-slate-100 opacity-0 shadow-xl shadow-black/30 transition group-hover:opacity-100">
            Create a guest account and enter the game
          </div>
        </div>
      </div>

      <div className="group absolute bottom-4 left-4 z-10">
        <a href={contactHref} className="cyber-home-button block px-4 py-2">
          {developerEmail}
        </a>
        <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[230px] rounded-lg border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-slate-100 opacity-0 shadow-xl shadow-black/30 transition group-hover:opacity-100">
          Send feedback email to dev
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
        Send feedback about your experience
      </a>

      <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2">
        <div
          className={`cyber-home-settings-panel w-[210px] max-w-[calc(100vw-2rem)] origin-bottom-right p-2 transition duration-300 ${
            isSettingsOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-4 scale-95 opacity-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setSoundEffectsEnabled((value) => !value)}
            className="cyber-home-setting-row flex w-full items-center justify-between gap-3 px-2 py-1.5 text-left"
            aria-pressed={soundEffectsEnabled}
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/85">
              Sound Effects
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-fuchsia-300/40 text-base font-black text-fuchsia-200">
              {soundEffectsEnabled ? "✓" : "×"}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleMusic}
            className="cyber-home-setting-row flex w-full items-center justify-between gap-3 px-2 py-1.5 text-left"
            aria-pressed={musicEnabled}
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">
              Music
            </span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-fuchsia-300/25 text-base font-black text-fuchsia-300/70">
              {musicEnabled ? "✓" : "×"}
            </span>
          </button>
        </div>

        <div className="flex items-end gap-3">
          <div className="home-status-panel pb-1 text-right font-mono text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-fuchsia-100/75 sm:text-xs">
            <p>online : _</p>
            <p>server time active : {localTime}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsSettingsOpen((value) => !value)}
            className="cyber-home-button group flex items-center gap-2 px-4 py-2"
            aria-expanded={isSettingsOpen}
            aria-label="Open audio settings"
          >
            <span>setting</span>
            <span className="text-sm leading-none transition duration-300 group-hover:rotate-45">
              ⚙
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

const getTimeLabel = () => {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default Information;
