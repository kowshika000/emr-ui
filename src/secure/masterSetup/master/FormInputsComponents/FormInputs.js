import React from "react";
import {
    TextField,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";

const FormInputs = ({
    label,
    value,
    onChange,
    type = "text",
    options = [],
    required = false,
    setDependentValue,
    ...props
}) => {
    // Function to format date as "YYYY-MM-DD"
    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0]; // Converts to "YYYY-MM-DD"
    };

    return (
        <Box sx={{ width: "100%" }}>
            {type === "select" ? (
                <FormControl
                    required={required}
                    variant="standard"
                    sx={{
                        width: "50%",
                        "& .css-5lvf42-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                        {
                            backgroundColor: "white",
                            borderRadius: "4px",
                        },
                    }}
                >
                    <InputLabel
                        shrink={true}
                        sx={{
                            color: "rgb(54, 54, 54)",
                            fontSize: "16px",
                            "&.Mui-focused": { color: "rgb(43, 43, 43)" },
                        }}
                    >
                        {label}
                    </InputLabel>
                    <Select
                        value={
                            options.some((option) => option.label === value) ? value : ""
                        }
                        onChange={(e) => {
                            const selectedOption = options.find(
                                (option) => option.label === e.target.value
                            );
                            onChange(selectedOption?.label || "");
                        }}
                        label={label}
                        sx={{
                            width: "100%",
                            fontSize: "12px",
                            "&:before": {
                                borderBottom: "1px solid rgb(129, 129, 129)",
                            },
                            "&:after": {
                                borderBottom: "1px solid rgb(129, 129, 129)",
                            },
                            "&.Mui-focused:before": {
                                borderBottom: "1px solid rgb(129, 129, 129) !important",
                            },
                        }}
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
                </FormControl>
            ) : (
                <TextField
                    label={label}
                    value={type === "date" ? formatDate(value) : value} // Ensure YYYY-MM-DD format
                    onChange={(e) => {
                        if (e.target && e.target.value !== undefined) {
                            const newValue = e.target.value;
                            if (type === "date" && setDependentValue) {
                                // Optionally calculate and set dependent value (e.g., age)
                                const calculatedAge = calculateAge(newValue);
                                setDependentValue(calculatedAge);
                            }
                            onChange(newValue);
                        }
                    }}
                    variant="standard"
                    fullWidth
                    required={required}
                    type={type === "textarea" ? undefined : type}
                    multiline={type === "textarea"}
                    rows={type === "textarea" ? 2 : undefined}
                    InputLabelProps={{
                        shrink: true,
                        sx: {
                            color: "rgb(37, 37, 37)",
                            fontSize: "16px",
                            "&.Mui-focused": { color: "rgb(51, 51, 51)" },
                        },
                    }}
                    inputProps={{
                        ...(type === "date" && { pattern: "\\d{4}-\\d{2}-\\d{2}" }),
                    }}
                    sx={{
                        "& .MuiInput-underline:before": {
                            borderBottom: "1px solid rgb(129, 129, 129)",
                        },
                        "& .MuiInput-underline:hover:before": {
                            borderBottom: "1px solid rgb(129, 129, 129)",
                        },
                        "& .MuiInput-underline:after": {
                            borderBottom: "1px solid rgb(129, 129, 129)",
                        },
                        "& .css-1yrc8ca-MuiInputBase-input-MuiInput-input": {
                            backgroundColor: "white",
                            borderRadius: "4px",
                        },
                    }}
                    {...props}
                />
            )}
        </Box>
    );
};

// Function to calculate age based on DOB (optional)
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

export default FormInputs;