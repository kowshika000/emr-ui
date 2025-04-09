import React from "react";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Animation.json";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
        style={{ width: 150, height: 150 }}
      />
    </Box>
  );
};

export default Loading;
