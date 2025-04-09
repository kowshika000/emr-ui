import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUserPlus,
  FaFileInvoiceDollar,
  FaProcedures,
  FaBed,
  FaUserMd,
  FaFlask,
  FaClipboardList,
  FaFileAlt,
  FaUserNurse,
} from "react-icons/fa";

const allModules = [
  {
    name: "Appointment",
    icon: <FaCalendarCheck />,
    path: "/secure/appointment",
    color: "#6B8E23",
  },
  {
    name: "Registration",
    icon: <FaUserPlus />,
    path: "/secure/registration",
    color: "#FFA500",
  },
  {
    name: "Doctor EMR",
    icon: <FaUserMd />,
    path: "/secure/doctorEmr",
    color: "#9932CC",
  },
  {
    name: "Nurse EMR",
    icon: <FaUserNurse />,
    path: "/secure/nurseEmr",
    color: "#A52A2A",
  },
  {
    name: "Billing",
    icon: <FaFileInvoiceDollar />,
    path: "/secure/billing/list",
    color: "#008080",
  },
  {
    name: "Report",
    icon: <FaFileAlt />,
    path: "/secure",
    color: "#FF6B6B",
  },
  {
    name: "IP EMR",
    icon: <FaProcedures />,
    path: "/secure/ipemr",
    color: "#4169E1",
  },
  {
    name: "Bed & Ward",
    icon: <FaBed />,
    path: "/secure/bedandward",
    color: "#A52A2A",
  },
  {
    name: "OT Booking",
    icon: <FaProcedures />,
    path: "/secure/ot",
    color: "#FF6B6B",
  },
  {
    name: "Laboratory",
    icon: <FaFlask />,
    path: "/secure/lab",
    color: "#32CD32",
  },
  {
    name: "Master",
    icon: <FaClipboardList />,
    path: "/secure/master",
    color: "#FF6B6B",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [filteredModules, setFilteredModules] = useState([]);

  useEffect(() => {
    const loginUser = localStorage.getItem("user");
    if (loginUser) {
      const userData = JSON.parse(loginUser);
      const userRole = userData?.data?.roleMaster?.roleName || "";

      let allowedModules = [];

      if (userRole === "Receptionist") {
        allowedModules = allModules.filter(
          (mod) =>
            mod.name === "Appointment" ||
            mod.name === "Registration" ||
            mod.name === "Billing" ||
            mod.name === "Report"
        );
      } else if (userRole === "Billing") {
        allowedModules = allModules.filter(
          (mod) => mod.name === "Billing" || mod.name === "Report"
        );
      } else if (userRole === "Doctor") {
        allowedModules = allModules.filter((mod) => mod.name === "Doctor EMR");
      } else {
        allowedModules = allModules;
      }

      setFilteredModules(allowedModules);
    }
  }, []);

  return (
    <div
      style={{
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          //   width: "100%",
          maxWidth: "900px",
          justifyContent: "center",
        }}
        className="mx-auto"
      >
        {filteredModules.length > 0 ? (
          filteredModules.map((module, index) => (
            <div
              key={index}
              onClick={() => navigate(module.path)}
              style={{
                backgroundColor: module.color,
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {module.icon}
              </div>
              {module.name}
            </div>
          ))
        ) : (
          <p>No modules available for your role</p>
        )}
      </div>
    </div>
  );
};

export default Landing;
