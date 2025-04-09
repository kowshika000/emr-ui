import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/AnimationLoad.json";
import "./loader.css";

const EMRLoader = ({ show }) => {
  return (
    <>
      {show && (
        <div className="fullscreen-loader">
          <Lottie
            animationData={loadingAnimation}
            loop
            autoplay
            style={{ width: 150, height: 150 }}
          />
        </div>
      )}
    </>
  );
};

export default EMRLoader;

// import React from "react";
// import { Box } from "@mui/material";
// import Lottie from "lottie-react";
// import loadingAnimation from "../../../assets/Animation.json";

// const EMRLoader = ({ show = true }) => {
//   if (!show) return null;

//   return (
//     <Box className="fullscreen-loader">
//       {loadingAnimation ? (
//         <Lottie
//           animationData={loadingAnimation}
//           loop
//           autoplay
//           // style={{ width: 150, height: 150 }}
//         />
//       ) : (
//         <span>Loading...</span>
//       )}
//     </Box>
//   );
// };

// export default EMRLoader;
