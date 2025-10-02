import { axiosInstance } from "../../lib";

const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/users/me");
    return res.data; // { statusCode, data, message }
  } catch (error) {
    console.error("Error in fetching current User", error);
    throw error.response?.data || { message: "Failed to fetch user" };
  }
};

export default getCurrentUser;
