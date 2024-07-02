import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import ButtonComponent from "./ButtonComponent";
import Testing from "./Testing";
import Layout from "./Layout";
import TorusModifiedInput from "./Input";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Testing /> */}
    <Layout />
    {/* <TorusModifiedInput value="test" placeholder="test" label="test" /> */}
  </React.StrictMode>
);
