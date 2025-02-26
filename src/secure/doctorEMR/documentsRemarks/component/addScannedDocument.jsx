
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const AddScannedDocument = ({ handleAddScannedDocModalClose, uploadDocuments }) => {

    const initialValues = {
        docuement: '',
        file: null,
    };

    const handleSubmit = (values) => {
        let errors = {};

        if (!values.docuement) {
            errors.category = 'Please select a document type';
        }
        if (!values.file) {
            errors.file = 'Please upload a file';
        }

        if (Object.keys(errors).length > 0) {
            alert('Please fill out all required fields');
            return; 
        }

        uploadDocuments(values)
       
        
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values, errors, touched }) => (
                <Form>
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-md" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Attachment</h5>
                                    <button type="button" className="btn-close" onClick={handleAddScannedDocModalClose}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <label htmlFor="category">Document Type</label>
                                            <Field as="select" className="form-select" id="docuement" name="docuement">
                                                <option value="">Select a document</option>
                                                <option value="Lab">Lab</option>
                                                <option value="Pre Approval">Pre Approval</option>
                                            </Field>
                                            {errors.category && touched.category && (
                                                <div className="text-danger">{errors.category}</div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="file">File Upload</label>
                                            <input
                                                type="file"
                                                id="file"
                                                name="file"
                                                onChange={(event) => {
                                                    const file = event.currentTarget.files;
                                                    setFieldValue("file", file);
                                                }}
                                                className="form-control"
                                                multiple
                                            />
                                            {errors.file && touched.file && (
                                                <div className="text-danger">{errors.file}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleAddScannedDocModalClose}>
                                        Close
                                    </button>
                                    <button className="btn btn-primary" type="submit">
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddScannedDocument;
