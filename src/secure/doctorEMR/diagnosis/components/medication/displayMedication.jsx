import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddMedication from './addMedication';
import MedicationHistory from './medicationHistory';

function DisplayMedication() {
    const [prescribeMedicationModal, setPrescribeMedicationModal] = useState(false);
    const [prescribedMedicationHistoryModal, setprescribedMedicationHistoryModal] = useState(false);
    const [medicationAdded, setmedicationAdded] = useState([]);
    const [updatedMedication, setupdatedMedication] = useState([]);

    const handleprescribeMedicationModalOpen = () => {
        setPrescribeMedicationModal(true)
    }

    const handleprescribeMedicationModalClose = () => {
        setPrescribeMedicationModal(false)
    }

    const handlePrescribedMedicationModalOpen = () => {
        setprescribedMedicationHistoryModal(true)
    }

    const handlePrescribedMedicationModalClose = () => {
        setprescribedMedicationHistoryModal(false)
    }


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
        // {
        //     field: 'options',
        //     headerName: 'Options',
        //     flex: 1,
        //     renderCell: (params) => <OptionsMenu
        //         row={params.row}
        //         updatedMedication={updatedMedication}
        //         setupdatedMedication={setupdatedMedication}
        //     />,
        // },

    ];

    const prescribedMedicines = (value) => {
        setmedicationAdded((prev) => [...prev, value]);
        setupdatedMedication((prev) => [...prev, value]);
    }

    return (
        <div>
            <div className="card border-light mb-3">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div><h4>Medication</h4></div>
                        <div>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleprescribeMedicationModalOpen}
                            >Prescribe Medicine </button>
                            <button type="button" className="btn btn-warning me-2"
                                onClick={handleprescribeMedicationModalOpen}
                            > Finalize Prescription </button>
                            <button type="button" className="btn btn-success me-2"
                                onClick={handlePrescribedMedicationModalOpen}
                            >View History</button>
                            <button type="button" className="btn btn-success me-2"

                            >Prescription Note  </button>
                            <button type="button" className="btn btn-success me-2"

                            >Submit Prescription to eRx Hub   </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={medicationAdded} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
            {prescribeMedicationModal && <AddMedication handleprescribeMedicationModalClose={handleprescribeMedicationModalClose}
                prescribedMedicines={prescribedMedicines}
            />}
            {prescribedMedicationHistoryModal && <MedicationHistory
                handlePrescribedMedicationModalClose={handlePrescribedMedicationModalClose}
                medicationAdded={medicationAdded}
                setupdatedMedication={setupdatedMedication}
            />}
        </div>
    )
}

const OptionsMenu = ({ row, updatedMedication, setupdatedMedication }) => {
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
            let deleteDiagnosis = updatedMedication.filter((item) => item.id !== row.id)
            setupdatedMedication(deleteDiagnosis);
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

                <MenuItem onClick={() => handleMenuClick('delete')}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('delete')}>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
};

export default DisplayMedication;