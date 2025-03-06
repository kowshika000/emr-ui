import React, { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import QRCode from "react-qr-code";

export const PatientInfo = ({ patientData, setShowPatientInfo }) => {
  const sigCanvas = useRef(null);
  const [signatureURL, setSignatureURL] = useState(null);

  console.log("Patient Data:", patientData);

  if (!patientData) {
    return (
      <Box p={3} textAlign="center">
        No patient data available
      </Box>
    );
  }

  const saveSignature = () => {
    if (!sigCanvas.current) {
      console.error("Signature pad not initialized.");
      return;
    }
    try {
      const trimmedCanvas = sigCanvas.current.getTrimmedCanvas();
      if (trimmedCanvas) {
        setSignatureURL(trimmedCanvas.toDataURL("image/png"));
      }
    } catch (error) {
      console.error("Error saving signature:", error);
    }
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignatureURL(null);
  };

  const qrCodeUrl = `${window.location.origin}/open-signature`;

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
          { label: "Patient Name", value: patientData?.patientName },
          { label: "Date of Birth", value: patientData?.dob },
          { label: "Visit Type", value: patientData?.visitType },
          { label: "Nationality", value: patientData?.nationality },
          { label: "Visa Type", value: patientData?.visaType },
          { label: "Phone Number", value: patientData?.phoneNumber },
          { label: "Info Source", value: patientData?.infoSource },
          { label: "Address", value: patientData?.address },
          { label: "Referral Case", value: patientData?.referralCase },
          { label: "Reg Date", value: patientData?.regDate },
          { label: "Age", value: patientData?.age },
          { label: "Email ID", value: patientData?.email },
          { label: "National ID", value: patientData?.nationalId },
          { label: "Phone Number (Work)", value: patientData?.workPhoneNumber },
          { label: "Preferred Language", value: patientData?.language },
          { label: "Religion", value: patientData?.religion },
          { label: "Referred By", value: patientData?.referredBy },
          { label: "Patient Type", value: patientData?.patientType },
          { label: "Patient Priority", value: patientData?.patientPriority },
          { label: "Gender", value: patientData?.gender },
          { label: "Marital Status", value: patientData?.maritalStatus },
          { label: "Other ID", value: patientData?.otherId },
          { label: "Land Phone", value: patientData?.landPhone },
          { label: "Occupation", value: patientData?.occupation },
          { label: "Place", value: patientData?.place },
          { label: "Patient Remark", value: patientData?.patientRemarks },
        ].map(({ label, value }) => (
          <Box
            key={label}
            minWidth="250px"
            p={1}
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <strong>{label}:</strong> {value ?? "--"}
          </Box>
        ))}
      </Box>
      <Box mt={3} textAlign="center">
        <h3>Scan to Sign</h3>
        <QRCode value={qrCodeUrl} width={100} height={100} />
      </Box>
      <Box mt={3} textAlign="center">
        <h3>Signature</h3>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 300,
            height: 150,
            className: "signature-canvas",
            style: { border: "1px solid #000" },
          }}
        />
        <Box mt={2} display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="primary" onClick={saveSignature}>
            Save Signature
          </Button>
          <Button variant="outlined" color="secondary" onClick={clearSignature}>
            Clear
          </Button>
        </Box>
      </Box>

      {signatureURL && (
        <Box mt={3} textAlign="center">
          <h4>Saved Signature:</h4>
          <img src={signatureURL} alt="Saved Signature" width={200} />
        </Box>
      )}

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
