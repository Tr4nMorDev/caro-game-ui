// src/api/socket.js
import { io } from "socket.io-client";
import { setupSocketListeners } from "./socketListeners.jsx";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "";

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io(`${API_BASE_URL}`, {
      transports: ["websocket"],
      query: { token },
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected", socket.id);
      socket.emit("start_matching", user.id);
      setupSocketListeners(socket); // <-- gắn listener
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
