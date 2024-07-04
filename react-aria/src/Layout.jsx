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

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { darkMode } = useContext(DarkModeContext);
  const [selectedFabric, setSelectedFabric] = useState("DF");
  const [selectedTab, setSelectedTab] = useState("DF");

  return (
    <div
      className={`w-full   h-full  
        max-h-min mx-auto  
        flex flex-col   xl:max-3xl:bg-gray-600  lg:max-xl:gap-0 xl:max-3xl:gap-0
        max-md:gap-3 `}
    >
      <div className="sticky top-0">
        <Navbar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedFabric={selectedFabric}
          setSelectedFabric={setSelectedFabric}
        />
      </div>
      <div className={`h-[95%] dark:bg-[#1E2428]  bg-[#F4F5FA] `}>
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
              className={`w-2/12 h-[95%]  xl:max-3xl:pt-2 ${
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
    </div>
  );
}
