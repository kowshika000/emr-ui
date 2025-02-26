import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../styles.css";

const EMRDateField = ({
  id,
  label,
  required,
  fieldsDir,
  inputProps,
  hasError,
  setValue,
}) => {
  const [dateValue, setDateValue] = useState("");

  // Set default date to today if label is 'Reg Date'
  useEffect(() => {
    if (label === "Reg Date") {
      const today = new Date().toISOString().split("T")[0]; // format: yyyy-mm-dd
      setDateValue(today); // Set the default value in the component state
      setValue(today, id); // Update the parent payload with the default value
    }
  }, [label, id, setValue]);

  return (
    <div
      className={`d-flex flex-column ms-2 ${
        fieldsDir === "row" ? "flex-row" : ""
      }`}
      style={{ alignSelf: "end" }}
    >
      <div className={`input-field ${fieldsDir === "row" ? "ms-2" : ""}`}>
        <TextField
          type="date"
          variant="outlined"
          sx={{ width: "174px" }}
          label={
            <>
              {label}
              {required && <span className="emr-required ms-1">*</span>}
            </>
          }
          size="small"
          error={hasError}
          value={dateValue}
          onChange={(e) => {
            const newValue = e.target.value;
            setDateValue(newValue);
            setValue(newValue, id);
          }}
          InputLabelProps={{
            shrink: true,
          }}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default EMRDateField;
