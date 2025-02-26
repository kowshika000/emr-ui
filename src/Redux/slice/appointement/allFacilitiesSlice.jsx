import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const allFacilities = createAsyncThunk(
  "facility/allFacilities",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ALL_FACILITIES, {
        params: credentials,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const allFacilitiesSlice = createSlice({
  name: "allFacilities",
  initialState: {
    facilitiesData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilitiesData = action.payload.data;
      })
      .addCase(allFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allFacilitiesSlice.reducer;
