import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { getNames } from "country-list";
import "../styles.css";

// Prepare nationality options
const nationalityOptions = getNames().map((name) => ({
  value: name.toLowerCase(),
  label: name,
}));

const EMRDropdown = ({
  id,
  label,
  required,
  fieldsDir,
  typeOptions,
  setValue,
  hasError,
  options,
}) => {
  const [selectedValue, setSelectedValue] = useState(""); // State for the selected value

  // Use nationalityOptions if typeOptions is 'country'
  const fieldOptions =
    typeOptions === "country" ? nationalityOptions : options || [];

  // Truncate the label if longer than 20 characters
  const truncatedLabel = label.length > 20 ? label.slice(0, 20) + "..." : label;

  return (
    <div
      className={`input-field-wrapper d-flex flex-column ms-2 ${
        fieldsDir === "row" ? "flex-row" : ""
      }`}
      style={{ alignSelf: "end" }}
    >
      <FormControl
        variant="outlined"
        size="small"
        error={hasError} // Adds error styling
        sx={{ width: "174px" }} // Set default width here
        className={`input-field`}
      >
        <InputLabel id={`${id}-label`} error={hasError}>
          {truncatedLabel}
          {required && <span className="emr-required ms-1">*</span>}
        </InputLabel>
        <Select
          labelId={`${id}-label`}
          value={selectedValue} // Use state for the value
          onChange={(e) => {
            const newValue = e.target.value;
            setSelectedValue(newValue); // Update state with the new value
            setValue(newValue, id); // Call the setValue function with the new value
          }}
          label={truncatedLabel}
        >
          <MenuItem value="">
            <em>Select...</em>
          </MenuItem>
          {fieldOptions.map((option) => {
            // Truncate option label if it's longer than 15 characters
            const truncatedOptionLabel =
              option.label.length > 15
                ? option.label.slice(0, 15) + "..."
                : option.label;

            return (
              <MenuItem
                key={option.value}
                value={option.value}
                title={option.label} // Full label as tooltip
              >
                {truncatedOptionLabel}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default EMRDropdown;
