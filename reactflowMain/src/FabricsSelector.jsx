import React, { forwardRef, useCallback, useEffect, useState } from "react";
import ReactFlow from "reactflow";
import UFDMain from "./VPT_UF/VPT_UF_SLD/UFDMain";
import FlowWithProviderUF from "./VPT_UF/VPT_UF_SLD/components/App";
import { AppDF } from "./VPT_DF/VPT_DF_ERD/Components/App";

const proOptions = { hideAttribution: true };
export const FabricsSelector = forwardRef(
  (
    {
      fabric,
      nodes,
      edges,
      setEdges,
      setNodes,
      onNodeContextMenu,
      onPaneClick,
      onDrop,
      onDragOver,
      onNodesChange,
      onEdgesChange,
      onConnect,
      children,
      NODE_TYPES,
    },
    ref
  ) => {
    const [selectedFabric, setSelectedFabric] = useState("home");
    useEffect(() => {
      setSelectedFabric(fabric);
    }, [fabric]);
    const cycleFabric = useCallback(() => {
      switch (selectedFabric) {
        case "Home":
          return (
            <ReactFlow
              ref={ref}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              nodeTypes={NODE_TYPES}
              nodes={nodes}
              edges={edges}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              children={children}
              proOptions={proOptions}
            />
          );

        case "DF":
          return (
            <AppDF
              ref={ref}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              nodeTypes={NODE_TYPES}
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              children={children}
              proOptions={proOptions}
            />
          );
        case "UF":
          return (
            <FlowWithProviderUF
              ref={ref}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              children={children}
              proOptions={proOptions}
            />
          );
        case "PF":
          return (
            <ReactFlow
              ref={ref}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              nodeTypes={NODE_TYPES}
              nodes={nodes}
              edges={edges}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              children={children}
              proOptions={proOptions}
            />
          );
        case "SF":
          return (
            <ReactFlow
              ref={ref}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              nodeTypes={NODE_TYPES}
              nodes={nodes}
              edges={edges}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              children={children}
              proOptions={proOptions}
            />
          );
        default:
          return "Not Selected";
      }
    }, [selectedFabric]);

    return cycleFabric();
  }
);
