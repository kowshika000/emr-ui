import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { doctorAvailability } from "../../../Redux/slice/appointement/doctorAvailableSlotSlice";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../../components/global/Toast";
import NewEventModal from "../component/NewEvent";
import EMRLoader from "../../../components/global/loader/EMRLoaderOverlay";
import Reschedule from "./modal/Reschedule";
import CancelAlertModal from "./modal/Cancel";
import EventDisplayComponent from "./Events";

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
  useEffect(() => {
    setDoctorAvailabilities(doctorAvailableData?.data);
  }, [doctorAvailableData]);
  const formatTime = (date) => moment(date).format("HH:mm");

  const isSlotAvailable = (slotTime, resourceId) => {
    if (!doctorAvailabilities || !Array.isArray(doctorAvailabilities))
      return false;

    const availability = doctorAvailabilities.find(
      (doctor) => doctor.doctorId === Number(resourceId)
    )?.availableSlots;

    return availability?.includes(slotTime);
  };

  const isSlotBooked = (slotTime, resourceId) => {
    if (!doctorAvailabilities || !Array.isArray(doctorAvailabilities))
      return false;

    const booked = doctorAvailabilities.find(
      (doctor) => doctor.doctorId === Number(resourceId)
    )?.bookedSlots;

    return booked?.includes(slotTime);
  };

  const customSlotPropGetter = useMemo(() => {
    return (date, resourceId) => {
      const timeString = formatTime(date);
      const isAvailable = isSlotAvailable(timeString, resourceId);
      const isBooked = isSlotBooked(timeString, resourceId);

      let className = "";
      let bgColor = "rgb(197, 197, 197)"; // Default Unavailable Color

      if (isBooked) {
        className = "booked-slot";
        bgColor = "rgb(138, 216, 190)"; // Booked slot color
      } else if (isAvailable) {
        className = "available-slot";
        bgColor = "rgb(158, 213, 223)"; // Available slot color
      }

      return {
        className,
        style: {
          backgroundColor: bgColor,
          borderRadius: "3px",
        },
      };
    };
  }, [doctorAvailabilities]);

  const getAvailableSlotsForAllDoctors = useCallback(() => {
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
  }, [dispatch, selectedDate, slotDuration]);

  useEffect(() => {
    console.log("Fetching available slots...");
    getAvailableSlotsForAllDoctors();
  }, [getAvailableSlotsForAllDoctors]);

  const setCalendarResources = useCallback(
    (resourcesList, activeTab = "users") => {
      if (activeTab === "users") {
        setUsersResources(
          resourcesList.map((doctor) => ({
            id: doctor.doctorId,
            title: doctor.doctorName,
          }))
        );
      }
    },
    []
  );

  useEffect(() => {
    if (filteredDoctors) {
      setCalendarResources(filteredDoctors, activeTab);
    }
  }, [filteredDoctors, activeTab, setCalendarResources]);

  const onSelectSlot = (slotInfo) => {
    const selectedTime = moment(slotInfo.start);
    if (selectedTime.isBefore(moment(), "minute")) {
      showToast(["You cannot select a past time slot."], "error");
      return;
    }

    if (
      isSlotAvailable(formatTime(slotInfo.start), slotInfo.resourceId) ||
      isSlotBooked(formatTime(slotInfo.start), slotInfo.resourceId)
    ) {
      setSelectedSlot(slotInfo);
      setSelectedDoctorAvailability(
        doctorAvailabilities.find(
          (doctor) => doctor.doctorId === parseInt(slotInfo.resourceId)
        )
      );
      setOpen(true);
    } else {
      showToast(["The selected time slot is not available."], "error");
    }
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "inherit",
      color: "black",
      border: "none",
      width: "192px",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  console.log("selectedDoctorAvailability", selectedDoctorAvailability);

  return (
    <Box width="100%" overflow="auto">
      <EMRLoader show={loading} />
      <EventDisplayComponent
        slotDuration={slotDuration}
        setEvents={setEvents}
        getAvailableSlotsForAllDoctors={getAvailableSlotsForAllDoctors}
      />
      <DnDCalendar
        key={events.length}
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
        tooltipAccessor={() => ""}
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
          selecteddoctorData={selectedDoctorAvailability}
          addEventToState={addEventToState}
        />
      )}
      {/* {rescheduleBooking && (
        <Reschedule
          handleClose={() => setRescheduleBooking(false)}
          appointmentId={selectedSlot.appointmentId}
          // doctorId = ""
        />
      )}
      {cancelBooking && (
        <CancelAlertModal
          handleClose={() => setCancelBooking(false)}
          appointmentId={selectedSlot.appointmentId}
          getAvailableSlotsForAllDoctors={getAvailableSlotsForAllDoctors}
        />
      )} */}
    </Box>
  );
};

export default CalendarView;
