import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useLoading } from "../../../../components/global/loader/LoadingContext";
import { useDispatch } from "react-redux";
import { reSchedule } from "../../../../Redux/slice/appointement/reScheduleSlice";
import { showToast } from "../../../../components/global/Toast";
import { useSelector } from "react-redux";

const Reschedule = ({ handleClose, doctorId }) => {
  const { loading } = useLoading();
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.reschedule);

  const status = data.statusCode;

  const handleChangeStartDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangeStartTime = (newValue) => {
    setTime(newValue);
  };

  const handleReschedule = () => {
    dispatch(
      reSchedule({
        appointmentDate: date.format("YYYY-MM-DD"),
        appointmentTime: time.format("HH:mm"),
      })
    );
    handleClose();
    if (status === null) {
      showToast(["Something went wrong"], "error");
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
              <DatePicker value={date} onChange={handleChangeStartDate} />
            </div>

            <div>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Appointment Time
              </Typography>
              <TimePicker
                value={time}
                onChange={handleChangeStartTime}
                ampm={false}
              />
            </div>
          </div>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleReschedule}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Reschedule;
