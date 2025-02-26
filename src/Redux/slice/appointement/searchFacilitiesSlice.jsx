import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const searchFacilities = createAsyncThunk(
  "facility/searchFacilities",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SEARCH_FACILITY, {
        params: credentials,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const searchFacilitiesSlice = createSlice({
  name: "searchFacilities",
  initialState: {
    searchfacilityData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.searchfacilityData = action.payload.data;
      })
      .addCase(searchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default searchFacilitiesSlice.reducer;
