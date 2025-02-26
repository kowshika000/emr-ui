import React, { useEffect, useState } from "react";
// import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
// import { Box } from "@mui/material";
import moment from "moment";
import _ from "lodash";
import "../Appointment.css";
import { fetchData, postData } from "../../../core/services/APIService";
import { useLoading } from "../../../components/global/loader/LoadingContext";
import EMRLoader from "../../../components/global/loader/EMRLoaderOverlay";
import { showToast } from "../../../components/global/Toast";
// import Search from "@mui/icons-material/Search";
// import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Button,
  Box,
  useTheme,
  MenuItem,
  // Typography,
  // InputAdornment,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { searchPatients } from "../../../Redux/slice/appointement/searchPatientSlice";
import { useSelector } from "react-redux";
import { bookAppointment } from "../../../Redux/slice/appointement/bookAppointementSlice";

const NewEventModal = ({
  open,
  setOpen,
  handleClose,
  selectedSlot,
  activeTab,
  specialistList,
  facilityList,
  slotDuration,
  getAvailableSlotsForAllDoctors,
  getAllFacilitySchedules,
  getAvailableSlotsForAllFacilities,
  addEventToState,
  slotInfo,
  selecteddoctorData,
}) => {
  // let dateFormat = "LLL";
  const theme = useTheme();
  const dateFormat = "MMMM Do YYYY, h:mm A";
  const [eventData, setEventData] = useState(null);
  const { loading, setLoading } = useLoading();

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();

  const dispatch = useDispatch();
  console.log("selectedData:", selecteddoctorData);
  const { searchPatientData } = useSelector((state) => state?.searchPatient);

  const handleCreateEvent = async (e) => {
    if (!eventData) {
      console.error("eventData is not available");
      return;
    }

    const formattedDate = moment(selectedSlot.start).format("YYYY-MM-DD");
    let otherData = {
      branchId: selecteddoctorData.branchId,
      timeInterval: parseInt(slotDuration),
      appointmentTime: moment(selectedSlot.start).format("HH:mm:ss"),
      appointmentEndTime: moment(selectedSlot.end).format("HH:mm:ss"),
      specialityId: selecteddoctorData.specialityId,
      doctorId: selecteddoctorData.doctorId,
    };

    let payload = { ...eventData, ...otherData };

    payload = {
      branchId: payload.branchId,
      specialityId: payload.specialityId,
      doctorId: payload.doctorId,
      appointmentDate: formattedDate,
      appointmentTime: payload.appointmentTime,
      timeInterval: payload.timeInterval,
      scheduleType: payload.scheduleType,
      mrdNo: payload.mrdNo,
      notes: payload.notes,
      additionalInfo: payload.additionalInfo,
      insurarName: payload.insurarName,
      numberOfSlots: payload.numberOfSlots,
      notifyPatient: payload.notifyPatient,
      patientName: payload.patientName,
      dob: payload.dob,
      age: payload.age,
      gender: payload.gender,
      phoneNo: payload.phoneNo,
      email: payload.email,
    };

    try {
      setLoading(true);
      const response = await dispatch(bookAppointment(payload));
      const msg =
        response?.payload?.message ?? "Appointment booked successfully";

      const newEvent = {
        id: `appointment_${Date.now()}`,
        title: msg,
        start: slotInfo.start,
        end: slotInfo.end,
        resourceId: slotInfo.resourceId,
      };

      addEventToState(newEvent);
      console.log("New Event Added:", newEvent);

      // Optionally handle additional logic based on tabs
      if (activeTab === "users") {
        getAvailableSlotsForAllDoctors();
      } else if (activeTab === "rooms") {
        getAllFacilitySchedules();
      }

      showToast([msg], "success");
      setOpen(false);
    } catch (error) {
      console.error("Booking Error:", error);
      showToast(
        [error?.message ?? "Something went wrong! Please try again."],
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const searchPatient = _.debounce((e) => {
    const key = e.target.value;

    if (!key) return;
    setLoading(true);

    dispatch(searchPatients({ searchKey: key }))
      .then(() => {
        const suggestions = searchPatientData?.data || [];
        setSuggestions(suggestions);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        showToast(["Something Went Wrong!"], "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, 500);

  const handleSelect = (event, newValue) => {
    setSelectedPatient(newValue);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <EMRLoader show={loading} />

      <DialogContent dividers>
        <h5>Book New Appointment</h5>
        <Box paddingTop={"1em"}>
          <b>Booking Date:</b> {moment(selectedSlot?.start).format(dateFormat)}{" "}
          - {moment(selectedSlot?.end).format(dateFormat)}
        </Box>

        {typeof selectedSlot?.resourceId === "string" &&
          !_.isNull(parseInt(selectedSlot.resourceId.split("_")[1])) && (
            <Box paddingY={"1em"}>
              <b>{activeTab === "users" ? "With Doctor:" : "For Facility:"}</b>{" "}
              {activeTab === "users"
                ? specialistList.find(
                    (specialist) =>
                      specialist.doctorId ===
                      parseInt(selectedSlot.resourceId.split("_")[1])
                  )?.doctorName
                : facilityList.find(
                    (facility) =>
                      facility.facilityId ===
                      parseInt(selectedSlot.resourceId.split("_")[1])
                  )?.doctorName}
            </Box>
          )}
        <Box
          padding={"1em"}
          border={`1px solid ${theme.palette.divider}`}
          mt={1}
          borderRadius={2}
        >
          <Box pb={4} pt={1}>
            <Autocomplete
              freeSolo
              value={inputValue}
              onInputChange={searchPatient}
              options={suggestions}
              onChange={handleSelect}
              getOptionLabel={(option) =>
                option
                  ? `${option.name} - ${option.email ? option.email : ""}`
                  : ""
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search patients here..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    // style: { padding: "0.3em" },
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} style={{ cursor: "pointer" }}>
                  {option.name} {option.email}
                </li>
              )}
            />
            <div style={{ fontSize: "0.7em" }}>
              For existing patients search patients with phone, name, dob, or
              email for auto fill.
            </div>
          </Box>
          <AppointmentTabContent
            activeTab={activeTab}
            setEventData={setEventData}
            resourceId={selectedSlot.resourceId}
            specialistList={specialistList}
            setLoading={setLoading}
            loading={loading}
            selectedPatient={selectedPatient}
          />
        </Box>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreateEvent}>
            Create
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

const AppointmentTabContent = ({
  setEventData,
  specialistList,
  resourceId,
  activeTab,
  setLoading,
  loading,
  selectedPatient,
}) => {
  const [formData, setFormData] = useState({
    scheduleType: "",
    numberOfSlots: 1,
    mrdNo: "",
    patientName: "",
    dob: "",
    age: "",
    gender: "",
    phoneNo: "",
    email: "",
    notes: "",
    additionalInfo: "",
    insurarName: "",
    notifyPatient: false,
  });

  const ScheduleTypes = [
    { type: "Routine Check-Up", id: "1" },
    { type: "Consultation", id: "2" },
    { type: "Follow-Up Appointment", id: "3" },
    { type: "Urgent Care", id: "4" },
    { type: "Pediatric Appointment", id: "5" },
    { type: "Chronic Disease Management", id: "6" },
    { type: "Emergency Visit", id: "7" },
  ];

  useEffect(() => {
    setEventData(formData);
  }, [formData]);

  const handleChange = (e, type = "input", parseToInt = false) => {
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked.toString(),
      });
    } else {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: parseToInt ? parseInt(value) : value,
      });
    }
  };

  useEffect(() => {
    if (selectedPatient) {
      let dob = selectedPatient.dob;
      dob = dob ? dob.split("T")[0] : "";
      setFormData({ ...formData, ...selectedPatient, dob });
    }
  }, [selectedPatient]);

  return (
    <Box>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              value={formData.scheduleType}
              onChange={handleChange}
              name="scheduleType"
              variant="outlined"
              size="small"
              label={
                <>
                  Schedule Type <span style={{ color: "red" }}>*</span>
                </>
              }
            >
              <MenuItem value={"-1"}>Select...</MenuItem>
              {ScheduleTypes.map((type) => (
                <MenuItem key={type.type} value={type.type}>
                  {type.type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* {activeTab === "rooms" && (
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                value={formData.doctorId}
                onChange={handleChange}
                name="doctorId"
                variant="outlined"
                size="small"
                label={
                  <>
                    Specialist <span style={{ color: "red" }}>*</span>
                  </>
                }
              >
                <MenuItem value={"-1"}>Select...</MenuItem>
                {specialistList.map((type) => (
                  <MenuItem key={type.doctorId} value={type.doctorId}>
                    {type.doctorName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )} */}

          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              value={formData.numberOfSlots}
              onChange={(e) => handleChange(e, "input", true)}
              name="numberOfSlots"
              variant="outlined"
              size="small"
              label="No of Slots"
            >
              <MenuItem value={"-1"}>Select...</MenuItem>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="mrdNo"
              value={formData.mrdNo}
              onChange={handleChange}
              variant="outlined"
              size="small"
              label="MRD No"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              label={
                <>
                  Patient Name <span style={{ color: "red" }}>*</span>
                </>
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="dob"
              value={formData.dob}
              type="date"
              onChange={handleChange}
              variant="outlined"
              size="small"
              label={
                <>
                  {" "}
                  Date of Birth <span style={{ color: "red" }}>*</span>
                </>
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="age"
              value={formData.age}
              type="number"
              onChange={handleChange}
              variant="outlined"
              size="small"
              label={
                <>
                  {" "}
                  Age <span style={{ color: "red" }}>*</span>
                </>
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
              size="small"
              label={
                <>
                  {" "}
                  Gender <span style={{ color: "red" }}>*</span>
                </>
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="phoneNo"
              value={formData.phoneNo}
              type="tel"
              onChange={handleChange}
              placeholder="Search or type..."
              variant="outlined"
              size="small"
              label={
                <>
                  {" "}
                  Mobile <span style={{ color: "red" }}>*</span>
                </>
              }
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">+91</InputAdornment>
              //   ),
              // }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              type="email"
              onChange={handleChange}
              variant="outlined"
              size="small"
              label={
                <>
                  {" "}
                  Email <span style={{ color: "red" }}>*</span>
                </>
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Insurer Name"
              name="insurarName"
              value={formData.insurarName}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="notes"
              value={formData.notes}
              multiline
              // rows={3}
              onChange={handleChange}
              variant="outlined"
              size="small"
              label="Notes"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="additionalInfo"
              value={formData.additionalInfo}
              multiline
              // rows={3}
              onChange={handleChange}
              variant="outlined"
              size="small"
              label="Additional Info"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.notifyPatient}
                  onChange={(e) => handleChange(e, "checkbox")}
                  name="notifyPatient"
                />
              }
              label="Notify Patient"
              // style={{ marginTop: 10 }}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default NewEventModal;
