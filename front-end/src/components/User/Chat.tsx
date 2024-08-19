import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../services/Redux/Store/store";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { socketId } from "../../Providers/Socket";
import { IoSend, IoHappy } from "react-icons/io5";

interface Message {
  senderName: string;
  sender: string;
  message: string;
  timeStamp: string;
}

function formatToIST(timestamp: string): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };
  return date.toLocaleTimeString('en-IN', options);
}

function Chat() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activityId = searchParams.get("activityId");
  const userId = useSelector((state: RootState) => state.user.userId);
  const [message, setMessage] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [chatUser, setChatUser] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log(participants)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    try {
      const response = await axiosUserInstance.get(`/chatmessages?activityId=${activityId}`);
      const initialMessages: Message[] = response.data.map((msg: Message) => ({
        ...msg,
        sender: msg.sender === userId ? "You" : msg.senderName,
        timeStamp: formatToIST(msg.timeStamp),
      }));
      setChatMessages(initialMessages);
    } catch (error) {
      console.log('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [activityId]); 

  useEffect(() => {
    const fetchChatUser = async () => {
      try {
        const response = await axiosUserInstance.post("/chatuser", { userId });
        setChatUser(response.data.username);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatUser();
  }, [userId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    socketId.emit("chat-message", { message, roomId: activityId, userId });
    try {
      await axiosUserInstance.post("/chat", {
        message,
        sender: userId,
        roomId: activityId,
        chatUser,
      });
      setMessage("");
      fetchChatMessages();  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axiosUserInstance.post(`/activity?activityId=${activityId}`);
        setParticipants(response.data.participants);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
  }, [activityId]);

  useEffect(() => {
    socketId.emit("join-room", activityId);
  }, [activityId]);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  useEffect(() => {
    const handleReceivedMessage = (data: { message: string; senderId: string; timeStamp: string }) => {
      const { message, senderId, timeStamp } = data;
      const senderName = senderId === userId ? "You" : chatUser || "Participant";

      const messageObj: Message = {
        sender: senderName,
        message,
        senderName,
        timeStamp: formatToIST(timeStamp),
      };

      setChatMessages((prevMessages) => [...prevMessages, messageObj]);
    };

    socketId.on("received-message", handleReceivedMessage);

    return () => {
      socketId.off("received-message", handleReceivedMessage);
    };
  }, [userId, chatUser]);

  useEffect(scrollToBottom, [chatMessages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-800">Chat Room</h2>
        {/* <p className="text-sm text-gray-600">Activity ID: {activityId}</p> */}
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage: `url("https://cdn.wallpapersafari.com/54/0/HluF7g.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="font-semibold">{msg.sender}</p>
              <p>{msg.message}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timeStamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-200"
            onClick={sendMessage}
          >
            <IoSend size={24} />
          </button>
          <button
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition duration-200"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <IoHappy size={24} />
          </button>
        </div>
        {showEmojiPicker && (
          <div className="mt-2">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
