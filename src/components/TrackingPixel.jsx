import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { captureTrackingContext } from "../utils/tracking";

const PIXEL_URL = import.meta.env.VITE_TRACKING_PIXEL_URL;
const PIXEL_ID = import.meta.env.VITE_TRACKING_PIXEL_ID || "caro-game-ui";

const buildPixelUrl = ({ pathname, search }) => {
  const trackingContext = captureTrackingContext(search);
  const params = new URLSearchParams(search);
  const pixelParams = new URLSearchParams({
    id: PIXEL_ID,
    event: "page_view",
    path: pathname,
    url: window.location.href,
    referrer: document.referrer || "",
    utm_source: trackingContext.utm_source || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: trackingContext.utm_campaign || "",
    user_agent: navigator.userAgent,
    ts: Date.now().toString(),
  });

  if (!PIXEL_URL) {
    console.log("[tracking-pixel] skipped: VITE_TRACKING_PIXEL_URL is not set", {
      payload: Object.fromEntries(pixelParams.entries()),
    });
    return null;
  }

  const separator = PIXEL_URL.includes("?") ? "&" : "?";
  const pixelUrl = `${PIXEL_URL}${separator}${pixelParams.toString()}`;

  console.log("[tracking-pixel] page_view", {
    pixelUrl,
    payload: Object.fromEntries(pixelParams.entries()),
  });

  return pixelUrl;
};

const TrackingPixel = () => {
  const location = useLocation();

  useEffect(() => {
    const pixelUrl = buildPixelUrl(location);
    if (!pixelUrl) return;

    const image = new Image();
    image.referrerPolicy = "strict-origin-when-cross-origin";
    image.src = pixelUrl;
  }, [location.pathname, location.search]);

  return null;
};

export default TrackingPixel;
