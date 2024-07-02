import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import ButtonComponent from "./ButtonComponent";
import Testing from "./Testing";
import Layout from "./Layout";
import TorusModifiedInput from "./Input";
import TorusDropDown from "./torusComponents/TorusDropDown";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Testing /> */}
    <Layout />
    {/* <App /> */}
    {/* <TorusModifiedInput value="test" placeholder="test" label="test" /> */}
  </React.StrictMode>
);
