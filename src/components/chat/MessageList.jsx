import { useRef, useEffect } from "react";

const MessageList = ({
  messages = [],
  user,
  typingUsers = [],
  onScrollTop, // callback to load older messages
}) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Detect scroll to top
  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollTop === 0 && onScrollTop) {
      onScrollTop(); // call parent to fetch older messages
    }
  };

  // Debug: Log duplicate message IDs
  const ids = messages.map((m) => m._id);
  const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicateIds.length > 0) {
    console.log("Duplicate IDs:", duplicateIds);
  }

  return (
    <>
      {/* Messages Scrollable Area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[calc(100vh-250px)] overflow-y-auto scrollbar-hide space-y-3 p-3 sm:p-4 bg-white rounded-lg shadow"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {/* Remove duplicates before rendering */}
        {[...new Map(messages.map((msg) => [msg._id, msg])).values()].map(
          (msg) => (
            <div
              key={msg._id}
              className={`flex items-start space-x-2 sm:space-x-3 ${
                msg.sender?._id === user?._id ? "justify-end" : ""
              }`}
            >
              {/* Left Avatar */}
              {msg.sender?._id !== user?._id && (
                <img
                  src={
                    msg.sender?.avatar?.url ||
                    "https://via.placeholder.com/40x40.png?text=👤"
                  }
                  alt={msg.sender?.fullName || "User"}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              )}

              {/* Bubble */}
              <div
                className={`p-2 rounded-lg w-fit max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[45%] 
    lg:min-w-[350px] break-words ${
      msg.sender?._id === user?._id ? "bg-purple-100" : "bg-gray-100"
    }`}
              >
                <p className="text-sm font-semibold text-purple-800">
                  {msg.sender?._id === user?._id
                    ? "You"
                    : msg.sender?.fullName || "Unknown"}
                </p>

                {msg.messageType === "text" && msg.content && (
                  <p className="text-gray-800 text-sm break-words">
                    {msg.content}
                  </p>
                )}

                {msg.messageType === "image" && msg.media?.url && (
                  <img
                    src={msg.media.url}
                    alt="sent"
                    className="mt-1 rounded-lg max-w-full"
                  />
                )}

                {msg.messageType === "voice" && msg.media?.url && (
                  <audio src={msg.media.url} controls className="mt-1 w-full" />
                )}

                <p className="text-gray-500 text-xs mt-1">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Unknown time"}
                </p>
              </div>

              {/* Right Avatar */}
              {msg.sender?._id === user?._id && (
                <img
                  src={
                    msg.sender?.avatar?.url ||
                    "https://via.placeholder.com/40x40.png?text=👤"
                  }
                  alt="You"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              )}
            </div>
          )
        )}

        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="bg-white p-2 rounded-lg shadow mt-3 sm:mt-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            {typingUsers.map((u) => u.fullName || "User").join(", ")} is
            typing...
          </p>
        </div>
      )}
    </>
  );
};

export default MessageList;
