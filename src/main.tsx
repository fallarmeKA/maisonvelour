import React from "react";
import ReactDOM from "react-dom/client";
import MaisonViva from "./MaisonViva";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <MaisonViva />
  </React.StrictMode>
);
