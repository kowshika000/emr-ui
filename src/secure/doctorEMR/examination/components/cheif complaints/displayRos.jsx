import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RosHistory from "./RosHistory";
import AddRos from "./addRos";

function DisplayRos() {
    const [viewHistoryModal, setViewHistoryModal] = useState(false);
    const [addRosModal, setAddRosModal] = useState(false);
    const [reviewsAdded, setReviewsAdded] = useState([]);
    const [updatedReviewRowList, setUpdatedReviewRowList] = useState([])


    const rows = [
        {
            id: 1,
            specialization: 'Headache',
            symptoms: [1, 2, 3, 4, 5],
            otherSystemResponse: [{ "Obj": [1, 2, 3, 4, 5] }],
        },
    ];

    const columns = [
        { field: 'specialization', headerName: 'Specialization', flex: 1 },
        { field: 'symptoms', headerName: 'Symptoms', flex: 1 },
        { field: 'otherSystemResponse', headerName: 'Other System Response', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => <OptionsMenu row={params.row}
                setUpdatedReviewRowList={setUpdatedReviewRowList}
                updatedReviewRowList={updatedReviewRowList}
            // updatedComplaints={updatedComplaints} 
            // setUpdatedComplaints={setUpdatedComplaints} 
            // setEditComplaintsModal={setEditComplaintsModal} 
            // setSelectedComplaint={setSelectedComplaint} 
            />,
        },
    ];

    const handleAddRosModalOpen = () => {
        setAddRosModal(true)
    }

    const handleAddRosModalClose = () => {
        setAddRosModal(false)
    }

    const handleViewHistoryModalOpen = () => {
        setViewHistoryModal(true)
    }

    const handleViewHistoryModalClose = () => {
        setViewHistoryModal(false)
    }

    const reviews = (value) => {
        setReviewsAdded((prevReviews) => [...prevReviews, value]);
        // setUpdatedComplaints((prevComplaints) => [...prevComplaints, value]);
    }


    useEffect(() => {
        //Updated Rows
        let updatedRowResult = reviewsAdded.map((item, index) => {


            const key = Object.keys(item.checkedItems)[0];
            const values = item.checkedItems[key].join(',');

            const result = `${key} - ${values}`;


            return {
                id: index + 1,
                specialization: item.specialization.label,
                symptoms: item.symptoms,
                otherSystemResponse: result,
            };
        });
        setUpdatedReviewRowList(updatedRowResult)
    }, [reviewsAdded])

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Review Of System</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddRosModalOpen}
                            >Add Review Of System</button>
                            <button type="button" className="btn btn-success"
                                onClick={handleViewHistoryModalOpen}
                            >View ROS History</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={updatedReviewRowList} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addRosModal && <AddRos handleAddRosModalClose={handleAddRosModalClose}
                reviews={reviews}
            />}

            {viewHistoryModal && <RosHistory handleViewHistoryModalClose={handleViewHistoryModalClose}
                reviewsAdded={reviewsAdded}
                setUpdatedReviewRow={setUpdatedReviewRowList}
            />}

        </div>
    )
}

const OptionsMenu = ({ row, updatedReviewRowList, setUpdatedReviewRowList, setEditComplaintsModal, setSelectedComplaint }) => {
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
            let deleteComplaint = updatedReviewRowList.filter((item) => item.id !== row.id)
            setUpdatedReviewRowList(deleteComplaint);
        }
        // if (action === "edit") {
        //     setSelectedComplaint(row); 
        //     setEditComplaintsModal(true); 
        // }
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
                    Delete ROS
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DisplayRos;