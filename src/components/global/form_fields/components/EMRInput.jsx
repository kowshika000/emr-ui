import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../styles.css";

const EMRInput = ({
  id,
  label,
  required,
  fieldsDir,
  inputProps,
  hasError,
  setValue,
}) => {
  const [inputValue, setInputValue] = useState(inputProps?.value || "");

  useEffect(() => {
    if (inputProps?.value) {
      setValue(inputProps.value, id);
    }
  }, [id, inputProps?.value, setValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setValue(newValue, id);
  };

  return (
    <div
      className={`d-flex ms-2 ${
        fieldsDir === "row" ? "flex-row" : "flex-column"
      }`}
    >
      <div className={`input-field ${fieldsDir === "row" ? "ms-2" : ""}`}>
        <TextField
          variant="outlined"
          label={
            <>
              {label}
              {required && <span className="emr-required ms-1">*</span>}
            </>
          }
          size="small"
          error={hasError}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default EMRInput;
