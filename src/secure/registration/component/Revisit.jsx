import { Autocomplete, Box, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPatients } from "../../../Redux/slice/appointement/searchPatientSlice";
import FormInput from "../../../components/FormFields/FormInput";
import { DropdownOptions } from "../../../components/FormFields/DropdownOptions";
import { revisitPatients } from "../../../Redux/slice/registration/revisitSlice";
import { useLocation } from "react-router-dom";
import { PatientInfo } from "./PatientInfo/PatientInfo";
import { showToast } from "../../../components/global/Toast";

const Revisit = () => {
  const location = useLocation();
  const surgeryPatientData = location.state?.patientData;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [patientData, setPatientData] = useState();

  const OPTION = DropdownOptions;

  const dispatch = useDispatch();
  const { searchPatientData } = useSelector((state) => state.searchPatient);
  const { data, loading, error } = useSelector((state) => state?.revisit);

  const patientId = selectedPatient?.patientId;

  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);

  const { doctorData } = useSelector((state) => state?.allDoctor);
  const allDoctorData = doctorData?.data || [];

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
    phoneNumber: surgeryPatientData?.mobile || "",
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
    const specialities = [
      ...new Set(allDoctorData.map((doctor) => doctor.specialityName)),
    ].map((name) => ({ label: name, value: name }));

    setSpecialityOptions(specialities);
  }, [allDoctorData]);

  useEffect(() => {
    if (formData.speciality) {
      const filteredDoctors = allDoctorData
        .filter((doctor) => doctor.specialityName === formData.speciality)
        .map((doctor) => ({
          label: doctor.doctorName,
          value: doctor.doctorId,
        }));

      setDoctorOptions(filteredDoctors);
    } else {
      setDoctorOptions([]);
    }
  }, [formData.speciality, allDoctorData]);

  useEffect(() => {
    if (selectedPatient) {
      setFormData((prevData) => ({
        ...prevData,
        mrdNumber: selectedPatient?.mrdNo || "",
        dob: selectedPatient?.dob || "",
        gender: selectedPatient?.gender || "",
        phoneNumber: selectedPatient?.phoneNo || "",
        patientName: selectedPatient?.name || "",
        age: selectedPatient?.age || "",
        nationality: selectedPatient?.nationality || "",
        nationalId: selectedPatient?.nationalId || "",
        visaType: selectedPatient?.visaType || "",
      }));
    }
  }, [selectedPatient]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const revisitPatient = () => {
    const requiredFields = [
      "patientName",
      "dob",
      "nationality",
      "age",
      "nationalId",
      "gender",
      "speciality",
      "doctorName",
      "paymentType",
      "encounterType",
      "phoneNumber"
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      showToast(
        <div>
          <p>Please fill all required fields:</p>
          <ul>
            {missingFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
        </div>,
        "error"
      );
      return;
    }
    dispatch(revisitPatients({ credentials: formData, patientId }));
    if (!loading) {
      setFormData((prevData) => ({
        ...prevData,
        mrdNumber: "",
        dob: "",
        gender: "",
        phoneNumber: "",
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
    }
  };
  useEffect(() => {
    if (error) {
      showToast(error || "Something went wrong!!", "error");
    } else if (data?.revisitPatient) {
      setShowPatientInfo(true);
      setPatientData(data.revisitPatient);
    }
  }, [data, error]);

  return (
    <Box paddingBottom={"20%"}>
      {showPatientInfo ? (
        <PatientInfo
          patientData={patientData}
          setShowPatientInfo={setShowPatientInfo}
        />
      ) : (
        <div>
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
                  label={"Patient Name"}
                  required={true}
                  value={formData.patientName}
                  onChange={(value) => handleInputChange("patientName", value)}
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
                  label={"Age"}
                  required={true}
                  value={formData.age}
                  onChange={(value) => handleInputChange("age", value)}
                />

                <FormInput
                  label={"Phone Number"}
                  required={true}
                  value={formData.phoneNumber}
                  onChange={(value) => handleInputChange("phoneNumber", value)}
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
                  options={specialityOptions}
                  value={formData.speciality}
                  onChange={(value) => handleInputChange("speciality", value)}
                />
                <FormInput
                  label={"Doctor Name"}
                  required={true}
                  type="select"
                  options={doctorOptions}
                  value={formData.doctorName}
                  onChange={(value) => handleInputChange("doctorName", value)}
                />
                <FormInput
                  label={"Encounter Type"}
                  required={true}
                  type="select"
                  options={OPTION.encounterTypeOptions}
                  value={formData.encounterType}
                  onChange={(value) =>
                    handleInputChange("encounterType", value)
                  }
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
                    onChange={(value) =>
                      handleInputChange("subInsurance", value)
                    }
                  />
                  <FormInput
                    label={"Network Type"}
                    value={formData.networkType}
                    onChange={(value) =>
                      handleInputChange("networkType", value)
                    }
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
                    onChange={(value) =>
                      handleInputChange("copayPatient", value)
                    }
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
        </div>
      )}
    </Box>
  );
};

export default Revisit;
