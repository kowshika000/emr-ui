import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // This includes Popper.js which Bootstrap needs
import React, { useState } from "react";
import AddIssuedDocument from "./addIssuedDocuments"

const DocumentsIssued = () => {
    const [addIssuedDocModal, setAddIssuedDocModal] = useState(false)


    const handleAddIssuedDocModalOpen = () => {
        setAddIssuedDocModal(true)
    }

    const handleAddIssuedDocModalClose = () => {
        setAddIssuedDocModal(false)
    }

    const uploadDocuments = (values) => {

        console.log(values, "uploadDocuments values ")


    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Documents Issued</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddIssuedDocModalOpen}
                            >Issue Documents</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">

                    {"No Documents"}

                </div>
            </div>
            {addIssuedDocModal && <AddIssuedDocument handleAddIssuedDocModalClose={handleAddIssuedDocModalClose} uploadDocuments={uploadDocuments} documentType={"Issued Documents"}/>}
        </div>
    )
}
export default DocumentsIssued;