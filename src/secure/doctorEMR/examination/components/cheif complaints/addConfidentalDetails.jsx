import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
function AddConfidentalDetails({ handleAddConfidentalDetailsClose, ConfidentalDetails }) {

    const formik = useFormik({
        initialValues: {
            id: '',
            confidentaldetails: '',
        },
        onSubmit: (values) => {

            ConfidentalDetails(values)

            handleAddConfidentalDetailsClose()
        },
    });
    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Clinical Examination</h5>
                                <button type="button" className="btn-close" onClick={handleAddConfidentalDetailsClose}></button>
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
                                        <label htmlFor="duration">Confidental Details</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="confidentaldetails"
                                            name="confidentaldetails"
                                            placeholder="Enter confidental details"
                                            onChange={formik.handleChange}
                                            value={formik.values.confidentaldetails}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleAddConfidentalDetailsClose}>
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
export default AddConfidentalDetails;