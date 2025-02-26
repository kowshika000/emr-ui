import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-16-171-230-69.eu-north-1.compute.amazonaws.com:8080/",
  // baseURL: "http://ec2-51-20-6-134.eu-north-1.compute.amazonaws.com:8080/",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add tokens or modify requests
axiosInstance.interceptors.request.use(
  (config) => {
    const branchId = localStorage.getItem("branchId");
    if (branchId) {
      if (config.method === "get") {
        const url = new URL(config.url, config.baseURL);
        url.searchParams.append("branchId", parseInt(branchId));
        config.url = url.pathname + url.search;
      } else {
        if (config.data) {
          config.data = { ...config.data, branchId };
        } else {
          config.data = { branchId };
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors or show notifications here
    console.error("API call error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
