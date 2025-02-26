import AddComplaints from "./addComplaints"; 
import ComplaintsHistory from "./complaintsHistory";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditComplaints from "./editComplaints";

function DisplayComplaints() {
    const [addComplaintsModal, setAddComplaintsModal] = useState(false);
    const [viewHistoryModal, setViewHistoryModal] = useState(false);
    const [editComplaintsModal, setEditComplaintsModal] = useState(false); 
    const [selectedComplaint, setSelectedComplaint] = useState(null); 
    const [complaintAdded, setComplaintAdded] = useState([]);
    const [updatedComplaints, setUpdatedComplaints] = useState([]);
    
    const rows = [
        {
            id: 1,
            chiefComplaint: 'Headache',
            duration: '2 days',
            location: 'Forehead',
            quality: 'Throbbing',
            context: 'Stress',
            timing: 'Morning',
            modifyFactor: 'Rest',
            remarks: 'Recurring',
            severity: 'Mild',
            enteredBy: 'Dr. Smith',
        },
    ];

    const columns = [
        { field: 'chiefComplaint', headerName: 'Chief Complaint', flex: 1 },
        { field: 'duration', headerName: 'Duration/Onset', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'quality', headerName: 'Quality', flex: 1 },
        { field: 'context', headerName: 'Context', flex: 1 },
        { field: 'timing', headerName: 'Timing', flex: 1 },
        { field: 'modifyFactor', headerName: 'Modify Factor', flex: 1 },
        { field: 'remarks', headerName: 'Remarks', flex: 1 },
        { field: 'severity', headerName: 'Severity', flex: 1 },
        { field: 'enteredBy', headerName: 'Entered By', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => <OptionsMenu row={params.row} updatedComplaints={updatedComplaints} setUpdatedComplaints={setUpdatedComplaints} setEditComplaintsModal={setEditComplaintsModal} setSelectedComplaint={setSelectedComplaint} />, // Pass new props
        },
    ];

    const handleAddComplaintsModalOpen = () => {
        setAddComplaintsModal(true)
    }

    const handleAddComplaintsModalClose = () => {
        setAddComplaintsModal(false)
    }

    const handleViewHistoryModalOpen = () => {
        setViewHistoryModal(true)
    }

    const handleViewHistoryModalClose = () => {
        setViewHistoryModal(false)
    }

    const complaints = (value) => {
        setComplaintAdded((prevComplaints) => [...prevComplaints, value]);
        setUpdatedComplaints((prevComplaints) => [...prevComplaints, value]);
    }

    

    const handleEditComplaintsModalClose = () => {
        setEditComplaintsModal(false);
        setSelectedComplaint(null); 
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Chief Complaints</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddComplaintsModalOpen}
                            >Add Chief Complaints</button>
                            <button type="button" className="btn btn-success" onClick={handleViewHistoryModalOpen}>View History</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={updatedComplaints} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addComplaintsModal && <AddComplaints handleAddComplaintsModalClose={handleAddComplaintsModalClose} complaints={complaints} />}
            {viewHistoryModal && <ComplaintsHistory handleViewHistoryModalClose={handleViewHistoryModalClose} complaintAdded={complaintAdded} setUpdatedComplaints={setUpdatedComplaints}/>}
            {editComplaintsModal && <EditComplaints editSelectedComplaints={selectedComplaint} setUpdatedComplaints={setUpdatedComplaints} handleEditComplaintsModalClose={handleEditComplaintsModalClose} updatedComplaints={updatedComplaints} />} {/* Render EditComplaints modal */}
        </div>
    );
}

const OptionsMenu = ({ row, updatedComplaints, setUpdatedComplaints, setEditComplaintsModal, setSelectedComplaint }) => {
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
            let deleteComplaint = updatedComplaints.filter((item) => item.id !== row.id)
            setUpdatedComplaints(deleteComplaint);
        }
        if (action === "edit") {
            setSelectedComplaint(row); 
            setEditComplaintsModal(true); 
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
                    Edit Chief Complaints
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('delete')}>
                    Delete Chief Complaints
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DisplayComplaints;
