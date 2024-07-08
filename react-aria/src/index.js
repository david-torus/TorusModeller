import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import SignIn from "./SigninPage";
import App from "./App";
import { DarkmodeProvider } from "./context/darkmodeContext";
import { RenderJson} from "./jonui/JsonUI";

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
    {/* <RenderJson /> */}
    </DarkmodeProvider>
  </React.StrictMode>
);
