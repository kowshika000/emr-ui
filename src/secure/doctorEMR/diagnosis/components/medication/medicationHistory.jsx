import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
function MedicationHistory({ handlePrescribedMedicationModalClose, medicationAdded, setupdatedMedication }) {

    const rows = [
        {
            id: 1,
            tradeName: 'THIAMINE (VITAMIN B1) [100 MG/ML]',
            ingredientName: 'THIAMINE:SOLUTION FOR INJECTION (2ML, AMPOULE)',
            status: "Active",
            drugForm: "Injection Regular",
            dosage: "1 Mol",
            frequency: "1",
            roa: "IV",
            duration: "2",
            remarks: "Take 1 Mol , 0-0-1 Time(s) per Day (Before Meal) For 2 Day(s)."
        },
    ];

    const columns = [
        { field: 'id', headerName: 'S.No', flex: 1 },
        { field: 'tradeName', headerName: 'Trade Name', flex: 1 },
        { field: 'ingredientName', headerName: 'Ingredient Name', flex: 1 },
        { field: 'status', headerName: 'Status/Type', flex: 1 },
        { field: 'drugForm', headerName: 'Drug Form/Order Type', flex: 1 },
        { field: 'dosage', headerName: 'Dosage', flex: 1 },
        { field: 'frequency', headerName: 'Frequency', flex: 1 },
        { field: 'roa', headerName: 'ROA', flex: 1 },
        { field: 'duration', headerName: 'Duration', flex: 1 },
        { field: 'remarks', headerName: 'Remarks', flex: 1 },
        {
            field: 'options',
            headerName: 'Options',
            flex: 1,
            renderCell: (params) => (
                <Button variant="contained" onClick={() => handleAddMedication(params)}>Add</Button>
            )
        },

    ];

    const handleAddMedication = (params) => {
        setupdatedMedication((prev) => [...prev, params.row]);
    }


    return (
        <div>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">View Medicatons</h5>
                            <button type="button" className="btn-close"
                                onClick={handlePrescribedMedicationModalClose}
                            ></button>
                        </div>
                        <div className="modal-body" style={{ height: 400 }}>
                            <DataGrid rows={medicationAdded} columns={columns} pageSize={5} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default MedicationHistory;