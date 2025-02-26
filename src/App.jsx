import React from "react";
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
// import store, { persistor } from "./Redux/store";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ErrorBoundary>
      {/* <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> */}
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
      {/* </PersistGate>
      </Provider> */}
    </ErrorBoundary>
  );
};

export default App;
