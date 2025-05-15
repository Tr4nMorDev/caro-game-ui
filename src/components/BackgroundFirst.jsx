// src/components/BackgroundFirst.jsx

import HeroContent from "../sub/HeroContent";

const BackgroundFirst = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      {/* Video nền */}
      <video
        autoPlay
        loop
        muted
        className="rotate-180 absolute top-[-340px]  h-full w-full left-0 z-[1] object-cover "
      >
        <source src="/blackhole.webm" type="video/webm" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>
      <HeroContent />
    </div>
  );
};

export default BackgroundFirst;
