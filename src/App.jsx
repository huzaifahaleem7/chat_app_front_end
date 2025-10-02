import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/authContext/AuthContext";
import { Login, Signup, ChatRoom } from "./pages";
import { Loader } from "./components/common/Loader";

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  const isAuthRoute = location.pathname === "/" || location.pathname === "/register";

  // 🛡 If user is already logged in & tries to access login/signup → redirect to chat
  if (user && isAuthRoute) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route
        path="/chat"
        element={
          user ? <ChatRoom /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;
