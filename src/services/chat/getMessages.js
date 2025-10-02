import { axiosInstance } from "../../lib";

const getMessage = async (page = 1, limit = 20) => {
  const response = await axiosInstance.get(
    `/messages?page=${page}&limit=${limit}`
  );
  return response.data;
};

export default getMessage;
