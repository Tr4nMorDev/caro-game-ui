const TRACKING_STORAGE_KEY = "caro_tracking_context";

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

const detectTrafficSource = () => {
  const referrer = document.referrer.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  if (referrer.includes("zalo") || userAgent.includes("zalo")) return "zalo";
  if (referrer.includes("facebook") || userAgent.includes("fbav")) return "facebook";
  if (referrer.includes("google")) return "google";
  if (referrer.includes("tiktok")) return "tiktok";

  return referrer ? "referral" : "direct";
};

export const captureTrackingContext = (search = window.location.search) => {
  const params = new URLSearchParams(search);
  const previous = safeParse(localStorage.getItem(TRACKING_STORAGE_KEY));
  const next = {
    ...previous,
    utm_source: params.get("utm_source") || previous.utm_source || detectTrafficSource(),
    utm_campaign: params.get("utm_campaign") || previous.utm_campaign || "",
    location: window.location.href,
  };

  localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(next));
  return next;
};

export const getTrackingContext = () => {
  return safeParse(localStorage.getItem(TRACKING_STORAGE_KEY));
};
