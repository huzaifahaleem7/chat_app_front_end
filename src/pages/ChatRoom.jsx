// ✅ Imports
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext/AuthContext";
import { useSocketContext } from "../context/socketContext/SocketContext";
import { Navigate } from "react-router-dom";
import { getMessage } from "../services/chat";

//import ChatSidebar
import {
  ChatSidebar,
  ChatHeader,
  MessageList,
  MessageForm,
} from "../components/chat";

function ChatRoom() {
  //  Auth and Socket Contexts
  const { user, logout, refreshToken } = useAuth();
  const { socket, onlineUsers } = useSocketContext();

  //  State declarations
  const [message, setMessage] = useState(""); // User's typed message
  const [messages, setMessages] = useState([]); // All chat messages
  const [image, setImage] = useState(null); // Selected image file
  const [voice, setVoice] = useState(null); // Recorded voice
  const [isRecording, setIsRecording] = useState(false); // Voice recording flag
  const [searchTerm, setSearchTerm] = useState(""); // Search input

  //  Refs
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  //for pagination
  const [page, setPage] = useState(1); // current page number
  const [hasMore, setHasMore] = useState(true); // if more messages to load
  const [loadingMessages, setLoadingMessages] = useState(false); // loading flag

  //  Redirect to login if not logged in
  if (!user) return <Navigate to="/login" />;

  //  Scroll to bottom when called
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //  Setup socket events when socket connects
  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", { userId: user._id });

    //  Receive incoming messages from backend
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    });

    //  Token refresh on disconnect
    socket.on("disconnect", async () => {
      try {
        await refreshToken();
      } catch (err) {
        logout();
      }
    });

    //  Cleanup on unmount
    return () => {
      socket.off("receive-message");
      socket.off("disconnect");
      socket.emit("leaveRoom", { userId: user._id });
    };
  }, [socket, user, logout, refreshToken]);

  //  Scroll down when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //loadFirstPage
  useEffect(() => {
    fetchMessages(); // load first page
  }, []);

  //  Start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setVoice(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Recording error:", error);
    }
  };

  //  Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  //  Handle message send
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() && !image && !voice) return;

    const newMessage = {
      sender: user, // needed on frontend to display name/avatar
      senderId: user._id,
      messageType: "text",
      content: message.trim(),
      media: {},
      createdAt: new Date().toISOString(),
    };

    if (image) {
      newMessage.messageType = "image";
      newMessage.media = { url: URL.createObjectURL(image) }; // Temp preview
    }

    if (voice) {
      newMessage.messageType = "voice";
      newMessage.media = { url: URL.createObjectURL(voice) }; // Temp preview
    }

    socket.emit("send-message", newMessage); //  send to backend
    setMessage("");
    setImage(null);
    setVoice(null);
  };

  //  Logout function
  const handleLogout = () => {
    socket.emit("leaveRoom", { userId: user._id });
    logout();
  };

  //  Image selection handler
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  //  Trigger hidden file input
  const triggerImagePicker = () => {
    fileInputRef.current.click();
  };

  //  Filter online users list
  const filteredUsers = [
    ...new Map([user, ...onlineUsers].map((u) => [u._id, u])).values(),
  ];
  const displayedUsers = filteredUsers.filter((u) =>
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchMessages = async () => {
    if (loadingMessages || !hasMore) return;

    setLoadingMessages(true);

    try {
      const res = await getMessage(page, 20);
      const newMessages = res.data.messages; // get new messages array

      if (!Array.isArray(newMessages)) {
        console.error("newMessages is not an array:", newMessages);
        return;
      }

      if (newMessages.length === 0) {
        setHasMore(false); // no more messages to load
      } else {
        setMessages((prev) => {
          // Merge newMessages (older ones) before current messages
          const merged = [...newMessages, ...prev];

          // Remove duplicates by _id
          const uniqueMessages = merged.filter(
            (msg, index, arr) =>
              index === arr.findIndex((m) => m._id === msg._id)
          );

          // Sort messages by createdAt ascending (oldest first)
          uniqueMessages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

          return uniqueMessages;
        });

        setPage((prev) => prev + 1); // go to next page for next fetch
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  //  UI rendering returned below
  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        user={user}
        onlineUsers={onlineUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleLogout={handleLogout}
      />

      {/* Chat Area */}
      <div className="w-full md:w-3/4 p-3 sm:p-6 flex flex-col overflow-hidden">
        {/* Header (Fixed Height) */}
        <div className="flex-shrink-0">
          <ChatHeader onlineUsers={onlineUsers} />
        </div>

        {/* Message List (Flexible + Scrollable) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <MessageList
            messages={messages}
            user={user}
            onScrollTop={fetchMessages}
          />
        </div>

        {/* Message Form (Fixed Height) */}
        <MessageForm
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          fileInputRef={fileInputRef}
          handleImageSelect={handleImageSelect}
          triggerImagePicker={triggerImagePicker}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </div>
    </div>
  );
}

export default ChatRoom;
