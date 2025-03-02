import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter  } from "react-router-dom"; // Use MemoryRouter for Chrome Extension
// import { BrowserRouter  } from "react-router-dom"; // Use MemoryRouter for Chrome Extension
import App from "./App.jsx";
import AuthProvider from "./Components/context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MemoryRouter> 
        <App />
      </MemoryRouter>
    </AuthProvider>
  </React.StrictMode>
);
