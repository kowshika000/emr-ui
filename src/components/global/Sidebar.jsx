import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EditCalendarOutlined from "@mui/icons-material/EditCalendarOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AppRegistrationOutlined from "@mui/icons-material/AppRegistrationOutlined";
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealthAndSafetyOutlined from "@mui/icons-material/HealthAndSafetyOutlined";
import UserImg from "../../assets/user.png";
import { useSelector } from "react-redux";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LaboratoryIcon from "@mui/icons-material/Science";
import { BedOutlined } from "@mui/icons-material";

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

const Sidebar = () => {
  const path = window.location.pathname;
  let defaultMenu = "Dashboard";
  if (path === "/secure/appointment") {
    defaultMenu = "Appointment";
  } else if (path === "/secure/registration") {
    defaultMenu = "Registration";
  } else if (path === "/secure/privileges") {
    defaultMenu = "Privileges";
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState(defaultMenu);

  const username = useSelector((state) => state?.auth?.user?.data?.userName);
  const role = useSelector(
    (state) => state?.auth?.user?.data?.roleMaster?.roleName
  );

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          zIndex: 1,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "rgb(118, 165, 165) !important",
        },
        "& .pro-menu-item.active": {
          color: "rgb(118, 165, 165) !important",
        },
      }}
      zIndex={998}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          width: isCollapsed ? "80px" : "200px",
          minWidth: isCollapsed ? "80px" : "200px",
          // transition: "width 0.3s ease",
        }}
      >
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
                <Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="80px"
                      height="80px"
                      src={UserImg}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography
                      variant="h6"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "10px 0 0 0" }}
                    >
                      {username}
                    </Typography>
                    <Typography variant="h6" color={colors.greenAccent[500]}>
                      {role?.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
                <Box alignSelf={"flex-start"}>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </MenuItem>

          <Box>
            {/* <Item
              title="Dashboard"
              to="/secure/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
              
            <Item
              title="Appointment"
              to="/secure/appointment"
              icon={<EditCalendarOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Registration"
              to="/secure/registration"
              icon={<AppRegistrationOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Privileges"
              to="/secure/privileges"
              icon={<SecurityOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Billing"
              to="/secure/billing/list"
              icon={<AttachMoneyOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="IP EMR"
              to="/secure/ipemr"
              icon={<LocalHospitalIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Bed & Ward"
              to="/secure/bedandward"
              icon={<BedOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Doctor EMR"
              to="/secure/doctorEmr"
              icon={<MedicalServicesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Laboratory"
              to="/secure/lab"
              icon={<LaboratoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Master"
              to="/secure/master"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Insurance"
              to="/secure/insurance"
              icon={<HealthAndSafetyOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
