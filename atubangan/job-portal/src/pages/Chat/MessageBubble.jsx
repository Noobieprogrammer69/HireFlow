const MessageBubble = ({ message, mine }) => {
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[60%] px-4 py-2 rounded-2xl text-sm
        ${
          mine
            ? "bg-orange-500 text-white rounded-br-none"
            : "bg-[#1f1f1f] text-gray-200 rounded-bl-none"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;