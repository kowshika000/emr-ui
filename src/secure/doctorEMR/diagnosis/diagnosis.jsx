import ScreenWrapper from "../../../components/global/ScreenWrapper";
import DisplayDiagnosis from "./components/diagnosis/displayDiagnosis";
import DisplayManagementPlan from "./components/managementPlan/displayManagementPlan";
import DisplayProvisionalDiagnosis from "./components/provisionalDiagnosis/displayProvisionalDiagnosis";
import DisplayMedication from "./components/medication/displayMedication";
function Diagnosis() {
    return (
        <ScreenWrapper>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 ">
                        <DisplayDiagnosis />
                    </div>
                    <div class="col-12 ">
                        <DisplayManagementPlan />
                    </div>
                    <div class="col-12 ">
                        <DisplayMedication />
                    </div>
                    <div class="col-12 ">
                        <DisplayProvisionalDiagnosis />
                    </div>
                </div>
            </div>
        </ScreenWrapper>
    )
}
export default Diagnosis;