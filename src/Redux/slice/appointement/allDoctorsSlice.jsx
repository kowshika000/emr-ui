import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const allDoctors = createAsyncThunk(
  "doctor/allDoctors",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.All_DOCTORS,
        credentials
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const allDoctorsSlice = createSlice({
  name: "allDoctors",
  initialState: {
    doctorData: [],
    docloading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allDoctors.pending, (state) => {
        state.docloading = true;
        state.error = null;
      })
      .addCase(allDoctors.fulfilled, (state, action) => {
        state.docloading = false;
        state.doctorData = action.payload.data;
      })
      .addCase(allDoctors.rejected, (state, action) => {
        state.docloading = false;
        state.error = action.payload;
      });
  },
});

export default allDoctorsSlice.reducer;
