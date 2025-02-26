import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const ForgotPassword = ({
  setShowForgotPage,
  setShowLoginPage,
  setShowReset,
}) => {
  const [formValues, setFormValues] = useState({ email: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Enter a valid email";
    }
    return errors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Call API if no errors
    console.log("Sending reset email to:", formValues.email);
    // let response = await postData(`/app/auth/forgotPassword?email=${formValues.email}`);
    setShowReset(true);
    setShowForgotPage(false);
  };

  const handleChange = (e) => {
    setFormValues({ email: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Remove error on typing
  };

  const handleClickLogin = () => {
    setShowLoginPage(true);
    setShowForgotPage(false);
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleResetPassword}>
        <TextField
          label="Email address"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
          error={!!errors.email}
          // helperText={errors.email}
          value={formValues.email}
          onChange={handleChange}
        />
        <div className="mt-2">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send to Email
          </Button>
        </div>
      </form>

      <div className="signup-info">
        Back to&nbsp;
        <div onClick={handleClickLogin} className="signup-link">
          Login
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
