import React from "react";
import { Box, Button } from "@mui/material";

const PatientInfo = ({ patientData, setShowPatientInfo }) => {
  return (
    <Box>
      <div className="text-dark header mb-3">Patient Demographic Details</div>

      {/* Avatar */}
      {/* <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          alt={patientData.patientName || "Patient"}
          src={patientData.photo || "https://via.placeholder.com/100"}
          sx={{ width: 100, height: 100 }}
        />
      </Box> */}

      {/* Patient Details */}
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={1}
      >
        {[
          { label: "MRD No", value: patientData.mrdNo },
          { label: "Patient Name", value: patientData.patientName },
          { label: "Date of Birth", value: patientData.dob },
          { label: "Visit Type", value: patientData.visitType },
          { label: "Nationality", value: patientData.nationality },
          { label: "Visa Type", value: patientData.visaType },
          { label: "Phone Number", value: patientData.phoneNumber },
          { label: "Info Source", value: patientData.infoSource },
          { label: "Address", value: patientData.address },
          { label: "Referral Case", value: patientData.referralCase },
          { label: "Reg Date", value: patientData.regDate },
          { label: "Age", value: patientData.age },
          { label: "Email ID", value: patientData.email },
          { label: "National ID", value: patientData.nationalId },
          { label: "Phone Number (Work)", value: patientData.workPhoneNumber },
          { label: "Preferred Language", value: patientData.language },
          { label: "Religion", value: patientData.religion },
          { label: "Referred By", value: patientData.referredBy },
          { label: "Patient Type", value: patientData.patientType },
          { label: "Patient Priority", value: patientData.patientPriority },
          { label: "Gender", value: patientData.gender },
          { label: "Marital Status", value: patientData.maritalStatus },
          { label: "Other ID", value: patientData.otherId },
          { label: "Land Phone", value: patientData.landPhone },
          { label: "Occupation", value: patientData.occupation },
          { label: "Place", value: patientData.place },
          { label: "Patient Remark", value: patientData.patientRemarks },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              minWidth: "250px",
              display: "flex",
              // justifyContent: "space-between",
              // backgroundColor: "rgb(238, 238, 238)",
              padding: "5px",
              borderRadius: "4px",
            }}
          >
            <strong>{label} :&nbsp;</strong> {value !== "" ? value : "--"}
          </div>
        ))}
      </Box>
      <Box p={2} display={"flex"} justifyContent={"end"}>
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

export default PatientInfo;
