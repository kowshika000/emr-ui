import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaNotesMedical,
  FaUserNurse,
  FaUserMd,
  FaCashRegister,
  FaHospitalUser,
  FaProcedures,
  FaClinicMedical,
  FaMicroscope,
  FaChartBar,
  FaCogs,
  FaShieldAlt,
} from "react-icons/fa";

const allModules = [
  {
    name: "Appointment",
    icon: <FaCalendarAlt />,
    path: "/secure/appointment",
    color: "#3B82F6",
  },
  {
    name: "Registration",
    icon: <FaNotesMedical />,
    path: "/secure/registration",
    color: "#10B981",
  },
  {
    name: "Nurse EMR",
    icon: <FaUserNurse />,
    path: "/secure/nurseEmr",
    color: "#EC4899",
  },
  {
    name: "Doctor EMR",
    icon: <FaUserMd />,
    path: "/secure/doctorEmr",
    color: "#8B5CF6",
  },
  {
    name: "Billing",
    icon: <FaCashRegister />,
    path: "/secure/billing/list",
    color: "#F59E0B",
  },
  {
    name: "IP EMR",
    icon: <FaHospitalUser />,
    path: "/secure/ipemr",
    color: "#0EA5E9",
  },
  {
    name: "Bed & Ward",
    icon: <FaProcedures />,
    path: "/secure/bedandward",
    color: "#F43F5E",
  },
  {
    name: "OT Booking",
    icon: <FaClinicMedical />,
    path: "/secure/ot",
    color: "#22D3EE",
  },
  {
    name: "Laboratory",
    icon: <FaMicroscope />,
    path: "/secure/lab",
    color: "#16A34A",
  },
  {
    name: "Report",
    icon: <FaChartBar />,
    path: "/secure",
    color: "#F97316",
  },
  {
    name: "Master",
    icon: <FaCogs />,
    path: "/secure/master",
    color: "#6366F1",
  },
  {
    name: "Insurance",
    icon: <FaShieldAlt />,
    path: "/secure/insurance",
    color: "#7C3AED",
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
        allowedModules = allModules.filter((mod) =>
          ["Appointment", "Registration", "Billing", "Report"].includes(
            mod.name
          )
        );
      } else if (userRole === "Billing") {
        allowedModules = allModules.filter((mod) =>
          ["Billing", "Report"].includes(mod.name)
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
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        padding: "30px",
        boxSizing: "border-box",
        overflow: "auto",
        width: "100%",
      }}
    >
      {/* <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Hospital Dashboard
      </h2> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "24px",
          width: "100%",
        }}
      >
        {filteredModules.length > 0 ? (
          filteredModules.map((module, index) => (
            <div
              key={index}
              onClick={() => navigate(module.path)}
              style={{
                backgroundColor: "rgb(217, 225 ,224)",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease",
                cursor: "pointer",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  backgroundColor: module.color,
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "28px",
                  marginBottom: "12px",
                }}
              >
                {module.icon}
              </div>
              <div style={{ fontWeight: 600 }}>{module.name}</div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No modules available for your role
          </p>
        )}
      </div>
    </div>
  );
};

export default Landing;
