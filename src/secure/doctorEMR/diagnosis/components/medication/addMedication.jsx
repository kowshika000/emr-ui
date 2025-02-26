import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';

// Dummy data for the data grid
const dummyMedicines = [
    { tradeName: 'Dol65', ingredientName: 'Paracetamol', dosage: '1 mg' },
    { tradeName: 'Ciplox', ingredientName: 'Ciprofloxacin', dosage: '500 mg' },
    { tradeName: 'Dolo650', ingredientName: 'Paracetamol', dosage: '650 mg' },
];

function AddMedication({ handleprescribeMedicationModalClose, prescribedMedicines }) {
    const [searchQuery, setSearchQuery] = useState('');


    const formik = useFormik({
        initialValues: {
            id: '',
            tradeName: '',
            ingredientName: '',
            status: '',
            drugForm: '',
            dosage: '',
            frequency: '',
            orderType: '',
            roa: '',
            duration: '',
            remarks: ''
        },
        onSubmit: (values) => {
            const statement = `${values.tradeName} ${values.dosage} ${values.frequency} ${values.drugForm}`;
            const updatedValues = {
                ...values,
                remarks: statement
            };
            prescribedMedicines(updatedValues);
            handleprescribeMedicationModalClose();
        },
    });


    // Function to handle selecting a medicine from the grid
    const handleSelectMedicine = (medicine) => {
        formik.setFieldValue('tradeName', medicine.tradeName);
        formik.setFieldValue('ingredientName', medicine.ingredientName);
        formik.setFieldValue('dosage', medicine.dosage);
    };

    // Filtering medicines based on search query
    const filteredMedicines = dummyMedicines.filter(medicine =>
        medicine.tradeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg" role="document">
                <form onSubmit={formik.handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Prescribe Medication</h5>
                            <button type="button" className="btn-close" onClick={handleprescribeMedicationModalClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <label>Id</label>
                                    <input
                                        type="text"
                                        name='id'
                                        className="form-control"
                                        placeholder="Enter ID"
                                        onChange={formik.handleChange}
                                        value={formik.values.id}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <label>Search Medicine</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search medicine"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Data grid for medicine selection */}
                            <div className="row mb-3">
                                <div className="col-12">
                                    <table className="table table-striped table-dark">
                                        <thead >
                                            <tr>
                                                <th >Trade Name</th>
                                                <th >Ingredient</th>
                                                <th>Dosage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMedicines.length > 0 ? (
                                                filteredMedicines.map((medicine, index) => (
                                                    <tr key={index} onClick={() => handleSelectMedicine(medicine)} style={{ cursor: 'pointer' }}>
                                                        <td>{medicine.tradeName}</td>
                                                        <td>{medicine.ingredientName}</td>
                                                        <td>{medicine.dosage}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center">No medicines found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-4">
                                    <label>Drug Type</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.drugForm}
                                        name="drugForm"
                                    />
                                </div>
                                <div className="col-4">
                                    <label>Order Type</label>
                                    <select
                                        className="form-control"
                                        name="orderType"
                                        onChange={formik.handleChange}
                                        value={formik.values.orderType}
                                    >
                                        <option value="Regular">Regular</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Route of Admin</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.roa}
                                        name="roa"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label>Dosage</label>
                                    <select
                                        className="form-control"
                                        name="dosage"
                                        onChange={formik.handleChange}
                                        value={formik.values.dosage}
                                    >
                                        <option value="ml">ml</option>
                                        <option value="Mcg">Mcg</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Patch">Patch</option>
                                        <option value="Vial">Vial</option>
                                        <option value="Drops">Drops</option>
                                        <option value="Grams">Grams</option>
                                        <option value="Inj">Inj</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Frequency</label>
                                    <select
                                        className="form-control"
                                        name="frequency"
                                        onChange={formik.handleChange}
                                        value={formik.values.frequency}
                                    >
                                        <option value="1-0-0">1-0-0</option>
                                        <option value="0-1-0">0-1-0</option>
                                        <option value="0-0-1">0-0-1</option>
                                        <option value="1-0-1">1-0-1</option>
                                        <option value="1-1-0">1-1-0</option>
                                        <option value="0-1-1">0-1-1</option>
                                        <option value="1-1-1">1-1-1</option>
                                        <option value="1-1-1-1">1-1-1-1</option>
                                        <option value="1-1-1-1-1">1-1-1-1-1</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Frequency Unit</label>
                                    <select
                                        className="form-control"
                                        name="frequencyUnit"
                                        onChange={formik.handleChange}
                                        value={formik.values.frequencyUnit}
                                    >
                                        <option value="Per Day">Per Day</option>
                                        <option value="Per Hour">Per Hour</option>
                                        <option value="Per Week">Per Week</option>
                                        <option value="Per Month">Per Month</option>
                                        <option value="Regular">Regular</option>
                                        <option value="As Needed">As Needed</option>
                                        <option value="As advised">As advised</option>
                                        <option value="Bed Time">Bed Time</option>
                                        <option value="Alternate Day">Alternate Day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-4">
                                    <label>Duration (days)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={formik.handleChange}
                                        value={formik.values.duration}
                                        name="duration"
                                    />
                                </div>
                                <div className="col-8">
                                    <label>Instructions</label>
                                    <textarea
                                        className="form-control"
                                        name="remarks"
                                        readOnly
                                        value={`${formik.values.tradeName} ${formik.values.dosage} ${formik.values.frequency} ${formik.values.drugForm} `}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleprescribeMedicationModalClose}>
                                Close
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMedication;
