import { useFormik, Field, FormikProvider } from 'formik';
import React, { useState, useEffect } from 'react';

function AddInvestigation({ handleAddInvestigationModalClose, investigation }) {


    const formik = useFormik({
        initialValues: {
            id: '',
            procedureName: '',
            insurance: '',
            preApp: "",
            quantity: "",
            price: "",
            serviceStatus: "",
            billStatus: "",
            remarks: "",
            discount: "",
            emergency: "",
            covered: "",
            serviceBy: "",
            serviceDatetime: new Date()
        },
        onSubmit: (values) => {
            investigation(values)
            handleAddInvestigationModalClose();
        },
    });

    return (
        <div>
            <FormikProvider value={formik}>
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Investigation</h5>
                                    <button type="button" className="btn-close" onClick={handleAddInvestigationModalClose}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label>Id</label>
                                            <input
                                                type="text"
                                                name='id'
                                                className="form-control"
                                                placeholder="Enter ID"
                                                onChange={formik.handleChange}
                                                value={formik.values.id}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <label>Search Investigation</label>

                                            <select
                                                className="form-control"
                                                name="labTestName"
                                                onChange={formik.handleChange}
                                                value={formik.values.labTestName}
                                            >
                                                <option value="Complete blood count (CBC)">Complete blood count (CBC)</option>
                                                <option value="Lipid panel">Lipid panel</option>
                                                <option value="Thyroid function tests">Thyroid function tests</option>
                                                <option value="Urinalysis">Urinalysis</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <label>Normal Rate</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.drugForm}
                                                name="drugForm"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label>Quantity</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.quantity}
                                                name="quantity"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label>Price</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.price}
                                                name="price"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <label>Discount</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.discount}
                                                name="discount"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label>Emergency</label>
                                            <select
                                                className="form-control"
                                                name="emergency"
                                                onChange={formik.handleChange}
                                                value={formik.values.emergency}
                                            >
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>

                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div id="my-radio-group"><label>Covered</label></div>
                                            <div role="group" aria-labelledby="my-radio-group">
                                                <label>
                                                    <Field type="radio" name="covered" value="No" />
                                                    No
                                                </label>
                                                <label>
                                                    <Field type="radio" name="covered" value="Yes" />
                                                    Yes
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <label>Pre App</label>
                                            <select
                                                className="form-control"
                                                name="preApp"
                                                onChange={formik.handleChange}
                                                value={formik.values.preApp}
                                            >
                                                <option value="Required">Required</option>
                                                <option value="Not Required">Not Required</option>

                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <label>Co-Insurance</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.insurance}
                                                name="insurance"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <label>Service By</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.serviceBy}
                                                name="serviceBy"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-4">
                                            <label>Service Date and Time</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.serviceDatetime}
                                                name="serviceDatetime"
                                            />
                                        </div>
                                        <div className="col-8">
                                            <label>Remarks</label>
                                            <textarea
                                                className="form-control"
                                                name="remarks"
                                                onChange={formik.handleChange}
                                                value={formik.values.remarks}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleAddInvestigationModalClose}>
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
            </FormikProvider>
        </div>
    )
}
export default AddInvestigation;