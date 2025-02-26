import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSyncRouter = ({ basename }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("shell use effect 1");

    const shellNavigated = ({ detail }) => {
      // if (detail === location.pathname) {
      //   return;
      // }
      navigate(detail);
    };

    window.addEventListener("billing-module", shellNavigated);

    return () => {
      window.addEventListener("billing-module", shellNavigated);
    };
  }, [location, basename, navigate]);

  useEffect(() => {
    console.log("shell use effect 2");
    console.log(location.pathname);
    console.log({ basename });
    if (location.pathname.startsWith(basename)) {
      window.dispatchEvent(
        new CustomEvent("shell", {
          detail: location.pathname.replace(basename, "")
        })
      );
    }
  }, [location, basename]);
};

export default useSyncRouter;
