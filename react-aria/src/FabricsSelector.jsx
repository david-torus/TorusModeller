import React from "react";
import ReactFlow from "reactflow";

export default function FabricsSelector({
  fabric,
  nodes,
  edges,
  setEdges,
  setNodes,
  onDrop,
  onDragOver,
  onNodesChange,
  onEdgesChange,
  onConnect,
  children,
  NODE_TYPES,
}) {
  const cycleFabric = (fabric) => {
    switch (fabric) {
      case "DF":
        return (
          <ReactFlow
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
}
