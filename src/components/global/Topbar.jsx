import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  IconButton,
  useTheme,
  Tooltip,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import MenuItem from "@mui/material/MenuItem";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import "./topbar.css";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ErrorIcon from "@mui/icons-material/Error";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/slice/login/authSlice";
import { allBranch } from "../../Redux/slice/appointement/allBranchSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, MenuBook } from "@mui/icons-material";
import { Switch, FormControlLabel } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";

const Topbar = ({ reloadApp, branchId, username, role }) => {
  const [branches, setBranches] = useState([]);
  // const [branch, setBranch] = useState(null);

  const [userData, setUserData] = useState(null);
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  useEffect(() => {
    const loginUser = localStorage.getItem("user");

    if (loginUser) {
      const parsedUser = JSON.parse(loginUser);
      setUserData(parsedUser.data);
      setSelectedBranchId(parsedUser.data?.branchMaster?.branchId || null);
      console.log("userData", parsedUser.data);
    } else {
      console.log("No user data found in localStorage");
    }
  }, []);

  const currentURL = window.location.href;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.allBranch);
  const branchData = data?.data;
  const navigate = useNavigate();

  useEffect(() => {
    if (!branchData?.length) {
      dispatch(allBranch());
    }
  }, [dispatch, branchData]);

  useEffect(() => {
    if (branchData) {
      setBranches(branchData);
    }
  }, [data]);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [open, setOpen] = useState(false);

  const handleChange = (branchId) => {
    setSelectedBranchId(branchId);
    setOpen(false);
  };

  const logoutApp = () => {
    dispatch(logout());
    navigate("/login");
  };

  const branchName = selectedBranchId
    ? branches.find((branch) => branch.branchId === selectedBranchId)
        ?.branchName
    : "Select Branch";

  return (
    <Box
      id="topbar"
      display="flex"
      justifyContent="space-between"
      p={2}
      padding={"5px 16px"}
      height={"10%"}
      sx={{
        backgroundColor: "#71BBB2",
        color: "black",
      }}
    >
      {currentURL.includes("secure") && (
        <>
          <Box display={"flex"} my={"auto"} gap={"10px"}>
            <Box alignSelf={"center"} fontSize={"26px"}>
              E M R
            </Box>
            <IconButton onClick={() => navigate("/secure/landing")}>
              <Menu />
            </IconButton>
          </Box>
          <Box display="flex" my={"auto"} gap={2}>
            <div className="my-auto ">
              {/* <div style={{ color: "white",  }}>
                {userData?.roleMaster?.roleName}
              </div> */}
              <Chip
                label={userData?.roleMaster?.roleName}
                variant="outlined"
                sx={{ fontSize: "12px" }}
              />
            </div>
            <Box
              alignSelf={"center"}
              sx={{
                position: "relative",
                backgroundColor: "transparent",
                borderRadius: "5px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                onClick={() => setOpen(!open)}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Chip
                  icon={<ShareLocationIcon color="white" />}
                  label={branchName}
                  sx={{
                    backgroundColor: "#71BBB2",
                    fontSize: "12px",
                    textTransform: "capitalize",
                    "&:hover": {
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Box>

              {/* Dropdown List */}
              {open && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "40px",
                    left: "0",
                    right: "0",
                    backgroundColor: "rgb(204, 219, 219)",
                    borderRadius: "5px",
                    zIndex: 1,
                    minWidth: "140px",
                    overflowY: "auto",
                    color: "black",
                  }}
                >
                  {branches.map((branch) => (
                    <MenuItem
                      key={branch.branchId}
                      // value={branch.branchId}
                      onClick={() => handleChange(branch.branchId)}
                    >
                      {branch.branchName}
                    </MenuItem>
                  ))}
                </Box>
              )}
            </Box>

            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>

            {/* <IconButton onClick={() => navigate("/secure/landing")}>
              <Menu  />
            </IconButton> */}
            <IconButton sx={{ margin: "0 10px" }} onClick={logoutApp}>
              <LogoutIcon />
            </IconButton>
          </Box>

          {/* <div className="my-auto ">
            <IconButton onClick={() => navigate("/secure/landing")}>
              <Menu  />
            </IconButton>
          </div> */}
        </>
      )}

      {/* Dashboard content */}
      {/* {currentURL.includes("doctor") && !currentURL.includes("dashboard") ? (
        <>
          
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Clinic Date - 21/09/2024</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography variant="body1">Start time - HH:MM:SS</Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography variant="body1">End time - HH:MM:SS</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Tooltip title="Order Set">
              <IconButton sx={{ margin: "0 10px" }}>
                <ListAltIcon sx={{ color: "blue" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="ERX Status">
              <IconButton sx={{ margin: "0 10px" }}>
                <ErrorIcon sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Switch Branch">
              <IconButton sx={{ margin: "0 10px" }}>
                <SwapHorizIcon sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Alert">
              <IconButton sx={{ margin: "0 10px" }}>
                <ErrorIcon sx={{ color: "orange" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Log out">
              <IconButton sx={{ margin: "0 10px" }}>
                <LogoutIcon sx={{ color: "purple" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : ( */}
      <>
        {/* Right-aligned icons */}
        {/* <Box display="flex" alignItems="center">
          <Tooltip title="Log out">
            <IconButton sx={{ margin: "0 10px" }} onClick={logoutApp}>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box> */}
      </>
      {/* )} */}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    branchId: state?.auth?.user?.data?.branchMaster.branchId,
    username: state?.auth?.user?.data?.userName,
    role: state?.auth?.user?.data?.roleMaster?.roleName,
  };
};

export default connect(mapStateToProps)(Topbar);
