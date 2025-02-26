import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../../../auth/LoginForm";
import Signup from "../../../auth/Signup";
import ForgotPassword from "../../../auth/ForgotPassword";
import ResetPassword from "../../../auth/ResetPassword";
import AuthPage from "../../../auth/auth";


export const PUBLIC_ROUTES = [
  { path: "*", component: () => <Navigate to="/login" /> },
  { path: "/login", component: AuthPage },
  { path: "/register", component: Signup },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/reset-password", component: ResetPassword }
];
