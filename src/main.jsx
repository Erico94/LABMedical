import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PagesProvider } from "./context/PagesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <PagesProvider>
      <App />
    </PagesProvider>
    </AuthProvider>
  </React.StrictMode>
);
