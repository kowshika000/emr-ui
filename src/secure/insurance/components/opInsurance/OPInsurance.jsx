import React, { useState } from "react";
import EMRtabs from "../../../../components/global/EMRtabs";
import { Box } from "@mui/material";
import ClaimDetails from "./components/ClaimDetails";
import ManualSubmission from "./components/ManualSubmission";
import moment from "moment";

const OPInsurance = () => {
  const [activeTab, setActiveTab] = useState("claim_details");
  const tabsList = [
    { name: "Claim Details", value: "claim_details" },
    { name: "Manual Submission", value: "manual_submission" },
    { name: "E-submission", value: "e_submission" },
    { name: "Re-Submission", value: "re_submission" },
    { name: "Prior Request", value: "prior_request" }
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <EMRtabs
          tabsList={tabsList}
          defaultTab={"claim_details"}
          setActiveTab={setActiveTab}
        />
      </Box>
      <Box>
        {activeTab === "claim_details" && <ClaimDetails />}
        {activeTab === "manual_submission" && <ManualSubmission />}
        {activeTab === "e_submission" && <></>}
        {activeTab === "re_submission" && <></>}
        {activeTab === "prior_request" && <></>}
      </Box>
    </Box>
  );
};

export default OPInsurance;
