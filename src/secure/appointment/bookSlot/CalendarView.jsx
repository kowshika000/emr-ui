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
import EventDisplayComponent from "./Events";
import { reSchedule } from "../../../Redux/slice/appointement/reScheduleSlice";

const DnDCalendar = withDragAndDrop(Calendar);

const CalendarView = ({
  selectedDate,
  setSelectedDate,
  filteredDoctors,
  slotDuration,
  activeTab,
  selectedSpeciality,
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

  const addEventToState = (newEvent) => {
    if (!newEvent.title) {
      console.error("Event title is missing!", newEvent);
      return;
    }
    setEvents([...events, newEvent]);
  };

  const { doctorAvailableData, loading } = useSelector(
    (state) => state?.docAvailable || []
  );

  useEffect(() => {
    setDoctorAvailabilities(doctorAvailableData?.data);
  }, [doctorAvailableData]);

  const formatTime = (date) => moment(date).format("HH:mm");

  const isSlotAvailable = (slotTime, resourceId, specialityId) => {
    if (!doctorAvailabilities || !Array.isArray(doctorAvailabilities))
      return false;

    const doctor = doctorAvailabilities.find(
      (doc) => doc.doctorId === Number(resourceId)
    );
    if (!doctor || !doctor.specialitySlots) return false;

    const speciality = doctor.specialitySlots.find(
      (spec) => spec.specialityId === Number(specialityId)
    );
    if (!speciality) return false;

    return (
      speciality.availableSlots.includes(slotTime) &&
      !speciality.bookedSlots.includes(slotTime)
    );
  };

  const isSlotBooked = (slotTime, resourceId, specialityId) => {
    if (!doctorAvailabilities || !Array.isArray(doctorAvailabilities))
      return false;

    const doctor = doctorAvailabilities.find(
      (doc) => doc.doctorId === Number(resourceId)
    );
    if (!doctor || !doctor.specialitySlots) return false;

    const speciality = doctor.specialitySlots.find(
      (spec) => spec.specialityId === Number(specialityId)
    );
    if (!speciality) return false;

    return speciality.bookedSlots.includes(slotTime);
  };

  const customSlotPropGetter = useMemo(() => {
    return (date, resourceId) => {
      const timeString = formatTime(date);
      const isAvailable = isSlotAvailable(
        timeString,
        resourceId,
        selectedSpeciality
      );
      const isBooked = isSlotBooked(timeString, resourceId, selectedSpeciality);

      let className = "";
      let bgColor = "#D0DDD0";

      if (isBooked) {
        className = "booked-slot";
        bgColor = "#9db4c0";
      } else if (isAvailable) {
        className = "available-slot";
        bgColor = "#90e0ef";
      }

      return {
        className,
        style: {
          backgroundColor: bgColor,
          borderRadius: "3px",
        },
      };
    };
  }, [doctorAvailabilities, selectedSpeciality]);

  const getAvailableSlotsForAllDoctors = useCallback(() => {
    if (selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const interval = "TWENTY_MINUTES";
      // slotDuration === "60"
      //   ? "SIXTY_MINUTES"
      //   : slotDuration === "30"
      //   ? "THIRTY_MINUTES"
      //   : "FIFTEEN_MINUTES";

      dispatch(doctorAvailability({ interval, date: formattedDate }));
    }
  }, [dispatch, selectedDate, slotDuration]);

  useEffect(() => {
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
    const selectedTime = moment(slotInfo.start).format("HH:mm");
    const resourceId = slotInfo.resourceId;
    const specialityId = selectedSpeciality; // Ensure this is correctly assigned

    if (moment(slotInfo.start).isBefore(moment(), "minute")) {
      showToast(["You cannot select a past time slot."], "error");
      return;
    }

    // Check availability and booking status
    const available = isSlotAvailable(selectedTime, resourceId, specialityId);
    const booked = isSlotBooked(selectedTime, resourceId, specialityId);

    if (available || booked) {
      const doctorData = doctorAvailabilities.find(
        (doctor) => doctor.doctorId === Number(resourceId)
      );

      if (doctorData) {
        const selectedSpecialityData = doctorData.specialitySlots.find(
          (spec) => spec.specialityId === Number(specialityId)
        );

        setSelectedDoctorAvailability({
          ...doctorData,
          selectedSpecialityData, // Include the speciality data
        });
      }

      setSelectedSlot(slotInfo);
      setOpen(true);
    } else {
      showToast(["The selected time slot is not available."], "error");
    }
  };

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: "inherit",
      color: "black",
      marginTop: "5px",
      border: "none",
      outline: "none",
    },
  });

  const onEventDrop = async ({ event, start, end, resourceId }) => {
    const newDateTime = moment(start);

    // Prevent dropping events in the past
    if (newDateTime.isBefore(moment(), "minute")) {
      showToast(["You cannot move an appointment to a past time."], "error");
      return;
    }

    const newDate = moment(start).format("YYYY-MM-DD");
    const newTime = moment(start).format("HH:mm");

    try {
      await dispatch(
        reSchedule({
          appointmentId: event.appointmentId,
          appointmentDate: newDate,
          appointmentTime: newTime,
          doctorId: resourceId,
        })
      ).unwrap();

      setEvents((prevEvents) =>
        prevEvents.map((ev) =>
          ev.appointmentId === event.appointmentId
            ? { ...ev, start, end, resourceId }
            : ev
        )
      );

      await getAvailableSlotsForAllDoctors();

      showToast(["Appointment rescheduled successfully."], "success");
    } catch (error) {
      showToast(
        [error?.message || "Failed to reschedule appointment."],
        "error"
      );
    }
  };

  return (
    <Box width="100%" overflow="auto">
      {/* <EMRLoader show={loading} /> */}
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
        events={events.map((event) => ({
          ...event,
          title: event.title || "No Title",
        }))}
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
        scrollToTime={new Date(1970, 1, 1, 9, 0, 0)}
        onEventDrop={onEventDrop}
        draggableAccessor={() => true} // Enable drag-and-drop
        resizableAccessor={() => false} // Disable resizing
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
    </Box>
  );
};

export default CalendarView;
