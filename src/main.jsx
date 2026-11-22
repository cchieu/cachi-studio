import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { TinaCMS, TinaProvider } from "tinacms";

// Create one stable TinaCMS instance.
const cms = new TinaCMS();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TinaProvider cms={cms}>
        <App />
      </TinaProvider>
    </BrowserRouter>
  </StrictMode>
);