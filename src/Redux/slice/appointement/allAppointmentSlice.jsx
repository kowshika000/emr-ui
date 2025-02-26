import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const allAppointment = createAsyncThunk(
  "appointment/allAppointment",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ALL_APPOINTMENT, {
        params: credentials,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const allAppointmentSlice = createSlice({
  name: "allAppointment",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(allAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allAppointmentSlice.reducer;
