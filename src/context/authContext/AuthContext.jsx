import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../../services/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        if (res && res.data) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("User fetch failed:", error?.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    navigate("/chat");
  };

  const logout = async () => {
    try {
      await logoutUser();
      navigate("/");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
