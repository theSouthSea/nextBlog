import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/",
});
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("response.data-axios=", response.data);
    // 不是code等于200
    if (response?.status === 200) {
      return response.data;
    }
    return {
      code: "-1",
      msg: "未知错误",
      data: null,
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;

