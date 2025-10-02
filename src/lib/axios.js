import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/users/refresh-token")
//     ) {
//       originalRequest._retry = true;

//       try {
//         await axiosInstance.post("/users/refresh-token");

//         await new Promise((res) => setTimeout(res, 300));

//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Token refresh failed:", refreshError);
//         window.location.href = "/";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
