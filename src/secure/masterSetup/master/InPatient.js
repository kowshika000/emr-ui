import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import WardSetup from './Inpatient/WardSetup';
import RoomType from "./Inpatient/RoomType";
import RoomCategory from "./Inpatient/RoomCategory";
import RoomSetup from "./Inpatient/RoomSetup";
import BedSetup from "./Inpatient/BedSetup";

const InPatient = () => {
     const [value, setValue] = useState(0);
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
  <>
<Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Ward Setup" />
          <Tab label="Room Type" />
          <Tab label="Room Category" />
          <Tab label="Room Setup" />
          <Tab label="Bed Setup" />



        </Tabs>
        <Box sx={{ mt: 2 }}>
          {value === 0 && <WardSetup />}
           {value === 1 && <RoomType />}
           {value === 2 && <RoomCategory/>}
           {value === 3 && <RoomSetup/>}
           {value === 4 && <BedSetup/>}


       


        </Box>
      </Box>
  </>
  )
}

export default InPatient