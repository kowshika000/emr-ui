import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Org from "./Org";
import Speciality from "./Speciality";
import Usersetup from "./Usersetup";
import InPatient from "./InPatient";
import Appointment from "./Appointment";

const Home = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Org" />
          <Tab label="Speciality" />
          <Tab label="User Setup" />
          <Tab label="InPatient" />
          <Tab label="Appointment" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {value === 0 && <Org />}
          {value === 1 && <Speciality />}
          {value === 2 && <Usersetup />}
          {value === 3 && <InPatient />}

          {value === 4 && <Appointment />}
        </Box>
      </Box>
    </>
  );
};

export default Home;
