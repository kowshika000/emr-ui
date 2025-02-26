import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

function ComplaintsHistory({ handleViewHistoryModalClose, complaintAdded, setUpdatedComplaints }) {

    const rows = [
        {
            id: 1,
            enteredBy: 'Dr. Smith',
            enteredDate: '2/10/2024',
            chiefComplaint: 'Headache',
            duration: '2 days',
            location: 'Forehead',
            quality: 'Throbbing',
            context: 'Stress',
            timing: 'Morning',
            modifyFactor: 'Rest',
            remarks: 'Recurring',
            severity: 'Mild',

        },
    ];

    const columns = [
        { field: 'enteredBy', headerName: 'Entered By', flex: 1 },
        { field: 'enteredDate', headerName: 'Entered Date', flex: 1 },
        { field: 'chiefComplaint', headerName: 'Chief Complaint', flex: 1 },
        { field: 'duration', headerName: 'Duration/Onset', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { field: 'quality', headerName: 'Quality', flex: 1 },
        { field: 'context', headerName: 'Context', flex: 1 },
        { field: 'timing', headerName: 'Timing', flex: 1 },
        { field: 'modifyFactor', headerName: 'Modify Factor', flex: 1 },
        { field: 'remarks', headerName: 'Remarks', flex: 1 },
        { field: 'severity', headerName: 'Severity', flex: 1 },

        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleAddComplaints(params)}>Add</Button>
            )
        },
    ];

    const handleAddComplaints = (params) => {
         setUpdatedComplaints((prevComplaints) => [...prevComplaints, params.row]);
    }

    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Complaints</h5>
                            <button type="button" className="btn-close"
                                onClick={handleViewHistoryModalClose}
                            ></button>
                        </div>
                        <div className="modal-body" style={{ height: 400 }}>
                            <DataGrid rows={complaintAdded} columns={columns} pageSize={5} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default ComplaintsHistory;