import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { targetUser } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUser}`, {
        withCredentials: true,
      });
      const chatMessages = res.data.messages.map((msg) => ({
        userId: msg?.senderId?._id,
        firstName: msg?.senderId?.firstName,
        text: msg?.text,
        createdAt: msg?.createdAt,
      }));
      setMessages(chatMessages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    if (targetUser) fetchMessages();
  }, [targetUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUser) return;
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit("joinChat", { userId, targetUser, firstName: user?.firstName });
    socket.on("messageReceived", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket.off("messageReceived");
      socket.disconnect();
    };
  }, [userId, targetUser]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;
    socketRef.current.emit("sendMessage", {
      userId,
      targetUser,
      firstName: user?.firstName,
      text: newMessage,
    });
    setNewMessage("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-2 sm:px-4 pt-16 pb-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl h-[calc(100dvh-5rem)]">
        <div className="bg-[#12121a]/80 backdrop-blur-sm border border-white/[0.06] rounded-2xl flex flex-col h-full shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-white font-semibold text-sm">
                Live Chat
              </span>
              <p className="text-white/30 text-xs">Connected</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/[0.03] rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/[0.06]">
                    <svg
                      className="w-6 h-6 text-white/20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <p className="text-white/20 text-sm">
                    No messages yet. Say hello!
                  </p>
                </div>
              </div>
            )}
            {messages.map((msg, index) => {
              const isOwn = msg.userId === userId;
              const showAvatar =
                index === 0 || messages[index - 1].userId !== msg.userId;
              return (
                <div
                  key={`${msg.userId}-${index}`}
                  className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                >
                  {showAvatar && (
                    <div
                      className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                        isOwn
                          ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                          : "bg-white/[0.06] text-white/60 border border-white/[0.08]"
                      }`}
                    >
                      {msg.firstName?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  {!showAvatar && <div className="w-8 flex-shrink-0" />}

                  <div
                    className={`flex flex-col gap-1 max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}
                  >
                    {showAvatar && (
                      <span className="text-white/30 text-xs font-medium">
                        {msg.firstName}
                      </span>
                    )}
                    <div
                      className={`px-4 py-2.5 text-sm rounded-2xl break-words ${
                        isOwn
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md"
                          : "bg-white/[0.04] border border-white/[0.06] text-white/80 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-white/20 text-[10px]">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-white/[0.06] flex gap-3 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500/50 focus:bg-white/[0.05] text-white text-sm rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder-white/20"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
