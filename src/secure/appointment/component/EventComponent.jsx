import React, { useState } from "react";
import { Modal, Col, Form } from "react-bootstrap";
import { Box } from "@mui/material";
import "../Appointment.css";
import { postData } from "../../../core/services/APIService";
import { showToast } from "../../../components/global/Toast";
import { useLoading } from "../../../components/global/loader/LoadingContext";
import EMRLoader from "../../../components/global/loader/EMRLoaderOverlay";
import { useNavigate } from "react-router-dom";
import AppRegistrationOutlined from "@mui/icons-material/AppRegistrationOutlined";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const EventComponent = ({ event, bookedSlotDetails }) => {
  // console.log(event,"event");

  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [rescheduleAppt, setRescheduleAppt] = useState(false);
  const navigate = useNavigate();

  console.log("Booked Slot Details:", bookedSlotDetails);

  // console.log(bookAppointmentdata.data?.[0].patient, "data book");

  return (
    <div>
      {/* <span>{event?.title}</span> */}
      <TooltipContent
        event={event?.event}
        navigate={navigate}
        setShowCancelAlert={setShowCancelAlert}
        setRescheduleAppt={setRescheduleAppt}
      />

      {showCancelAlert && (
        <CacelAlertModal
          open={showCancelAlert}
          event={event?.event}
          setOpen={setShowCancelAlert}
          handleClose={setShowCancelAlert}
        />
      )}
      {rescheduleAppt && (
        <RescheduleApptModal
          open={rescheduleAppt}
          event={event?.event}
          setOpen={setRescheduleAppt}
          handleClose={setRescheduleAppt}
        />
      )}
    </div>
  );
};

const CacelAlertModal = ({ open, handleClose, event }) => {
  const { loading, setLoading } = useLoading();
  const [displayReasonInput, setDisplayReasonInput] = useState(false);
  const [reason, setReason] = useState("");

  const onReasonSelect = (e) => {
    if (e.target.value === "Others") {
      setDisplayReasonInput(true);
    } else {
      setReason(e.target.vale);
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.vale);
  };

  const cancel = () => {
    setLoading(true);
    let payload = {};
    payload.appointmentId = event?.eventId;
    payload.cancellationReason = reason;
    payload.cancelledBy = "Aravindh";
    postData(`/app/doctorappointment/cancelAppointment`, payload)
      .then((response) => {
        showToast([response.message], "success");
        event?.callback && event?.callback();
        handleClose(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <Modal
      show={open}
      onHide={() => handleClose(false)}
      className="custom-modal"
    >
      <EMRLoader show={loading} />
      <Modal.Header closeButton>
        <Modal.Title>Cancel Appointment</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        <Box paddingY={"1em"} fontWeight={"bold"}>
          Are you sure want to cancel this appointment ?
        </Box>
        <Form.Group as={Col} md="6">
          <Form.Label className="mt-3">Reason For cancellation</Form.Label>
          <Form.Select name="slots" onChange={onReasonSelect}>
            <option value={"-1"}>select...</option>
            {[
              "No Show",
              "Change of Plans",
              "Overlapping Appointments",
              "Doctor Unavailability",
              "Others",
            ].map((count) => {
              return <option value={count}>{count}</option>;
            })}
          </Form.Select>
        </Form.Group>

        {displayReasonInput && (
          <Form.Group as={Col} md="6">
            <Form.Label className="mt-3">Reason</Form.Label>
            <Form.Control
              name="reason"
              type="text"
              onChange={handleReasonChange}
            />
          </Form.Group>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Go Back
        </Button>
        <Button variant="danger" onClick={cancel}>
          Yes, Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const RescheduleApptModal = ({ open, handleClose, event }) => {
  const { loading, setLoading } = useLoading();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleChangeStartDate = (e) => {
    setDate(e.target.value);
  };
  const handleChangeStartTime = (e) => {
    setTime(e.target.value);
  };

  const reschedule = () => {
    setLoading(true);
    let payload = {};
    payload.appointmentId = event?.eventId;
    payload.doctorId = event?.doctorId;
    payload.appointmentDate = date;
    payload.appointmentTime = time;
    postData(`/app/doctorappointment/rescheduleAppointment`, payload)
      .then((response) => {
        showToast([response.message], "success");
        event?.callback && event?.callback();
        handleClose(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <Dialog
      open={true}
      onClose={() => handleClose(false)}
      maxWidth="sm"
      fullWidth
    >
      {/* Loader Component (If necessary, replace EMRLoader with MUI CircularProgress) */}
      {loading && <Typography align="center">Loading...</Typography>}

      {/* Dialog Header */}
      <DialogTitle>Reschedule Appointment</DialogTitle>

      {/* Dialog Content */}
      <DialogContent>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {/* Appointment Date */}
          <div style={{ flex: 1 }}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Appointment Date
            </Typography>
            <DatePicker
              onChange={handleChangeStartDate}
              sx={{ width: "100%" }}
            />
          </div>

          {/* Appointment Time */}
          <div style={{ flex: 1 }}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Appointment Time
            </Typography>
            <TimePicker
              onChange={handleChangeStartTime}
              ampm={false}
              sx={{ width: "100%" }}
            />
          </div>
        </div>
      </DialogContent>

      {/* Dialog Footer (Actions) */}
      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={reschedule}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TooltipContent = ({
  event,
  setShowCancelAlert,
  setRescheduleAppt,
  navigate,
}) => {
  // const { doctorAvailableData } = useSelector((state) => state.docAvailable);
  // const patientDetail = doctorAvailableData?.data?.[0]?.bookedSlotDetails;
  // console.log(patientDetail, "pd");

  return (
    <>
      <React.Fragment>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          textAlign={"left"}
          // m={1}
        >
          <div className={"m-1"}>
            <i className="bi bi-person m-1"></i>
            {/* {patientDetail?.name} */}
          </div>
          <div className={"m-1"}>
            <i className="bi bi-telephone m-1"></i>
            {/* {patientDetail?.phoneNo} */}
          </div>
          {/* <div className={"m-1"}>
            <i className="bi bi-person m-1"></i>
            {patientDetail?.doctorName} - {patientDetail?.speciality}
          </div> */}
        </Box>
        <Box mt={1} mb={1} display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="secondary"
            style={{
              padding: "2px 6px",
              borderRadius: "2px",
              marginRight: "3px",
            }}
            title={`Register Patient`}
            onClick={() => navigate("/secure/registration")}
          >
            <AppRegistrationOutlined />
          </Button>
          <Button
            variant="warning"
            style={{
              padding: "2px 6px",
              borderRadius: "2px",
              marginRight: "3px",
            }}
            title={`Reschedule Appointment`}
            onClick={() => setRescheduleAppt(true)}
          >
            <ScheduleOutlined />
          </Button>
          <Button
            variant="danger"
            style={{
              padding: "2px 6px",
              borderRadius: "2px",
              marginRight: "3px",
            }}
            title={`Cancel ${event?.eventType}`}
            onClick={() => setShowCancelAlert(true)}
          >
            <i className="bi bi-trash" color="red"></i>
          </Button>
        </Box>
      </React.Fragment>
    </>
  );
};

export default EventComponent;
