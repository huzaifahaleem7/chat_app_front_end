import React from "react";

const MessageForm = ({
  message,
  setMessage,
  handleSendMessage,
  fileInputRef,
  handleImageSelect,
  triggerImagePicker,
  isRecording,
  startRecording,
  stopRecording,
}) => {
  return (
    <form
      onSubmit={handleSendMessage}
      className="bg-white p-3 sm:p-4 rounded-lg shadow mt-3 sm:mt-4 flex items-center space-x-1 sm:space-x-2 flex-wrap gap-2 "
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-1 sm:p-2 bg-purple-50 border border-purple-200 rounded-lg text-gray-800 placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-xs sm:text-base min-w-[150px]"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,audio/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <button
        type="button"
        onClick={triggerImagePicker}
        className="p-1 sm:p-2 bg-purple-50 rounded-lg text-purple-600 hover:bg-purple-100 transition cursor-pointer text-xs sm:text-sm min-w-fit"
      >
        📎
      </button>
      <button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-1 sm:p-2 rounded-lg text-white transition cursor-pointer text-xs sm:text-sm min-w-fit ${
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {isRecording ? "⏹️" : "🎙️"}
      </button>
      <button
        type="submit"
        className="p-1 sm:p-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition cursor-pointer text-xs sm:text-base min-w-fit"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
