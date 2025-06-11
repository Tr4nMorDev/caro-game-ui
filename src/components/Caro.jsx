import React, { useState, useEffect, useRef } from "react";
import IdleScreen from "./gameplay/IdleScreen";
import InGameScreen from "./gameplay/InGameScreen";
import MatchingScreen from "./gameplay/MatchingScreen";
import { useAuth } from "../contexts/AuthContext";
import { io, Socket } from "socket.io-client";
import {
  startMatchmaking,
  cancelMatchmaking,
  takeuser,
  exitCurrentMatch,
} from "../api/authApi";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "";
const Caro = () => {
  const [status, setStatus] = useState("IDLE"); // IDLE | MATCHING | IN_GAME
  const { user, token } = useAuth();
  const socketRef = useRef(null);
  const [players, setPlayers] = useState({ X: null, O: null });
  const [youAre, setYouAre] = useState(null); // "X" hoặc "O"
  useEffect(() => {
    if (status === "IN_GAME" && players.X && players.O) {
      console.log("🎮 Ready to render game with:", players, youAre);
    }
  }, [status, players, youAre]);
  useEffect(() => {
    // 🔌 Tạo socket khi bắt đầu MATCHING
    if (status === "MATCHING" && !socketRef.current) {
      const socket = io(API_BASE_URL, {
        transports: ["websocket"],
        query: { token },
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
        socket.emit("waiting", user.id);
      });

      socket.on("matched", (matchData) => {
        console.log("🎯 Matched:", matchData);

        setPlayers(matchData.players);
        setYouAre(matchData.youAre);

        setStatus("IN_GAME"); // vẫn giữ socketRef
      });

      socket.on("timeout", () => {
        console.log("⏰ Timeout");
        setStatus("IDLE"); // sẽ bị disconnect ở useEffect dưới
      });

      socket.on("error", (err) => {
        console.error("❌ Socket error:", err);
      });

      socket.on("waiting", () => {
        console.log("⌛ Waiting for opponent...");
      });

      socket.on("move", () => {});
    }
  }, [status, token, user.id]);

  // 🔌 Cleanup chỉ khi chuyển về IDLE
  useEffect(() => {
    if (status === "IDLE" && socketRef.current) {
      console.log("🧹 Disconnecting socket due to IDLE");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, [status]);

  const handleFindMatch = async () => {
    try {
      const result = await startMatchmaking(token);
      console.log("Matchmaking started:", result);
      setStatus("MATCHING");
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu tìm trận:", err);
    }
  };

  const handleCancelMatch = async () => {
    try {
      const result = await cancelMatchmaking(token);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setStatus("IDLE");
    } catch (err) {
      console.error("Lỗi khi hủy tìm trận:", err);
    }
  };
  const onExitGame = async () => {
    try {
      const result = await exitCurrentMatch(token);
    } catch {}
    setStatus("IDLE");
  };
  const renderScreen = () => {
    switch (status) {
      case "IDLE":
        return <IdleScreen onFindMatch={handleFindMatch} />;
      case "MATCHING":
        return <MatchingScreen onCancel={handleCancelMatch} />;
      case "IN_GAME":
        return (
          <InGameScreen
            onExitGame={onExitGame}
            players={players}
            youAre={youAre}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white">
      {renderScreen()}
    </div>
  );
};

export default Caro;
