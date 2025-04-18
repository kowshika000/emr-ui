import { useFormik } from 'formik';

function EditComplaints({ editSelectedComplaints, setUpdatedComplaints, handleEditComplaintsModalClose, updatedComplaints }) {

    const formik = useFormik({
        initialValues: editSelectedComplaints,
        enableReinitialize: true,
        onSubmit: (values) => {
            let index = updatedComplaints.findIndex((item) => item.id === values.id);
            const newUpdatedComplaints = [...updatedComplaints];
            if (index !== -1) {
                newUpdatedComplaints.splice(index, 1, values);
            } else {
                newUpdatedComplaints.push(values);
            }
            setUpdatedComplaints(newUpdatedComplaints);
            handleEditComplaintsModalClose()
        }

    });

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg" role="document">
                <form onSubmit={formik.handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Chief Complaints</h5>
                            <button type="button" className="btn-close" onClick={handleEditComplaintsModalClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="id">ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="id"
                                        name="id"
                                        placeholder="Enter ID"
                                        onChange={formik.handleChange}
                                        value={formik.values.id || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="enteredBy">Entered By</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="enteredBy"
                                        name="enteredBy"
                                        placeholder="Enter doctor name"
                                        onChange={formik.handleChange}
                                        value={formik.values.enteredBy || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="enteredDate">Entered Date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="enteredDate"
                                        name="enteredDate"
                                        placeholder="Enter the date"
                                        onChange={formik.handleChange}
                                        value={formik.values.enteredDate || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="chiefComplaint">Chief Complaint</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="chiefComplaint"
                                        name="chiefComplaint"
                                        placeholder="Enter the complaint"
                                        onChange={formik.handleChange}
                                        value={formik.values.chiefComplaint || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Duration/Onset</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="duration"
                                        name="duration"
                                        placeholder="Enter Duration/Onset"
                                        onChange={formik.handleChange}
                                        value={formik.values.duration || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quality">Quality</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="quality"
                                        name="quality"
                                        placeholder="Enter Quality"
                                        onChange={formik.handleChange}
                                        value={formik.values.quality || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="timing">Timing</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="timing"
                                        name="timing"
                                        placeholder="Enter Timing"
                                        onChange={formik.handleChange}
                                        value={formik.values.timing || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="symptoms">Associated Symptoms</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="symptoms"
                                        name="symptoms"
                                        placeholder="Enter Associated Symptoms"
                                        onChange={formik.handleChange}
                                        value={formik.values.symptoms || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="location"
                                        name="location"
                                        placeholder="Enter Location"
                                        onChange={formik.handleChange}
                                        value={formik.values.location || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="context">Context</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="context"
                                        name="context"
                                        placeholder="Enter Context"
                                        onChange={formik.handleChange}
                                        value={formik.values.context || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="modifyFactor">Modifying Factor</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="modifyFactor"
                                        name="modifyFactor"
                                        placeholder="Enter Modifying Factor"
                                        onChange={formik.handleChange}
                                        value={formik.values.modifyFactor || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="painScale">Pain Scale</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="painScale"
                                        name="painScale"
                                        placeholder="Enter Pain Scale"
                                        min="1"
                                        max="10"
                                        onChange={formik.handleChange}
                                        value={formik.values.painScale || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="remarks">Remarks</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="remarks"
                                        name="remarks"
                                        placeholder="Enter Remarks"
                                        onChange={formik.handleChange}
                                        value={formik.values.remarks || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="severity">Severity</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="severity"
                                        name="severity"
                                        placeholder="Enter Severity"
                                        onChange={formik.handleChange}
                                        value={formik.values.severity || ''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleEditComplaintsModalClose}>
                                Close
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Edit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditComplaints;
