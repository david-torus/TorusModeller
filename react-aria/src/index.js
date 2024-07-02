import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
// import ButtonComponent from "./ButtonComponent";
import Testing from "./Testing";
import Layout from "./Layout";

import SignIn from "./SigninPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Testing /> */}
    {/* <TorusModifiedInput value="test" placeholder="test" label="test" /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
