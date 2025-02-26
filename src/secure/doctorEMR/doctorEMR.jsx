
import PatientCaseSheetForm from "./components/PatientCaseSheetForm";
import ScreenWrapper from "../../components/global/ScreenWrapper";
import DisplayComplaints from "../doctorEMR/examination/components/cheif complaints/displayComplaints";
import DisplayClinicalExamination from "../doctorEMR/examination/components/cheif complaints/displayClinicalExamination";
import DisplayDiagnosis from "../doctorEMR/diagnosis/components/diagnosis/displayDiagnosis";
import DisplayMedication from "../doctorEMR/diagnosis/components/medication/displayMedication";
import DisplayInvestigation from "./investigationTreatment/component/Investigation/displayInvestigation";
import DisplayTreatment from "../doctorEMR/investigationTreatment/component/Treatment/displayTreatment";
import FreeStyleCrud from "../doctorEMR/UI Component/FreeStyleCrud";

import React, { useState } from "react";


const DoctorEMR = () => {
  const [caseSheetData, setCaseSheetData] = useState({});

  // Function to receive and store form values from the child component
  const caseSheetFormValues = (values) => {
    console.log(values, "values in parent");
    setCaseSheetData(values);
  };

  return (
    <div>
      {/* Pass stored caseSheetData as initial form values */}
      {/* <PatientCaseSheetForm
        caseSheetFormValues={caseSheetFormValues}
        initialValues={caseSheetData}
      /> */}

      <ScreenWrapper>
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 ">
              <DisplayComplaints />
            </div>
            <div class="col-12 ">
              <DisplayClinicalExamination />
            </div>
            <div class="col-12 ">
              <DisplayDiagnosis />
            </div>
            <div class="col-12 ">
              <DisplayMedication />
            </div>
            <div class="col-12 ">
              <DisplayInvestigation />
            </div>
            <div class="col-12 ">
              <DisplayTreatment />
            </div>
            <div class="col-12 ">
              <FreeStyleCrud type={"HOPI"}/>
            </div>
            <div class="col-12 ">
              <FreeStyleCrud type={"Past Medical History"}/>
            </div>
            <div class="col-12 ">
              <FreeStyleCrud type={"Past Surgical History"}/>
            </div>
            <div class="col-12 ">
              <FreeStyleCrud type={"Family History"}/>
            </div>
            <div class="col-12 ">
              <FreeStyleCrud type={"Treatment Plan"}/>
            </div>
            <div class="col-12 ">
              <FreeStyleCrud type={"Progress Note"}/>
            </div>
            <div class="col-12 ">
              <FreeStyleCrud type={"Follow Up Note"}/>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default DoctorEMR;
