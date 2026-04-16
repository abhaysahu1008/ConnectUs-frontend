import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const socketRef = useRef(null);

  const { targetUser } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
    if (targetUser) {
      fetchMessages();
    }
  }, [targetUser]);

  // ✅ Socket setup
  useEffect(() => {
    if (!userId || !targetUser) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      userId,
      targetUser,
      firstName: user?.firstName,
    });

    socket.on("messageReceived", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
    };
  }, [userId, targetUser]);

  // ✅ Send message
  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    const messageData = {
      userId,
      targetUser,
      firstName: user?.firstName,
      text: newMessage,
    };

    socketRef.current.emit("sendMessage", messageData);

    setNewMessage("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[700px] h-[70vh] bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 text-white text-lg font-semibold">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
            <div
              key={`${msg.userId}-${index}`}
              className={`chat ${
                msg.userId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="avatar"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>

              <div className="chat-header">{msg.firstName}</div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
