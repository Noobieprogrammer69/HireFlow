const ChatItem = ({ chat, active, onClick }) => {

  return (

    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 cursor-pointer border-b border-white/5 hover:bg-[#1f1f1f] ${active ? "bg-[#1f1f1f]" : ""}`}
    >

      <img
        src={chat.user?.avatar || "/avatar.png"}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex-1 overflow-hidden">

        <p className="text-white text-sm font-medium truncate">
          {chat.user?.name}
        </p>

        <p className="text-xs text-gray-400 truncate">
          {chat.lastMessage || "Start conversation"}
        </p>

      </div>

    </div>

  );

};

export default ChatItem;