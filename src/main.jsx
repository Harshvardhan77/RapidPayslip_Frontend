import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SalaryContextProvider from "./contexts/SalaryContext.jsx";
import EmployeeContextProvider from "./contexts/EmployeeContext.jsx";
import HeaderContextProvider from "./contexts/HeaderContext.jsx";
import FooterContextProvider from "./contexts/FooterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SalaryContextProvider>
      <HeaderContextProvider>
        <EmployeeContextProvider>
          <FooterContextProvider>
            <App />
          </FooterContextProvider>
        </EmployeeContextProvider>
      </HeaderContextProvider>
    </SalaryContextProvider>
  </React.StrictMode>
);
