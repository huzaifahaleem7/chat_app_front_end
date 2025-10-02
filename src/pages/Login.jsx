import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/user";
import { useAuth } from "../context/authContext/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 New state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(formData);
      login(res.data); // token in cookie, user in context
      alert("Login Successful");
      navigate("/chat");
    } catch (error) {
      console.log(error.message || "Login failed");
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-purple-50 text-gray-800 overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-purple-950 text-white relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-purple-400 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 bg-pink-400 opacity-15 rounded-full blur-2xl bottom-10 right-10 animate-pulse-fast"></div>

        <div className="z-10 text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-100 via-white to-purple-300 drop-shadow-xl animate-fade-in">
            Welcome to ChatApp
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-md mx-auto leading-relaxed drop-shadow-md">
            Connect seamlessly with friends and colleagues with secure,
            powerful, real-time messaging.
          </p>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
            Welcome Back
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg text-gray-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            {/* Password with show/hide toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // 👈 Toggle type
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 pr-10 bg-purple-50 border border-purple-200 rounded-lg text-gray-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
                <span
                  className="absolute top-3 right-3 text-sm text-purple-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full py-3 rounded-lg transition duration-200 ease-in-out text-white ${
                loading
                  ? "bg-purple-400 opacity-60 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Link to Signup */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 hover:underline cursor-pointer"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
