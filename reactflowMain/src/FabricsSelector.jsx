import React, {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactFlow from "reactflow";
import UFDMain from "./VPT_UF/VPT_UF_SLD/UFDMain";
import FlowWithProviderUF from "./VPT_UF/VPT_UF_SLD/components/App";
import AppDF from "./VPT_DF/VPT_DF_ERD/Components/App";
import { FabricsContexts } from "./Layout";
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
    const { selectedFabric } = useContext(FabricsContexts);
    const cycleFabric = () => {
      switch (selectedFabric) {
        case "Home":
          return (
            <ReactFlow
              nodeTypes={NODE_TYPES}
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children({
                setToggleReactflow: null,
                uniqueNames: null,
                changeProperty: null,
                updatedNodeConfig: null,
                sideBarData: null,
              })}
              proOptions={proOptions}
            />
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
            <ReactFlow
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
        default:
          return "Not Selected";
      }
    };

    return cycleFabric();
  }
);
