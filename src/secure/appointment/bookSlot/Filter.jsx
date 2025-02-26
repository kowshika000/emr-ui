import React, { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Input, styled } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import moment from "moment";
import CalendarView from "./CalendarView";
import EMRtabs from "../../../components/global/EMRtabs";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { allDoctors } from "../../../Redux/slice/appointement/allDoctorsSlice";
import { searchDoctors } from "../../../Redux/slice/appointement/searchDoctorSilce";
import EMRLoader from "../../../components/global/loader/EMRLoaderOverlay";
import { debounce } from "lodash"; // Import debounce
import FormInput from "../../../components/FormFields/FormInput";

const Filter = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("users");
  const [selectedDoctors, setSelectedDoctors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  const { doctorData, docloading } = useSelector((state) => state?.allDoctor);
  const allDoctorData = doctorData?.data || [];

  const { searchdoctorData, searchDocloading } = useSelector(
    (state) => state?.searchDoctor
  );
  const searchDoctorResults = searchdoctorData?.data || [];

  const loading = docloading || searchDocloading;

  useEffect(() => {
    dispatch(allDoctors());
  }, [dispatch]);

  useEffect(() => {
    if (allDoctorData?.length > 0) {
      const initialSelection = allDoctorData.reduce((acc, doctor) => {
        const doctorKey = `${doctor.doctorId}-${doctor.specialityId}`;
        acc[doctorKey] = true;
        return acc;
      }, {});
      setSelectedDoctors(initialSelection);
    }
  }, [allDoctorData]);

  const toggleFilter = () => setShowFilter(!showFilter);

  const groupDoctorsBySpeciality = (doctors) => {
    const grouped = {};
    doctors.forEach((doctor) => {
      if (!grouped[doctor.specialityId]) {
        grouped[doctor.specialityId] = [];
      }
      if (
        !grouped[doctor.specialityId].find(
          (d) => d.doctorId === doctor.doctorId
        )
      ) {
        grouped[doctor.specialityId].push(doctor);
      }
    });
    return grouped;
  };

  const displayedDoctors = searchQuery ? searchDoctorResults : allDoctorData;
  // const groupedDoctors = groupDoctorsBySpeciality(displayedDoctors);

  // const handleDoctorSelect = (doctorId, specialityId) => {
  //   setSelectedDoctors((prev) => {
  //     const newSelection = { ...prev };
  //     const doctorKey = `${doctorId}-${specialityId}`;

  //     if (newSelection[doctorKey]) {
  //       delete newSelection[doctorKey];
  //     } else {
  //       newSelection[doctorKey] = true;
  //     }
  //     return newSelection;
  //   });
  // };

  const handleSpecialityChange = (e) => {
    const selectedValue = e?.target?.value || "";
    console.log("Selected Speciality ID:", selectedValue); // Debugging
    setSelectedSpeciality(selectedValue);
  };

  const filteredDoctors = selectedSpeciality
    ? allDoctorData.filter((doc) => doc.specialityId === selectedSpeciality)
    : [];

  console.log("filteredDoctors", filteredDoctors);
  // Debounced search function
  // const debouncedSearch = debounce(async (input) => {
  //   setSearchQuery(input);
  //   if (activeTab === "users") {
  //     await dispatch(searchDoctors({ searchKey: input }));
  //   }
  // }, 500); // Adjust the debounce delay as needed (500ms here)

  // const handleSearch = (e) => {
  //   const input = e.target.value;
  //   debouncedSearch(input); // Call the debounced search function
  // };

  return (
    <Box display="flex"  width={"100%"}>
      <EMRLoader show={loading} />
      <div>
        <div>
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
          >
            {showFilter ? (
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <ChevronLeft />
                <span style={{ fontWeight: "500" }}>Filter Calendar</span>
              </div>
            ) : (
              <ChevronRight />
            )}
          </button>
        </div>
        {showFilter && (
          <Box
            width="280px"
            overflow="auto"
            maxHeight="calc(100vh - 80px)"
            borderRight="1px solid #ccc"
            padding="5px"
          >
            <CustomDateCalendar
              value={moment(selectedDate)}
              onChange={(newValue) => setSelectedDate(newValue.toDate())}
            />
            <Box mt={2}>
              <EMRtabs
                tabsList={[
                  { name: "Doctors", value: "users" },
                  { name: "Rooms", value: "rooms" },
                ]}
                defaultTab="users"
                setActiveTab={setActiveTab}
              />
            </Box>

            {activeTab === "users" && (
              <Box display="flex" flexDirection="column" mt={1} >
                <FormControl fullWidth size="small" >
                  <InputLabel>Select Speciality</InputLabel>
                  <Select
                    value={selectedSpeciality}
                    onChange={handleSpecialityChange}
                    label="Select Speciality"
                  >
                    <MenuItem value="">Select</MenuItem>
                    {Array.from(
                      new Map(
                        allDoctorData.map((doc) => [
                          doc.specialityId,
                          {
                            label: doc.specialityName || "Unknown",
                            value: doc.specialityId,
                          },
                        ])
                      ).values()
                    ).map((speciality) => (
                      <MenuItem key={speciality.value} value={speciality.value}>
                        {speciality.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* {Object.entries(groupDoctorsBySpeciality(displayedDoctors)).map(
                  ([specialityId, doctors]) => (
                    <Box key={specialityId} p={1}>
                      <Box fontWeight="bold" mb={1}>
                        {doctors[0]?.specialityName || "Speciality"}
                      </Box>
                      {doctors.map((doctor) => (
                        <Box key={doctor.doctorId} pl={2}>
                          {doctor.doctorName}
                        </Box>
                      ))}
                      <hr style={{ margin: "0.5em 0" }} />
                    </Box>
                  )
                )}
                {Object.keys(groupDoctorsBySpeciality(displayedDoctors))
                  .length === 0 && (
                  <Box textAlign="center" mt={2}>
                    No doctors found
                  </Box>
                )} */}
              </Box>
            )}
          </Box>
        )}
      </div>
      <Box flex={1} sx={{ ml: "10px" }}>
        <Box flex={1}>
          <CalendarView
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            filteredDoctors={filteredDoctors}
            slotDuration={15}
            allDoctorData={searchQuery ? searchDoctorResults : allDoctorData}
            activeTab={activeTab}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;

const CustomDateCalendar = styled(DateCalendar)(() => ({
  backgroundColor: "#fff",
  maxHeight: "320px",
  width: "250px",
  transformOrigin: "top left",
  "& .MuiDateCalendar-days": {
    fontSize: "12px",
  },
  "& .MuiPickersCalendarHeader-root": {
    backgroundColor: "rgb(172, 233, 233)",
    fontSize: "14px",
  },
}));
