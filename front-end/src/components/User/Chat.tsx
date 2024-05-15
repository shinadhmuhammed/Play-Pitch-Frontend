import { useEffect, useRef, useState } from "react";
import { socketId } from "../../Providers/Socket";
import { useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../utils/axios/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../services/Redux/Store/store";

interface Message {
  senderName: string;
  sender: string;
  message: string;
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

  console.log(participants)






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

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axiosUserInstance.get(
          `/chatmessages?activityId=${activityId}`
        );
        const initialMessages: Message[] = response.data.map((msg: Message) => ({
          ...msg,
          sender: msg.sender === userId ? "You" : msg.senderName,
        }));
        setChatMessages(initialMessages);
      } catch (error) {
        console.log(error);
      }
    };

    if (activityId && userId) {
      fetchChatMessages();
    }
  }, [activityId, userId]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axiosUserInstance.post(
          `/activity?activityId=${activityId}`
        );
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

  const sendMessage = async () => {
    socketId.emit("chat-message", { message, roomId: activityId, userId });
    try {
      await axiosUserInstance.post("/chat", {
        message,
        sender: userId,
        roomId: activityId,
        chatUser,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleReceivedMessage = (data: { message: string; senderId: string }) => {
      const { message, senderId } = data;
      const senderName = senderId === userId ? "You" : chatUser || "Participant";

      const messageObj: Message = {
        sender: senderName,
        message,
        senderName 
      };
      
      setChatMessages((prevMessages) => [...prevMessages, messageObj]);
    };
    socketId.on("received-message", handleReceivedMessage);
  
    return () => {
      socketId.off("received-message", handleReceivedMessage);
    };
  }, [userId, chatUser]);
  

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {chatMessages.map((msg, index) => (
          <div key={index} className="mb-4">
            <div className={msg.sender === "You" ? "text-right" : ""}>
              <span className="bg-blue-500 text-white rounded-full px-2 py-2 inline-block">
                {msg.sender}
              </span>
              <span className="bg-gray-200 px-4 py-2 rounded-lg inline-block">
                {msg.message}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white">
        <div className="flex">
          <input
            ref={inputRef}
            className="flex-1 border rounded-md p-2"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-500 text-white rounded-md p-2"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
