import { Box } from "@mui/material";
import React from "react";

const PageHeader = ({ title, description }) => {
  return (
    <Box>
      <div className="header mb-2">{title}</div>
      <div className=" mb-2" style={{color:"silver"}}>{description}</div>
    </Box>
  );
};

PageHeader.defaultProps = {
  style: {},
};

export default PageHeader;
