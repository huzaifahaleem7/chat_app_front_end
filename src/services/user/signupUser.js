import { axiosInstance } from "../../lib";

const signupUser = async (formData) => {
  try {
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    const res = await axiosInstance.post("/users/signup", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
      console.error("Signup error:", error);
    throw error.response?.data || { message: "SignUp failed" };
  }
};

export default signupUser;
