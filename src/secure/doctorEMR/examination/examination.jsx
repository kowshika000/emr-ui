import DisplayComplaints from "./components/cheif complaints/displayComplaints";
import DisplayRos from "./components/cheif complaints/displayRos";
import DisplayClinicalExamination from "./components/cheif complaints/displayClinicalExamination";
import DisplayConfidentalDetails from "./components/cheif complaints/displayConfidentalDetails";
import ScreenWrapper from "../../../components/global/ScreenWrapper";
function Examination() {
    return (
        <div>
        <ScreenWrapper>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 ">
                        <DisplayComplaints />
                    </div>
                    <div class="col-12 ">
                        <DisplayRos />
                    </div>
                    <div class="col-12 ">
                        <DisplayClinicalExamination />
                    </div>
                    <div class="col-12" >
                        <DisplayConfidentalDetails />
                    </div>
                </div>
            </div>
            </ScreenWrapper>
        </div>
    )
}
export default Examination;