import { useState, useEffect, useContext, createContext } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../authContext/AuthContext";
import { getCookie } from "../../utils"; // ✅ import utility

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const accessToken = getCookie("accessToken"); // ✅ get token from cookie
    console.log("🔐 Access token from cookie:", accessToken);

    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token: accessToken, // ✅ send token in auth
      },
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.log("❌ Socket connect error:", err.message);
    });

    newSocket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
