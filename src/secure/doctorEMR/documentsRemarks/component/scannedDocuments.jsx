import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // This includes Popper.js which Bootstrap needs
import React, { useState } from "react";
import AddScannedDocument from "./addScannedDocument"

const ScannedDocuments = () => {
    const [addScannedDocModal, setAddScannedDocModal] = useState(false)
    const [uploadDocLabDataList, setUploadLabDocDataList] = useState([])
    const [uploadDocApprovalDataList, setUploadApprovalDocDataList] = useState([])

    const handleAddScannedDocModalOpen = () => {
        setAddScannedDocModal(true)
    }

    const handleAddScannedDocModalClose = () => {
        setAddScannedDocModal(false)
    }

    const uploadDocuments = (values) => {
        if (values.docuement === "Lab") {
            setUploadLabDocDataList((prev) => [...prev, values])
        } else if (values.docuement === "Pre Approval") {
            setUploadApprovalDocDataList((prev) => [...prev, values])
        } else {
            setUploadLabDocDataList([])
            setUploadApprovalDocDataList([])
        }

        // fileURL: values.file ? URL.createObjectURL(values.file) : null
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Scanned Documents</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddScannedDocModalOpen}
                            >Add Scanned Documents</button>
                            <button type="button" className="btn btn-success"
                            // onClick={handleDiagnosisHistoryModalOpen}
                            >Email Documents</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">

                    <div class="row">
                        <div class="col-12 ">
                            <p>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
                                    Lab
                                </button>
                            </p>
                            <div class="collapse" id="collapseExample1">

                                <div class="card card-body">
                                    {uploadDocLabDataList.length > 0 ? <div class="row">
                                        {uploadDocLabDataList.map((item) =>

                                            (item.docuement === "Lab" && item.file) ?

                                                Object.keys(item.file).map((key) => (
                                                    <div class="col-6">
                                                        <a
                                                            key={key}
                                                            href={URL.createObjectURL(item.file[key])}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.file[key].name}
                                                        </a>
                                                    </div>
                                                ))
                                                : ""

                                        )}
                                    </div> : "No documents found"}

                                </div>
                            </div>
                        </div>
                        <div class="col-12 ">
                            <p>
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
                                    Pre Approval
                                </button>
                            </p>
                            <div class="collapse" id="collapseExample2">
                                <div class="card card-body">
                                    {uploadDocApprovalDataList.length > 0 ? <div class="row">
                                        {uploadDocApprovalDataList.map((item) =>

                                            (item.docuement === "Pre Approval" && item.file) ?
                                                Object.keys(item.file).map((key) => (
                                                    <div class="col-6">
                                                        <a
                                                            key={key}
                                                            href={URL.createObjectURL(item.file[key])}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {item.file[key].name}
                                                        </a>
                                                    </div>
                                                ))
                                                : ""
                                        )}
                                    </div> : "No Documents Found"}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {addScannedDocModal && <AddScannedDocument handleAddScannedDocModalClose={handleAddScannedDocModalClose} uploadDocuments={uploadDocuments} documentType={"Scanned Documents"}/>}
        </div>
    )
}
export default ScannedDocuments;