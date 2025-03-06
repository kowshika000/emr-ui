import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const reSchedule = createAsyncThunk(
  "appointment/reSchedule",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.RE_SCHEDULE,
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const reScheduleSlice = createSlice({
  name: "reSchedule",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(reSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reScheduleSlice.reducer;
