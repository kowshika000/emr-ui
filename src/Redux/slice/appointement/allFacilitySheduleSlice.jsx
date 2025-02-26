import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const allFacilitySchedules = createAsyncThunk(
  "facility/allFacilitySchedules",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.FACILITY_SCHEDULES,
        credentials
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const allFacilitySchedulesSlice = createSlice({
  name: "allFacilitySchedules",
  initialState: {
    facilitiesSheduleData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allFacilitySchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allFacilitySchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.facilitiesSheduleData = action.payload.data;
      })
      .addCase(allFacilitySchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allFacilitySchedulesSlice.reducer;
