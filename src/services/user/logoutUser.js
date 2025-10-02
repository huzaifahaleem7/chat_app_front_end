import { axiosInstance } from "../../lib";


const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    return response;
  } catch (error) {
    console.error("Logout failed:", error?.response?.data || error.message);
    throw error;
  }
};

export default logoutUser;
