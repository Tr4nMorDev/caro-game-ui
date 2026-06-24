import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import IdleScreen from "./gamestatus/IdleScreen";
import InGameScreen from "./gamestatus/InGameScreen";
import MatchingScreen from "./gamestatus/MatchingScreen";
import Gameend from "./gamestatus/Gameend"
import { useAuth } from "../contexts/AuthContext";
import { io, Socket } from "socket.io-client";
import {
  cancelMatchmaking,
  exitCurrentMatch,
  startMatchWithAI,
  createRoom,
  deleteRoom
} from "../api/authApi";
import PlayAIScreen from "./gamestatus/PlayAIScreen";
import JoinRoomScreen from "./gamestatus/JoinRoomScreen";
import RoomWaitingScreen from "./gamestatus/RoomWaitingScreen";
import { trackEvent } from "../utils/tracking";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
const Caro = () => {
  const [status, setStatus] = useState("IDLE"); // IDLE | MATCHING | IN_GAME | WINER
  const { user, token } = useAuth();
  const socketRef = useRef(null);
  const aiSocketRef = useRef(null);
  const cancelAttemptsRef = useRef([]);
  const [players, setPlayers] = useState({ X: null, O: null });
  const [youAre, setYouAre] = useState(null); // "X" hoặc "O"
  const [opponentId, setopponentId] = useState("");
  const [matchedId, setmatchedId] = useState("");
  const [isWinner , setisWinner] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [aiMatchData, setAiMatchData] = useState(null); // <-- Thêm state này
  const handleReplay = () => {
    // Reset game logic ở đây
    setisWinner(false);
    setStatus("IDLE");
  };

  useEffect(() => {
    if (status === "IN_GAME" && players.X && players.O) {
      console.log("🎮 Ready to render game with:", players, youAre);
    }
  }, [status, players, youAre]);
  useEffect(() => {
    // 🔌 Tạo socket khi bắt đầu MATCHING
    if (!user?.id || !token) return;

    if (status === "MATCHING"  && !socketRef.current) {
      const socket = io(API_BASE_URL, {
        transports: ["websocket"],
        auth: { token },
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
        socket.emit("waiting", user.id);
      });

      socket.on("matched", (matchData) => {
        const { playerXId, playerOId, id } = matchData;
        const opponentId = user.id === playerXId ? playerOId : playerXId;
        setPlayers(matchData.players);
        setYouAre(matchData.youAre);
        setopponentId(opponentId);
        setmatchedId(id);
        trackEvent("match_found", {
          mode: "pvp",
        });
        setStatus("IN_GAME"); // vẫn giữ socketRef
        
      });
      
      socket.on("timeout", () => {
        socket.emit("timeout" , user.id);
        trackEvent("matchmaking_timeout", {
          mode: "pvp",
        });
        setStatus("IDLE"); // sẽ bị disconnect ở useEffect dưới
      });

      socket.on("error", (err) => {
        console.error("❌ Socket error:", err);
      });

      socket.on("waiting", () => {
        console.log("⌛ Waiting for opponent...");
      });
      socket.on("gameEnd", (gameEndPayload) =>{
        const winnerId = gameEndPayload?.winnerId;
        const currentUserId = user.id;
        const didWin =
          winnerId !== null &&
          winnerId !== undefined &&
          String(winnerId) === String(currentUserId);

        console.log("Game end payload winnerId:", winnerId);
        console.log("Current user id:", currentUserId);
        console.log("Did win:", didWin);
        trackEvent("game_end", {
          mode: "pvp",
          result: didWin ? "win" : "lose",
          reason: gameEndPayload?.reason || "unknown",
        });
        setisWinner(didWin);
        setStatus("WINER");
      })

    }
    if (status === "IN_GAME_AI" && !aiSocketRef.current) {
      const aiSocket = io(API_BASE_URL, {
        transports: ["websocket"],
        auth: { token },
      });

      aiSocketRef.current = aiSocket;

      aiSocket.on("connect", () => {
        console.log("✅ AI socket connected:", aiSocket.id);
        
      });

  // Optional: bạn có thể lắng nghe move từ AI tại đây nếu backend emit
  // aiSocket.on("AImove", (...))
}
  }, [status, token, user?.id]);
  // 🔌 Cleanup chỉ khi chuyển về IDLE
  useEffect(() => {
    if (status === "IDLE" && socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (status === "IDLE" && aiSocketRef.current) {
      console.log("🧹 Disconnecting AI socket");
      aiSocketRef.current.disconnect();
      aiSocketRef.current = null;
    }
  }, [status]);

  const handleFindMatch = () => {
    try {
      setisWinner(false);
      trackEvent("matchmaking_start", {
        mode: "pvp",
      });
      setStatus("MATCHING");
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu tìm trận:", err);
    }
  };

  const handleCancelMatch = async () => {
    const now = Date.now();
    cancelAttemptsRef.current = [...cancelAttemptsRef.current, now].filter(
      (timestamp) => now - timestamp <= 5000
    );

    if (cancelAttemptsRef.current.length >= 2) {
      setToastMessage(
        "Repeated queue cancels detected. We may restrict matchmaking for 30 seconds if you keep spamming."
      );
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    trackEvent("matchmaking_cancel", {
      mode: "pvp",
    });
    setStatus("IDLE");

    try {
      const result = await cancelMatchmaking(token);
      console.log(result)
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
    const result = await exitCurrentMatch(token);
    trackEvent("game_exit", {
      mode: "pvp",
    });
    console.log("✅ Exit game:", result);
    setStatus("IDLE");
  };
  const onPlayCarowithAI = async () => {
    setisWinner(false);
    trackEvent("game_start", {
      mode: "ai",
    });
    const result = await startMatchWithAI(token);
    console.log("đã khởi tạo màn chơi" , result);
    setAiMatchData(result); // <-- Lưu match data
    setStatus("IN_GAME_AI");
  }
  const handleCreateRoom = async () => {
    try {
      setisWinner(false);
      const result = await createRoom(token);
      setRoomCode(result.room.code);
      setStatus("ROOM_WAITING");
    } catch (error) {
      console.error("Create room error:", error.message);
      setToastMessage("Could not create room. Please try again.");
    }
  };

  const handleCancelRoom = async () => {
    const currentRoomCode = roomCode;

    try {
      if (currentRoomCode) {
        await deleteRoom(token, currentRoomCode);
      }
    } catch (error) {
      console.error("Leave room error:", error.message);
    } finally {
      setRoomCode("");
      setStatus("IDLE");
    }
  };

  const handleJoinRoom = () => {
    setStatus("ROOM_JOIN");
  };

  const renderScreen = () => {
    switch (status) {
      case "IDLE":
        return (
          <IdleScreen
            onFindMatch={handleFindMatch}
            onPlayCaro={onPlayCarowithAI}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
          />
        );
      case "MATCHING":
        return <MatchingScreen onCancel={handleCancelMatch} />;
      case "IN_GAME":
        return (
          <InGameScreen
            onExitGame={onExitGame}
            players={players}
            youAre={youAre}
            socket={socketRef.current}
            matchId={matchedId}
            opponentId={opponentId}
            onReplay={handleReplay}
            
          />
        )
      case "WINER":
        return (
          <Gameend
            isWinner={isWinner}
            onReplay={handleReplay}
          />
        )
      case "IN_GAME_AI":
        return <PlayAIScreen onReplay={handleReplay} socket={aiSocketRef.current} data={aiMatchData} />;
      case "ROOM_WAITING":
        return <RoomWaitingScreen roomCode={roomCode} onCancel={handleCancelRoom} />;
      case "ROOM_JOIN":
        return <JoinRoomScreen onCancel={handleCancelRoom} />;
      default:
        return null;
    }
  };

  if (!user || !token) {
    return (
      <section className="w-full max-w-xl rounded-lg border border-white/10 bg-white/5 p-6 text-center shadow-xl shadow-black/20">
        <h1 className="text-2xl font-bold text-white">Sign In Required</h1>
        <p className="mt-2 text-sm text-slate-400">
          Please sign in to find a match or play with AI.
        </p>
      </section>
    );
  }

  return (
    <section className="playgame-screen-fit relative w-full text-white">
      {toastMessage && (
        <div className="cyber-app-toast cyber-app-toast-warning" role="status">
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage("")}
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {renderScreen()}
    </section>
  );
};

export default Caro;
