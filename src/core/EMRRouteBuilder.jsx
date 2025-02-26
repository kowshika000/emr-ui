import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SecureLayout from "./modules/secure/SecureLayout";
import { useSelector } from "react-redux";
import _ from "lodash";

export const EMRRouteBuilder = (props) => {
  const [routes, setRoutes] = useState();
  const navigate = useNavigate(); // React Router navigate function
  const username = useSelector((state) => state?.auth?.user?.data?.userName); // Get username
  const user = useSelector((state) => state?.auth?.user); // Get user for authentication

  // Check if the username is remembered in localStorage
  const isRemembered = () => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    return !_.isEmpty(rememberedUsername);
  };

  const isAuthenticated = () => {
    return !!user; // Checks if the user exists in Redux state
  };

  useEffect(() => {
    buildRoutes();
  }, [user]); // Re-run route building when username changes

  const buildRoutes = () => {
    const promiseRoutes = props.routes.map(async (route) => await buildRoute(route));
    Promise.all(promiseRoutes).then((routes) => {
      setRoutes(routes);
    });
  };

  async function buildRoute(route) {
    let Component = route.component;

    // Interceptor logic
    if (props.interceptor) {
      Component = await props.interceptor(route);
    }

    // Check if route is not secure and user is authenticated or remembered
    if (!route.secure && (isAuthenticated() || isRemembered())) {
      return (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          element={<Navigate to="/secure/landing" />} // Redirect if authenticated
        />
      );
    }

    // If route is secure and user is authenticated or remembered
    else if (route.secure) {
      if (isAuthenticated() || isRemembered()) {
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
            path={"login"}
            exact={route.exact}
            element={<Navigate to="/login" />}
          />
        );
      }
    }

    // If route is public
    else {
      return (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          element={<Component />}
        />
      );
    }
  }

  // Render all routes dynamically
  function renderRoutes() {
    return <Routes>{routes}</Routes>;
  }

  return renderRoutes();
};
