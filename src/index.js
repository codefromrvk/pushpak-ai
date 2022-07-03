import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";

import "bootstrap/dist/css/bootstrap.min.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
