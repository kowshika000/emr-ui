import React, { Suspense } from "react";
import ScreenWrapper from "../../components/global/ScreenWrapper";
import { Box } from "@mui/material";

const BillingModule = React.lazy(() => import("emr_billing/BillingModule"));

const Billing = () => {
  return (
    <ScreenWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m={1}
        width={"100%"}
      >
        <Suspense fallback={<div>Loading Microfrontend...</div>}>
          <BillingModule />
        </Suspense>
      </Box>
    </ScreenWrapper>
  );
};

export default Billing;
