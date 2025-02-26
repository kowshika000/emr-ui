import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddProvisionalDiagnosis from './addProvisionalDiagnosis';
import ProvisionalDiagnosisHistory from './provisionalDiagnosisHistory';

function DisplayProvisionalDiagnosis() {
    const [addProvisionalDiagnosisModal, setAddProvisionalDiagnosisModal] = useState(false);
    const [provisionalDiagnosisHistoryModal, setProvisionalDiagnosisHistoryModal] = useState(false);
    const [provisionalDiagnosisAdded, setprovisionalDiagnosisAdded] = useState([]);
    const [updatedProvisionalDiagnosis, setupdatedProvisionalDiagnosis] = useState([]);

    const handleAddProvisionalDiagnosisModalOpen = () => {
        setAddProvisionalDiagnosisModal(true)
    }

    const handleAddProvisionalDiagnosisModalClose = () => {
        setAddProvisionalDiagnosisModal(false)
    }

    const handleProvisionalDiagnosisHistoryModalOpen = () => {
        setProvisionalDiagnosisHistoryModal(true)
    }

    const handleProvisionalDiagnosisHistoryModalClose = () => {
        setProvisionalDiagnosisHistoryModal(false)
    }


    const rows = [
        {
            id: 1,
            provisionalDiagnosis: 'Primary',
            enteredDate: 'C25.0',
        },
    ];

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'provisionalDiagnosis', headerName: 'Provisional Diagnosis', flex: 1 },
        { field: 'enteredDate', headerName: ' Entered Date', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => <OptionsMenu
                row={params.row}
                updatedProvisionalDiagnosis={updatedProvisionalDiagnosis}
                setupdatedProvisionalDiagnosis={setupdatedProvisionalDiagnosis}
            />,
        },

    ];

    const ProvisionalDiagnosis = (value) => {
        setprovisionalDiagnosisAdded((prev) => [...prev, value]);
        setupdatedProvisionalDiagnosis((prev) => [...prev, value]);
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Provisional Diagnosis</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddProvisionalDiagnosisModalOpen}
                            >Add Diagnosis</button>
                            <button type="button" className="btn btn-success"
                                onClick={handleProvisionalDiagnosisHistoryModalOpen}
                            >View History</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={updatedProvisionalDiagnosis} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addProvisionalDiagnosisModal && <AddProvisionalDiagnosis handleAddProvisionalDiagnosisModalClose={handleAddProvisionalDiagnosisModalClose}
                ProvisionalDiagnosis={ProvisionalDiagnosis}
            />}
            {provisionalDiagnosisHistoryModal && <ProvisionalDiagnosisHistory
                handleProvisionalDiagnosisHistoryModalClose={handleProvisionalDiagnosisHistoryModalClose}
                provisionalDiagnosisAdded={provisionalDiagnosisAdded}
                setupdatedProvisionalDiagnosis={setupdatedProvisionalDiagnosis}
            />}
        </div>
    )
}

const OptionsMenu = ({ row, setupdatedProvisionalDiagnosis, updatedProvisionalDiagnosis }) => {
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
            let deleteDiagnosis = updatedProvisionalDiagnosis.filter((item) => item.id !== row.id)
            setupdatedProvisionalDiagnosis(deleteDiagnosis);
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

export default DisplayProvisionalDiagnosis;