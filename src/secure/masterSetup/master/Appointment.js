import React, { useState } from 'react'
import SpecialityTimeSlot from './Appointment Tabs/SpecialityTimeSlot';
import { Box, Tab, Tabs } from "@mui/material";

const Appointment = () => {
      const [value, setValue] = useState(0);
        
          const handleChange = (event, newValue) => {
            setValue(newValue);
          };
  return (
 <>
  <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Speciality Time Slot" />
          <Tab label="Doctor's Appointment Schedule" />
          <Tab label="Facilty Type" />
          <Tab label="Facility Appointment Schedule" />
     



        </Tabs>
        <Box sx={{ mt: 2 }}>
          {value === 0 && <SpecialityTimeSlot/>}
  



        </Box>
      </Box>
 </>
  )
}

export default Appointment