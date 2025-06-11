export const setupSocketListeners = (socket, matched) => {
  socket.on("matched", (match) => {
    console.log("✅ Matched:", match);
    // dispatch vào redux hoặc setState React ở ngoài
  });
  socket.on("waiting", () => {
    console.log("⌛ Waiting for opponent...");
  });

  socket.on("timeout", () => {
    console.log("⏰ Matchmaking timeout");
  });

  socket.on("error", (err) => {
    console.error("❌ Server error:", err);
  });

  // Thêm các event khác tuỳ logic
};
