import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { targetUser } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-2 sm:px-4 pt-14 sm:pt-16 pb-4">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-2xl">
        {/* Corner accents */}
        <div className="absolute -top-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-t border-l border-cyan-400" />
        <div className="absolute -top-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-t border-r border-cyan-400" />
        <div className="absolute -bottom-px -left-px w-5 h-5 sm:w-6 sm:h-6 border-b border-l border-cyan-400" />
        <div className="absolute -bottom-px -right-px w-5 h-5 sm:w-6 sm:h-6 border-b border-r border-cyan-400" />

        <div
          className="bg-gray-950 border border-cyan-500/20 flex flex-col"
          style={{ height: "calc(100dvh - 5.5rem)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-800 flex-shrink-0">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-white font-mono font-black text-xs sm:text-sm uppercase tracking-wider">
              Live Chat
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-700 font-mono text-xs uppercase tracking-widest text-center px-4">
                  No messages yet. Say hello!
                </p>
              </div>
            )}
            {messages.map((msg, index) => {
              const isOwn = msg.userId === userId;
              return (
                <div
                  key={`${msg.userId}-${index}`}
                  className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}
                >
                  <span className="text-gray-600 text-xs font-mono px-1">
                    {msg.firstName}
                  </span>
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono break-words ${
                      isOwn
                        ? "bg-cyan-400 text-black"
                        : "bg-gray-900 border border-gray-800 text-gray-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-800 flex gap-2 sm:gap-3 flex-shrink-0">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 min-w-0 bg-black border border-gray-800 focus:border-cyan-500/60 text-white text-sm font-mono px-3 sm:px-4 py-2.5 outline-none transition-colors placeholder-gray-700"
            />
            <button
              onClick={sendMessage}
              className="px-3 sm:px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-black font-mono font-black text-xs uppercase tracking-widest transition-colors duration-200 whitespace-nowrap flex-shrink-0 touch-manipulation"
            >
              Send →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
