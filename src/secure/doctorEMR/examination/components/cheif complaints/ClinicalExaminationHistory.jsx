import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
function ClinicalExaminationHistory({ handleViewHistoryModalClose, examinationAdded, setUpdatedExamination }) {

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
        { field: 'clinicalExamination', headerName: 'Clinical Examination', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleExamination(params)}>Add</Button>
            )
        },
    ];

    const handleExamination = (params) => {
        setUpdatedExamination((prevExamination) => [...prevExamination, params.row]);
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
                            <DataGrid rows={examinationAdded} columns={columns} pageSize={5} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClinicalExaminationHistory;