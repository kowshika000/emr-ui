import React, { useState } from "react";
import {
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  options = [],
  required = false,
  setDependentValue,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [selectedFile, setSelectedFile] = useState(value || null);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handleBlur = () => {
    if (required && !value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onChange(file);
      setError(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onChange(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {type === "select" ? (
        <FormControl
          required={required}
          error={error}
          size="small"
          sx={{ width: "100%" }}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            value={value || ""}
            onChange={(e) => {
              const selectedOption = options.find(
                (option) => option.label === e.target.value
              );
              onChange(selectedOption?.label || "");
              setError(required && !selectedOption?.label);
            }}
            onBlur={handleBlur}
            label={label}
            sx={{ width: "100%" }}
            {...props}
          >
            <MenuItem value="" disabled>
              Select {label}
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem
                key={index}
                value={option.label}
                sx={{ fontSize: "12px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {/* {error && <FormHelperText>{label} is required</FormHelperText>} */}
        </FormControl>
      ) : type === "file" ? (
        <Box>
          {!selectedFile ? (
            <Button
              variant="outlined"
              component="label"
              className="w-100 my-auto"
            >
              Upload {label}
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px 8px",
                backgroundColor: "#f9f9f9",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "14px", color: "#333" }}>
                {selectedFile.name}
              </Typography>
              <IconButton size="small" onClick={handleRemoveFile}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {/* {error && <FormHelperText error>{label} is required</FormHelperText>} */}
        </Box>
      ) : (
        <TextField
          label={label}
          value={type === "date" ? formatDate(value) : value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (type === "date" && setDependentValue) {
              const calculatedAge = calculateAge(newValue);
              setDependentValue(calculatedAge);
            }
            onChange(newValue);
            setError(required && !newValue);
          }}
          onBlur={handleBlur}
          size="small"
          fullWidth
          required={required}
          type={type === "textarea" ? undefined : type}
          multiline={type === "textarea"}
          rows={type === "textarea" ? 2 : undefined}
          error={error}
          // helperText={error ? `${label} is required` : ""}
          InputLabelProps={{
            shrink: type === "date" || type === "time" ? true : undefined,
          }}
          inputProps={{
            ...(type === "date" && { pattern: "\\d{4}-\\d{2}-\\d{2}" }),
          }}
          {...props}
        />
      )}
    </Box>
  );
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};

export default FormInput;
