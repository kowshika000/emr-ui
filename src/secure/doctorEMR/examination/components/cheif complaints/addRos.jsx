import { TextField, Autocomplete } from "@mui/material";
import { Checkbox, FormControlLabel, FormGroup, Chip, Typography } from "@mui/material";
import React, { useState } from 'react';
import { Formik, Form, Field } from "formik";

const data = [
    { id: 1, symptoms: "Genitourinary", Specialization: "Constitutional Symptoms" },
    { id: 2, symptoms: "Allergic/Immunologic", Specialization: "Constitutional Symptoms" },
    { id: 3, symptoms: "Musculoskeletal", Specialization: "Eyes" },
    { id: 4, symptoms: "Integumentary", Specialization: "Eyes" },
    { id: 5, symptoms: "Neurological", Specialization: "E N M T" },
    { id: 6, symptoms: "test", Specialization: "E N M T" }
];

// Group data by specialization (parent-child relationship)
const groupedData = data.reduce((acc, item) => {
    if (!acc[item.Specialization]) {
        acc[item.Specialization] = [];
    }
    acc[item.Specialization].push(item);
    return acc;
}, {});

const specializationData = [
    { label: 'Constitutional Symptoms', value: 'constitutionalSymptoms' },
    { label: 'Eyes', value: 'eyes' },
    { label: 'E N M T', value: 'eNMT' },
    { label: 'Cardiovascular', value: 'cardiovascular' },
    { label: 'Respiratory', value: 'respiratory' },
    { label: 'Gastrointestinal', value: 'gastrointestinal' },
    { label: 'Genitourinary', value: 'genitourinary' },
    { label: 'Musculoskeletal', value: 'musculoskeletal' },
    { label: 'Neurological', value: 'neurological' },
    { label: 'Psychiatric', value: 'psychiatric' },
    { label: 'Endocrine', value: 'endocrine' },
    { label: 'Hematologic/Lymphatic', value: 'hematologicLymphatic' },
    { label: 'Allergic/Immunologic', value: 'allergicImmunologic' },
    { label: 'Integumentary', value: 'integumentary' }
];

// Symptoms Data
const SymptomsData = {
    "musculoskeletal": ["Pain", "Back pain", "Joint pain", "Joint stiffness"],
    "neurological": ["Altered sensation", "Confusion", "Forgetful"],
    "genitourinary": ["Blood in urine", "Urinary urgency", "Genital rashes or sores"],
    "respiratory": ["Excessive snoring", "Excessive sputum"],
    "gastrointestinal": ["Abdominal Pain", "Abdominal bloating", "Bloody stools"],
    "eNMT": ["Cough", "Post Nasal Drip", "Runny Nose"],
    "cardiovascular": ["Chest pain", "Difficulty breathing at night"],
    "constitutionalSymptoms": ["Fever", "Chills", "Weight Loss", "Weight Gain"],
    "eyes": ["Blind Spots", "Tearing", "Vision Loss", "Dry Eyes"]
};

