import { combineReducers } from "redux";
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

// import { rootReducer as childRootReducer } from "emr_billing/childRootReducer";

export const rootReducer = combineReducers({
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

  // ...childRootReducer,
});
