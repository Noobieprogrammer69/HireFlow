import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import ChatItem from "./ChatItem";

const ChatSidebar = ({ activeRoom, onSelect }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const res = await axiosInstance.get("/api/chat/conversations");
    setChats(res.data);
  };

  return (
    <div className="w-80 bg-[#141414] border border-white/10 rounded-xl flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-white font-semibold">Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatItem
            key={chat.roomId}
            chat={chat}
            active={activeRoom === chat.roomId}
            onClick={() => onSelect(chat)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;