import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
<<<<<<< HEAD
=======

// Create one stable TinaCMS instance.
>>>>>>> 0a0658a1751b9b8ff2e39c429bc54739f43a52cd

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
