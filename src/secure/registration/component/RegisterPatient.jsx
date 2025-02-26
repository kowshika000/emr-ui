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
import PatientInfo from "./PatientInfo";

const RegisterPatient = () => {
  const OPTION = DropdownOptions;
  const dispatch = useDispatch();
  const location = useLocation();
  const bookedDetails = location.state?.bookedDetails;
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [patientData, setPatientData] = useState();

  const { loading, error } = useSelector((state) => state.regPatient);
  const { registerPatientData } = useSelector((state) => state.regPatient);

  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    image: "",
    visitType: "",
    patientName: bookedDetails ? bookedDetails.patientName : "",
    gender: "",
    dob: "",
    nationality: "",
    visaType: "",
    phoneNumber: bookedDetails ? bookedDetails.phoneNo : "",
    infoSource: "",
    address: "",
    referralCase: "",
    regDate: getCurrentDate(),
    age: "",
    email: bookedDetails ? bookedDetails.emailId : "",
    nationalId: "",
    workPhoneNumber: "",
    language: "",
    religion: "",
    referredBy: "",
    patientType: "",
    patientPriority: "",
    maritalStatus: "",
    otherId: "",
    landPhone: "",
    occupation: "",
    place: "",
    patientRemarks: "",
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
    dependentsNo: "",
    insuranceClaimNumber: "",
    insuranceApprovalLimit: "",
    copayPatient: "",
    admissionDate: "",
    admissionTime: "",
    expectedDischargeDate: "",
    expectedDischargeTime: "",
    admissionNote: "",
    ward: "",
    roomNo: "",
    bedNo: "",
    bedRate: "",
    accomodationNote: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const registerPatient = () => {
    // Required fields validation
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
      "otherId",
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
    dispatch(registerPatients(formData));
  };

  useEffect(() => {
    if (registerPatientData?.statusCode === 200) {
      setShowPatientInfo(true);
      setPatientData(registerPatientData?.data);
    } else if (error) {
      showToast(registerPatientData?.message, "error");
    }
  }, [registerPatientData, error]);

  return (
    <Box paddingBottom={"20%"}>
      {showPatientInfo ? (
        <PatientInfo patientData={patientData} setShowPatientInfo={setShowPatientInfo} />
      ) : (
        <form
        // onSubmit={registerPatient}
        >
          <Box p={1} width={"100%"}>
            <div>
              <p className="text-dark header">Patient Demographic Details</p>
            </div>
            <Box className="form-details-section">
              <FormInput
                label={"Upload Photo"}
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
                label={"Nationality"}
                required={true}
                type="select"
                options={OPTION.nationalityOptions}
                value={formData.nationality}
                onChange={(value) => handleInputChange("nationality", value)}
              />
              <FormInput
                label={"Visa Type"}
                type="select"
                options={OPTION.visaTypeOptions}
                value={formData.visaType}
                onChange={(value) => handleInputChange("visaType", value)}
              />
              <FormInput
                label={"Phone Number (phoneNumber)"}
                value={formData.phoneNumber}
                onChange={(value) => handleInputChange("phoneNumber", value)}
              />
              <FormInput
                label={"Info Source"}
                type="select"
                options={OPTION.infoSourceOptions}
                value={formData.infoSource}
                onChange={(value) => handleInputChange("infoSource", value)}
              />
              <FormInput
                label={"Address"}
                required={true}
                // type="select"
                // options={OPTION.addressOptions}
                value={formData.address}
                onChange={(value) => handleInputChange("address", value)}
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
                label={"Reg Date"}
                type="date"
                required={true}
                value={formData.regDate}
                onChange={(value) => handleInputChange("regDate", value)}
              />
              <FormInput
                label={"Age"}
                required={true}
                value={formData.age}
                onChange={(value) => handleInputChange("age", value)}
              />
              <FormInput
                label={"Email ID"}
                required={true}
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
              />

              <FormInput
                label={"National Id"}
                required={true}
                value={formData.nationalId}
                onChange={(value) => handleInputChange("nationalId", value)}
              />
              <FormInput
                label={"Phone Number (Work)"}
                value={formData.workPhoneNumber}
                onChange={(value) =>
                  handleInputChange("workPhoneNumber", value)
                }
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
                label={"Gender"}
                required={true}
                type="select"
                options={OPTION.genderOpton}
                value={formData.gender}
                onChange={(value) => handleInputChange("gender", value)}
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
                label={"Other ID"}
                required={true}
                type="select"
                options={OPTION.otherIdOptions}
                value={formData.otherId}
                onChange={(value) => handleInputChange("otherId", value)}
              />
              <FormInput
                label={"Land Phone"}
                value={formData.landPhone}
                onChange={(value) => handleInputChange("landPhone", value)}
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
                options={OPTION.specialityOptions}
                value={formData.speciality}
                onChange={(value) => handleInputChange("speciality", value)}
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

          {formData.visitType === "In Patient" && (
            <Box p={1} width={"100%"}>
              <div>
                <p className="text-dark header">Admission Details</p>
              </div>
              <Box className="form-details-section mb-4">
                <FormInput
                  label={"Admission date"}
                  type="date"
                  value={formData.admissionDate}
                  onChange={(value) =>
                    handleInputChange("admissionDate", value)
                  }
                />
                <FormInput
                  label={"Admission time"}
                  type="time"
                  value={formData.admissionTime}
                  onChange={(value) =>
                    handleInputChange("admissionTime", value)
                  }
                />
                <FormInput
                  label={"Expected Discharge date"}
                  type="date"
                  value={formData.expectedDischargeDate}
                  onChange={(value) =>
                    handleInputChange("expectedDischargeDate", value)
                  }
                />
                <FormInput
                  label={"Expected Discharge time"}
                  type="time"
                  value={formData.expectedDischargeTime}
                  onChange={(value) =>
                    handleInputChange("expectedDischargeTime", value)
                  }
                />
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
                <Link>Select Bed and Ward</Link>
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
                <div>
                  <Button>Admit</Button>
                </div>
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
                  label={"Dependents No"}
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
