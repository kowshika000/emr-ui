import React from "react";
import { Modal } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import "./loader.css";

const EMRLoader = ({ show }) => {
  return (
    <>
      {show && (
        <div className="fullscreen-loader">
          <Spinner style={{ color: "green" }} />
        </div>
      )}
    </>
  );
};

export default EMRLoader;
