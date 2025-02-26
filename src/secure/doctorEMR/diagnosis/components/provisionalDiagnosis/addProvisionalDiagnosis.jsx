import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';

function AddProvisionalDiagnosis({ handleAddProvisionalDiagnosisModalClose, ProvisionalDiagnosis }) {
    const formik = useFormik({
        initialValues: {
            id: '',
            provisionalDiagnosis: '',
            enteredDate: new Date(),
        },
        onSubmit: (values) => {
            ProvisionalDiagnosis(values)
            handleAddProvisionalDiagnosisModalClose()
        },
    });

    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Provisional Diagnosis</h5>
                                <button type="button" className="btn-close" onClick={handleAddProvisionalDiagnosisModalClose}></button>
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
                                        <label htmlFor="plan">Provisional Diagnosis</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="provisionalDiagnosis"
                                            name="provisionalDiagnosis"
                                            placeholder="Enter the Provisional Diagnosis"
                                            onChange={formik.handleChange}
                                            value={formik.values.provisionalDiagnosis}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enteredDate">Entered Date and Time </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="enteredDate"
                                            name="enteredDate"
                                            onChange={formik.handleChange}
                                            value={formik.values.enteredDate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleAddProvisionalDiagnosisModalClose}>
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
export default AddProvisionalDiagnosis;