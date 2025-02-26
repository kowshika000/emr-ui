
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import jsPDF from 'jspdf';

function getDate() {
    const today = new Date();
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
}

const AddIssuedDocument = ({ handleAddIssuedDocModalClose, uploadDocuments, documentType }) => {
    const [currentDate, setCurrentDate] = useState(getDate());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [value, setValue] = useState("");

    const initialValues = {
        document: '',
        date: '',
        speciality: '',
        doctor: '',
        startDate: null,
        endDate: null,
    };

    const getTemplateForSpeciality = (speciality, documentType, startDate, endDate, doctor) => {

        return `
            <h3>${speciality === "" || undefined ? "" : speciality} Report</h3>
            <p><strong>Document Type:</strong> ${documentType === "" || undefined ? "" : documentType}</p>
            <p><strong>Start Date:</strong> ${startDate === "" || undefined ? "" : startDate}</p>
            <p><strong>End Date:</strong> ${endDate === "" || undefined ? "" : endDate}</p>
            <p><strong>Doctor:</strong> ${doctor === "" || undefined ? "" : doctor}</p>
            <p>Patient Signature: _________________________</p>
        `;
    };

    const handleFileSave = (content, fileName) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const fileURL = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName;
        a.click();

       
        URL.revokeObjectURL(fileURL);

    }

    const handleSubmit = (values) => {
        const textContent = value.replace(/<[^>]+>/g, ''); // Remove HTML tags
        const doc = new jsPDF();
        doc.text(textContent, 50, 50);
        doc.save('Issued_document.pdf'); // Name of the file
        // handleFileSave(getTemplateForSpeciality, 'document_template.txt'); // Save the template as a file
        uploadDocuments(values);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ setFieldValue, values }) => (
                <Form>
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-md" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{documentType}</h5>
                                    <button type="button" className="btn-close" onClick={handleAddIssuedDocModalClose}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Document Type</label>
                                            <Field as="select" className="form-select" name="document">
                                                <option value="">Select a document</option>
                                                <option value="Lab">Lab</option>
                                                <option value="Pre Approval">Pre Approval</option>
                                            </Field>
                                        </div>
                                        <div className="col-6">
                                            <label>Date</label>
                                            <div className="d-flex align-items-center">
                                                <DatePicker
                                                    selected={values.startDate}
                                                    onChange={(date) => setFieldValue("startDate", date)}
                                                    className="form-control"
                                                    placeholderText="Select start date"
                                                />
                                                <DatePicker
                                                    selected={values.endDate}
                                                    onChange={(date) => setFieldValue("endDate", date)}
                                                    className="form-control"
                                                    placeholderText="Select end date"
                                                    minDate={values.startDate}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <label>Doctor</label>
                                            <Field as="select" className="form-select" id="doctor" name="doctor" onChange={(e) => {
                                                setFieldValue('doctor', e.target.value);
                                            }}>
                                                <option value="">Select a doctor</option>
                                                <option value="Punithaa">Punithaa</option>
                                                <option value="Shree">Shree</option>
                                            </Field>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="speciality">Speciality</label>
                                            <Field as="select" className="form-select" name="speciality" onChange={(e) => {
                                                const speciality = e.target.value;
                                                const template = getTemplateForSpeciality(
                                                    values.speciality,
                                                    values.document,
                                                    values.startDate?.toLocaleDateString() || '',
                                                    values.endDate?.toLocaleDateString() || '',
                                                    values.doctor
                                                );
                                                setValue(template);
                                                setFieldValue('speciality', speciality);
                                            }}>
                                                <option value="">Select a speciality</option>
                                                <option value="Cardio">Cardio</option>
                                                <option value="General Practice">General Practice</option>
                                            </Field>
                                        </div>
                                        <div className="col-12 mt-4">
                                            <div className="d-flex align-items-center justify-content-center gap-3">
                                                <button type="button" className="btn btn-secondary " onClick={handleAddIssuedDocModalClose}>Close</button>
                                                <button type="button" onClick={() => {
                                                    const template = getTemplateForSpeciality(
                                                        values.speciality,
                                                        values.document,
                                                        values.startDate?.toLocaleDateString() || '',
                                                        values.endDate?.toLocaleDateString() || '',
                                                        values.doctor
                                                    );
                                                    setValue(template);  // Populate the Quill editor with the template
                                                }} className="btn btn-primary">Update</button>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-4">
                                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleAddIssuedDocModalClose}>Close</button>
                                    <button className="btn btn-primary" type="submit">File Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddIssuedDocument;
