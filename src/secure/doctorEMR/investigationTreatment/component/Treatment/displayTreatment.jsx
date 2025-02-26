
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddTreatment from './addTreatment';
import ViewHistory from './viewHistory';


function DisplayTreatment() {
    const [addTreatmentModal, setaddTreatmentModal] = useState(false);
    const [viewHistoryModal, setViewHistoryModal] = useState(false);
    const [treatmentAdded, setTreatmentAdded] = useState([]);
    const [updatedTreatment, setupdatedTreatment] = useState([]);

    const rows = [
        {
            id: 1,
            procedureName: 'THIAMINE (VITAMIN B1) [100 MG/ML]',
            insurance: 'THIAMINE:SOLUTION FOR INJECTION (2ML, AMPOULE)',
            preApp: "Active",
            quantity: "Injection Regular",
            price: "1 Mol",
            serviceStatus: "1",
            billStatus: "IV",
            dosageDetails: "IV",
            remarks: "2",
        },
    ];

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'procedureName', headerName: 'Procedure Name', flex: 1 },
        { field: 'insurance', headerName: 'Insurance', flex: 1 },
        { field: 'preApp', headerName: 'Pre App', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
        { field: 'serviceStatus', headerName: 'Service Status', flex: 1 },
        { field: 'billStatus', headerName: 'Bill Status', flex: 1 },
        { field: 'dosageDetails', headerName: 'Dosage Details', flex: 1 },
        { field: 'remarks', headerName: 'Remarks', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => <OptionsMenu
                row={params.row}
                updatedTreatment={updatedTreatment}
                setupdatedTreatment={setupdatedTreatment}
            />,
        },

    ];

    const handleAddTreatmentModalOpen = () => {
        setaddTreatmentModal(true)
    }

    const handleAddTreatmentModalClose = () => {
        setaddTreatmentModal(false)
    }

    const handleViewHistoryModalOpen = () => {
        setViewHistoryModal(true)
    }

    const handleViewHistoryModalClose = () => {
        setViewHistoryModal(false)
    }

    const treatment = (value) => {
        setTreatmentAdded((prev) => [...prev, value]);
        setupdatedTreatment((prev) => [...prev, value]);
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Treatment</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddTreatmentModalOpen}
                            >Add Procedure</button>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleViewHistoryModalOpen}
                            > View History</button>
                            <button type="button" className="btn btn-success me-2"

                            >Print Request</button>
                            <button type="button" className="btn btn-success me-2"

                            >Update Procedure Status</button>
                            <button type="button" className="btn btn-success me-2"

                            >Print Treatment Request</button>

                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={updatedTreatment} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addTreatmentModal && <AddTreatment handleAddTreatmentModalClose={handleAddTreatmentModalClose} treatment={treatment} />}
            {viewHistoryModal && <ViewHistory handleViewHistoryModalClose={handleViewHistoryModalClose} treatmentAdded={treatmentAdded} setupdatedTreatment={setupdatedTreatment} />}
        </div>
    )
}

const OptionsMenu = ({ row, updatedTreatment, setupdatedTreatment }) => {
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
            let deleteDiagnosis = updatedTreatment.filter((item) => item.id !== row.id)
            setupdatedTreatment(deleteDiagnosis);
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
export default DisplayTreatment;