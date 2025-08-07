import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./utils/ToastProvider.jsx";
import NavBar from "./component/Admin/NavBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <App />
      <ToastProvider />
    </BrowserRouter>
  </StrictMode>
);
