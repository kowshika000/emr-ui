import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "http://ec2-13-48-24-177.eu-north-1.compute.amazonaws.com:8080/app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default axiosInstance;
