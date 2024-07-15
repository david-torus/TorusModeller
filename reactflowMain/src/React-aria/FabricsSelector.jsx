import React, { forwardRef } from "react";
import ReactFlow from "reactflow";
import HomeScreen from "./HomeScreen";

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
          />
        );
      default:
        return "Not Selected";
    }
  };

  return cycleFabric(fabric);
});
