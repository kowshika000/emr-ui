import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddDiagnosis from './addDiagnosis';
import DiagnosisHistory from './diagnosisHistory';

function DisplayDiagnosis() {
    const [addDiagnosisModal, setAddDiagnosisModal] = useState(false);
    const [diagnosisHistoryModal, setDiagnosisHistoryModal] = useState(false);
    const [diagnosisAdded, setdiagnosisAdded] = useState([]);
    const [updatedDiagnosis, setupdatedDiagnosis] = useState([]);

    const handleAddDiagnosisModalOpen = () => {
        setAddDiagnosisModal(true)
    }

    const handleAddDiagnosisModalClose = () => {
        setAddDiagnosisModal(false)
    }

    const handleDiagnosisHistoryModalOpen = () => {
        setDiagnosisHistoryModal(true)
    }

    const handleDiagnosisHistoryModalClose = () => {
        setDiagnosisHistoryModal(false)
    }


    const rows = [
        {
            id: 1,
            category: 'Primary',
            IcdCode: 'C25.0',
            diagnosis: "Malignant neoplasm of head of pancreas"
        },
    ];

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'IcdCode', headerName: 'ICD Code', flex: 1 },
        { field: 'diagnosis', headerName: 'Diagnosis', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => <OptionsMenu
            row={params.row} 
            updatedDiagnosis={updatedDiagnosis} 
            setupdatedDiagnosis={setupdatedDiagnosis} 
            />,
        },

    ];

    const Diagnosis = (value) => {
        setdiagnosisAdded((prev) => [...prev, value]);
        setupdatedDiagnosis((prev) => [...prev, value]);
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Diagnosis</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddDiagnosisModalOpen}
                            >Add Diagnosis</button>
                            <button type="button" className="btn btn-success"
                                onClick={handleDiagnosisHistoryModalOpen}
                            >View History</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={updatedDiagnosis} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addDiagnosisModal && <AddDiagnosis handleAddDiagnosisModalClose={handleAddDiagnosisModalClose}
                Diagnosis={Diagnosis}
            />}
            {diagnosisHistoryModal && <DiagnosisHistory 
            handleDiagnosisHistoryModalClose={handleDiagnosisHistoryModalClose}
            diagnosisAdded={diagnosisAdded} 
            setupdatedDiagnosis={setupdatedDiagnosis}
            />}
        </div>
    )
}

const OptionsMenu = ({ row, updatedDiagnosis, setupdatedDiagnosis }) => {
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
            let deleteDiagnosis = updatedDiagnosis.filter((item) => item.id !== row.id)
            setupdatedDiagnosis(deleteDiagnosis);
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

                <MenuItem onClick={() => handleMenuClick('delete')}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DisplayDiagnosis;