import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    // "http://localhost:8080/app/",
    "http://ec2-51-21-224-240.eu-north-1.compute.amazonaws.com:8080/app/",
});
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;
