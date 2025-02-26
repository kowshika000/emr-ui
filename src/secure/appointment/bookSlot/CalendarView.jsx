import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { doctorAvailability } from "../../../Redux/slice/appointement/doctorAvailableSlotSlice";
import { useSelector, useDispatch } from "react-redux";
import EventComponent from "../component/EventComponent";
import { showToast } from "../../../components/global/Toast";
import NewEventModal from "../component/NewEvent";
import EMRLoader from "../../../components/global/loader/EMRLoaderOverlay";
import {
  AppRegistration,
  Cancel,
  Rotate90DegreesCcw,
  Schedule,
  ScheduleOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Reschedule from "./modal/Reschedule";
import CancelAlertModal from "./modal/Cancel";

const DnDCalendar = withDragAndDrop(Calendar);

const CalendarView = ({
  selectedDate,
  setSelectedDate,
  filteredDoctors,
  slotDuration,
  activeTab,
}) => {
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctorAvailabilities, setDoctorAvailabilities] = useState([]);
  const [usersResources, setUsersResources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDoctorAvailability, setSelectedDoctorAvailability] =
    useState(null);

  const [rescheduleBooking, setRescheduleBooking] = useState(false);
  const [cancelBooking, setCancelBooking] = useState(false);

  const addEventToState = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const { doctorAvailableData, loading } = useSelector(
    (state) => state?.docAvailable || []
  );
  // const { bookAppointmentdata } = useSelector((state) => state.bookAppoint);

  console.log(doctorAvailableData, "doctorAvailableData");

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const isSlotAvailable = (slotTime, resourceId) => {
    const availability = doctorAvailabilities?.find(
      (doctor) => doctor.doctorId === parseInt(resourceId)
    )?.availableSlots;
    return availability?.includes(slotTime);
  };
  const isSlotBooked = (slotTime, resourceId) => {
    const booked = doctorAvailabilities?.find(
      (doctor) => doctor.doctorId === parseInt(resourceId)
    )?.bookedSlots;
    return booked?.includes(slotTime);
  };

  const customSlotPropGetter = (date, resourceId) => {
    const timeString = formatTime(date);
    const isAvailable = isSlotAvailable(timeString, resourceId);
    const isBooked = isSlotBooked(timeString, resourceId);

    let className = "";
    if (isBooked) {
      className = "booked-slot";
    } else if (isAvailable) {
      className = "available-slot";
    } else {
      className = "unavailable-slot";
    }

    return {
      className,
      style: {
        backgroundColor: isBooked
          ? "rgb(138, 216, 190)"
          : isAvailable
          ? "rgb(158, 213, 223)"
          : "rgb(197, 197, 197)",
        // color: "white",
        borderRadius: "3px",
      },
    };
  };

  const getAvailableSlotsForAllDoctors = () => {
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const interval =
        slotDuration === "60"
          ? "SIXTY_MINUTES"
          : slotDuration === "30"
          ? "THIRTY_MINUTES"
          : "FIFTEEN_MINUTES";
      dispatch(doctorAvailability({ interval, date: formattedDate }));
    }
  };

  useEffect(() => {
    getAvailableSlotsForAllDoctors();
  }, [selectedDate]);

  useEffect(() => {
    if (doctorAvailableData) {
      setDoctorAvailabilities(doctorAvailableData?.data || []);

      const bookedEvents = doctorAvailableData?.data?.flatMap((doctor) =>
        doctor?.bookedSlotDetails?.map((slot) => ({
          title: (
            <div style={{ lineHeight: "2", alignItems: "center" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    backgroundColor: "rgb(93, 104, 104)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {slot.patientName ? (
                    slot.patientName?.charAt(0)
                  ) : (
                    <i className="bi bi-person m-1"></i>
                  )}
                </div>
                {slot.patientName || "--"}
              </div>

              <div>
                <i className="bi bi-telephone m-1"></i> {slot.phoneNo || "--"}
              </div>
              <div>
                {slot.mrdNo ? (
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate("/secure/registration?tab=revist_registration", {
                        state: { bookedDetails: slot },
                      })
                    }
                  >
                    <Rotate90DegreesCcw />
                  </IconButton>
                ) : (
                  <IconButton
                    color="primary"
                    onClick={() =>
                      navigate("/secure/registration", {
                        state: { bookedDetails: slot },
                      })
                    }
                  >
                    <AppRegistration />
                  </IconButton>
                )}
                <IconButton
                  color="primary"
                  onClick={() =>
                    // navigate("/secure/registration?tab=revist_registration")
                    setRescheduleBooking(true)
                  }
                >
                  <Schedule />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => setCancelBooking(true)}
                >
                  <Cancel />
                </IconButton>
              </div>
            </div>
          ),
          start: moment(slot.appointmentTime, "HH:mm").toDate(),
          end: moment(slot.appointmentTime, "HH:mm")
            .add(slotDuration, "minutes")
            .toDate(),
          resourceId: doctor.doctorId,
        }))
      );
      setEvents(bookedEvents || []);
    }
  }, [doctorAvailableData, slotDuration]);

  useEffect(() => {
    if (filteredDoctors) {
      setCalendarResources(filteredDoctors, activeTab);
    }
  }, [filteredDoctors, activeTab]);

  const setCalendarResources = (resourcesList, activeTab = "users") => {
    if (!resourcesList || !Array.isArray(resourcesList)) {
      console.error("Invalid resourcesList provided:", resourcesList);
      return;
    }

    if (activeTab === "users") {
      const resources = resourcesList.map((doctor) => ({
        id: doctor.doctorId,
        title: `${doctor.doctorName}`,
      }));
      setUsersResources(resources);
    }
  };

  const onSelectSlot = (slotInfo) => {
    const currentTime = new Date();
    const selectedTime = new Date(slotInfo.start);

    const isAvailable = isSlotAvailable(
      formatTime(slotInfo.start),
      slotInfo.resourceId
    );

    const isBooked = isSlotBooked(
      formatTime(slotInfo.start),
      slotInfo.resourceId
    );

    if (selectedTime < currentTime) {
      showToast(
        [
          isAvailable
            ? "You cannot select a time slot in the past."
            : "You cannot select a time slot in the past, and it is also unavailable.",
        ],
        "error"
      );
      return;
    }

    if (isAvailable || isBooked) {
      setSelectedSlot(slotInfo);
      const selectedDoctor = doctorAvailabilities.find(
        (doctor) => doctor.doctorId === parseInt(slotInfo.resourceId)
      );

      setSelectedDoctorAvailability(selectedDoctor);
      setOpen(true);
    } else {
      showToast(
        ["The selected time slot is not available for booking."],
        "error"
      );
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "inherit",
        color: "black",
        border: "none",
        width: "192px",
        justifyContent: "center",
        alignItems: "center",
      },
    };
  };

  return (
    <Box width="100%" overflow="auto">
      <EMRLoader show={loading} />
      <DnDCalendar
        key={filteredDoctors ? filteredDoctors.length : 0}
        date={selectedDate}
        selectable
        localizer={localizer}
        events={events}
        resources={usersResources}
        resourceIdAccessor="id"
        resourceTitleAccessor="title"
        onNavigate={setSelectedDate}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh", width: "100%" }}
        step={slotDuration}
        timeslots={1}
        views={["day", "agenda"]}
        defaultView="day"
        onSelectSlot={onSelectSlot}
        toolbar
        eventPropGetter={eventStyleGetter}
        slotPropGetter={customSlotPropGetter}
        // components={{
        //   event: EventComponent,
        // }}
        scrollToTime={new Date(1970, 1, 1, 9, 0, 0)}
      />
      {open && (
        <NewEventModal
          open={open}
          setOpen={setOpen}
          selectedSlot={selectedSlot}
          handleClose={() => setOpen(false)}
          activeTab={activeTab}
          slotDuration={slotDuration}
          getAvailableSlotsForAllDoctors={getAvailableSlotsForAllDoctors}
          setSelectedSlot={setSelectedSlot}
          slotInfo={selectedSlot}
          addEventToState={addEventToState}
          selecteddoctorData={selectedDoctorAvailability}
        />
      )}
      {rescheduleBooking && (
        <Reschedule handleClose={() => setRescheduleBooking(false)} />
      )}
      {cancelBooking && (
        <CancelAlertModal
          handleClose={() => setCancelBooking(false)}
          events={events}
        />
      )}
    </Box>
  );
};

export default CalendarView;
