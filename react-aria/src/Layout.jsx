import React, { useCallback, useContext, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";

import "reactflow/dist/style.css";
import Navbar from "./Navbar";
import { DarkModeContext } from "./context/darkmodeContext";
import SelectedTabPanel from "./SelectedTabPanel";

const initialNodes = [
  { id: "1", position: { x: 600, y: 200 }, data: { label: "1" } },
  { id: "2", position: { x: 600, y: 300 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { darkMode } = useContext(DarkModeContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="flex flex-col gap-3 w-full h-full ">
      <div className="h-[5%] sticky top-0">
        <Navbar setSelectedTab={setSelectedTab} />
      </div>
      <div
        className={`h-[95%] ${darkMode ? "bg-[#1E2428] " : "bg-[#F4F5FA]"}  `}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Panel
            position="top-left"
            className={`w-2/12 h-[95%] ${
              selectedTab == 0 ? "hidden" : "block"
            }  `}
          >
            <SelectedTabPanel selectedTab={selectedTab} />
          </Panel>

          <Controls position="right-bottom" />
          {/* <MiniMap  /> */}
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
