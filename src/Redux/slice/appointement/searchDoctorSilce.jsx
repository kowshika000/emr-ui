import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const searchDoctors = createAsyncThunk(
  "doctor/searchDoctors",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SEARCH_DOCTOR, {
        params: credentials,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const searchDoctorsSlice = createSlice({
  name: "searchDoctors",
  initialState: {
    searchdoctorData: [],
    searchDocloading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchDoctors.pending, (state) => {
        state.searchDocloading = true;
        state.error = null;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.searchDocloading = false;
        state.searchdoctorData = action.payload.data;
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.searchDocloading = false;
        state.error = action.payload;
      });
  },
});

export default searchDoctorsSlice.reducer;
