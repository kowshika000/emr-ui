import React from "react";
// import SignatureCanvas from "react-signature-canvas";
import QRCode from "react-qr-code";
import { Box, Button } from "@mui/material";
// import { useSearchParams } from "react-router-dom";

export const PatientInfo = ({ patientData, setShowPatientInfo }) => {
  if (!patientData) {
    return (
      <Box p={3} textAlign="center">
        No patient data available
      </Box>
    );
  }

  const qrCodeUrl = `${window.location.origin}/confirm-registration?mrdNo=${patientData?.mrdNo}`;

  return (
    <Box p={3} style={{ backgroundColor: "#fff" }}>
      <div className="text-dark header mb-3">Patient Demographic Details</div>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={"space-between"}
        gap={2}
        p={2}
      >
        {[
          { label: "MRD No", value: patientData?.mrdNo },
          { label: "Visit Type", value: patientData?.visitType },
          { label: "Reg Date", value: patientData?.createdOn },

          { label: "Patient Name", value: patientData?.name },
          { label: "Date of Birth", value: patientData?.dob },
          { label: "Age", value: patientData?.age },
          { label: "Email ID", value: patientData?.emailId },
          { label: "Phone Number", value: patientData?.phoneNo },
          { label: "Gender", value: patientData?.gender },

          { label: "Nationality", value: patientData?.nationality },
          { label: "National ID", value: patientData?.nationalId },

          { label: "Visa Type", value: patientData?.visaType },
          { label: "Info Source", value: patientData?.infoSource },
          { label: "Address", value: patientData?.address },
          { label: "Referral Case", value: patientData?.referralCase },

          { label: "Phone Number (Work)", value: patientData?.workPhoneno },
          { label: "Preferred Language", value: patientData?.language },
          { label: "Religion", value: patientData?.religion },
          { label: "Referred By", value: patientData?.referredBy },
          { label: "Patient Type", value: patientData?.patientType },
          { label: "Patient Priority", value: patientData?.patientPriority },
          { label: "Marital Status", value: patientData?.maritalStatus },
          { label: "Other ID Name", value: patientData?.otherIdName },
          { label: "Other ID", value: patientData?.otherId },
          { label: "Land Phone", value: patientData?.landPhone },
          { label: "Occupation", value: patientData?.occupation },
          { label: "Place", value: patientData?.place },
          { label: "Patient Remark", value: patientData?.patientRemarks },
        ].map(({ label, value }) => (
          <Box
            key={label}
            minWidth="150px"
            display={"flex"}
            flexDirection={"column"}
          >
            <div style={{ color: "rgb(142, 150, 150)" }}>{label}</div>{" "}
            <div>
              {value !== "" && value !== undefined && value !== null
                ? value
                : "--"}
            </div>
          </Box>
        ))}
      </Box>
      <Box mt={3} display="flex" justifyContent="end">
        <QRCode value={qrCodeUrl} style={{ width: "100px", height: "100px" }} />
      </Box>

      <Box p={2} display="flex" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowPatientInfo(false)}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};
