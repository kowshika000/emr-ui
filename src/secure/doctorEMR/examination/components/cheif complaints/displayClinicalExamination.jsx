import AddClinicalExamination from "./AddClinicalExamination";
import EditClinicalExamination from "./EditClinicalExamination";
import ClinicalExaminationHistory from "./ClinicalExaminationHistory";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function DisplayClinicalExamination() {
    const [addExaminationModal, setAddExaminationModal] = useState(false);
    const [viewHistoryModal, setViewHistoryModal] = useState(false);
    const [examinationAdded, setexaminationAdded] = useState([]);
    const [updatedExamination, setUpdatedExamination] = useState([]);
    const [editExaminationModal, setEditExaminationModal] = useState(false);
    const [selectedExamination, setSelectedExamination] = useState(null);

    const rows = [
        {
            id: 1,
            clinicalExamination: 'Headache',
        },
    ];

    const columns = [
        { field: 'clinicalExamination', headerName: 'Clinical Examination', flex: 1 },

        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => <OptionsMenu row={params.row}
                updatedExamination={updatedExamination}
                setUpdatedExamination={setUpdatedExamination}
                setEditExaminationModal={setEditExaminationModal}
                setSelectedExamination={setSelectedExamination}
            />,
        },
    ];

    const handleAddExaminationModalOpen = () => {
        setAddExaminationModal(true)
    }

    const handleAddExaminationModalClose = () => {
        setAddExaminationModal(false)
    }

    const handleViewHistoryModalOpen = () => {
        setViewHistoryModal(true)
    }

    const handleViewHistoryModalClose = () => {
        setViewHistoryModal(false)
    }

    const Examination = (value) => {
        setexaminationAdded((prevExamination) => [...prevExamination, value]);
        setUpdatedExamination((prevExamination) => [...prevExamination, value]);
    }

    const handleEditExaminationModalClose = () => {
        setEditExaminationModal(false);
        setSelectedExamination(null);
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Clinical Examination</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddExaminationModalOpen}
                            >Add Clinical Examination</button>
                            <button type="button" className="btn btn-success" onClick={handleViewHistoryModalOpen}>View History</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={updatedExamination} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addExaminationModal && <AddClinicalExamination handleAddExaminationModalClose={handleAddExaminationModalClose} Examination={Examination} />}
            {viewHistoryModal && <ClinicalExaminationHistory handleViewHistoryModalClose={handleViewHistoryModalClose} examinationAdded={examinationAdded} setUpdatedExamination={setUpdatedExamination} />}
            {editExaminationModal && <EditClinicalExamination editSelectedComplaints={selectedExamination} setUpdatedExamination={setUpdatedExamination} handleEditExaminationModalClose={handleEditExaminationModalClose} updatedExamination={updatedExamination} />}
        </div>
    )
}

const OptionsMenu = ({ row,
    updatedExamination,
    setUpdatedExamination,
    setSelectedExamination,
    setEditExaminationModal
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (action) => {
        handleClose();
        if (action === "delete") {
            let deleteComplaint = updatedExamination.filter((item) => item.id !== row.id)
            setUpdatedExamination(deleteComplaint);
        }
        if (action === "edit") {
            setSelectedExamination(row);
            setEditExaminationModal(true);
        }
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleMenuClick('edit')}>
                    Edit Examination
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('delete')}>
                    Delete Examination
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DisplayClinicalExamination;