import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/apiEndpoints";

export const registerPatients = createAsyncThunk(
  "patient/registerPatients",
  async (credentials, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      Object.keys(credentials).forEach((key) => {
        formData.append(key, credentials[key]);
      });

      const response = await axiosInstance.post(
        API_ENDPOINTS.REGISTER_PATIENT,
        formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const registerPatientsSlice = createSlice({
  name: "registerPatients",
  initialState: {
    registerPatientData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.registerPatientData = action.payload.data;
      })
      .addCase(registerPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default registerPatientsSlice.reducer;
