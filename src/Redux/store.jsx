import { configureStore, combineReducers } from "@reduxjs/toolkit";
import allDoctorsReducer from "./slice/appointement/allDoctorsSlice";
import authReducer from "./slice/login/authSlice";
import allBranchReducer from "./slice/appointement/allBranchSlice";
import allAppointmentReducer from "./slice/appointement/allAppointmentSlice";
import doctorAvailabilitieReducer from "./slice/appointement/doctorAvailableSlotSlice";
import allFacilitySchedulesReducer from "./slice/appointement/allFacilitySheduleSlice";
import facilitiesAvailabilityReducer from "./slice/appointement/facilitiesAvailableSlotSlice";
import allFacilitiesReducer from "./slice/appointement/allFacilitiesSlice";
import searchDoctorsReducer from "./slice/appointement/searchDoctorSilce";
import searchFacilitiesReducer from "./slice/appointement/searchFacilitiesSlice";
import searchPatientsReducer from "./slice/appointement/searchPatientSlice";
import registerPatientsReducer from "./slice/registration/registerPatientsSlice";
import revisitPatientsReducer from "./slice/registration/revisitSlice";
import emergencyPatientsReducer from "./slice/registration/emergencyPatientSlice";
import bookAppointmentReducer from "./slice/appointement/bookAppointementSlice";
import scheduleListReducer from "./slice/dashboard/scheduleListSlice";
import reScheduleReducer from "./slice/appointement/reScheduleSlice";
import cancelScheduleReducer from "./slice/appointement/cancelScheduleSlice";

const staticReducers = {
  auth: authReducer,
  allBranch: allBranchReducer,
  allAppoint: allAppointmentReducer,
  allDoctor: allDoctorsReducer,
  allFacility: allFacilitiesReducer,
  docAvailable: doctorAvailabilitieReducer,
  facilitySchedule: allFacilitySchedulesReducer,
  facilityAvailable: facilitiesAvailabilityReducer,
  searchDoctor: searchDoctorsReducer,
  searchFacility: searchFacilitiesReducer,
  searchPatient: searchPatientsReducer,
  regPatient: registerPatientsReducer,
  revisit: revisitPatientsReducer,
  emergency: emergencyPatientsReducer,
  bookAppoint: bookAppointmentReducer,
  schedule: scheduleListReducer,
  reschedule: reScheduleReducer,
  cancel: cancelScheduleReducer,
};

const createReducer = (asyncReducers = {}) =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

const store = configureStore({
  reducer: createReducer(),
});

store.asyncReducers = {}; // Store injected reducers

store.injectReducer = (key, asyncReducer) => {
  if (!store.asyncReducers[key]) {
    console.log(`Injecting reducer: ${key}`);
    store.asyncReducers[key] = asyncReducer;

    // Ensure the store is updated with the new reducer
    store.replaceReducer(createReducer(store.asyncReducers));

    console.log("Updated Redux state:", store.getState());
  } else {
    console.warn(`Reducer "${key}" is already injected.`);
  }
};

export default store;
