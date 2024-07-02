import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
// import ButtonComponent from "./ButtonComponent";
import Testing from "./Testing";
import Layout from "./Layout";

import SignIn from "./SigninPage";
import TorusDropDown from "./torusComponents/TorusDropDown";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Testing /> */}
    {/* <TorusModifiedInput value="test" placeholder="test" label="test" /> */}
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
