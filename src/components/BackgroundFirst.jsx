// src/components/BackgroundFirst.jsx

import HeroContent from "../sub/HeroContent";

const BackgroundFirst = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      {/* Video nền */}
      <video
        autoPlay
        loop
        muted
        className="rotate-180 absolute top-[-380px] h-full w-full left-0 z-[1] object-cover bg-[#030012]"
      >
        <source src="/blackhole.webm" type="video/webm" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>

      {/* Nội dung phía trước */}
      <div className="relative z-[2]">
        <HeroContent />
      </div>
    </div>
  );
};

export default BackgroundFirst;
