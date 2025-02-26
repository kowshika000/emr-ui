import React from "react";
import "../styles.css";

const EMRPhotoUpload = ({
  id,
  label,
  required,
  fieldsDir,
  inputProps,
  hasError,
  setValue,
}) => {
  return (
    <div
      className={`d-flex flex-column ms-2 ${
        fieldsDir === "row" ? "flex-row" : ""
      }`}
    >
      <div className="field-label d-flex my-1">
        {label}
        {required && <span className="emr-required ms-1">*</span>}
      </div>
      <div className={`input-field ${fieldDir === "row" ? "ms-2" : ""}`}>
        <input
          className={`emr-input ${hasError ? "input-error" : ""}`}
          {...inputProps}
          onChange={(e) => {
            setValue(e.target.value, id);
          }}
        ></input>
      </div>
    </div>
  );
};

export default EMRPhotoUpload;
