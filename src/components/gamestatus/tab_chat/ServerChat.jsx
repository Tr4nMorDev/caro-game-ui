import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { createServerChatMessage, getServerChatMessages } from "../../../api/authApi";
import { useAuth } from "../../../contexts/AuthContext";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

const stickers = {
  "demo-sticker": {
    label: "Demo Sticker",
    src: "/stickers/ezgif-4c4ddf14ca1cddf9.webm",
  },
};

const previewMessages = [
  { name: "server", avatar: "/chibi/1.png", text: "Welcome to Synthelytix lobby." },
  { name: "mortal", avatar: "/chibi/2.png", text: "Anyone up for a quick PvP test?" },
  { name: "guest-sticker", avatar: "/chibi/3.png", type: "EMOTE", content: "demo-sticker" },
  { name: "guest-a91", avatar: "/chibi/3.png", text: "The new shop skins look clean." },
  { name: "neonfox", avatar: "/chibi/4.png", text: "Need one more player for a fast match." },
  { name: "cyberkid", avatar: "/chibi/5.png", text: "GG, that last game ended in 5 minutes." },
  { name: "luna", avatar: "/chibi/1.png", text: "Does anyone want to test create room?" },
  { name: "kaito", avatar: "/chibi/2.png", text: "I am queueing PvP now." },
  { name: "guest-f42", avatar: "/chibi/3.png", text: "Mobile layout feels better after the update." },
  { name: "nova", avatar: "/chibi/4.png", text: "AI mode is still under tuning, right?" },
  { name: "admin", avatar: "/chibi/5.png", text: "Keep chat clean and report bugs via feedback mail." },
  { name: "akira", avatar: "/chibi/1.png", text: "Rank board needs more real players soon." },
  { name: "zero", avatar: "/chibi/2.png", text: "I like the purple cyber UI." },
  { name: "guest-b77", avatar: "/chibi/3.png", text: "Waiting for opponent..." },
  { name: "mika", avatar: "/chibi/4.png", text: "Who is testing from Zalo campaign?" },
  { name: "shadow", avatar: "/chibi/5.png", text: "Create room feature will be useful for friends." },
  { name: "rin", avatar: "/chibi/1.png", text: "Can we add emotes later?" },
  { name: "byte", avatar: "/chibi/2.png", text: "Server latency looks stable today." },
  { name: "guest-c08", avatar: "/chibi/3.png", text: "I just joined from console login." },
  { name: "iris", avatar: "/chibi/4.png", text: "Shop frames would look good around avatars." },
  { name: "server", avatar: "/chibi/5.png", text: "Patch notes: server chat UI preview is online." },
];

const normalizeMessage = (message) => ({
  id: message.id || `${message.name}-${message.text}`,
  name: message.user?.name || message.name || "player",
  avatar: message.user?.avatar || message.avatar || "/chibi/1.png",
  type: message.type || "TEXT",
  sticker: stickers[message.content],
  text: message.content || message.text || "",
});

export const ServerChat = () => {
  const { token } = useAuth();
  const socketRef = useRef(null);
  const listRef = useRef(null);
  const [messages, setMessages] = useState(previewMessages);

  const renderedMessages = useMemo(
    () => messages.map((message) => normalizeMessage(message)),
    [messages],
  );

  useEffect(() => {
    if (!token) return;

    let isActive = true;

    const loadMessages = async () => {
      try {
        const data = await getServerChatMessages(token, 50);
        if (!isActive) return;

        if (Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Failed to load server chat", error);
      }
    };

    loadMessages();

    return () => {
      isActive = false;
    };
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const socket = io(API_BASE_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("chat:new-message", (message) => {
      setMessages((prev) => [...prev, message].slice(-50));
    });

    socket.on("connect_error", (error) => {
      console.error("Server chat socket error", error.message);
    });

    return () => {
      socket.off("chat:new-message");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <section className="cyber-server-chat" aria-label="Server chat">
      <div className="cyber-server-chat-header">
        <div className="cyber-quest-title">Server Chat</div>
        <p>Quick lobby messages with online players.</p>
      </div>
      <div ref={listRef} className="cyber-server-chat-list">
        {renderedMessages.map((message) => (
          <div key={message.id} className="cyber-server-chat-message">
            <img src={message.avatar} alt={`${message.name} avatar`} />
            <div>
              <span>{message.name}</span>
              {message.type === "EMOTE" && message.sticker ? (
                <video
                  className="cyber-server-chat-sticker"
                  src={message.sticker.src}
                  aria-label={message.sticker.label}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ChatInput = () => {
  const { token } = useAuth();
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isStickerPickerOpen, setIsStickerPickerOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextContent = content.trim();
    if (!token || !nextContent || isSending) return;

    try {
      setIsSending(true);
      await createServerChatMessage(token, nextContent);
      setContent("");
    } catch (error) {
      console.error("Failed to send server chat", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleStickerSend = async (stickerKey) => {
    if (!token || isSending) return;

    try {
      setIsSending(true);
      await createServerChatMessage(token, stickerKey, "EMOTE");
      setIsStickerPickerOpen(false);
    } catch (error) {
      console.error("Failed to send server chat sticker", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="cyber-server-chat-compose">
      {isStickerPickerOpen && (
        <div className="cyber-server-chat-sticker-picker" aria-label="Sticker picker">
          {Object.entries(stickers).map(([key, sticker]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleStickerSend(key)}
              disabled={!token || isSending}
              aria-label={`Send ${sticker.label}`}
            >
              <video src={sticker.src} autoPlay loop muted playsInline />
              <span>{sticker.label}</span>
            </button>
          ))}
        </div>
      )}

      <form className="cyber-server-chat-input" onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={() => setIsStickerPickerOpen((isOpen) => !isOpen)}
          disabled={!token}
          aria-label="Open stickers"
        >
          Sticker
        </button>
        <input
          type="text"
          value={content}
          maxLength={500}
          onChange={(event) => setContent(event.target.value)}
          placeholder={token ? "Type message..." : "Login to chat"}
          aria-label="Server chat message"
        />
        <button type="submit" disabled={!token || !content.trim() || isSending}>
          {isSending ? "Sending" : "Send"}
        </button>
      </form>
    </div>
  );
};
