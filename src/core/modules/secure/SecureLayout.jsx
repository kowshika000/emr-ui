import React, { useState } from "react";
import Topbar from "../../../components/global/Topbar";
import Sidebar from "../../../components/global/Sidebar";
import DoctorEmrSidebar from "../../../components/global/DoctorEmrSidebar";
import PatientTabs from "../../../secure/doctorEMR/components/patientTabs";
import PatientVitals from "../../../secure/doctorEMR/components/PatientVitals";
import PatientDetails from "../../../secure/doctorEMR/components/patientDetails";
import Landing from "../../../components/other/Landing";

const SecureLayout = ({ children }) => {
  const [isSidebar, setIsSidebar] = useState(true);
  const currentURL = window.location.href;

  return (
    <div className="app">
      <Topbar setIsSidebar={setIsSidebar} />
      {/* {currentURL.includes("doctorEmr") && <PatientTabs />} */}
      {/* {currentURL.includes("doctor") && !currentURL.includes("dashboard") && <PatientDetails />}
      {currentURL.includes("doctor") && !currentURL.includes("dashboard") && <PatientVitals />} */}
      <main className="content">
        {/* {currentURL.includes("secure") && <Landing />} */}
        {/* {currentURL.includes("secure") && <Sidebar isSidebar={isSidebar} />} */}
        {/* {currentURL.includes("doctor") && !currentURL.includes("dashboard") && <DoctorEmrSidebar isSidebar={isSidebar} />} */}
        {children}
      </main>
    </div>
  );
};

export default SecureLayout;