function AddRos({ handleAddRosModalClose, reviews }) {
    const [checkedItems, setCheckedItems] = useState({});
    const [specializations] = useState(specializationData);
    const [symptomOptions, setSymptomOptions] = useState(SymptomsData);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const [symptoms, setSymptoms] = useState([]);
    const [symptomInputValue, setSymptomInputValue] = useState("");

    const addSymptomToOptions = (newSymptom) => {
        if (selectedSpecialization && newSymptom) {
            setSymptomOptions((prevOptions) => {
                const updatedSymptoms = [...prevOptions[selectedSpecialization]];
                if (!updatedSymptoms.includes(newSymptom)) {
                    updatedSymptoms.push(newSymptom);
                }
                return {
                    ...prevOptions,
                    [selectedSpecialization]: updatedSymptoms,
                };
            });
        }
    };

    const handleParentCheckboxChange = (specialization, items, setFieldValue) => {
        const newChecked = { ...checkedItems };
        if (newChecked[specialization]?.length === items.length) {
            newChecked[specialization] = [];
        } else {
            newChecked[specialization] = items.map((item) => item.symptoms);
        }
        setCheckedItems(newChecked);
        setFieldValue("checkedItems", newChecked);
    };

    const handleCheckboxChange = (specialization, symptomLabel, setFieldValue) => {
        setCheckedItems((prevState) => {
            const newChecked = { ...prevState };
            if (!newChecked[specialization]) {
                newChecked[specialization] = [];
            }

            if (newChecked[specialization].includes(symptomLabel)) {
                newChecked[specialization] = newChecked[specialization].filter(
                    (label) => label !== symptomLabel
                );
            } else {
                newChecked[specialization].push(symptomLabel);
            }
            setFieldValue("checkedItems", newChecked);
            return newChecked;
        });
    };

    const isIndeterminate = (specialization, items) => {
        const checkedCount = checkedItems[specialization]?.length || 0;
        return checkedCount > 0 && checkedCount < items.length;
    };

    const isChecked = (specialization, items) => {
        return checkedItems[specialization]?.length === items.length;
    };

    return (
        <Formik
            initialValues={{
                specialization: null,
                symptoms: [],
                checkedItems: {},
                newSymptom: "",
            }}
            onSubmit={(values) => {
                reviews(values)
                handleAddRosModalClose()
            }}
        >
            {({ setFieldValue }) => (
                <Form>
                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Chief Complaints</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleAddRosModalClose}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Field name="specialization">
                                                {({ field }) => (
                                                    <Autocomplete
                                                        {...field}
                                                        options={specializations}
                                                        getOptionLabel={(option) => option.label}
                                                        onChange={(event, newValue) => {
                                                            setSelectedSpecialization(newValue ? newValue.value : null);
                                                            setSymptoms([]);
                                                            setFieldValue("specialization", newValue);
                                                        }}
                                                        renderInput={(params) => <TextField {...params} label="Specialization" />}
                                                        style={{ marginBottom: "20px", width: "300px" }}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Autocomplete
                                                multiple
                                                freeSolo
                                                options={
                                                    selectedSpecialization
                                                        ? symptomOptions[selectedSpecialization] || []
                                                        : []
                                                }
                                                value={symptoms}
                                                onChange={(event, newValue) => {
                                                    setSymptoms(newValue);
                                                    setFieldValue("symptoms", newValue); // Set symptoms in Formik state
                                                }}
                                                inputValue={symptomInputValue}
                                                onInputChange={(event, newInputValue) => {
                                                    setSymptomInputValue(newInputValue);
                                                }}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter" && symptomInputValue) {
                                                        addSymptomToOptions(symptomInputValue);
                                                        setSymptoms((prevSymptoms) => [...prevSymptoms, symptomInputValue]);
                                                        setFieldValue("symptoms", [...symptoms, symptomInputValue]); // Update Formik state
                                                        setSymptomInputValue("");
                                                    }
                                                }}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Symptoms" placeholder="Select or add symptoms" />
                                                )}
                                                style={{ width: "300px" }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <Typography>Other Review Systems</Typography>
                                            <FormGroup>
                                                {Object.keys(groupedData).map((specialization) => {
                                                    const items = groupedData[specialization];
                                                    return (
                                                        <div key={specialization}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={isChecked(specialization, items)}
                                                                        indeterminate={isIndeterminate(specialization, items)}
                                                                        onChange={() => handleParentCheckboxChange(specialization, items, setFieldValue)}
                                                                    />
                                                                }
                                                                label={specialization}
                                                            />
                                                            {items.map((item) => (
                                                                <FormControlLabel
                                                                    key={item.id}
                                                                    control={
                                                                        <Checkbox
                                                                            checked={checkedItems[specialization]?.includes(item.symptoms) || false}
                                                                            onChange={() => handleCheckboxChange(specialization, item.symptoms, setFieldValue)}
                                                                        />
                                                                    }
                                                                    label={item.symptoms}
                                                                />
                                                            ))}
                                                        </div>
                                                    );
                                                })}
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleAddRosModalClose}>
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AddRos;
