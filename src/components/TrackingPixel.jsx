import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../utils/tracking";

const TrackingPixel = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location);
  }, [location.pathname, location.search]);

  return null;
};

export default TrackingPixel;
