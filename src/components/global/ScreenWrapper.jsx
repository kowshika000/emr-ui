import React from "react";

// Wrapper component to prevent children from exceeding the viewport
const ScreenWrapper = ({ children, style, ...props }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        boxSizing: "border-box",
        backgroundColor: "#68727a05",
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScreenWrapper;
