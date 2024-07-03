import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import SignIn from "./SigninPage";
import App from "./App";
import { DarkmodeProvider } from "./context/darkmodeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkmodeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
    </DarkmodeProvider>
  </React.StrictMode>
);
