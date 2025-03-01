import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter  } from "react-router-dom"; // Use MemoryRouter for Chrome Extension
import App from "./App.jsx";
import AuthProvider from "./Components/context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* Wrap the app in MemoryRouter */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
