import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox
} from "@mui/material";
import ScreenWrapper from "../../components/global/ScreenWrapper";
import EMRtabs from "../../components/global/EMRtabs";
import BlockAvailability from "../appointment/component/BlockAvailability";

const Privileges = () => {
  const [activeTab, setActiveTab] = useState("user_privileges");
  const initialRoles = [
    {
      role: "Admin",
      canViewPage1: true,
      canViewPage2: true,
      canEdit: true,
      canDelete: true
    },
    {
      role: "Receptionist",
      canViewPage1: true,
      canViewPage2: false,
      canEdit: false,
      canDelete: false
    },
    {
      role: "Doctor",
      canViewPage1: true,
      canViewPage2: true,
      canEdit: true,
      canDelete: false
    },
    {
      role: "Nurse",
      canViewPage1: true,
      canViewPage2: false,
      canEdit: false,
      canDelete: false
    },
    {
      role: "Cash Counter",
      canViewPage1: true,
      canViewPage2: false,
      canEdit: false,
      canDelete: false
    }
  ];
  const [roles, setRoles] = useState(initialRoles);
  const tabsList = [
    { name: "User privileges", value: "user_privileges", icon: "" },
    {
      name: "Block Availability",
      value: "block_availability",
      icon: ""
    },
    {
      name: "Release Availability",
      value: "release_availability",
      icon: ""
    }
  ];

  const handleCheckboxChange = (roleIndex, permission) => {
    const updatedRoles = [...roles];
    updatedRoles[roleIndex][permission] = !updatedRoles[roleIndex][permission];
    setRoles(updatedRoles);
  };

  return (
    <ScreenWrapper>
      <Box p={2} sx={{ backgroundColor: "white", borderRadius: "8px" }}>
        <Box display={"flex"} justifyContent={"flex-start"}>
          <EMRtabs
            tabsList={tabsList}
            defaultTab={"user_privileges"}
            setActiveTab={setActiveTab}
          />
        </Box>
        {activeTab === "user_privileges" && (
          <Box mt={4}>
            <TableContainer component={Paper} elevation={3}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#e0e0e0" }}
                    >
                      Roles
                    </TableCell>
                    {roles.map((role) => (
                      <TableCell
                        key={role.role}
                        sx={{ fontWeight: "bold", backgroundColor: "#e0e0e0" }}
                      >
                        {role.role}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#e0f7fa" }}
                    >
                      Dashboard
                    </TableCell>
                    {roles.map((role, index) => (
                      <TableCell key={`${role.role}-dashboard`} align="center">
                        <Checkbox
                          checked={role.canViewPage1}
                          onChange={() =>
                            handleCheckboxChange(index, "canViewPage1")
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#e0f7fa" }}
                    >
                      Appointment
                    </TableCell>
                    {roles.map((role, index) => (
                      <TableCell
                        key={`${role.role}-appointment`}
                        align="center"
                      >
                        <Checkbox
                          checked={role.canViewPage1}
                          onChange={() =>
                            handleCheckboxChange(index, "canViewPage1")
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#e0f7fa" }}
                    >
                      Registration
                    </TableCell>
                    {roles.map((role, index) => (
                      <TableCell
                        key={`${role.role}-registration`}
                        align="center"
                      >
                        <Checkbox
                          checked={role.canViewPage1}
                          onChange={() =>
                            handleCheckboxChange(index, "canViewPage1")
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#e0f7fa" }}
                    >
                      Billing
                    </TableCell>
                    {roles.map((role, index) => (
                      <TableCell key={`${role.role}-billing`} align="center">
                        <Checkbox
                          checked={role.canViewPage1}
                          onChange={() =>
                            handleCheckboxChange(index, "canViewPage1")
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", backgroundColor: "#e0f7fa" }}
                    >
                      Previllages
                    </TableCell>
                    {roles.map((role, index) => (
                      <TableCell key={`${role.role}-billing`} align="center">
                        <Checkbox
                          checked={role.canViewPage1}
                          onChange={() =>
                            handleCheckboxChange(index, "canViewPage1")
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {activeTab === "release_availability" && (
          <Box>Release Availability</Box>
        )}
        {activeTab === "block_availability" && (
          <Box display={"flex"} justifyContent={"center"} mt={2}>
            <BlockAvailability />
          </Box>
        )}
      </Box>
    </ScreenWrapper>
  );
};

export default Privileges;
