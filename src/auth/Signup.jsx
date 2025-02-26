import React from "react";
import "./auth.css";
import { Button, TextField } from "@mui/material";

const Signup = ({ setShowLoginPage, setShowSignup }) => {
  const handleClickLogin = () => {
    setShowLoginPage(true);
    setShowSignup(false);
  };
  return (
    <div>
      <h2>Register Account</h2>
      <form>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Enter Password"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          margin="normal"
          size="small"
        />
        <div className="mt-2">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </div>
      </form>
      <div className="signup-info">
        Already have an account ?&nbsp;
        <div onClick={handleClickLogin} className="signup-link">
          Login
        </div>
      </div>
    </div>
  );
};

export default Signup;
