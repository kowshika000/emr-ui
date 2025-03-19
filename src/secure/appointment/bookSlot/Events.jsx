import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  AppRegistration,
  Cancel,
  Schedule,
  Replay,
  Note,
  Phone,
} from "@mui/icons-material";
import CancelAlertModal from "./modal/Cancel";
import Reschedule from "./modal/Reschedule";
import { useNavigate } from "react-router-dom";

const EventDisplayComponent = ({
  slotDuration = 15,
  setEvents,
  getAvailableSlotsForAllDoctors,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rescheduleBooking, setRescheduleBooking] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);

  const navigate = useNavigate();
  const { doctorAvailableData } = useSelector(
    (state) => state?.docAvailable || []
  );

  useEffect(() => {
    if (!doctorAvailableData?.data) {
      console.warn("No doctorAvailableData found.");
      return;
    }

    const groupedBookings = {};

    doctorAvailableData.data.forEach((doctor) => {
      doctor?.specialitySlots?.forEach((speciality) => {
        speciality?.bookedSlotDetails?.forEach((slot) => {
          const timeKey = moment(slot.appointmentTime, "HH:mm").format("HH:mm");

          const bookingKey = `${doctor.doctorId}-${speciality.specialityId}`;

          if (!groupedBookings[timeKey]) {
            groupedBookings[timeKey] = {};
          }

          if (!groupedBookings[timeKey][bookingKey]) {
            groupedBookings[timeKey][bookingKey] = [];
          }

          groupedBookings[timeKey][bookingKey].push({
            doctorId: doctor.doctorId,
            specialityId: speciality.specialityId,
            appointmentId: slot.appointmentId,
            appointmentTime: slot.appointmentTime,
            appointmentDate: slot.appointmentDate,
            patientName: slot.patientName || "--",
            phoneNo: slot.phoneNo || "--",
            mrdNo: slot.mrdNo || null,
            notes: slot.notes || "--",
          });
        });
      });
    });

    const bookedEvents = [];

    Object.entries(groupedBookings).forEach(([timeKey, bookingGroups]) => {
      Object.entries(bookingGroups).forEach(([bookingKey, slots]) => {
        const firstSlot = slots[0];

        bookedEvents.push({
          title: (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {slots.length === 1 ? (
                <div className="d-flex flex-row gap-3">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center gap-2">
                      <div style={avatarStyle}>
                        {firstSlot.mrdNo ? "F" : "N"}
                      </div>
                      <span style={{ fontWeight: "bold" }}>
                        {firstSlot.patientName || "--"}
                      </span>
                    </div>
                    <div className="mt-1">
                      &nbsp; <Phone /> &nbsp;&nbsp;
                      {firstSlot.phoneNo || "--"}
                    </div>
                    <div className="mt-1">
                      &nbsp; <Note /> &nbsp;&nbsp;
                      {firstSlot.notes || "--"}
                    </div>
                  </div>
                  <Box className="d-flex flex-column flex-wrap">
                    <Tooltip title="Reschedule">
                      <IconButton
                        onClick={() => {
                          setRescheduleBooking(true);
                          setSelectedSlot(firstSlot);
                        }}
                        sx={{ padding: "2px", color: "blue", marginY: "3px" }}
                      >
                        <Schedule />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={firstSlot.mrdNo ? "Revisit" : "Registration"}
                    >
                      <IconButton
                        onClick={() =>
                          navigate("/secure/registration", {
                            state: { bookedDetails: firstSlot },
                          })
                        }
                        sx={{ padding: "2px", color: "green" }}
                      >
                        {firstSlot.mrdNo ? <Replay /> : <AppRegistration />}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Cancel">
                      <IconButton
                        onClick={() => {
                          setCancelBooking(true);
                          setSelectedSlot(firstSlot);
                        }}
                        sx={{ padding: "2px", color: "red" }}
                      >
                        <Cancel />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </div>
              ) : (
                slots.map((slot, index) => (
                  <div
                    key={index}
                    className="slot-avatar"
                    onClick={() => {
                      setSelectedSlot(slot);
                      setPopupOpen(true);
                    }}
                  >
                    {slot.patientName?.charAt(0) || "--"}
                  </div>
                ))
              )}
            </div>
          ),
          start: moment(timeKey, "HH:mm").toDate(),
          end: moment(timeKey, "HH:mm").add(slotDuration, "minutes").toDate(),
          resourceId: firstSlot.doctorId,
          specialityId: firstSlot.specialityId, // Ensure specialityId is included
          appointmentId: firstSlot.appointmentId,
          className: "booked-slot",
        });
      });
    });

    if (typeof setEvents === "function") {
      setEvents(bookedEvents);
    }
  }, [doctorAvailableData, slotDuration]);

  // console.log("selected events doctor:", selectedSlot?.doctorId);

  return (
    <>
      {/* Popup Modal */}
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Appointment Details</DialogTitle>
        <DialogContent>
          {selectedSlot && (
            <>
              <Box className="d-flex gap-2" style={{ alignItems: "center" }}>
                <div style={avatarStyle}>
                  {selectedSlot.patientName?.charAt(0) || "--"}
                </div>
                <span style={{ fontWeight: "bold" }}>
                  {selectedSlot.patientName || "--"}
                </span>
              </Box>
              <div className="mt-2">
                <i className="bi bi-telephone m-1"></i>{" "}
                {selectedSlot.phoneNo || "--"}
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Tooltip title="Reschedule">
            <IconButton
              onClick={() => {
                setRescheduleBooking(true);
                setPopupOpen(false);
              }}
              color="primary"
            >
              <Schedule />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton
              onClick={() => {
                setCancelBooking(true);
                setPopupOpen(false);
              }}
            >
              <Cancel />
            </IconButton>
          </Tooltip>
          <Tooltip title="Registration">
            <IconButton
              onClick={() => {
                navigate("/secure/registration", {
                  state: { bookedDetails: selectedSlot },
                });
                setPopupOpen(false);
              }}
            >
              {selectedSlot?.mrdNo ? <Replay /> : <AppRegistration />}
            </IconButton>
          </Tooltip>
          <Button onClick={() => setPopupOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Cancel & Reschedule Modals */}
      {cancelBooking && (
        <CancelAlertModal
          handleClose={() => setCancelBooking(false)}
          appointmentId={selectedSlot?.appointmentId}
          getAvailableSlotsForAllDoctors={getAvailableSlotsForAllDoctors}
        />
      )}
      {rescheduleBooking && (
        <Reschedule
          handleClose={() => setRescheduleBooking(false)}
          appointmentId={selectedSlot?.appointmentId}
          doctorId={selectedSlot?.doctorId}
          getAvailableSlotsForAllDoctors={getAvailableSlotsForAllDoctors}
        />
      )}
    </>
  );
};

const avatarStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "rgb(93, 104, 104)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "bold",
  textTransform: "uppercase",
  cursor: "pointer",
};

export default EventDisplayComponent;
