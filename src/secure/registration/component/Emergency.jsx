import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import FormInput from "../../../components/FormFields/FormInput";
import { DropdownOptions } from "../../../components/FormFields/DropdownOptions";
import { useDispatch, useSelector } from "react-redux";
import { emergencyPatients } from "../../../Redux/slice/registration/emergencyPatientSlice";

const Emergency = () => {
  const dispatch = useDispatch();
  const OPTION = DropdownOptions;
  const getCurrentDateTime = () => {
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toLocaleTimeString([], { hour12: false });
    return `${currentDate} ${currentTime}`;
  };

  const [formData, setFormData] = useState({
    // mrdNumber: "",
    patientName: "",
    dob: "",
    nationality: "",
    visaType: "",
    phoneNumber: "",
    infoSource: "",
    regDate: getCurrentDateTime(),
    age: "",
    email: "",
    nationalId: "",
    // workPhoneNo: "",
    language: "",
    // patientType: "",
    // otherIdName: "",
    // otherIdNo: "",
    landPhone: "",
    speciality: "",
    encounterType: "",
    doctorName: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);

  const { doctorData } = useSelector((state) => state?.allDoctor);
  const allDoctorData = doctorData?.data || [];

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

  const registerPatient = () => {
    dispatch(emergencyPatients(formData));
  };

  return (
    <Box paddingBottom={"20%"}>
      <Box>
        <Box padding={"1em"} width={"100%"}>
          <div>
            <p className="text-dark header">Patient Demographic Details</p>
          </div>
          <Box className="form-details-section">
            {/* <FormInput
              label={"Visit Type"}
              required={true}
              value={formData.visitType}
              type="select"
              options={OPTION.visitOptions}
              onChange={(value) => handleInputChange("visitType", value)}
            />
            <FormInput
              label={"MRD Number"}
              value={formData.mrdNumber}
              onChange={(value) => handleInputChange("mrdNumber", value)}
            /> */}
            <FormInput
              label={"Reg Date"}
              type="date"
              required={true}
              value={formData.regDate}
              onChange={(value) => handleInputChange("regDate", value)}
            />
            <FormInput
              label={"Patient Name"}
              required={true}
              value={formData.patientName}
              onChange={(value) => handleInputChange("patientName", value)}
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
              label={"Email ID"}
              required={true}
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
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
              label={"Info Source"}
              type="select"
              options={OPTION.infoSourceOptions}
              value={formData.infoSource}
              onChange={(value) => handleInputChange("infoSource", value)}
            />
            <FormInput
              label={"Visa Type"}
              type="select"
              options={OPTION.visaTypeOptions}
              value={formData.visaType}
              onChange={(value) => handleInputChange("visaType", value)}
            />

            {/* <FormInput
              label={"Phone Number (Work)"}
              value={formData.workPhoneNo}
              onChange={(value) => handleInputChange("workPhoneNo", value)}
            /> */}
            <FormInput
              label={"Preferred Language"}
              value={formData.language}
              onChange={(value) => handleInputChange("language", value)}
            />
            {/* <FormInput
              label={"Patient Type"}
              type="select"
              options={OPTION.patientTypeOptions}
              value={formData.patientType}
              onChange={(value) => handleInputChange("patientType", value)}
            /> */}
            {/* <FormInput
              label={"Other ID Name"}
              type="select"
              options={OPTION.otherIdOptions}
              value={formData.otherIdName}
              onChange={(value) => handleInputChange("otherIdName", value)}
            />
            <FormInput
              label={"Other ID No"}
              // required={true}
              value={formData.otherIdNo}
              onChange={(value) => handleInputChange("otherIdNo", value)}
            /> */}
            <FormInput
              label={"Land Phone"}
              value={formData.landPhone}
              onChange={(value) => handleInputChange("landPhone", value)}
            />
          </Box>
        </Box>
        <Box padding={"1em"} width={"100%"}>
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
              onChange={(value) => handleInputChange("encounterType", value)}
            />
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        padding={"0.5em"}
        width={"100%"}
        justifyContent={"flex-end"}
      >
        <Button onClick={registerPatient} className="form-btn">
          Register Emergency Patient
        </Button>
      </Box>
    </Box>
  );
};

export default Emergency;
