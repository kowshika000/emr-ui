import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import UserImg from "../../assets/user.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const DoctorEmrSidebar = () => {
  const defaultMenu = "Referral"; // Default menu option

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(defaultMenu);

  return (
    <Box
      sx={{
        backgroundColor: "#e3f2fd",
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: "transparent !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Medical
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={UserImg}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  John Doe
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Paitent
                </Typography>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    '& svg': {
                      m: 5,
                    },
                  }}
                >
                  <Typography sx={{ margin: 1 }}>
                    30 years
                  </Typography>
                  <div className="vr"></div>
                  <Typography sx={{ margin: 1 }}>
                    Male
                  </Typography>
                  <div className="vr"></div>
                  <Typography sx={{ margin: 1 }}>
                    Indian
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Referral"
              // to="/secure/referral"
              icon={<MedicalServicesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Examination"
              to="/doctor/examination"
              icon={<SearchOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Diagnosis / Medication"
              to="/doctor/diagnosis"
              icon={<MedicationOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Invest/Treatment"
              to="/doctor/investigationTreatment"
              icon={<AssignmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Documents & Remarks"
              to="/doctor/documentsRemarks"
              icon={<InsertDriveFileOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Medical Forms"
              // to="/secure/medical-forms"
              icon={<InsertDriveFileOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default DoctorEmrSidebar;
