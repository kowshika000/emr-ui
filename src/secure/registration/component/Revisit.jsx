import { Autocomplete, Box, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPatients } from "../../../Redux/slice/appointement/searchPatientSlice";
import FormInput from "../../../components/FormFields/FormInput";
import { DropdownOptions } from "../../../components/FormFields/DropdownOptions";
import { revisitPatients } from "../../../Redux/slice/registration/revisitSlice";
import { useLocation } from "react-router-dom";

const Revisit = () => {
  const location = useLocation();
  const surgeryPatientData = location.state?.patientData;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const OPTION = DropdownOptions;

  const dispatch = useDispatch();
  const { searchPatientData } = useSelector((state) => state.searchPatient);
  const { revisitPatientData, loading } = useSelector((state) => state.revisit);

  const patientId = selectedPatient?.patientId;

  console.log(selectedPatient?.patientId);

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    dispatch(searchPatients({ searchKey: inputValue }));
    setSearchQuery(inputValue);
  };

  const handleOptionSelect = (event, value) => {
    setSelectedPatient(value);
  };

  const [formData, setFormData] = useState({
    mrdNumber: surgeryPatientData?.mr_no || "",
    dob: "",
    gender: "",
    mobileNumber: surgeryPatientData?.mobile || "",
    patientName: surgeryPatientData?.patient || "",
    age: "",
    nationality: "",
    nationalId: "",
    visaType: "",
    speciality: "",
    encounterType: "",
    doctorName: surgeryPatientData?.doctor || "",
    paymentType: "",
    subInsurance: "",
    networkType: "",
    insuranceCardNo: "",
    insuranceEffectiveFrom: "",
    certificateNumber: "",
    maxInsuranceLiability: "",
    maxInsuranceCopay: "",
    extraCardNumber: "",
    insuranceExpireDate: "",
    dependents: "",
    insuranceClaimNumber: "",
    insuranceApprovalLimit: "",
    copayPatient: "",
  });

  useEffect(() => {
    if (selectedPatient) {
      setFormData((prevData) => ({
        ...prevData,
        mrdNumber: selectedPatient?.mrdNo || "",
        dob: selectedPatient?.dob || "",
        gender: selectedPatient?.gender || "",
        mobileNumber: selectedPatient?.phoneNo || "",
        patientName: selectedPatient?.name || "",
        age: selectedPatient?.age || "",
        nationality: selectedPatient?.nationality || "",
        nationalId: selectedPatient?.nationalId || "",
        visaType: selectedPatient?.visaType || "",
      }));
    }
  }, [selectedPatient]);

  // console.log(selectedPatient, "patient id");

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const revisitPatient = () => {
    dispatch(revisitPatients({ credentials: formData, patientId }));
    setFormData((prevData) => ({
      ...prevData,
      mrdNumber: "",
      dob: "",
      gender: "",
      mobileNumber: "",
      patientName: "",
      age: "",
      nationality: "",
      nationalId: "",
      visaType: "",
      speciality: "",
      encounterType: "",
      doctorName: "",
      paymentType: "",
      subInsurance: "",
      networkType: "",
      insuranceCardNo: "",
      insuranceEffectiveFrom: "",
      certificateNumber: "",
      maxInsuranceLiability: "",
      maxInsuranceCopay: "",
      extraCardNumber: "",
      insuranceExpireDate: "",
      dependents: "",
      insuranceClaimNumber: "",
      insuranceApprovalLimit: "",
      copayPatient: "",
    }));
  };

  return (
    <Box paddingBottom={"20%"}>
      <Box display={"flex"} justifyContent={"start"} my={1} ml={1}>
        <Autocomplete
          freeSolo
          options={searchPatientData?.data || []}
          getOptionLabel={(option) => option.name || ""}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Patients"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Type to search..."
              size="small"
              sx={{ width: 300 }}
            />
          )}
          onChange={handleOptionSelect}
        />
      </Box>
      <Box>
        <Box p={1} width={"100%"}>
          <div>
            <p className="text-dark header">Patient Demographic Details</p>
          </div>
          <Box className="form-details-section">
            <FormInput
              label={"MRD Number"}
              value={formData.mrdNumber}
              onChange={(value) => handleInputChange("mrdNumber", value)}
            />
            <FormInput
              label={"Date of Birth"}
              required={true}
              type="date"
              value={formData.dob}
              onChange={(value) => handleInputChange("dob", value)}
              setDependentValue={(calculatedAge) =>
                handleInputChange("age", calculatedAge)
              }
            />
            <FormInput
              label={"Gender"}
              required={true}
              type="select"
              options={OPTION.genderOpton}
              value={formData.gender}
              onChange={(value) => handleInputChange("gender", value)}
            />
            <FormInput
              label={"Mobile Number"}
              value={formData.mobileNumber}
              onChange={(value) => handleInputChange("mobileNumber", value)}
            />
            <FormInput
              label={"Patient Name"}
              required={true}
              value={formData.patientName}
              onChange={(value) => handleInputChange("patientName", value)}
            />
            <FormInput
              label={"Age"}
              required={true}
              value={formData.age}
              onChange={(value) => handleInputChange("age", value)}
            />
            <FormInput
              label={"Nationality"}
              required={true}
              type="select"
              options={OPTION.nationalityOptions}
              value={formData.nationality}
              onChange={(value) => handleInputChange("nationality", value)}
            />
            <FormInput
              label={"National Id"}
              value={formData.nationalId}
              onChange={(value) => handleInputChange("nationalId", value)}
            />
            <FormInput
              label={"Visa Type"}
              type="select"
              options={OPTION.visaTypeOptions}
              value={formData.visaType}
              onChange={(value) => handleInputChange("visaType", value)}
            />
          </Box>
        </Box>

        <Box p={1} width={"100%"}>
          <div>
            <p className="text-dark header">Consultation Details</p>
          </div>
          <Box className="form-details-section">
            <FormInput
              label={"Speciality"}
              required={true}
              type="select"
              options={OPTION.specialityOptions}
              value={formData.speciality}
              onChange={(value) => handleInputChange("speciality", value)}
            />
            <FormInput
              label={"Encounter Type"}
              required={true}
              type="select"
              options={OPTION.encounterTypeOptions}
              value={formData.encounterType}
              onChange={(value) => handleInputChange("encounterType", value)}
            />
            <FormInput
              label={"Doctor Name"}
              required={true}
              type="select"
              options={OPTION.doctorOptions}
              value={formData.doctorName}
              onChange={(value) => handleInputChange("doctorName", value)}
            />
          </Box>
        </Box>
        <Box p={1} width={"100%"}>
          <div>
            <p className="text-dark header">Payment Details</p>
          </div>
          <Box className="form-details-section">
            <FormInput
              label={"Payment Type"}
              required={true}
              type="select"
              options={OPTION.paymentOptions}
              value={formData.paymentType}
              onChange={(value) => handleInputChange("paymentType", value)}
            />
          </Box>
          {formData.paymentType === "Insurance" && (
            <Box className="form-details-section">
              <FormInput
                label={"Sub Insurance"}
                type="select"
                value={formData.subInsurance}
                onChange={(value) => handleInputChange("subInsurance", value)}
              />
              <FormInput
                label={"Network Type"}
                value={formData.networkType}
                onChange={(value) => handleInputChange("networkType", value)}
              />
              <FormInput
                label={"Insurance Card No"}
                required={true}
                value={formData.insuranceCardNo}
                onChange={(value) =>
                  handleInputChange("insuranceCardNo", value)
                }
              />
              <FormInput
                label={"Insurance Effective From"}
                type="date"
                value={formData.insuranceEffectiveFrom}
                onChange={(value) =>
                  handleInputChange("insuranceEffectiveFrom", value)
                }
              />
              <FormInput
                label={"Certificate No"}
                value={formData.certificateNumber}
                onChange={(value) =>
                  handleInputChange("certificateNumber", value)
                }
              />
              <FormInput
                label={"Max Insurance Liability"}
                value={formData.maxInsuranceLiability}
                onChange={(value) =>
                  handleInputChange("maxInsuranceLiability", value)
                }
              />
              <FormInput
                label={"Max Insurance Copay"}
                value={formData.maxInsuranceCopay}
                onChange={(value) =>
                  handleInputChange("maxInsuranceCopay", value)
                }
              />
              <FormInput
                label={"Extra Card No"}
                value={formData.extraCardNumber}
                onChange={(value) =>
                  handleInputChange("extraCardNumber", value)
                }
              />
              <FormInput
                label={"Insurance Expiry Date"}
                required={true}
                type="date"
                value={formData.insuranceExpireDate}
                onChange={(value) =>
                  handleInputChange("insuranceExpireDate", value)
                }
              />
              <FormInput
                label={"Dependents No"}
                value={formData.dependents}
                onChange={(value) => handleInputChange("dependents", value)}
              />
              <FormInput
                label={"Insurance Claim No"}
                value={formData.insuranceClaimNumber}
                onChange={(value) =>
                  handleInputChange("insuranceClaimNumber", value)
                }
              />
              <FormInput
                label={"Insurance Approval Limit"}
                value={formData.insuranceApprovalLimit}
                onChange={(value) =>
                  handleInputChange("insuranceApprovalLimit", value)
                }
              />
              <FormInput
                label={"Co Pay Patient"}
                value={formData.copayPatient}
                onChange={(value) => handleInputChange("copayPatient", value)}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        display={"flex"}
        padding={"0.5em"}
        width={"100%"}
        justifyContent={"flex-end"}
      >
        <Button onClick={revisitPatient} className="form-btn">
          {loading ? "Registering..." : " Register Revisit Patient"}
        </Button>
      </Box>
    </Box>
  );
};

export default Revisit;
