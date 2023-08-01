import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PagesProvider } from "./context/PagesContext.jsx";
import { PacienteProvider } from "./context/PacienteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PagesProvider>
        <PacienteProvider>
          <App />
        </PacienteProvider>
      </PagesProvider>
    </AuthProvider>
  </React.StrictMode>
);
