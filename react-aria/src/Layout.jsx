import React from "react";
import Navbar from "./Navbar";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";

export default function Layout() {
  return (
    <div className="bg-white xl:w-full 2xl:w-full lg:w-full md:w-full sm:w-full h-full">
      <Navbar />
      <div style={{ width: "100vw", height: "95vh" }}>
        <ReactFlow>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
