import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const patientList = createAsyncThunk(
  "patient/patientList",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.PATIENT_LIST);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const patientListSlice = createSlice({
  name: "patientList",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(patientList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patientList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(patientList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientListSlice.reducer;
