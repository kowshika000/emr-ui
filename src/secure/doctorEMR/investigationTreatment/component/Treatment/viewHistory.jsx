
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

function ViewHistory({ handleViewHistoryModalClose, treatmentAdded, setupdatedTreatment }) {

    const rows = [
        {
            id: 1,
            labTestName: 'THIAMINE (VITAMIN B1) [100 MG/ML]',
            insurance: 'THIAMINE:SOLUTION FOR INJECTION (2ML, AMPOULE)',
            preApp: "Active",
            quantity: "Injection Regular",
            price: "1 Mol",
            serviceStatus: "1",
            billStatus: "IV",
            remarks: "2",
        },
    ];

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'labTestName', headerName: 'Lab Test Name', flex: 1 },
        { field: 'insurance', headerName: 'Insurance', flex: 1 },
        { field: 'preApp', headerName: 'Pre App', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
        { field: 'serviceStatus', headerName: 'Service Status', flex: 1 },
        { field: 'billStatus', headerName: 'Bill Status', flex: 1 },
        { field: 'remarks', headerName: 'Remarks', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleAddInvestigation(params)}>Add</Button>
            )
        },

    ];

    const handleAddInvestigation = (params) => {
        setupdatedTreatment((prev) => [...prev, params.row]);
    }

    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Investigation</h5>
                            <button type="button" className="btn-close"
                                onClick={handleViewHistoryModalClose}
                            ></button>
                        </div>
                        <div className="modal-body" style={{ height: 400 }}>
                            <DataGrid rows={treatmentAdded} columns={columns} pageSize={5} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ViewHistory;