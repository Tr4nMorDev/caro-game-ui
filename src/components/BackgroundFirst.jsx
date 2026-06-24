import { useEffect, useState } from "react";
import Information from "./Information";

const BackgroundFirst = () => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const scheduleIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 300));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const idleId = scheduleIdle(() => setShowVideo(true));

    return () => cancelIdle(idleId);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030012]">
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="fixed left-0 top-0 z-[1] h-screen w-full rotate-180 object-cover opacity-70"
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
      )}

      <div className="relative z-[2]">
        <Information />
      </div>
    </div>
  );
};

export default BackgroundFirst;
