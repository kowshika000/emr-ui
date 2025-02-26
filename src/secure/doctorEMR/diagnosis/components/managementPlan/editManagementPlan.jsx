import { useFormik } from 'formik';

function EditManagementPlan({ editSelectedManagementPlan, setupdatedManagementPlan, handleEditManagementPlanModalClose, updatedManagementPlan }) {
    const formik = useFormik({
        initialValues: editSelectedManagementPlan,
        enableReinitialize: true,
        onSubmit: (values) => {
            let index = updatedManagementPlan.findIndex((item) => item.id === values.id);
            const newUpdatedManagementPlan = [...updatedManagementPlan];
            if (index !== -1) {
                newUpdatedManagementPlan.splice(index, 1, values);
            } else {
                newUpdatedManagementPlan.push(values);
            }
            setupdatedManagementPlan(newUpdatedManagementPlan);
            handleEditManagementPlanModalClose()
        }

    });

    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Management Plan</h5>
                                <button type="button" className="btn-close" onClick={handleEditManagementPlanModalClose}></button>
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
                                        <label htmlFor="plan">Plan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="plan"
                                            name="plan"
                                            placeholder="Enter the plan"
                                            onChange={formik.handleChange}
                                            value={formik.values.plan || ''}
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
                                            value={formik.values.enteredBy || ''}
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
                                            value={formik.values.enteredDate || ''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleEditManagementPlanModalClose}>
                                    Close
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditManagementPlan;