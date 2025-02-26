import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';

function AddDiagnosis({ handleAddDiagnosisModalClose, Diagnosis }) {
    const formik = useFormik({
        initialValues: {
            id: '',
            category: '',
            IcdCode: '',
            diagnosis: ''
        },
        onSubmit: (values) => {
            Diagnosis(values)
            handleAddDiagnosisModalClose()
        },
    });

    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Final Diagnosis</h5>
                                <button type="button" className="btn-close" onClick={handleAddDiagnosisModalClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="duration">id</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="id"
                                            name="id"
                                            placeholder="Enter id"
                                            onChange={formik.handleChange}
                                            value={formik.values.id}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <select class="form-select" id="category"
                                            name="category" aria-label="Default select example" onChange={formik.handleChange}
                                            value={formik.values.category}>
                                            <option value="">Select a Category</option>
                                            <option value="Primary">Primary</option>
                                            <option value="Secondary">Secondary</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="IcdCode">ICD Code</label>
                                        <select class="form-select" id="IcdCode"
                                            name="IcdCode" aria-label="Default select example" onChange={formik.handleChange}
                                            value={formik.values.IcdCode}>
                                            <option value="">Select a ICD Code</option>
                                            <option value="C25.0">C25.0</option>
                                            <option value="A42.1">A42.1</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="diagnosis">Diagnosis</label>
                                        <select class="form-select" id="diagnosis"
                                            name="diagnosis" aria-label="Default select example" onChange={formik.handleChange}
                                            value={formik.values.diagnosis}>
                                            <option value="">Select a Diagnosis</option>
                                            <option value="Malignant neoplasm of head of pancreas">Malignant neoplasm of head of pancreas - C25.0</option>
                                            <option value="Abdominal actinomycosis">Abdominal actinomycosis - A42.1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleAddDiagnosisModalClose}>
                                    Close
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddDiagnosis;