import React from "react";
import Layout from "./Layout";
import { ReactFlowProvider } from "reactflow";
import "./App.css";
import "./index.css";
import { DarkmodeProvider } from "./context/darkmodeContext";

export default function Mock() {
  return (
    <DarkmodeProvider>
      <div className=" max-h-[100vh]  max-w-[100vw]">
        <ReactFlowProvider>
          <Layout />
        </ReactFlowProvider>
      </div>
    </DarkmodeProvider>
  );
}
