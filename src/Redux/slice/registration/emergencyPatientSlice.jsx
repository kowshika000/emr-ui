import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const emergencyPatients = createAsyncThunk(
  "patient/emergencyPatients",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.EMERGENCY_PATIENT,
        credentials
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const emergencyPatientsSlice = createSlice({
  name: "emergencyPatients",
  initialState: {
    emergencyPatientData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(emergencyPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(emergencyPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.emergencyPatientData = action.payload.data;
      })
      .addCase(emergencyPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default emergencyPatientsSlice.reducer;
