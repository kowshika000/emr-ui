import React, { useState } from 'react'
import { Box, Tab, Tabs } from "@mui/material";
import PoRequest from './Pages2/PoRequest';



const Procurement = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Po For Request" />
        <Tab label="GRN Entry" />
        <Tab label="Invoice Entry" />
        <Tab label="Return" />
        
      </Tabs>
      { <Box sx={{ mt: 2 }}>
        {value === 0 && <PoRequest/> }
        {/* {value === 1 && }
        {value === 2 && }
        {value === 3 && } */}

      </Box> }
    </Box>
  )
}

export default Procurement