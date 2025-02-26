import React, { useState } from "react";
import {
  Button,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { postData } from "../core/services/APIService";
import { useLoading } from "../components/global/loader/LoadingContext";

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { loading, setLoading } = useLoading();

  const validateForm = () => {
    let errors = {};
    if (!formValues.password.trim()) {
      errors.password = "Password is required";
    }
    if (!formValues.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    }
    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setAlertMessage("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");

    try {
      const response = await postData(
        `/auth/resetPassword?token=${token}&newPassword=${formValues.password}&confirmPassword=${formValues.confirmPassword}`
      );
      setLoading(false);
      if (response.status) {
        setMessage("Password has been reset successfully.");
      } else {
        setAlertMessage(response.message || "Failed to reset password.");
      }
    } catch (error) {
      setLoading(false);
      setAlertMessage("Invalid or expired token");
    }
  };

  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, [field]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Remove error on typing
  };

  return (
    <div>
      <h2>Password Reset</h2>

      {/* Display error message */}
      {alertMessage && <Alert severity="error">{alertMessage}</Alert>}

      {/* Display success message */}
      {message && <Alert severity="success">{message}</Alert>}

      <form onSubmit={handleResetPassword}>
        <TextField
          label="Enter Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
          // value={formValues.password}
          onChange={handleChange("password")}
          size="small"
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          // helperText={errors.confirmPassword}
          value={formValues.confirmPassword}
          onChange={handleChange("confirmPassword")}
          size="small"
        />
        <div className="mt-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
