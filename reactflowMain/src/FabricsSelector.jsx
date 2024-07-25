import React, { memo, useContext } from "react";

import AppDF from "./VPT_DF/VPT_DF_ERD/Components/App";
import { TorusModellerContext } from "./Layout";
import AppPF from "./VPT_PF/VPT_PF_PFD/components/App";
import AppUF from "./VPT_UF/VPT_UF_SLD/components/App";

const proOptions = { hideAttribution: true };
export const FabricsSelector = memo(
  ({
    nodes,
    edges,
    setEdges,
    setNodes,
    onNodesChange,
    onEdgesChange,
    children,
    NODE_TYPES,
  }) => {
    const { selectedFabric } = useContext(TorusModellerContext);
    const cycleFabric = () => {
      switch (selectedFabric) {
        case "Home":
          return (
            <div className="relative flex h-full w-full items-center justify-center italic dark:text-white">
              Home Screen
              {children({
                setToggleReactflow: null,
                uniqueNames: null,
                changeProperty: null,
                updatedNodeConfig: null,
                sideBarData: null,
              })}
            </div>
          );

        case "DF":
          return (
            <AppDF
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children}
              proOptions={proOptions}
            />
          );
        case "UF":
          return (
            <AppUF
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children}
              proOptions={proOptions}
            />
          );
        case "PF":
          return (
            <AppPF
              nodeTypes={NODE_TYPES}
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children}
              proOptions={proOptions}
            />
          );
        case "SF":
          return (
            <div className="relative flex h-full w-full items-center justify-center italic dark:text-white">
              Not Implemented Yet
              {children({
                setToggleReactflow: null,
                uniqueNames: null,
                changeProperty: null,
                updatedNodeConfig: null,
                sideBarData: null,
              })}
            </div>
          );
        default:
          return "Not Selected";
      }
    };

    return cycleFabric();
  },
);
