import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    // "http://localhost:8080/app/",
    "http://ec2-13-49-23-128.eu-north-1.compute.amazonaws.com:8080/app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default axiosInstance;
