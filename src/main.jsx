import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/app.css";
import "./i18n";
import { ensureGeneratedAssets } from "./utils/svgAssetGenerator";

(async () => {
  // Generate placeholder SVG icons/mascot at runtime (if not present)
  // This runs in the browser when app loads.
  await ensureGeneratedAssets();

  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
})();