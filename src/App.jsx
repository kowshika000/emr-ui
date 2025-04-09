import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { PersistGate } from "redux-persist/integration/react";
import { EMRRouteBuilder } from "./core/EMRRouteBuilder";
import { EMR_ROUTES } from "./core/Routes";
import { LoadingProvider } from "./components/global/loader/LoadingContext";
import ToastProvider from "./components/global/ToastProvider";
import "bootstrap/dist/css/bootstrap.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ErrorBoundary from "./components/global/ErrorBoundary";
import store from "./Redux/store";

const App = () => {
  const [theme, colorMode] = useMode();

  useEffect(() => {
    import("emr_billing/billingReducer")
      .then(({ default: billingReducer }) => {
        console.log("Billing Reducer Loaded:", billingReducer);
        if (store.injectReducer) {
          store.injectReducer("billing", billingReducer);
        }
      })
      .catch((error) => console.error("Failed to load billingReducer:", error));

    import("emr_ip/ipReducer")
      .then(({ default: ipReducer }) => {
        console.log("ip Reducer Loaded:", ipReducer);
        if (store.injectReducer) {
          store.injectReducer("ip", ipReducer);
        }
      })
      .catch((error) => console.error("Failed to load ipReducer:", error));

    import("emr_bedAndWard/bedAndWardReducer")
      .then(({ default: bedAndWardReducer }) => {
        console.log("bedAndWardReducer Loaded:", bedAndWardReducer);
        if (store.injectReducer) {
          store.injectReducer("bedAndWard", bedAndWardReducer);
        }
      })
      .catch((error) =>
        console.error("Failed to load bedAndWardReducer:", error)
      );
      
    import("emr_doctor/docEmrReducer")
      .then(({ default: docEmrReducer }) => {
        console.log("docEmrReducer Loaded:", docEmrReducer);
        if (store.injectReducer) {
          store.injectReducer("docEmr", docEmrReducer);
        }
      })
      .catch((error) => console.error("Failed to load docEmrReducer:", error));
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <LoadingProvider>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <ToastProvider>
                  <CssBaseline />
                  <EMRRouteBuilder routes={EMR_ROUTES} />
                </ToastProvider>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </LoadingProvider>
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
