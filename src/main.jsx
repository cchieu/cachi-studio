import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { TinaProvider } from "tinacms";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TinaProvider clientId={import.meta.env.VITE_TINA_CLIENT_ID}>
        <App />
      </TinaProvider>
    </BrowserRouter>
  </StrictMode>
);