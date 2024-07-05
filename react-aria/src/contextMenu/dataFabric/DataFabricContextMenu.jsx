import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import TorusButton from "../../torusComponents/TorusButton";
import { Text } from "react-aria-components";

export default function DataFabricContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  console.log(top, left, right, bottom);
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const node = getNode(id);
  const duplicateNode = useCallback(() => {
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="absolute z-50 bg-white shadow-md rounded-md cursor-default w-52 flex flex-col gap-4 p-1 "
    >
      <Text className="text-xl">{node.data.label}</Text>
      <div>
        <TorusButton
          buttonClassName={
            "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-400/60"
          }
          Children={<span className=" w-full h-full">Edit Node</span>}
        />
      </div>
      <div>
        <span>cut</span>
      </div>
      <div>
        <span>copy</span>
      </div>
      <div>
        <span>paste</span>
      </div>
      <div>
        <span>delete</span>
      </div>
      <button onClick={duplicateNode}>duplicate</button>
      <button onClick={deleteNode}>delete</button>
    </div>
  );
}
