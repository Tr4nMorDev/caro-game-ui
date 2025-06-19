import React, { useState, useEffect } from "react";

const MatchingScreen = ({ onCancel }) => {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (countdown <= 0) return; // dừng khi đếm về 0

    const timerId = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    // cleanup mỗi lần effect chạy lại
    return () => clearTimeout(timerId);
  }, [countdown]);

  return (
    <div className="text-center px-4">
      <h1 className="text-3xl md:text-4xl font-light mb-4">
        Đang tìm một người chơi ngẫu nhiên…
      </h1>
      <p className="text-lg md:text-xl mb-6">
        <strong>{countdown > 0 ? countdown : "đã hết thời gian"}</strong> giây.
      </p>
      <button
        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-lg"
        onClick={onCancel}
      >
        Hủy
      </button>
    </div>
  );
};

export default MatchingScreen;
