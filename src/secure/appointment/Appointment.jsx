import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  useTheme,
  FormControlLabel,
  Input,
} from "@mui/material";
import { tokens } from "../../theme";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { styled } from "@mui/system";
import EMRtabs from "../../components/global/EMRtabs";
import People from "@mui/icons-material/People";
import AccountTree from "@mui/icons-material/AccountTree";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import FilterAlt from "@mui/icons-material/FilterAlt";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import { Button } from "react-bootstrap";
import EventComponent from "./component/EventComponent";
import _ from "lodash";
import NewEventModal from "./component/NewEvent";
// import PageHeader from "../../components/global/PageHeader";
import ScreenWrapper from "../../components/global/ScreenWrapper";
import { fetchData } from "../../core/services/APIService";
import { useLoading } from "../../components/global/loader/LoadingContext";
import EMRLoader from "../../components/global/loader/EMRLoaderOverlay";
import "./Appointment.css";
import { connect, useSelector } from "react-redux";
import { showToast } from "../../components/global/Toast";
import { startOfDay, setHours, setMinutes } from "date-fns";
import { useDispatch } from "react-redux";
import { allDoctors } from "../../Redux/slice/appointement/allDoctorsSlice";
import { doctorAvailability } from "../../Redux/slice/appointement/doctorAvailableSlotSlice";
import { allAppointment } from "../../Redux/slice/appointement/allAppointmentSlice";
import { facilitiesAvailability } from "../../Redux/slice/appointement/facilitiesAvailableSlotSlice";
import { allFacilitySchedules } from "../../Redux/slice/appointement/allFacilitySheduleSlice";
import { allFacilities } from "../../Redux/slice/appointement/allFacilitiesSlice";
import { searchDoctors } from "../../Redux/slice/appointement/searchDoctorSilce";
import { searchFacilities } from "../../Redux/slice/appointement/searchFacilitiesSlice";

const DnDCalendar = withDragAndDrop(Calendar);

