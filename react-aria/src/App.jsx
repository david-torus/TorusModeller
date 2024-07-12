import React from "react";
import Layout from "./Layout";
import { ReactFlowProvider } from "reactflow";
import "../src/App.css"

export default function App() {
  return (
    <div className=" max-h-[100vh]  max-w-[100vw]" >
      <ReactFlowProvider>
        <Layout />
      </ReactFlowProvider>
    </div>
  );
}
