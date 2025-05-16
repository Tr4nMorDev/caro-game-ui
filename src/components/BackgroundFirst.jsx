import HeroContent from "../sub/HeroContent";
import Dashboard from "./Dashboard";

const BackgroundFirst = () => {
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      {/* Video nền phủ toàn màn hình */}
      <video
        autoPlay
        loop
        muted
        className="rotate-180 fixed top-0 left-0 w-full h-screen z-[1] object-cover bg-[#030012]"
      >
        <source src="/blackhole.webm" type="video/webm" />
        Trình duyệt của bạn không hỗ trợ thẻ video.
      </video>

      {/* Nội dung phía trước */}
      <div className="relative z-[2] pt-72">
        <HeroContent />
        <div className="mt-10">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default BackgroundFirst;
