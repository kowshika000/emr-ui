import React from "react";
import { Spinner } from "react-bootstrap";
import "./loader.css";

const EMRLoader = ({ show }) => {
  return <Spinner show={show} />;
};

export default EMRLoader;
