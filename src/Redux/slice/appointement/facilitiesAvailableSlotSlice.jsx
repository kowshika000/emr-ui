import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const facilitiesAvailability = createAsyncThunk(
  "timeslot/facilitiesAvailability",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.FACILITY_AVAILABLE, {
        params: credentials,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const facilitiesAvailabilitySlice = createSlice({
  name: "facilitiesAvailability",
  initialState: {
    facilitiesAvailableData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(facilitiesAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(facilitiesAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.facilitiesAvailableData = action.payload.data;
      })
      .addCase(facilitiesAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default facilitiesAvailabilitySlice.reducer;
