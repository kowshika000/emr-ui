import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const revisitPatients = createAsyncThunk(
  "patient/revisitPatients",
  async ({ credentials, patientId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.REVISIT_PATIENT}/${patientId}`,
        credentials
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong!");
    }
  }
);


const revisitPatientsSlice = createSlice({
  name: "revisitPatients",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(revisitPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(revisitPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(revisitPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revisitPatientsSlice.reducer;
