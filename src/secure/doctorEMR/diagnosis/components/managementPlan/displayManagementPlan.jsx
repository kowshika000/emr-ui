import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddManagementPlan from './addManagementPlan';
import ManagementPlanHistory from './managementPlanHistory';
import EditManagementPlan from './editManagementPlan';

function DisplayManagementPlan() {
    const [addManagementPlanModal, setAddManagementPlanModal] = useState(false);
    const [managementPlanHistoryModal, setManagementPlanHistoryModal] = useState(false);
    const [managementPlan, setManagementPlan] = useState([]);
    const [updatedManagementPlan, setupdatedManagementPlan] = useState([]);
    const [editManagementPlanModal, setManagementPlanModal] = useState(false);
    const [selectedManagementPlan, setSelectedManagementPlan] = useState(null);

    const handleAddManagementPlanModalOpen = () => {
        setAddManagementPlanModal(true)
    }

    const handleAddManagementPlanModalClose = () => {
        setAddManagementPlanModal(false)
    }

    const handleManagementPlanHistoryModalOpen = () => {
        setManagementPlanHistoryModal(true)
    }

    const handleManagementPlanHistoryModalClose = () => {
        setManagementPlanHistoryModal(false)
    }


    const rows = [
        {
            id: 1,
            plan: 'Primary',
            enteredBy: 'C25.0',
            enteredDate: 'C25.0'
        },
    ];

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'plan', headerName: 'Plan', flex: 1 },
        { field: 'enteredBy', headerName: 'Entered By', flex: 1 },
        { field: 'enteredDate', headerName: 'Entered Date', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => <OptionsMenu
                row={params.row}
                updatedManagementPlan={updatedManagementPlan}
                setupdatedManagementPlan={setupdatedManagementPlan}
                setSelectedManagementPlan={setSelectedManagementPlan}
                setManagementPlanModal={setManagementPlanModal}
            />,
        },

    ];

    const ManagementPlan = (value) => {
        setManagementPlan((prev) => [...prev, value]);
        setupdatedManagementPlan((prev) => [...prev, value]);
    }

    const handleEditManagementPlanModalClose = () => {
        setManagementPlanModal(false);
        setSelectedManagementPlan(null);
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Management Plan</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddManagementPlanModalOpen}
                            >Add Management Plan</button>
                            <button type="button" className="btn btn-success"
                                onClick={handleManagementPlanHistoryModalOpen}
                            >View History</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={updatedManagementPlan} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addManagementPlanModal && <AddManagementPlan handleAddManagementPlanModalClose={handleAddManagementPlanModalClose}
                ManagementPlan={ManagementPlan}
            />}
            {managementPlanHistoryModal && <ManagementPlanHistory
                handleManagementPlanHistoryModalClose={handleManagementPlanHistoryModalClose}
                managementPlan={managementPlan}
                setupdatedManagementPlan={setupdatedManagementPlan}
            />}
            {
                editManagementPlanModal && <EditManagementPlan editSelectedManagementPlan={selectedManagementPlan} setupdatedManagementPlan={setupdatedManagementPlan} handleEditManagementPlanModalClose={handleEditManagementPlanModalClose} updatedManagementPlan={updatedManagementPlan} />
            }
        </div>
    )
}

const OptionsMenu = ({ row, updatedManagementPlan, setupdatedManagementPlan, setManagementPlanModal, setSelectedManagementPlan }) => {
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
            let deleteManagementPlan = updatedManagementPlan.filter((item) => item.id !== row.id)
            setupdatedManagementPlan(deleteManagementPlan);
        }
        if (action === "edit") {
            setSelectedManagementPlan(row);
            setManagementPlanModal(true);
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
                    Edit
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('delete')}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DisplayManagementPlan;