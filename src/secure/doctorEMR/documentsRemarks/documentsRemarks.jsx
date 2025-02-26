
import ScreenWrapper from "../../../components/global/ScreenWrapper";
import ScannedDocuments from "./component/scannedDocuments"
import DocumentsIssued from "./component/DocumentsIssued";
import Handouts from "./component/Handouts"
import ConsentForms from "./component/consentforms";
import ViewAddNote from "../investigationTreatment/component/Investigation/viewAddLabNotes";
import Remarks from "./component/Remarks";
function DocumentsRemarks() {
    return (
        <div>
            <ScreenWrapper>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 ">
                            <ScannedDocuments />
                        </div>
                        <div class="col-12 ">
                            <DocumentsIssued />
                        </div>
                        <div class="col-12 ">
                            <Remarks />
                        </div>
                        <div class="col-12 ">
                            <ConsentForms />
                        </div>
                        <div class="col-12 ">
                            <Handouts />
                        </div>
                    </div>
                </div>
            </ScreenWrapper>
        </div>
    )
}
export default DocumentsRemarks;