import React from "react";

const ChatSidebar = ({
  user,
  onlineUsers,
  searchTerm,
  setSearchTerm,
  handleLogout,
}) => {
  const filteredUsers = [...new Map([user, ...onlineUsers].map((u) => [u._id, u])).values()];
  const displayedUsers = filteredUsers.filter((u) =>
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/4 min-w-[250px] bg-purple-500 p-3 sm:p-4 flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg sm:text-xl font-semibold">Chats</h2>
        <span className="text-white text-sm">🔊 {onlineUsers.length}</span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search your friends"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 rounded-lg bg-purple-400 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm sm:text-base"
      />

      {/* Online Users */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {displayedUsers.map((u) => (
          <div key={u._id} className="flex items-center space-x-3">
            {u.avatar?.url ? (
              <img
                src={u.avatar.url}
                alt={u.fullName}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                {u.fullName?.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-white text-sm font-medium">{u.fullName}</p>
              <span className="text-green-200 text-xs">
                {u._id === user._id
                  ? "You"
                  : u.lastSeen
                  ? `Last seen: ${new Date(u.lastSeen).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Online"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition cursor-pointer text-sm sm:text-base"
      >
        Logout
      </button>
    </div>
  );
};

export default ChatSidebar;
