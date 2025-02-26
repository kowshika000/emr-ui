import React, { useState } from "react";
import ScreenWrapper from "../../components/global/ScreenWrapper";
import { Box } from "@mui/material";
import EMRtabs from "../../components/global/EMRtabs";
import Appointment from "./bookSlot/Appointment";
import ScheduleList from "../dashboard/components/ScheduleList";
import PatientRecall from "../dashboard/components/PatientRecall";
import PatientVaccinationSchedule from "../dashboard/components/PatientVaccinationSchedules";

const AllAppointment = () => {
  const [activeTab, setActiveTab] = useState("doctor_appointment");

  const tabsList = [
    { name: "Doctor Appointment", value: "doctor_appointment", icon: "" },
    { name: "Schedule List", value: "schedule_list", icon: "" },
    {
      name: "Facility Schedule List",
      value: "facility_schedule_list",
      icon: "",
    },
    { name: "Patient Recall", value: "patient_recall", icon: "" },
    {
      name: "Patient Vaccination Schedules",
      value: "patient_vaccination_schedules",
      icon: "",
    },

    //   { name: "Revisit", value: "revist_registration", icon: "" },
    //   {
    //     name: "Emergency Registration",
    //     value: "emergency_registration",
    //     icon: "",
    //   },

    //   { name: "Patient Recall", value: "patient_recall", icon: EventRepeatIcon },
    //   {
    //     name: "Patient Vaccination Schedules",
    //     value: "patient_vaccination_schedules",
    //     icon: VaccinesIcon,
    //   },
  ];
  return (
    <Box style={{ width: "100%" }} className="p-3">
      <Box display="flex" justifyContent="space-between">
        <EMRtabs
          tabsList={tabsList}
          defaultTab={"doctor_appointment"}
          setActiveTab={setActiveTab}
        />
      </Box>
      <Box width={"100%"}>
        {activeTab === "doctor_appointment" && <Appointment />}
        {activeTab === "schedule_list" && <ScheduleList />}
        {activeTab === "patient_recall" && <PatientRecall />}
        {activeTab === "patient_vaccination_schedules" && (
          <PatientVaccinationSchedule />
        )}
      </Box>
    </Box>
  );
};

export default AllAppointment;
