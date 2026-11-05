import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Force browser to reset scroll to top on page reload/refresh
if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
