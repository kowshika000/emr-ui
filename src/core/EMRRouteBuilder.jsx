import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SecureLayout from "./modules/secure/SecureLayout";
import { useSelector } from "react-redux";

export const EMRRouteBuilder = (props) => {
  const [routes, setRoutes] = useState();
  const navigate = useNavigate(); // React Router navigation function
  const user = useSelector((state) => state?.auth?.user); // Get user from Redux state

  // Check if user exists in localStorage
  const isUserStored = () => {
    return localStorage.getItem("user") !== null; // Returns true if "user" is in localStorage
  };

  useEffect(() => {
    if (isUserStored()) {
      navigate("/secure/landing", { replace: true }); // Redirect to landing if user exists
    } else {
      navigate("/login", { replace: true }); // Redirect to login if no user found
    }
  }, []); // Runs only on component mount

  useEffect(() => {
    buildRoutes();
  }, [user]); // Re-run route building when the user state changes

  const buildRoutes = () => {
    const promiseRoutes = props.routes.map(
      async (route) => await buildRoute(route)
    );
    Promise.all(promiseRoutes).then((routes) => {
      setRoutes(routes);
    });
  };

  async function buildRoute(route) {
    let Component = route.component;

    if (props.interceptor) {
      Component = await props.interceptor(route);
    }

    if (route.secure) {
      if (isUserStored()) {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            element={
              <SecureLayout>
                <Component />
              </SecureLayout>
            }
          />
        );
      } else {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            element={<Navigate to="/login" />}
          />
        );
      }
    }

    return (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        element={<Component />}
      />
    );
  }

  function renderRoutes() {
    return <Routes>{routes}</Routes>;
  }

  return renderRoutes();
};
