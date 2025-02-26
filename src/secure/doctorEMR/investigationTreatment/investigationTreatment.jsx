

import DisplayInvestigation from "./component/Investigation/displayInvestigation";
import DisplayTreatment from "./component/Treatment/displayTreatment";
import ScreenWrapper from "../../../components/global/ScreenWrapper";
function InvestigationTreatment() {
    return (
        <div>
            <ScreenWrapper>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 ">
                            <DisplayInvestigation />
                        </div>
                        <div class="col-12 ">
                            <DisplayTreatment />
                        </div>
                    </div>
                </div>
            </ScreenWrapper>
        </div>
    )
}
export default InvestigationTreatment;