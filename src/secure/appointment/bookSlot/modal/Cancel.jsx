import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useLoading } from "../../../../components/global/loader/LoadingContext";
import EMRLoader from "../../../../components/global/loader/EMRLoaderOverlay";
import { useDispatch } from "react-redux";
import { cancelSchedule } from "../../../../Redux/slice/appointement/cancelScheduleSlice";
import { useSelector } from "react-redux";
import { showToast } from "../../../../components/global/Toast";

const CancelAlertModal = ({
  handleClose,
  appointmentId,
  getAvailableSlotsForAllDoctors,
}) => {
  const { loading, setLoading } = useLoading();
  const [displayReasonInput, setDisplayReasonInput] = useState(false);
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();

  const loginUser = JSON.parse(localStorage.getItem("user"));

  const { data } = useSelector((state) => state.cancel);

  const status = data.statusCode;

  console.log(appointmentId, "events");

  const onReasonSelect = (e) => {
    const selectedValue = e.target.value;
    setReason(selectedValue);
    setDisplayReasonInput(selectedValue === "Others");
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleCancel = async () => {
    if (!reason) {
      showToast(["Please select a reason for cancellation"], "warning");
      return;
    }

    setLoading(true);

    try {
      const resultAction = await dispatch(
        cancelSchedule({
          appointmentId: appointmentId,
          cancellationReason: reason,
          cancelledBy: loginUser?.data?.userName,
        })
      ).unwrap(); // Ensures we wait for the action to complete

      await getAvailableSlotsForAllDoctors(); // ✅ Refresh slots after rescheduling

      showToast(["Appointment Cancelled successfully"], "success");
      handleClose();
    } catch (error) {
      showToast([error || "Something went wrong"], "error");
    }
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm">
      <EMRLoader show={loading} />
      <DialogTitle>Cancel Appointment</DialogTitle>

      <DialogContent>
        <Box paddingY={2} fontWeight="bold">
          Are you sure you want to cancel this appointment?
        </Box>

        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Reason For Cancellation</InputLabel>
          <Select
            value={reason}
            onChange={onReasonSelect}
            label="Reason For Cancellation"
            // size="small"
          >
            <MenuItem value="">Select...</MenuItem>
            {[
              "No Show",
              "Change of Plans",
              "Overlapping Appointments",
              "Doctor Unavailability",
              "Others",
            ].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {displayReasonInput && (
          <TextField
            label="Reason"
            fullWidth
            margin="normal"
            size="small"
            onChange={handleReasonChange}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Go Back
        </Button>
        <Button onClick={handleCancel} variant="contained" color="error">
          Yes, Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelAlertModal;
