import React, { useEffect, useState } from "react";
// import { Modal, Button, Row, Col, Form, InputGroup } from "react-bootstrap";
// import { Box } from "@mui/material";
import moment from "moment";
import _ from "lodash";
import "../Appointment.css";
// import { fetchData, postData } from "../../../core/services/APIService";
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
  // Grid,
  RadioGroup,
  Radio,
  FormControl,
  // FormLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { searchPatients } from "../../../Redux/slice/appointement/searchPatientSlice";
import { useSelector } from "react-redux";
import { bookAppointment } from "../../../Redux/slice/appointement/bookAppointementSlice";
import FormInput from "../../../components/FormFields/FormInput";
// import FormInput from "../../../components/FormFields/FormInput";

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
  addEventToState,
  slotInfo,
  selecteddoctorData,
}) => {
  // let dateFormat = "LLL";
  const theme = useTheme();
  const dateFormat = "MMMM Do YYYY, h:mm A";
  const [eventData, setEventData] = useState(null);
  const { loading, setLoading } = useLoading();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState();

  const dispatch = useDispatch();
  const { searchPatientData } = useSelector((state) => state?.searchPatient);
  console.log("selectedData:", searchPatientData);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    dispatch(searchPatients({ searchKey: inputValue }));
    setSearchQuery(inputValue);
  };

  const handleOptionSelect = (event, value) => {
    setSelectedPatient(value);
  };

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
      specialityId: selecteddoctorData.selectedSpecialityData?.specialityId,
      doctorId: selecteddoctorData.doctorId,
      patientId: selectedPatient?.patientId,
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
      email: payload.emailId,
      patientId: payload.patientId,
    };

    try {
      setLoading(true);
      const response = await dispatch(bookAppointment(payload));
      const msg =
        response?.payload?.message ?? "Appointment booked successfully";

      const newEvent = {
        id: `appointment_${Date.now()}`,
        title: "",
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
              options={searchPatientData?.data || []}
              getOptionLabel={(option) => option.name || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Patients"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Type to search..."
                  size="small"
                  sx={{ width: 300 }}
                />
              )}
              onChange={handleOptionSelect}
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

const AppointmentTabContent = ({ setEventData, selectedPatient }) => {
  const [formData, setFormData] = useState({
    scheduleType: "",
    numberOfSlots: 1,
    mrdNo: "",
    patientName: "",
    dob: "",
    age: "",
    gender: "",
    phoneNo: "",
    emailId: "",
    notes: "",
    additionalInfo: "",
    insurarName: "",
    notifyPatient: false,
  });
  const [showNotify, setShowNotify] = useState(false);
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

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (selectedPatient) {
      let dob = selectedPatient.dob;
      let patientName = selectedPatient.name;
      dob = dob ? dob.split("T")[0] : "";
      setFormData({ ...formData, ...selectedPatient, dob, patientName });
    }
  }, [selectedPatient]);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap={2}
      >
        <FormInput
          type="select"
          label="Schedule Type"
          name="scheduleType"
          value={formData.scheduleType}
          onChange={(value) => handleChange("scheduleType", value)}
          required
          options={[
            { label: "Select...", value: "-1" },
            ...ScheduleTypes.map((type) => ({
              label: type.type,
              value: type.type,
            })),
          ]}
        />

        <FormInput
          type="select"
          label="No of Slots"
          name="numberOfSlots"
          value={formData.numberOfSlots}
          onChange={(value) => handleChange("numberOfSlots", value)}
          options={[
            { label: "Select...", value: "-1" },
            ...[1, 2, 3, 4, 5, 6, 7, 8].map((count) => ({
              label: count,
              value: count,
            })),
          ]}
        />

        <FormInput
          label="MRD No"
          name="mrdNo"
          value={formData.mrdNo}
          onChange={(value) => handleChange("mrdNo", value)}
        />

        <FormInput
          label="Patient Name"
          name="patientName"
          value={formData.patientName}
          onChange={(value) => handleChange("patientName", value)}
          required
        />

        <FormInput
          type="date"
          label="Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={(value) => handleChange("dob", value)}
          setDependentValue={(calculatedAge) =>
            handleChange("age", calculatedAge)
          }
          required
        />

        <FormInput
          type="number"
          label="Age"
          name="age"
          value={formData.age}
          onChange={(value) => handleChange("age", value)}
          required
        />

        <FormInput
          type="select"
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={(value) => handleChange("gender", value)}
          required
          options={[
            { label: "Female", value: "Female" },
            { label: "Male", value: "Male" },
            { label: "Other", value: "Other" },
          ]}
        />

        <FormInput
          type="tel"
          label="Mobile"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={(value) => handleChange("phoneNo", value)}
          required
          placeholder="Search or type..."
        />

        <FormInput
          type="email"
          label="Email"
          name="emailId"
          value={formData.emailId}
          onChange={(value) => handleChange("emailId", value)}
          required
        />

        <FormInput
          label="Insurer Name"
          name="insurarName"
          value={formData.insurarName}
          onChange={(value) => handleChange("insurarName", value)}
        />

        <FormInput
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={(value) => handleChange("notes", value)}
          multiline
        />

        <FormInput
          label="Additional Info"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={(value) => handleChange("additionalInfo", value)}
          multiline
        />
      </Box>

      <Box display={"flex"} flexDirection={"column"}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showNotify}
              onChange={(e) => setShowNotify(e.target.checked)}
              name="showNotify"
            />
          }
          label="Notify Patient"
        />
        {showNotify && (
          <FormControl component="fieldset">
            <RadioGroup
              name="notifyPatient"
              value={formData.notifyPatient}
              onChange={(value) => handleChange("notifyPatient", value)}
              row
            >
              <FormControlLabel value="sms" control={<Radio />} label="SMS" />
              <FormControlLabel
                value="whatsapp"
                control={<Radio />}
                label="WhatsApp"
              />
              <FormControlLabel value="mail" control={<Radio />} label="Mail" />
            </RadioGroup>
          </FormControl>
        )}
      </Box>
    </>
  );
};

export default NewEventModal;
