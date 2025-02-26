import React, { useState } from "react";
import { Paper } from "@mui/material";
import bgImg from "../assets/bgImg.jpg";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

const AuthPage = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [showForgotPage, setShowForgotPage] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showReset, setShowReset] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        width: "100%",
        // backgroundColor: "teal",
        // background:
        //   "linear-gradient(to right,rgb(95, 255, 242) 50%,rgb(57, 150, 156) 50%)",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: 400,
          bgcolor: "rgba(255, 255, 255, 0.8)",
          opacity: "75%",
        }}
      >
        {showLoginPage && (
          <LoginForm
            setShowForgotPage={setShowForgotPage}
            setShowLoginPage={setShowLoginPage}
            setShowSignup={setShowSignup}
          />
        )}
        {showForgotPage && (
          <ForgotPassword
            setShowForgotPage={setShowForgotPage}
            setShowLoginPage={setShowLoginPage}
            setShowReset={setShowReset}
          />
        )}
        {showSignup && (
          <Signup
            setShowLoginPage={setShowLoginPage}
            setShowSignup={setShowSignup}
          />
        )}
        {showReset && <ResetPassword />}
      </Paper>
    </div>
  );
};

export default AuthPage;
