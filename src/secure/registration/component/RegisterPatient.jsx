import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Button } from "react-bootstrap";
import "../Registration.css";
import FormInput from "../../../components/FormFields/FormInput";
import { DropdownOptions } from "../../../components/FormFields/DropdownOptions";
import { useDispatch } from "react-redux";
import { registerPatients } from "../../../Redux/slice/registration/registerPatientsSlice";
import { useSelector } from "react-redux";
import { showToast } from "../../../components/global/Toast";
import { Link, useLocation } from "react-router-dom";
import { PatientInfo } from "./PatientInfo/PatientInfo";
import { allDoctors } from "../../../Redux/slice/appointement/allDoctorsSlice";

const RegisterPatient = () => {
  const OPTION = DropdownOptions;
  const dispatch = useDispatch();
  const location = useLocation();
  const bookedDetails = location.state?.bookedDetails;
  const surgeryPatientData = location.state?.patientData;
  const schedulePatientData = location.state?.data;
  const selectedBed = location.state?.selectedBed;
  // console.log("schedulePatientData", schedulePatientData);

  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [patientData, setPatientData] = useState();

  const { loading, error } = useSelector((state) => state.regPatient);
  const { registerPatientData } = useSelector((state) => state.regPatient);
  console.log("patient data", registerPatientData?.patientDetail);

  const { doctorData } = useSelector((state) => state?.allDoctor);

  const allDoctorData = doctorData?.data || [];

  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);

  useEffect(() => {
    dispatch(allDoctors());
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  const initialState = {
    image: "",
    visitType: "",
    patientName: "",
    gender: "",
    dob: "",
    nationality: "",
    visaType: "",
    phoneNumber: "",
    infoSource: "",
    address: "",
    referralCase: "No",
    regDate: getCurrentDateTime(),
    age: "",
    email: "",
    nationalId: "",
    workPhoneno: "",
    language: "English",
    religion: "",
    referredBy: "",
    patientType: "Normal",
    patientPriority: "Normal",
    maritalStatus: "",
    otherIdName: "",
    otherId: "",
    landPhone: "",
    occupation: "",
    place: "",
    patientRemarks: "",
    speciality: "",
    encounterType: "No Bed + No Emergency Room",
    doctorName: "",
    paymentType: "Cash",
    subInsurance: "",
    networkType: "",
    insuranceCardNo: "",
    insuranceEffectiveFrom: "",
    certificateNumber: "",
    maxInsuranceLiability: "",
    maxInsuranceCopay: "",
    extraCardNumber: "",
    insuranceExpireDate: "",
    dependentsNo: "",
    insuranceClaimNumber: "",
    insuranceApprovalLimit: "",
    copayPatient: "",
    admissionDate: "",
    // admissionTime: "",
    expectedDischargeDate: "",
    // expectedDischargeTime: "",
    admissionNote: "",
    ward: "",
    roomNo: "",
    bedNo: "",
    bedRate: "",
    accomodationNote: "",
  };
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("registerPatientForm");
    return savedData
      ? JSON.parse(savedData)
      : {
          // image: "",
          visitType:
            surgeryPatientData || selectedBed ? "In Patient" : "" || "",
          patientName:
            bookedDetails?.patientName ||
            surgeryPatientData?.patient ||
            schedulePatientData?.patientName ||
            "",
          gender:
            surgeryPatientData?.gender ||
            schedulePatientData?.gender ||
            bookedDetails?.gender ||
            "",
          dob:
            surgeryPatientData?.dob ||
            schedulePatientData?.dob ||
            bookedDetails?.dob ||
            "",
          nationality: "",
          visaType: "",
          phoneNumber:
            bookedDetails?.phoneNo ||
            surgeryPatientData?.mobile ||
            schedulePatientData?.mobile ||
            "",
          infoSource: "",
          address: "",
          referralCase: "No",
          regDate: getCurrentDateTime(),
          age:
            surgeryPatientData?.age ||
            schedulePatientData?.age ||
            bookedDetails?.age ||
            "",
          email: bookedDetails?.email || schedulePatientData?.emailId || "",
          nationalId: "",
          workPhoneno: "",
          language: "",
          religion: "",
          referredBy: "",
          patientType: "Normal",
          patientPriority: "Normal",
          maritalStatus: "",
          otherIdName: "",
          otherId: "",
          landPhone: "",
          occupation: "",
          place: "",
          patientRemarks: "",
          speciality: "",
          encounterType: "No Bed + No Emergency Room",
          doctorName:
            surgeryPatientData?.doctor || schedulePatientData?.doctorName || "",

          paymentType: "Cash",
          subInsurance: "",
          networkType: "",
          insuranceCardNo: "",
          insuranceEffectiveFrom: "",
          certificateNumber: "",
          maxInsuranceLiability: "",
          maxInsuranceCopay: "",
          extraCardNumber: "",
          insuranceExpireDate: "",
          dependentsNo: "",
          insuranceClaimNumber: "",
          insuranceApprovalLimit: "",
          copayPatient: "",
          admissionDate: "",
          // admissionTime: "",
          expectedDischargeDate: surgeryPatientData?.exp_discharge_date || "",
          // expectedDischargeTime: "",
          admissionNote: "",
          ward: surgeryPatientData?.ward || selectedBed?.wardName || "",
          roomNo: selectedBed?.roomNoOrName || "",
          bedNo: selectedBed?.bedNo || "",
          bedRate: selectedBed?.rate || 0,
          accomodationNote: "",
        };
  });
  useEffect(() => {
    if (selectedBed) {
      setFormData((prev) => ({
        ...prev,
        ward: selectedBed.wardName || prev.ward,
        roomNo: selectedBed.roomNoOrName || prev.roomNo,
        bedNo: selectedBed.bedNo || prev.bedNo,
        bedRate: selectedBed.rate || prev.bedRate,
      }));
    }
  }, [selectedBed]);
  // Populate Speciality Dropdown
  useEffect(() => {
    const specialities = [
      ...new Set(allDoctorData.map((doctor) => doctor.specialityName)),
    ].map((name) => ({ label: name, value: name }));

    setSpecialityOptions(specialities);
  }, [allDoctorData]);

  // Populate Doctor Dropdown when Speciality Changes
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

  // Auto-Fill Speciality Based on `bookedDetails.specialityId`
  useEffect(() => {
    if (bookedDetails?.specialityId) {
      const speciality = allDoctorData.find(
        (doc) => doc.specialityId === bookedDetails.specialityId
      )?.specialityName;

      if (speciality) {
        setFormData((prev) => ({ ...prev, speciality }));
      }
    }
  }, [bookedDetails, allDoctorData]);

  // Auto-Fill Doctor AFTER `doctorOptions` is Populated
  useEffect(() => {
    if (bookedDetails?.doctorId && doctorOptions.length > 0) {
      const selectedDoctor = doctorOptions.find(
        (doc) => doc.value === bookedDetails.doctorId
      );

      if (selectedDoctor) {
        setFormData((prev) => ({
          ...prev,
          doctorId: bookedDetails.doctorId,
          doctorName: selectedDoctor.label,
        }));
      }
    }
  }, [doctorOptions, bookedDetails]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, [field]: value };
      localStorage.setItem("registerPatientForm", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const registerPatient = () => {
    const requiredFields = [
      "visitType",
      "patientName",
      "dob",
      "nationality",
      "address",
      "referralCase",
      "regDate",
      "age",
      "email",
      "nationalId",
      "patientPriority",
      "gender",
      "maritalStatus",
      "occupation",
      "speciality",
      "doctorName",
      "paymentType",
      "encounterType",
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
    // Find the `specialityId` based on the selected `speciality`
    const selectedSpeciality = allDoctorData.find(
      (doc) => doc.specialityName === formData.speciality
    )?.specialityId;

    // Find the `doctorId` based on the selected `doctorName`
    const selectedDoctor = doctorOptions.find(
      (doc) => doc.label === formData.doctorName
    )?.value;
    // Exclude specific fields from the payload
    const { ward, roomNo, bedNo, bedRate, speciality, doctorName, ...payload } =
      formData;

    const finalPayload = {
      ...payload,
      specialityId: selectedSpeciality || "",
      doctorId: selectedDoctor || "",
      bedId: selectedBed?.bedId || "",
    };

    dispatch(registerPatients(finalPayload)).then(() => {
      // Clear localStorage after successful registration
      localStorage.removeItem("registerPatientForm");

      setFormData((prev) => ({
        ...initialState,
        regDate: prev.regDate,
        ward: prev.ward,
        roomNo: prev.roomNo,
        bedNo: prev.bedNo,
        bedRate: prev.bedRate,
        speciality: prev.speciality,
        doctorName: prev.doctorName,
      }));

      setShowPatientInfo(true);
    });
  };

  // Update patientData when Redux state changes
  useEffect(() => {
    if (registerPatientData?.patientDetail) {
      setPatientData(registerPatientData.patientDetail);
      console.log("Updated Patient Data:", registerPatientData.patientDetail);
    } else if (error) {
      showToast("Something went wrong!!", "error");
    }
  }, [registerPatientData, error]);

  return (
    <Box paddingBottom={"20%"}>
      {showPatientInfo ? (
        <PatientInfo
          patientData={patientData}
          setShowPatientInfo={setShowPatientInfo}
        />
      ) : (
        <form>
          <Box p={1} width={"100%"}>
            <div>
              <p className="text-dark header">Patient Demographic Details</p>
            </div>
            <Box className="form-details-section">
              <FormInput
                // label={"Upload Photo"}
                type="file"
                onChange={(file) => {
                  console.log("Selected file:", file);
                }}
                inputProps={{ accept: "image/*" }}
              />
              <FormInput
                label={"Visit Type"}
                required={true}
                type="select"
                options={OPTION.visitOptions}
                value={formData.visitType}
                onChange={(value) => handleInputChange("visitType", value)}
              />
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
                label={"Gender"}
                required={true}
                type="select"
                options={OPTION.genderOpton}
                value={formData.gender}
                onChange={(value) => handleInputChange("gender", value)}
              />
              <FormInput
                label={"Email ID"}
                required={true}
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
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
                required={true}
                value={formData.nationalId}
                onChange={(value) => handleInputChange("nationalId", value)}
              />
              <FormInput
                label={"Address"}
                required={true}
                value={formData.address}
                onChange={(value) => handleInputChange("address", value)}
              />
              <FormInput
                label={"Patient Priority"}
                required={true}
                type="select"
                options={OPTION.patientPriorityOptions}
                value={formData.patientPriority}
                onChange={(value) =>
                  handleInputChange("patientPriority", value)
                }
              />
              <FormInput
                label={"Occupation"}
                required={true}
                type="select"
                options={OPTION.occupationOptions}
                value={formData.occupation}
                onChange={(value) => handleInputChange("occupation", value)}
              />
              <FormInput
                label={"Marital Status"}
                required={true}
                type="select"
                options={OPTION.maritalStatusOptions}
                value={formData.maritalStatus}
                onChange={(value) => handleInputChange("maritalStatus", value)}
              />
              <FormInput
                label={"Referral Case"}
                required={true}
                type="select"
                options={OPTION.referralOptions}
                value={formData.referralCase}
                onChange={(value) => handleInputChange("referralCase", value)}
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
              <FormInput
                label={"Phone Number (Work)"}
                value={formData.workPhoneno}
                onChange={(value) => handleInputChange("workPhoneno", value)}
              />
              <FormInput
                label={"Preferred Language"}
                value={formData.language}
                onChange={(value) => handleInputChange("language", value)}
              />
              <FormInput
                label={"Religion"}
                type="select"
                options={OPTION.religionOptions}
                value={formData.religion}
                onChange={(value) => handleInputChange("religion", value)}
              />
              <FormInput
                label={"Referred By"}
                value={formData.referredBy}
                onChange={(value) => handleInputChange("referredBy", value)}
              />
              <FormInput
                label={"Patient Type"}
                type="select"
                options={OPTION.patientTypeOptions}
                value={formData.patientType}
                onChange={(value) => handleInputChange("patientType", value)}
              />

              <FormInput
                label={"Other ID Name"}
                type="select"
                options={OPTION.otherIdOptions}
                value={formData.otherIdName}
                onChange={(value) => handleInputChange("otherIdName", value)}
              />
              <FormInput
                label={"Other ID No"}
                // required={true}
                value={formData.otherId}
                onChange={(value) => handleInputChange("otherId", value)}
              />
              <FormInput
                label={"Land Phone"}
                value={formData.landPhone}
                onChange={(value) => handleInputChange("landPhone", value)}
              />

              <FormInput
                label={"Place"}
                value={formData.place}
                onChange={(value) => handleInputChange("place", value)}
              />
              <FormInput
                label={"Patient Remark"}
                value={formData.patientRemarks}
                onChange={(value) => handleInputChange("patientRemarks", value)}
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
              {formData.visitType === "In Patient" ? (
                ""
              ) : (
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
              )}
            </Box>
          </Box>

          {formData.visitType === "In Patient" && (
            <Box p={1} width={"100%"}>
              <div>
                <p className="text-dark header">Admission Details</p>
              </div>
              <Box className="form-details-section mb-4">
                <FormInput
                  label={"Admission Date & Time"}
                  type="datetime-local"
                  value={formData.admissionDate}
                  onChange={(value) =>
                    handleInputChange("admissionDate", value)
                  }
                />
                {/* <FormInput
                  label={"Admission time"}
                  type="time"
                  value={formData.admissionTime}
                  onChange={(value) =>
                    handleInputChange("admissionTime", value)
                  }
                /> */}
                <FormInput
                  label={"Expected Discharge Date & Time"}
                  type="datetime-local"
                  value={formData.expectedDischargeDate}
                  onChange={(value) =>
                    handleInputChange("expectedDischargeDate", value)
                  }
                />
                {/* <FormInput
                  label={"Expected Discharge time"}
                  type="time"
                  value={formData.expectedDischargeTime}
                  onChange={(value) =>
                    handleInputChange("expectedDischargeTime", value)
                  }
                /> */}
                <FormInput
                  label={"Encounter Type"}
                  type="select"
                  value={formData.encounterType}
                  options={OPTION.ipEncounterTypeOptions}
                  onChange={(value) =>
                    handleInputChange("encounterType", value)
                  }
                />
                <FormInput
                  label={"Notes"}
                  value={formData.admissionNote}
                  onChange={(value) =>
                    handleInputChange("admissionNote", value)
                  }
                />
              </Box>
            </Box>
          )}

          {formData.visitType === "In Patient" && (
            <Box p={1} width={"100%"}>
              <div
                className="d-flex "
                style={{ justifyContent: "space-between" }}
              >
                <p className="text-dark header">Accomodation details</p>
                <Link
                  to="/secure/bedandward?tab=bed-occupancy"
                  state={{ fromTab: "register_patient" }}
                >
                  Select Bed and Ward
                </Link>
              </div>
              <Box className="form-details-section mb-4">
                <FormInput
                  label={"Ward"}
                  value={formData.ward}
                  onChange={(value) => handleInputChange("ward", value)}
                />
                <FormInput
                  label={"Room No"}
                  value={formData.roomNo}
                  onChange={(value) => handleInputChange("roomNo", value)}
                />
                <FormInput
                  label={"Bed No"}
                  value={formData.bedNo}
                  onChange={(value) => handleInputChange("bedNo", value)}
                />
                <FormInput
                  label={"Bed Rate"}
                  value={formData.bedRate}
                  onChange={(value) => handleInputChange("bedRate", value)}
                />
                <FormInput
                  label={"Notes"}
                  value={formData.accomodationNote}
                  onChange={(value) =>
                    handleInputChange("accomodationNote", value)
                  }
                />
                {/* <div>
                  <Button>Admit</Button>
                </div> */}
              </Box>
            </Box>
          )}

          <Box p={1} width={"100%"}>
            <div>
              <p className="text-dark header">Payment Details</p>
            </div>

            <Box className="form-details-section mb-4">
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
                  label={"dependentsNo No"}
                  value={formData.dependentsNo}
                  onChange={(value) => handleInputChange("dependentsNo", value)}
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
          <Box
            display={"flex"}
            padding={"0.5em"}
            width={"100%"}
            justifyContent={"flex-end"}
          >
            <Button
              onClick={registerPatient}
              disabled={loading}
              className="form-btn"
              type="submit"
            >
              {loading ? "Registering..." : "Register New Patient"}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default RegisterPatient;
