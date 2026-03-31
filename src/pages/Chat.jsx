import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const { targetUser } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!user?.firstName || !userId || !targetUser) {
      return;
    }
    const newSocket = createSocketConnection();

    setSocket(newSocket);
    newSocket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUser,
    });

    newSocket.on("messageRecieved", ({ firstName, text }) => {
      // console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user?.firstName, userId, targetUser]);

  const sendMessage = () => {
    // const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUser,
      text: newMessage,
    });
    setNewMessage("");
  };

  //old chat
  const fetchMessages = async () => {
    const chats = await axios.get(BASE_URL + "/chat/" + targetUser, {
      withCredentials: true,
    });

    const chatMessages = chats.data.messages.map((msg) => {
      return {
        firstName: msg?.senderId.firstName,
        lastName: msg?.senderId.lastName,
        text: msg?.text,
      };
    });

    setMessages(chatMessages);

    console.log("CHATS", chatMessages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-[700px] h-[70vh] bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 text-white text-lg font-semibold">
          Chat
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {/* Left message */}
          {messages.map((msg, index) => (
            <div
              className={` chat ${msg.firstName === user.firstName ? "chat-end" : "chat-start"}`}
              key={index}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
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
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
