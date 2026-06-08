import React, { useState, useEffect, useRef } from "react";
import IdleScreen from "./gamestatus/IdleScreen";
import InGameScreen from "./gamestatus/InGameScreen";
import MatchingScreen from "./gamestatus/MatchingScreen";
import Gameend from "./gamestatus/Gameend"
import { useAuth } from "../contexts/AuthContext";
import { io, Socket } from "socket.io-client";
import {
  startMatchmaking,
  cancelMatchmaking,
  exitCurrentMatch,
  startMatchWithAI
} from "../api/authApi";
import PlayAIScreen from "./gamestatus/PlayAIScreen";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
const Caro = () => {
  const [status, setStatus] = useState("IDLE"); // IDLE | MATCHING | IN_GAME | WINER
  const { user, token } = useAuth();
  const socketRef = useRef(null);
  const aiSocketRef = useRef(null);
  const [players, setPlayers] = useState({ X: null, O: null });
  const [youAre, setYouAre] = useState(null); // "X" hoặc "O"
  const [opponentId, setopponentId] = useState("");
  const [matchedId, setmatchedId] = useState("");
  const [isWinner , setisWinner] = useState(false);
  const [aiMatchData, setAiMatchData] = useState(null); // <-- Thêm state này
  const handleReplay = () => {
    // Reset game logic ở đây
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
        console.log("🎯 Matched:", matchData);
        const { playerXId, playerOId, id } = matchData;
        const opponentId = user.id === playerXId ? playerOId : playerXId;
        console.log("ID doi thu :", opponentId);
        console.log("Id tran game :", id);
        setPlayers(matchData.players);
        setYouAre(matchData.youAre);
        setopponentId(opponentId);
        setmatchedId(id);
        setStatus("IN_GAME"); // vẫn giữ socketRef
        
      });
      
      socket.on("timeout", () => {
        console.log("⏰ Timeout");
        socket.emit("timeout" , user.id);
        setStatus("IDLE"); // sẽ bị disconnect ở useEffect dưới
      });

      socket.on("error", (err) => {
        console.error("❌ Socket error:", err);
      });

      socket.on("waiting", () => {
        console.log("⌛ Waiting for opponent...");
      });
      socket.on("gameEnd", (gameEndPayload) =>{
        console.log("Game end payload :" , gameEndPayload.winnerId);
        console.log("Game end")
        if(gameEndPayload.winnerId === user.id ) {
          console.log("Ban da win  ", gameEndPayload.winnerId);
          setisWinner(true);
        }
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
      console.log("🧹 Disconnecting socket");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (status === "IDLE" && aiSocketRef.current) {
      console.log("🧹 Disconnecting AI socket");
      aiSocketRef.current.disconnect();
      aiSocketRef.current = null;
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
    console.log("✅ Exit game:", result);
    setStatus("IDLE");
  };
  const onPlayCarowithAI = async () => {
    const result = await startMatchWithAI(token);
    console.log("đã khởi tạo màn chơi" , result);
    setAiMatchData(result); // <-- Lưu match data
    setStatus("IN_GAME_AI");
  }
  const renderScreen = () => {
    switch (status) {
      case "IDLE":
        return <IdleScreen onFindMatch={handleFindMatch} onPlayCaro={onPlayCarowithAI} />;
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
      default:
        return null;
    }
  };

  if (!user || !token) {
    return (
      <section className="w-full max-w-xl rounded-lg border border-white/10 bg-white/5 p-6 text-center shadow-xl shadow-black/20">
        <h1 className="text-2xl font-bold text-white">Can dang nhap</h1>
        <p className="mt-2 text-sm text-slate-400">
          Hay dang nhap de tim tran hoac choi voi AI.
        </p>
      </section>
    );
  }

  return (
    <section className="playgame-screen-fit flex w-full items-center justify-center text-white">
      {renderScreen()}
    </section>
  );
};

export default Caro;
