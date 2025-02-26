import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useFormik } from 'formik';

function ViewAddNote({ handleViewAddNotesModalClose, notesType }) {
    const [isRemarksModalOpen, setRemarksModalOpen] = useState(false);
    const [addData, setAddData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [currentEditId, setCurrentEditId] = useState(null); // State for tracking editing

    const formik = useFormik({
        initialValues: {
            id: '',
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
                setCurrentEditId(null); // Reset edit mode
            } else {
                // Add new entry
                setAddData((prev) => [...prev, values]);
                setUpdateData((prev) => [...prev, values]);
            }

            handleCloseRemarksModal();
        },
    });

    const handleOpenRemarksModal = () => {
        formik.resetForm(); // Clear the form when opening for adding new data
        setCurrentEditId(null); // Clear edit mode when opening for new data
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
            {/* Main Modal for View Notes */}
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title">
                                {notesType === "Rad" ? "Radiology" : notesType === "Lab" ? "Laboratory" : ""}
                            </h5>
                            <div className="d-flex align-items-center">
                                <button type="button" className="btn btn-primary" onClick={handleOpenRemarksModal}>
                                    Add Remarks
                                </button>
                                <button type="button" className="btn-close" onClick={handleViewAddNotesModalClose} aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body" style={{ height: 400 }}>
                            <DataGrid rows={rows} columns={columns} pageSize={5} />
                        </div>
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
    );
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
            // Pre-fill the form for editing
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

export default ViewAddNote;
