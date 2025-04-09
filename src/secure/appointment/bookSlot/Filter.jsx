import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import moment from "moment";
import CalendarView from "./CalendarView";
import EMRtabs from "../../../components/global/EMRtabs";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { DateCalendar } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { allDoctors } from "../../../Redux/slice/appointement/allDoctorsSlice";
import EMRLoader from "../../../components/global/loader/EMRLoaderOverlay";

const Filter = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("users");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [branch, setBranch] = useState("");
  const [branchId, setBranchId] = useState("");

  const { doctorData, docloading } = useSelector((state) => state?.allDoctor);
  const allDoctorData = doctorData?.data || [];

  // const { searchdoctorData, searchDocloading } = useSelector(
  //   (state) => state?.searchDoctor
  // );
  const { data } = useSelector((state) => state?.allBranch);
  const branchData = data?.data;
  console.log("branchData", branchData);

  const loading = docloading;

  useEffect(() => {
    dispatch(allDoctors());
  }, [dispatch]);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleSpecialityChange = (e) => {
    const selectedValue = e?.target?.value || "";
    setSelectedSpeciality(selectedValue);
  };

  const handleBranchChange = (e) => {
    const selectedValue = e?.target?.value || "";
    setBranch(selectedValue);

    // Find the branchId of the selected branch
    const selectedBranch = branchData?.find(
      (branch) => branch.branchName === selectedValue
    );
    setBranchId(selectedBranch?.branchName || "");
  };

  const filteredDoctors = selectedSpeciality
    ? allDoctorData.filter((doc) => doc.specialityId === selectedSpeciality)
    : [];

  return (
    <Box display="flex" width={"100%"}>
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
              <Box display="flex" flexDirection="column" gap={2} mt={1}>
                <FormControl fullWidth size="small">
                  <InputLabel>Select Branch</InputLabel>
                  <Select
                    value={branch}
                    onChange={handleBranchChange}
                    label="Select Branch"
                  >
                    <MenuItem value="">Select</MenuItem>
                    {branchData?.map((data) => (
                      <MenuItem key={data?.branchId} value={data?.branchName}>
                        {data?.branchName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small" disabled={!branchId}>
                  <InputLabel>Select Speciality</InputLabel>
                  <Select
                    value={selectedSpeciality}
                    onChange={handleSpecialityChange}
                    label="Select Speciality"
                  >
                    <EMRLoader show={loading} />
                    <MenuItem value="">Select</MenuItem>
                    {Array.from(
                      new Map(
                        allDoctorData
                          .filter((doc) => doc.branchName === branchId)
                          .map((doc) => [
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
            slotDuration={20}
            activeTab={activeTab}
            selectedSpeciality={selectedSpeciality}
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
    backgroundColor: "#D0DDD0",
    fontSize: "14px",
  },
}));
