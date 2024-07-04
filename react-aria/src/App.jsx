import React from "react";
import Layout from "./Layout";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <Layout />
      </ReactFlowProvider>
    </div>
  );
}
