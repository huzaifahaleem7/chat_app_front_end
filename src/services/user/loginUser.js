import { axiosInstance } from "../../lib";

const loginUser = async (formData) => {
  try {
    const res = await axiosInstance.post("/users/login", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      // ✅ Ensure cookies (accessToken, refreshToken) are included
      withCredentials: true,
    });

    // ✅ No need to store token manually; it's already in cookies
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

export default loginUser;
