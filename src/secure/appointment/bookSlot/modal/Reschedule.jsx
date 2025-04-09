import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useLoading } from "../../../../components/global/loader/LoadingContext";
import { useDispatch, useSelector } from "react-redux";
import { reSchedule } from "../../../../Redux/slice/appointement/reScheduleSlice";
import { showToast } from "../../../../components/global/Toast";

const Reschedule = ({
  handleClose,
  appointmentId,
  doctorId,
  getAvailableSlotsForAllDoctors,
}) => {
  const { loading } = useLoading();
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const dispatch = useDispatch();
  const { doctorAvailableData } = useSelector(
    (state) => state?.docAvailable || []
  );

  useEffect(() => {
    if (doctorAvailableData?.data) {
      const doctorData = doctorAvailableData?.data.find(
        (doc) => doc.doctorId === doctorId
      );

      if (doctorData) {
        const slots =
          doctorData.specialitySlots?.flatMap((slot) => slot.availableSlots) ||
          [];
        setAvailableSlots(slots);
      }
    }
  }, [doctorAvailableData, doctorId]);

  const handleChangeStartDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangeStartTime = (event) => {
    setTime(event.target.value);
  };

  // Filter slots to hide past times if selected date is today
  const filteredSlots = availableSlots.filter((slot) => {
    if (!date) return false; // If date is not selected, show nothing

    const selectedDate = dayjs(date).format("YYYY-MM-DD");
    const todayDate = dayjs().format("YYYY-MM-DD");

    if (selectedDate === todayDate) {
      const currentTime = dayjs().format("HH:mm"); // Current time in HH:mm format
      return slot >= currentTime; // Only show future slots
    }
    return true; // Show all slots for future dates
  });

  const handleReschedule = async () => {
    try {
      await dispatch(
        reSchedule({
          appointmentId: appointmentId,
          appointmentDate: date.format("YYYY-MM-DD"),
          appointmentTime: time,
          doctorId: doctorId,
        })
      ).unwrap();

      await getAvailableSlotsForAllDoctors();
      handleClose();
      showToast(["Appointment Re-scheduled successfully"], "success");
    } catch (error) {
      showToast([error || "Something went wrong"], "error");
    }
  };

  return (
    <Dialog
      open={true}
      onClose={() => handleClose(false)}
      maxWidth="sm"
      fullWidth
    >
      {loading && <Typography align="center">Loading...</Typography>}

      <DialogTitle>Reschedule Appointment</DialogTitle>

      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Appointment Date
              </Typography>
              <DatePicker
                value={date}
                onChange={handleChangeStartDate}
                disablePast
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
              />
            </div>

            <div>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Appointment Time
              </Typography>
              <FormControl fullWidth size="small">
                {/* <InputLabel>Select Time</InputLabel> */}
                <Select
                  value={time}
                  onChange={handleChangeStartTime}
                  displayEmpty
                  placeholder="Select Time"
                >
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot, index) => (
                      <MenuItem key={index} value={slot}>
                        {slot}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No slots available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReschedule}
          disabled={!time}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Reschedule;
