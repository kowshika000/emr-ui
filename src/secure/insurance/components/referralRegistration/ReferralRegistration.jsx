import React, { useState } from "react";
import EMRtabs from "../../../../components/global/EMRtabs";
import { Box } from "@mui/material";

const ReferralRegistration = () => {
  const [activeTab, setActiveTab] = useState("referral_registration");
  const tabsList = [
    { name: "Referral Registration", value: "referral_registration" },
    { name: "Referral Visit", value: "referral_visit" },
    { name: "Referral Registration List", value: "referral_Registration_list" }
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <EMRtabs
          tabsList={tabsList}
          defaultTab={"referral_registration"}
          setActiveTab={setActiveTab}
        />
      </Box>
      <Box>
        {activeTab === "referral_registration" && <></>}
        {activeTab === "referral_visit" && <></>}
        {activeTab === "referral_Registration_list" && <></>}
      </Box>
    </Box>
  );
};

export default ReferralRegistration;
