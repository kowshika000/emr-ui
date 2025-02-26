import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        closeButton={false}
        theme="light"
        toastClassName={({ type }) => {
          switch (type) {
            case "success":
              return "toast-success";
            case "error":
              return "toast-error";
            case "warning":
              return "toast-warning";
            case "info":
            default:
              return "toast-info";
          }
        }}
      />
      {children}
    </>
  );
};

export default ToastProvider;
