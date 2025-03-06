import React, { useState } from "react";
import { Box } from "@mui/material";
import EMRtabs from "../../components/global/EMRtabs";
import ScheduleList from "./components/ScheduleList";
import PatientRecall from "./components/PatientRecall";
import PatientVaccinationSchedules from "./components/PatientVaccinationSchedules";
import PageHeader from "../../components/global/PageHeader";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ScreenWrapper from "../../components/global/ScreenWrapper";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("schedule_list");
  const tabsList = [
    { name: "Schedule List", value: "schedule_list", icon: EventNoteIcon },
    { name: "Patient Recall", value: "patient_recall", icon: EventRepeatIcon },
    {
      name: "Patient Vaccination Schedules",
      value: "patient_vaccination_schedules",
      icon: VaccinesIcon,
    },
  ];

  return (
    <ScreenWrapper>
      <Box m="20px" overflow={"auto"}>
        <div className="text-dark">Employee Dashboard</div>
        <PageHeader
          // title={"Employee Dashboard"}
          description={"This page has all schedules and vaccination details."}
        />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <EMRtabs
            tabsList={tabsList}
            defaultTab={"schedule_list"}
            setActiveTab={setActiveTab}
          />
        </Box>
        <Box>
          {activeTab === "schedule_list" && <ScheduleList />}
          {activeTab === "patient_recall" && <PatientRecall />}
          {activeTab === "patient_vaccination_schedules" && (
            <PatientVaccinationSchedules />
          )}
        </Box>
      </Box>
    </ScreenWrapper>
  );
};

export default Dashboard;
