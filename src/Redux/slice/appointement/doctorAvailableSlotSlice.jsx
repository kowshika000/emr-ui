import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const doctorAvailability = createAsyncThunk(
  "timeslot/doctorAvailability",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.DOC_AVAILABLE, {
        params: credentials,
      });
      const { data, status, statusText } = response;

      return { data, status, statusText };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const doctorAvailabilitySlice = createSlice({
  name: "doctorAvailability",
  initialState: {
    doctorAvailableData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doctorAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doctorAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorAvailableData = action.payload.data;
      })
      .addCase(doctorAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorAvailabilitySlice.reducer;