const Appointment = () => {
  const localizer = momentLocalizer(moment);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeTab, setActiveTab] = useState("users");
  const [open, setOpen] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showFilter, setShowFilter] = useState(true);
  const [selectedDateFiler, setSelectedDateFiler] = useState(new Date());
  const [usersResources, setUsersResources] = useState([]);
  const [roomResources, setRoomResources] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [facilitySchedules, setFacilitySchedules] = useState([]);
  const [doctorAvailabilities, setDoctorAvailabilities] = useState([]);
  const [facilityAvailabilities, setFacilityAvailabilities] = useState([]);
  const [specialists, setSpecialist] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [slotDuration, setslotDuration] = useState(15);
  const { loading, setLoading } = useLoading();

  const dispatch = useDispatch();

  const { doctorData } = useSelector((state) => state.allDoctor);
  const allDoctorData = doctorData.data || [];

  const { doctorAvailableData } = useSelector((state) => state.docAvailable);
  const { data } = useSelector((state) => state.allAppoint);
  const { facilitiesSheduleData } = useSelector(
    (state) => state.facilitySchedule
  );
  const { facilitiesData } = useSelector((state) => state.allFacility);
  const allFacilityData = facilitiesData.data;
  const branchId = useSelector(
    (state) => state?.auth?.user?.data?.branchMaster.branchId
  );
  const { facilitiesAvailableData } = useSelector(
    (state) => state.facilityAvailable
  );
  const { searchdoctorData } = useSelector((state) => state.searchDoctor);
  const { searchfacilityData } = useSelector((state) => state.searchFacility);
  // console.log(searchfacilityData, "data f");

  const tabsList = [
    { name: "Doctors", value: "users", icon: People },
    { name: "Rooms", value: "rooms", icon: AccountTree },
  ];

  const prepareEventData = (data, type) =>
    data?.map((item) => {
      const startTime = `${item?.date?.split("T")[0]}T${item?.time}`;
      return {
        title: item?.type,
        start: new Date(startTime),
        end: prepareEndTime(startTime),
        resourceId:
          type === "facility"
            ? `fac_${item.id}`
            : `doc_${item.doctorId}_spec_${item.specialityId}`,
        eventId: item.id,
        allDay: false,
        eventType: type,
        // additional fields
      };
    });

  useEffect(() => {
    dispatch(allDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (allDoctorData?.length > 0) {
      const updatedDoctors = allDoctorData?.map((doctor) => ({
        ...doctor,
        selected: true,
      }));

      setSpecialist(updatedDoctors);
      setCalendarResources(updatedDoctors);
    }
  }, [allDoctorData]);

  useEffect(() => {
    let selectedDate = selectedDateFiler;
    selectedDate = moment(selectedDate)?.format("YYYY-MM-DD");
    dispatch(allFacilities({ date: selectedDate, branchId: branchId }));
  }, [dispatch]);

  useEffect(() => {
    if (allFacilityData?.length > 0) {
      const updatedFacility = allFacilityData?.map((facility) => ({
        ...facility,
        selected: true,
      }));
      setFacilityList(updatedFacility);
      setCalendarResources(updatedFacility);
    }
  }, [allFacilityData]);

  useEffect(() => {
    getAvailableSlotsForAllDoctors();
    getAvailableSlotsForAllFacilities();
  }, [selectedDateFiler, dispatch]);

  useEffect(() => {
    setUsersResources([]);
    setRoomResources([]);
    if (activeTab && (specialists || facilityList)) {
      setCalendarResources(
        activeTab === "users" ? specialists : facilityList,
        activeTab
      );
    }
  }, [activeTab]);

  const getAllFacilitySchedules = () => {
    dispatch(allFacilitySchedules());

    if (facilitiesSheduleData) {
      const facilitiesSchedules = prepareEventData(
        facilitiesSheduleData?.data?.content?.map((schedule) => ({
          date: schedule.scheduleDate,
          time: schedule.scheduleTime,
          type: schedule.scheduleType,
          id: schedule.id,
        })),
        "facility"
      );

      setFacilitySchedules(facilitiesSchedules);
    } else {
      console.warn("No data available for facilities");
    }

    setLoading(false);
  };

  const getAllAppointments = () => {
    setLoading(true);
    const selectedDate = moment(selectedDateFiler).format("YYYY-MM-DD");
    dispatch(allAppointment({ appointmentDate: selectedDate }));

    if (data?.data?.content) {
      const appointmentsData = prepareEventData(
        data?.data?.content?.map((appointment) => ({
          date: appointment.appointmentDate,
          time: appointment.appointmentTime,
          type: appointment.scheduleType,
          id: appointment.appointmentId,
          doctorId: appointment?.doctor?.doctorId,
          specialityId: appointment.speciality.specialityId,
          patientName: appointment.patient.name,
          patientMobile: appointment.patient.phoneNo,
          doctorName: appointment?.doctor?.name,
          speciality: appointment.speciality.name,
        })),
        "appointment"
      );

      setAppointments(appointmentsData);
    } else {
      setAppointments([]);
    }

    setLoading(false);
  };

  const getAvailableSlotsForAllDoctors = () => {
    if (selectedDateFiler && usersResources) {
      let selectedDate = selectedDateFiler;
      selectedDate = moment(selectedDate).format("YYYY-MM-DD");
      let interval =
        slotDuration === "60"
          ? "SIXTY_MINUTES"
          : slotDuration === "30"
          ? "THIRTY_MINUTES"
          : "FIFTEEN_MINUTES";
      dispatch(doctorAvailability({ interval: interval, date: selectedDate }));
    }
  };
  useEffect(() => {
    if (doctorAvailableData) {
      setDoctorAvailabilities(doctorAvailableData?.data);
      getAllAppointments();
    }
    setLoading(false);
  }, [doctorAvailableData]);

  const getAvailableSlotsForAllFacilities = () => {
    if (selectedDateFiler && roomResources) {
      let selectedDate = selectedDateFiler;
      selectedDate = moment(selectedDate).format("YYYY-MM-DD");
      let interval =
        slotDuration === "60"
          ? "SIXTY_MINUTES"
          : slotDuration === "30"
          ? "THIRTY_MINUTES"
          : "FIFTEEN_MINUTES";
      dispatch(
        facilitiesAvailability({ interval: interval, date: selectedDate })
      );
    }
  };
  useEffect(() => {
    if (facilitiesAvailableData && facilitiesAvailableData?.data) {
      setFacilityAvailabilities(facilitiesAvailableData?.data);
      getAllFacilitySchedules();
    }
  }, [facilitiesAvailableData]);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const prepareEndTime = (startTime) => {
    const dateObject = new Date(startTime);
    const minutesToAdd = 15;
    dateObject.setTime(dateObject.getTime() + minutesToAdd * 60 * 1000);
    return dateObject;
  };

  const handleClose = () => setOpen(false);

  const handleSelectedSpecialist = (id, status) => {
    const doctors = _.cloneDeep(specialists);
    doctors.forEach((doctor) => {
      if (`doc_${doctor.doctorId}_spec_${doctor.specialityId}` === id) {
        doctor.selected = !status;
      }
    });
    setSpecialist(doctors);
    setCalendarResources(doctors, "users");
  };

  const handleSelectedFacility = (id, status) => {
    const facilities = _.cloneDeep(facilityList);
    facilities.forEach((facility) => {
      if (facility.facilityId === id) {
        facility.selected = !status;
      }
    });
    setFacilityList(facilities);
    setCalendarResources(facilities, "rooms");
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = "#4ba959";
    const color = "white";
    return {
      style: {
        backgroundColor,
        color,
        borderRadius: "10px",
      },
    };
  };

  const isSlotAvailable = (slotTime, resourceId) => {
    let availability = [];
    if (activeTab === "users") {
      availability = _.find(doctorAvailabilities, {
        doctorId: parseInt(resourceId?.split("_")[1]),
      })?.availableSlots;
    } else if (activeTab === "rooms") {
      availability = _.find(facilityAvailabilities, {
        facilityId: parseInt(resourceId?.split("fac_")[1]),
      })?.availableSlots;
    }
    return availability?.includes(slotTime);
  };

  const customSlotPropGetter = (date, resourceId) => {
    const timeString = formatTime(date);
    const isAvailable = isSlotAvailable(timeString, resourceId);
     
    return {
      className: isAvailable ? "available-slot" : "unavailable-slot",
    };
  };

  const setCalendarResources = (resourcesList, activeTab = "users") => {
    if (!resourcesList || !Array.isArray(resourcesList)) {
      console.error("Invalid resourcesList provided:", resourcesList);
      return;
    }

    let resources = [];
    if (activeTab === "users") {
      resources = _.cloneDeep(resourcesList) || [];
      resources = resources
        .filter((specialist) => specialist?.selected)
        .map((specialist) => ({
          id: `doc_${specialist?.doctorId}_spec_${specialist?.specialityId}`,
          title: `${specialist?.doctorName} - ${specialist?.specialityName}`,
        }));
      setUsersResources([...resources]);
    } else if (activeTab === "rooms") {
      resources = _.cloneDeep(resourcesList) || [];
      resources = resources
        .filter((facility) => facility?.selected)
        .map((facility) => ({
          id: `fac_${facility?.rosterId}`,
          title: facility?.facilityName,
        }));
      setRoomResources([...resources]);
    }
  };

  const onSelectSlot = (slotInfo) => {
    const currentTime = new Date();
    const selectedTime = new Date(slotInfo.start);
 
    const isAvailable = isSlotAvailable(
      formatTime(slotInfo.start),
      slotInfo.resourceId
    );

    if (selectedTime < currentTime) {
      if (!isAvailable) {
        showToast(
          [
            "You cannot select a time slot in the past, and it is also unavailable.",
          ],
          "error"
        );
      } else {
        showToast(["You cannot select a time slot in the past."], "error");
      }
      return;
    }

    if (isAvailable) {
      setSelectedSlot(slotInfo);
      setOpen(true);
    } else {
      showToast(
        ["The selected time slot is not available for booking."],
        "error"
      );
    }
  };

  const [events, setEvents] = useState([]);

  const addEventToState = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleDoctorFilter = _.debounce(async (e) => {
    try {
      const input = e.target.value;
      setLoading(true);

      if (activeTab === "users") {
        await dispatch(searchDoctors({ searchKey: input }));
        const doctors =
          searchdoctorData?.data?.map((doctor) => ({
            ...doctor,
            selected: true,
          })) || [];
        setSpecialist(doctors);
        setCalendarResources(doctors, "users");
      } else {
        await dispatch(searchFacilities({ searchKey: input }));
        const facilities =
          searchfacilityData?.data?.map((facility) => ({
            ...facility,
            selected: true,
          })) || [];
        setFacilityList(facilities);
        setCalendarResources(facilities, "rooms");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast(["Something Went Wrong!"], "error");
    } finally {
      setLoading(false);
    }
  }, 500);

  const getEarliestAvailableSlotTime = (appointments) => {
    const availableAppointments = appointments?.filter((event) =>
      isSlotAvailable(formatTime(event.start), event.resourceId)
    );
    if (availableAppointments?.length > 0) {
      // Sort by start time to get the earliest
      const sortedAppointments = availableAppointments?.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );
      return new Date(sortedAppointments[0].start); // Return the earliest slot's start time
    }
    // Default to 8:00 AM (or any desired fallback time)
    return setHours(setMinutes(startOfDay(new Date()), 0), 9);
  };
  // Get the earliest available slot time
  const earliestAvailableSlotTime = getEarliestAvailableSlotTime(appointments);

  return (
    <ScreenWrapper>
      <EMRLoader show={loading} />
      <Box marginY="20px" marginX={"10px"}>
        <Box>
          <Box display="flex" paddingBottom="1em" alignItems="center">
            <Box>
              <button
                onClick={toggleFilter}
                style={{
                  backgroundColor: "#F0F8F8",
                  color: "#333",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E0E8E8";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 8px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0F8F8";
                  e.currentTarget.style.boxShadow =
                    "0px 2px 5px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {showFilter ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <ChevronLeft />
                    <span style={{ fontWeight: "500" }}>Filter Calendar</span>
                    {/* <FilterAlt /> */}
                  </div>
                ) : (
                  <ChevronRight />
                )}
              </button>
            </Box>
          </Box>
          <Box display="flex">
            {showFilter && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                maxHeight={"76vh"}
                overflow={"auto"}
                width={"350px"}
              >
                <Box>
                  <CustomDateCalendar
                    value={moment(selectedDateFiler)}
                    onChange={(newValue) => {
                      setSelectedDateFiler(newValue.toDate());
                    }}
                  />
                </Box>
                <Box>
                  <EMRtabs
                    tabsList={tabsList}
                    defaultTab={"users"}
                    setActiveTab={setActiveTab}
                  />
                </Box>

                <Input
                  placeholder={`Search ${
                    activeTab === "users" ? "Doctors" : "Rooms"
                  } here...`}
                  onChange={handleDoctorFilter}
                />
                {activeTab === "users" && (
                  <Box display={"flex"} flexDirection={"column"}>
                    {specialists &&
                      Object.entries(
                        _.groupBy(specialists, "specialityId")
                      ).map(([specialityId, specialistsGroup], i) => {
                        return (
                          <Box key={`speciality-${specialityId}`} p={1}>
                            <Box fontWeight={"bold"}>
                              {specialistsGroup[0].specialityName}
                            </Box>
                            {specialistsGroup.map((specialist) => {
                              return (
                                <Box
                                  key={`specialist-${specialist.doctorId}`}
                                  paddingLeft={"0.5em"}
                                  maxHeight={"40%"}
                                >
                                  <FormControlLabel
                                    label={`${specialist.doctorName}`}
                                    id={specialist.doctorId}
                                    control={
                                      <Checkbox
                                        checked={specialist.selected}
                                        onChange={() =>
                                          handleSelectedSpecialist(
                                            `doc_${specialist.doctorId}_spec_${specialist.specialityId}`,
                                            specialist.selected
                                          )
                                        }
                                      />
                                    }
                                  />
                                </Box>
                              );
                            })}
                            <hr style={{ margin: "0.5em 0" }} />
                          </Box>
                        );
                      })}
                  </Box>
                )}
                {activeTab === "rooms" && (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    // border={"1px solid #80808038"}
                    // maxHeight={"50%"}
                    // overflow={"auto"}
                  >
                    {facilityList &&
                      facilityList.map((facility, i) => {
                        return (
                          <Box
                            paddingLeft={"0.5em"}
                            borderBottom={"1px solid #80808038"}
                            maxHeight={"40%"}
                          >
                            <FormControlLabel
                              label={facility.facilityName}
                              id={facility.rosterId}
                              control={
                                <Checkbox
                                  checked={facility.selected}
                                  onChange={() =>
                                    handleSelectedFacility(
                                      facility.facilityId,
                                      facility.selected
                                    )
                                  }
                                />
                              }
                            />
                          </Box>
                        );
                      })}
                  </Box>
                )}
              </Box>
            )}

            <Box
              width={"100%"}
              ml={showFilter ? "1em" : "3em"}
              // mb={"10em"}
              overflow={"hidden"}
              mt={"-43px"}
            >
              {activeTab === "users" ? (
                <DnDCalendar
                  date={selectedDateFiler}
                  selectable={true}
                  localizer={localizer}
                  events={events}
                  onNavigate={(e) => setSelectedDateFiler(e)}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "83vh", width: "100%" }}
                  step={slotDuration}
                  tooltipAccessor={null}
                  timeslots={1}
                  views={["day", "agenda"]}
                  defaultView={"day"}
                  scrollToTime={earliestAvailableSlotTime}
                  resources={usersResources}
                  onSelectSlot={(slotInfo) => onSelectSlot(slotInfo)}
                  onEventDrop={(e) => {
                    console.log(e);
                  }}
                  toolbar={true}
                  eventPropGetter={eventStyleGetter}
                  slotPropGetter={customSlotPropGetter}
                  components={{
                    event: EventComponent,
                  }}
                />
              ) : activeTab === "rooms" ? (
                <DnDCalendar
                  date={selectedDateFiler}
                  selectable={true}
                  localizer={localizer}
                  events={facilitySchedules}
                  onNavigate={(e) => setSelectedDateFiler(e)}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "80vh" }}
                  step={slotDuration}
                  tooltipAccessor={null}
                  timeslots={1}
                  views={["day", "agenda"]}
                  defaultView={"day"}
                  resources={roomResources}
                  onSelectSlot={(slotInfo) => onSelectSlot(slotInfo)}
                  onEventDrop={(e) => {
                    console.log(e);
                  }}
                  toolbar={true}
                  eventPropGetter={eventStyleGetter}
                  slotPropGetter={customSlotPropGetter}
                  components={{
                    event: EventComponent,
                  }}
                />
              ) : (
                <Box className="no-data" mt={"10%"}>
                  {" "}
                  No data Found
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      {open && (
        <NewEventModal
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          selectedSlot={selectedSlot}
          activeTab={activeTab}
          specialistList={specialists}
          facilityList={facilityList}
          branchId={branchId}
          slotDuration={slotDuration}
          getAvailableSlotsForAllDoctors={getAvailableSlotsForAllDoctors}
          getAvailableSlotsForAllFacilities={getAvailableSlotsForAllFacilities}
          addEventToState={addEventToState}
          setSelectedSlot={setSelectedSlot}
          slotInfo={selectedSlot}
        />
      )}
    </ScreenWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    branchId: state?.auth?.user?.data?.branchId,
  };
};

export default connect(mapStateToProps, null)(Appointment);

const CustomDateCalendar = styled(DateCalendar)(() => ({
  backgroundColor: "#fff",
  maxHeight: "320px",
  // transform: "scale(0.8)",
  width: "250px",
  transformOrigin: "top left",

  "& .MuiDateCalendar-days": {
    fontSize: "12px",
    // padding: "4px",
  },

  "& .MuiPickersCalendarHeader-root": {
    backgroundColor: "rgb(172, 233, 233)",
    fontSize: "14px",
    marginTop: "0px",
  },
  "& .css-th0wnz-MuiYearCalendar-root": {
    maxHeight: "320px",
    width: "250px",
  },
}));
