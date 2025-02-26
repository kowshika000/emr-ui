import axiosInstance from "../api/AxiosInstance";

export const fetchData = async (url, params) => {
  try {
    const response = await axiosInstance.get(url, params);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url, data) => {
  try {
    const response = await axiosInstance.delete(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const doctorDashboardCount = async (url, params) => {
  try {
    const response = await axiosInstance.get(
      `${url}?doctorId=${params?.doctorId}&ipOpFlag=${params?.ipOpFlag}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor dashboard count:", error);
    throw error;
  }
};

export const doctorDashboardDataList = async (url, params) => {
  console.log(params,"params")
  try {
    const response = await axiosInstance.get(
      `${url}?doctorId=${params?.doctorId}&ipOpFlag=${params?.ipOpFlag}&context=${params?.context}&page=${params?.page}&size=${params?.size}&ptName=${params?.ptName}&status=${params?.status}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor dashboard data:", error);
    throw error;
  }
};
