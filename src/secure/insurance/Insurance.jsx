import React, { useState } from "react";
import ScreenWrapper from "../../components/global/ScreenWrapper";
import EMRtabs from "../../components/global/EMRtabs";
import OPInsurance from "./components/opInsurance/OPInsurance";
import { Box } from "@mui/material";
import IPInsurance from "./components/ipInsurance/IPInsurance";
import ReferralRegistration from "./components/referralRegistration/ReferralRegistration";
import { ipInsurance } from "./data";

const Insurance = () => {
  const [activeTab, setActiveTab] = useState("op_insurance");
  const tabsList = [
    { name: "OP INSURANCE", value: "op_insurance" },
    { name: "IP INSURANCE", value: "ip_insurance" },
    { name: "REFERRAL REGISTRATION", value: "referral_registration" },
  ];

  const data = ipInsurance;
  console.log(data, "data");

  return (
    <ScreenWrapper>
      <Box m="20px" id="insurance-page">
        <EMRtabs
          tabsList={tabsList}
          defaultTab={"op_insurance"}
          setActiveTab={setActiveTab}
        />
        <Box>
          {activeTab === "op_insurance" && <OPInsurance />}
          {activeTab === "ip_insurance" && <IPInsurance />}
          {activeTab === "referral_registration" && <ReferralRegistration />}
        </Box>
      </Box>
    </ScreenWrapper>
  );
};

export default Insurance;
