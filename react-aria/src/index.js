import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import SignIn from "./SigninPage";
import App from "./App";
import { DarkmodeProvider } from "./context/darkmodeContext";
import { RenderJson } from "./jonui/JsonUI";
import Sample from "./Sample";
import { TorusDatePicker } from "./torusComponents/TorusDate&TimePickers";
import Formpage from "./Formpage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkmodeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/date" element={<TorusDatePicker label={"time"} slot={"start"} openBtn ={true} />} />
          <Route path="/json" element={<RenderJson />} />
          <Route path="/table" element={<Sample />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/form" element={<Formpage />} />
        </Routes>
      </Router>
    </DarkmodeProvider>
  </React.StrictMode>
);
