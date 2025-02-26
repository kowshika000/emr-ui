import AddConfidentalDetails from "./addConfidentalDetails";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DisplayConfidentalDetails() {
    const [addConfidentalDetailsModal, setAddConfidentalDetailsModal] = useState(false);
    const [confidentalDetailsAdded, setconfidentalDetailsAdded] = useState([]);

    const rows = [
        {
            id: 1,
            confidentaldetails: 'Headache',
        },
    ];

    const columns = [
        { field: 'confidentaldetails', headerName: 'Confidental Detail', flex: 1 },


    ];

    const handleAddConfidentalDetailsOpen = () => {
        setAddConfidentalDetailsModal(true)
    }

    const handleAddConfidentalDetailsClose = () => {
        setAddConfidentalDetailsModal(false)
    }

    const ConfidentalDetails = (value) => {
        setconfidentalDetailsAdded((prev) => [...prev, value]);
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Confidental Details</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleAddConfidentalDetailsOpen}
                            >Add Confidental Details</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={confidentalDetailsAdded} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {addConfidentalDetailsModal && <AddConfidentalDetails handleAddConfidentalDetailsClose={handleAddConfidentalDetailsClose} ConfidentalDetails={ConfidentalDetails} />}
        </div>
    )
}
export default DisplayConfidentalDetails;