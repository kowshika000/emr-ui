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

const Reschedule = ({
  handleClose,
  appointmentId,
  doctorId,
  getAvailableSlotsForAllDoctors,
}) => {
  const { loading } = useLoading();
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const dispatch = useDispatch();
  const { statusCode } = useSelector((state) => state.reschedule);

  console.log(statusCode, "code");

  console.log("doctor id:", doctorId);

  const handleChangeStartDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangeStartTime = (newValue) => {
    setTime(newValue);
  };

  const handleReschedule = async () => {
    try {
      await dispatch(
        reSchedule({
          appointmentId: appointmentId,
          appointmentDate: date.format("YYYY-MM-DD"),
          appointmentTime: time.format("HH:mm:ss"),
          doctorId: doctorId,
        })
      ).unwrap();

      await getAvailableSlotsForAllDoctors();
      handleClose();
      // showToast(["Appointment Re scheduled successfully"], "success");
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
              <TimePicker
                value={time}
                onChange={handleChangeStartTime}
                ampm={false}
                minutesStep={15}
                slotProps={{
                  textField: {
                    size: "small",
                  },
                }}
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
