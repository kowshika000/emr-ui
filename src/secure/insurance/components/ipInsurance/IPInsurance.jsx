import React, { useState } from "react";
import EMRtabs from "../../../../components/global/EMRtabs";
import { Box } from "@mui/material";

const IPInsurance = () => {
  const [activeTab, setActiveTab] = useState("generate_claim");
  const tabsList = [
    { name: "Generate Claim", value: "generate_claim" },
    { name: "List of Claims", value: "list_of_claims" },
    { name: "Manual Submission ", value: "manual_submission" },
    { name: "E-submission", value: "e_submission" },
    { name: "Re-Submission", value: "re_submission" }
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <EMRtabs
          tabsList={tabsList}
          defaultTab={"generate_claim"}
          setActiveTab={setActiveTab}
        />
      </Box>
      <Box>
        {activeTab === "generate_claim" && <></>}
        {activeTab === "list_of_claims" && <></>}
        {activeTab === "manual_submission" && <></>}
        {activeTab === "e_submission" && <></>}
        {activeTab === "re_submission" && <></>}
      </Box>
    </Box>
  );
};

export default IPInsurance;
