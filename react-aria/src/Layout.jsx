import React, { useCallback, useContext } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";
import Navbar from "./Navbar";
import { DarkModeContext } from "./context/darkmodeContext";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const{darkMode} = useContext(DarkModeContext)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div
      className="flex flex-col gap-3 w-full h-full"

    >
      <div className="h-[5%] sticky top-0"> 
        <Navbar />
      </div>
      <div className={`h-[95%] ${darkMode?"bg-[#1E2428] ": "bg-[#F4F5FA]"}  `}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls   position="right-bottom" />
          {/* <MiniMap  /> */}
          <Background   variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
