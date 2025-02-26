import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import ScreenWrapper from "../../components/global/ScreenWrapper";
import EMRtabs from "../../components/global/EMRtabs";
import RegisterPatient from "./component/RegisterPatient";
import Emergency from "./component/Emergency";
import Revisit from "./component/Revisit";
import ScheduleList from "../dashboard/components/ScheduleList";
import PatientRecall from "../dashboard/components/PatientRecall";
import PatientVaccinationSchedule from "../dashboard/components/PatientVaccinationSchedules";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import PatientList from "./component/PatientList";

const Registration = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "register_patient";
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabsList = [
    { name: "Register Patient", value: "register_patient", icon: "" },
    { name: "Revisit", value: "revist_registration", icon: "" },
    {
      name: "Emergency Registration",
      value: "emergency_registration",
      icon: "",
    },
    {
      name: "Patient List",
      value: "patient_list",
      icon: "",
    },
    // { name: "Schedule List", value: "schedule_list", icon: EventNoteIcon },
    // { name: "Patient Recall", value: "patient_recall", icon: EventRepeatIcon },
    // {
    //   name: "Patient Vaccination Schedules",
    //   value: "patient_vaccination_schedules",
    //   icon: VaccinesIcon,
    // },
  ];

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <ScreenWrapper style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <EMRtabs
          tabsList={tabsList}
          defaultTab={defaultTab}
          setActiveTab={setActiveTab}
        />
      </Box>
      <Box>
        {activeTab === "register_patient" && <RegisterPatient />}
        {activeTab === "revist_registration" && <Revisit />}
        {activeTab === "emergency_registration" && <Emergency />}
        {activeTab === "patient_list" && <PatientList />}
        {/* {activeTab === "schedule_list" && <ScheduleList />}
        {activeTab === "patient_recall" && <PatientRecall />}
        {activeTab === "patient_vaccination_schedules" && (
          <PatientVaccinationSchedule />
        )} */}
      </Box>
    </ScreenWrapper>
  );
};

export default Registration;
