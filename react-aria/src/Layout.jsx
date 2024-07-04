import React, { useCallback, useContext, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
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
import FabricsSelector from "./FabricsSelector";
import FabricsSideBar from "./sidebars/fabricsSideBar/FabricsSideBar";


export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { darkMode } = useContext(DarkModeContext);
  const [selectedFabric, setSelectedFabric] = useState("DF");
  const [selectedTab, setSelectedTab] = useState("DF");

  return (
    <div className="h-full w-full flex flex-col  ">
      <div className="h-[7%] ">
        <Navbar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedFabric={selectedFabric}
          setSelectedFabric={setSelectedFabric}
        />
      </div>
      <div className={`h-[92%] w-full flex dark:bg-[#1E2428]   bg-[#F4F5FA] `}>
        <div className="h-full w-[78%]">
          <ReactFlowProvider>
            <FabricsSelector
              fabric={selectedFabric}
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
            >
              <Panel
                position="top-left"
                className={`w-[25%] h-[95%] ${
                  selectedTab.startsWith("hidden") ? "hidden" : "block"
                }  `}
              >
                <SelectedTabPanel selectedTab={selectedTab} />
              </Panel>

              <Controls position="right-bottom" />

              <Background variant="dots" gap={12} size={1} />
            </FabricsSelector>
          </ReactFlowProvider>
        </div>
        <div className="h-full w-[22%] ">
          <FabricsSideBar />
        </div>
      </div>
    </div>
  );
}
