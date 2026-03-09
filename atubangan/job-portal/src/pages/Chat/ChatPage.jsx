import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axiosInstance from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";
import { ArrowLeft, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatProfile from "./components/ChatProfile";

const socket = io("http://localhost:5000");

const ChatPage = () => {

  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [chatUser, setChatUser] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {

    const init = async () => {

      try {

        const res = await axiosInstance.get(`/api/chat/access/${applicationId}`);

        if (!res.data.allowed) {
          alert("Chat not available yet");
          return;
        }

        setAllowed(true);
        setRoomId(res.data.roomId);

        socket.emit("join_room", res.data.roomId);

        const msgs = await axiosInstance.get(`/api/chat/messages/${res.data.roomId}`);

        setMessages(msgs.data.messages);
        setChatUser(msgs.data.user);

      } catch (err) {
        console.error(err);
      }

    };

    init();

  }, [applicationId]);

  useEffect(() => {

    socket.on("receive_message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {

    if (!text.trim()) return;

    const message = {
      roomId,
      text,
      sender: user._id
    };

    socket.emit("send_message", message);

    setMessages(prev => [
      ...prev,
      {
        ...message,
        sender: { _id: user._id }
      }
    ]);

    setText("");

  };

  const getAvatar = (avatar) => {
    if (!avatar) return "/avatar.png";
    if (avatar.startsWith("http")) return avatar;
    return `http://localhost:5000/uploads/${avatar}`;
  };

  if (!allowed) {
    return (
      <div className="text-white p-10">
        Chat not available
      </div>
    );
  }

  return (

    <div className="bg-[#0f0f0f] min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto pt-20 px-4">

        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">

          <ChatProfile user={chatUser} />

          <div className="flex-1">

            <div className="bg-[#141414] border border-white/10 rounded-xl flex flex-col h-[70vh]">

              <div className="p-4 border-b border-white/10 flex items-center gap-3">

                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <ArrowLeft className="text-white w-5 h-5"/>
                </button>

                <div className="flex items-center gap-3">

                  {chatUser?.avatar && (
                    <img
                      src={getAvatar(chatUser.avatar)}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}

                  <div>
                    <p className="text-white font-semibold">
                      {chatUser?.name || "Chat"}
                    </p>

                    <p className="text-xs text-gray-400">
                      Conversation
                    </p>
                  </div>

                </div>

              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">

                {messages.map((m, i) => {

                  const senderId =
                    typeof m.sender === "object"
                      ? m.sender._id
                      : m.sender;

                  const mine = senderId === user?._id;

                  return (
                    <MessageBubble
                      key={i}
                      message={m}
                      mine={mine}
                    />
                  );

                })}

                <div ref={bottomRef}></div>

              </div>

              <div className="border-t border-white/10 p-4 flex gap-3">

                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 bg-[#0f0f0f] border border-white/10 rounded-xl px-3 py-2 text-white"
                  placeholder="Type message..."
                />

                <button
                  onClick={sendMessage}
                  className="bg-orange-500 px-4 rounded-xl text-white flex items-center gap-2"
                >
                  <Send size={16}/>
                  Send
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ChatPage;