import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';

function AddManagementPlan({ handleAddManagementPlanModalClose, ManagementPlan }) {
    const formik = useFormik({
        initialValues: {
            id: '',
            plan: '',
            enteredBy: '',
            enteredDate: new Date()
        },
        onSubmit: (values) => {
            ManagementPlan(values)
            console.log(values, "values")
            handleAddManagementPlanModalClose()
        },
    });

    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Management Plan</h5>
                                <button type="button" className="btn-close" onClick={handleAddManagementPlanModalClose}></button>
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
                                        <label htmlFor="plan">Plan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="plan"
                                            name="plan"
                                            placeholder="Enter the plan"
                                            onChange={formik.handleChange}
                                            value={formik.values.plan}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="enteredBy">Enter By</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="enteredBy"
                                            name="enteredBy"
                                            placeholder="Enter your name"
                                            onChange={formik.handleChange}
                                            value={formik.values.enteredBy}
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
                                <button type="button" className="btn btn-secondary" onClick={handleAddManagementPlanModalClose}>
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
export default AddManagementPlan;