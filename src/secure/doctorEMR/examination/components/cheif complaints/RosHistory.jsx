
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';

function RosHistory({ handleViewHistoryModalClose, reviewsAdded, setUpdatedReviewRow }) {
    const [updatedReviewRowList, setUpdatedReviewRowList] = useState([])

    const handleAddRos = (params) => {
        setUpdatedReviewRow((prevRos) => [...prevRos, params.row]);
    }

    const rows = [
        {
            id: 1,
            specialization: 'Headache',
            symptoms: '2 days',
            otherSystemResponse: 'Forehead',
        },
    ];

    const columns = [
        { field: 'specialization', headerName: 'Entered By', flex: 1 },
        { field: 'symptoms', headerName: 'Entered Date', flex: 1 },
        { field: 'otherSystemResponse', headerName: 'Chief Complaint', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained"
                    onClick={() => handleAddRos(params)}
                >Add</Button>
            )
        },
    ];


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
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Review Of History</h5>
                            <button type="button" className="btn-close"
                                onClick={handleViewHistoryModalClose}
                            ></button>
                        </div>
                        <div className="modal-body" style={{ height: 400 }}>
                            <DataGrid rows={updatedReviewRowList} columns={columns} pageSize={5} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default RosHistory;