import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import { login } from "../Redux/slice/login/authSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../components/global/Toast";

const LoginForm = ({ setShowForgotPage, setShowLoginPage, setShowSignup }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validateForm = () => {
    const errors = {};
    if (!formValues.email.trim()) {
      errors.email = "Email is required";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      dispatch(login(formValues));
      navigate("/secure/landing");
    } else {
      setErrors(formErrors);
      showToast("Someting went wrong !!");
    }
  };

  const handleChange = (field) => (e) => {
    setFormValues({ ...formValues, [field]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };
  const handleShowForgot = () => {
    setShowLoginPage(false);
    setShowForgotPage(true);
  };
  const handleClickSignup = () => {
    setShowSignup(true);
    setShowLoginPage(false);
  };
  return (
    <div>
      <div className="title">Account Login</div>
      <div className="desc">
        If you are already a member you can login with your email address and
        password.
      </div>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.email}
          onChange={handleChange("email")}
          size="small"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.password}
          onChange={handleChange("password")}
          size="small"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <div style={{ alignSelf: "center" }}>
            <div onClick={handleShowForgot} className="forgot-password-link">
              Forgot Password ?
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>

        <div className="signup-info">
          Don't have an account ?&nbsp;
          <div onClick={handleClickSignup} className="signup-link">
            Sign up here
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
