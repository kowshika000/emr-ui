import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useFormik } from 'formik';

const Remarks = () => {
    const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
    const [addData, setAddData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [currentEditId, setCurrentEditId] = useState(null);

    const formik = useFormik({
        initialValues: {
            id: '',  // Ensure this is unique for each entry
            remarks: '',
            enteredBy: ''
        },
        onSubmit: (values) => {
            if (currentEditId !== null) {
                // Edit existing row
                const updatedData = updateData.map((item) =>
                    item.id === currentEditId ? { ...item, ...values } : item
                );
                setUpdateData(updatedData);
                setCurrentEditId(null);
            } else {
                // Add new entry with a unique ID
                const newEntry = { ...values, id: new Date().getTime() };  // Example for generating unique ID
                setAddData((prev) => [...prev, newEntry]);
                setUpdateData((prev) => [...prev, newEntry]);
            }
            handleCloseRemarksModal();
        },
    });

    const handleOpenRemarksModal = () => {
        formik.resetForm();
        setCurrentEditId(null);
        setRemarksModalOpen(true);
    };

    const handleCloseRemarksModal = () => {
        setRemarksModalOpen(false);
    };

    const rows = updateData;

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'remarks', headerName: 'Remarks', flex: 1 },
        { field: 'enteredBy', headerName: 'Entered By', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => (
                <OptionsMenu
                    row={params.row}
                    updateData={updateData}
                    setUpdateData={setUpdateData}
                    setCurrentEditId={setCurrentEditId}
                    formik={formik}
                    setRemarksModalOpen={setRemarksModalOpen}
                />
            ),
        },
    ];

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Remarks</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleOpenRemarksModal}
                            >Add Remarks</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>

            {/* Add/Edit Remarks Modal */}
            {isRemarksModalOpen && (
                <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{currentEditId !== null ? 'Edit Remarks' : 'Add Remarks'}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseRemarksModal} aria-label="Close"></button>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <div className="col-12">
                                            <label>Id</label>
                                            <input
                                                type="text"
                                                name="id"
                                                className="form-control"
                                                placeholder="Enter ID"
                                                onChange={formik.handleChange}
                                                value={formik.values.id}
                                                disabled={currentEditId !== null} // Disable during edit
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label>Entered By</label>
                                            <input
                                                type="text"
                                                name="enteredBy"
                                                className="form-control"
                                                placeholder="Entered By"
                                                onChange={formik.handleChange}
                                                value={formik.values.enteredBy}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="remarks" className="form-label">Remarks</label>
                                            <textarea
                                                className="form-control"
                                                id="remarks"
                                                rows="3"
                                                placeholder="Enter your remarks here"
                                                onChange={formik.handleChange}
                                                value={formik.values.remarks}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseRemarksModal}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">{currentEditId !== null ? 'Update' : 'Submit'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const OptionsMenu = ({ row, updateData, setUpdateData, setCurrentEditId, formik, setRemarksModalOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (action) => {
        if (action === 'edit') {
            setCurrentEditId(row.id);
            formik.setValues(row); // Set the form fields with the current row data
            setRemarksModalOpen(true); // Open the modal for editing
        } else if (action === 'delete') {
            const updatedData = updateData.filter((item) => item.id !== row.id);
            setUpdateData(updatedData);
        }

        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={() => handleMenuClick('edit')}>Edit</MenuItem>
                <MenuItem onClick={() => handleMenuClick('delete')}>Delete</MenuItem>
            </Menu>
        </div>
    );
};

export default Remarks;
