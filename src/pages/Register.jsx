import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/user"; // adjust path as needed

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signupUser(formData);
      alert("Signup Successfully");
      navigate("/"); // redirect to login
    } catch (error) {
      setError(error.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-purple-50 text-gray-800 overflow-hidden">
      {/* Left Section - Welcome */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 to-purple-950 text-white relative overflow-hidden">
        {/* Decorative Glow Orbs */}
        <div className="absolute w-64 h-64 bg-purple-400 opacity-20 rounded-full blur-3xl top-10 left-10 animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 bg-pink-400 opacity-15 rounded-full blur-2xl bottom-10 right-10 animate-pulse-fast"></div>

        <div className="z-10 text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-100 via-white to-purple-300 drop-shadow-xl">
            Welcome to ChatApp
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-md mx-auto leading-relaxed drop-shadow-md">
            Connect seamlessly with friends and colleagues with secure, powerful, real-time messaging.
          </p>

          {/* Feature Icons with Transitions */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl border border-purple-500/20 transform transition duration-300 hover:scale-102">
            <div className="space-y-5">
              {[
                { icon: "💬", label: "Real-Time Messaging" },
                { icon: "🛠", label: "Customizable Profiles" },
                { icon: "🔒", label: "Enhanced Privacy Controls" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 group bg-white bg-opacity-5 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-opacity-10 cursor-default"
                >
                  <div className="text-3xl text-purple-300 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-gray-800 font-medium text-base tracking-wide transition-opacity duration-300 group-hover:opacity-100">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            {["fullName", "username", "email"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg text-gray-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            ))}

            {/* Password Field with Show/Hide */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pr-10 bg-purple-50 border border-purple-200 rounded-lg text-gray-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <span
                  className="absolute top-3 right-3 text-sm text-purple-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {/* Avatar (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Avatar (Optional)
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg text-gray-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-purple-600 text-white w-full py-3 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {/* ✅ Back to Login */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-purple-600 hover:underline cursor-pointer"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
