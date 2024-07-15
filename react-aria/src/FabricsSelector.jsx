import React, { forwardRef } from "react";
import ReactFlow from "reactflow";
import HomeScreen from "./HomeScreen";
const proOptions = { hideAttribution: true };
export const FabricsSelector = forwardRef(function FabricsSelector(
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
) {
  console.log(fabric);
  const cycleFabric = (fabric) => {
    switch (fabric) {
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
      case "UF":
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
  };

  return cycleFabric(fabric);
});
