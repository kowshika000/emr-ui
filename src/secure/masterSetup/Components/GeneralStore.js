import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Itemstatus from "./Pages/Itemstatus";
import Itemadjust from "./Pages/Itemadjust";
import "./GeneralStore.css";
import ItemExpiryStatus from "./Pages/ItemExpiryStatus";
import Saftystock from "./Pages/Saftystock";



const GeneralStore = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Item Status" />
        <Tab label="Item Adjust" />
        <Tab label="Item Expiry Status" />
        <Tab label="Safety Stock" />
        
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {value === 0 && <Itemstatus />}
        {value === 1 && <Itemadjust />}
        {value === 2 && <ItemExpiryStatus />}
        {value === 3 && <Saftystock />}

      </Box>
    </Box>
  );
};

export default GeneralStore;
