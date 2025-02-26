import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
function DiagnosisHistory({ handleDiagnosisHistoryModalClose, diagnosisAdded, setupdatedDiagnosis }) {

    const rows = [
        {
            id: 1,
            category: 'Primary',
            IcdCode: 'C25.0',
            diagnosis: "Malignant neoplasm of head of pancreas"
        },
    ];

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'IcdCode', headerName: 'ICD Code', flex: 1 },
        { field: 'diagnosis', headerName: 'Diagnosis', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleAddDiagnosis(params)}>Add</Button>
            )
        },
    ];

    const handleAddDiagnosis = (params) => {
        setupdatedDiagnosis((prev) => [...prev, params.row]);
    }


    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Complaints</h5>
                            <button type="button" className="btn-close"
                                onClick={handleDiagnosisHistoryModalClose}
                            ></button>
                        </div>
                        <div className="modal-body" style={{ height: 400 }}>
                            <DataGrid rows={diagnosisAdded} columns={columns} pageSize={5} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default DiagnosisHistory;