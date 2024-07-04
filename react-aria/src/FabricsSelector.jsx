import React from "react";
import ReactFlow from "reactflow";

export default function FabricsSelector({
  fabric,
  nodes,
  edges,
  setEdges,
  setNodes,
  onNodesChange,
  onEdgesChange,
  children,
}) {
  const cycleFabric = (fabric) => {
    switch (fabric) {
      case "DF":
        return (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            children={children}
          />
        );
      case "UF":
        return (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            children={children}
          />
        );
      case "PF":
        return (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            children={children}
          />
        );
      case "SF":
        return (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            children={children}
          />
        );
      default:
        return "Not Selected";
    }
  };

  return cycleFabric(fabric);
}
