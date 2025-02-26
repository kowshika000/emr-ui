import React from "react";
import _ from "lodash";
import EMRInput from "./components/EMRInput";
import EMRDropdown from "./components/EMRDropdown";
import EMRDateField from "./components/EMRDateField";
import "./styles.css";

const EMRForm = ({ fields, fieldsDir, updateFields, selectedField }) => {

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Modify setValue to include age calculation if date_of_birth is selected
  const setValue = (value, fieldId) => {
    let fieldsArr = _.cloneDeep(fields);

    if (!_.isEmpty(fieldsArr)) {
      fieldsArr.forEach((field) => {
        if (field.id === fieldId) {
          field.value = value;

          // If the field is date_of_birth, calculate and update the age field
          if (fieldId === "date_of_birth") {
            const age = calculateAge(value);
            const ageField = fieldsArr.find((f) => f.id === "age");
            if (ageField) {
              ageField.value = age; // Set the age value in the state
            }
          }
        }
      });
    }

    updateFields(fieldsArr); // Update the fields state
  };

  return (
    <div id="emr-fields-wrapper" className="d-flex flex-wrap gap-3">
      {fields?.map((field) => {
        if (field.type === "input") {
          return (
            <EMRInput
              {...field}
              setValue={setValue}
              fieldsDir={fieldsDir}
              inputProps={{ ...field, value: field.value }}
            />
          );
        }
        if (field.type === "dropdown") {
          return (
            <EMRDropdown {...field} setValue={setValue} fieldsDir={fieldsDir} />
          );
        }
        if (field.type === "date") {
          return (
            <EMRDateField
              {...field}
              setValue={setValue}
              fieldsDir={fieldsDir}
            />
          );
        }
      })}
    </div>
  );
};

export default EMRForm;
