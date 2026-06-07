import Information from "./Information";

const BackgroundFirst = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030012]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed left-0 top-0 z-[1] h-screen w-full rotate-180 object-cover opacity-70"
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>

      <div className="relative z-[2]">
        <Information />
      </div>
    </div>
  );
};

export default BackgroundFirst;
