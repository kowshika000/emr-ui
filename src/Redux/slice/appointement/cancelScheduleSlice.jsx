import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const cancelSchedule = createAsyncThunk(
  "appointment/cancelSchedule",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.CANCEL_SCHEDULE,
        credentials
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const cancelScheduleSlice = createSlice({
  name: "cancelSchedule",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(cancelSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cancelScheduleSlice.reducer;
