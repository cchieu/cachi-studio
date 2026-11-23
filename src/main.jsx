import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Create one stable TinaCMS instance.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TinaProvider cms={cms}>
        <App />
      </TinaProvider>
    </BrowserRouter>
  </StrictMode>
);
