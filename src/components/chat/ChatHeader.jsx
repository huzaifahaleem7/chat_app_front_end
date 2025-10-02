import React from "react";

const ChatHeader = ({ onlineUsers }) => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
          alt="Group"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Chat Room
          </p>
          <span className="text-gray-500 text-xs sm:text-sm">
            Members: {onlineUsers.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
