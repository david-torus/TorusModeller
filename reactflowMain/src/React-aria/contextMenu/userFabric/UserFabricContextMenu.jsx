import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { Text } from "react-aria-components";
import { Copy, Cut, Delete, EditNode, Paste } from "../../SVG_Application";
import TorusButton from "../../torusComponents/TorusButton";
export default function UserFabricContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
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
    <>
      {node && (
        <div
          style={{ top, left, right, bottom }}
          className="absolute z-50 bg-white shadow-md rounded-md cursor-default w-44 flex flex-col gap-3 p-1 "
          {...props}
        >
          <Text className="text-xl">{node?.data?.label}</Text>
          <div className="flex flex-col gap-1">
            <TorusButton
              key={"uf_edit"}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              Children={
                <div>
                  <div className=" w-full h-full flex justify-center gap-2 items-center">
                    <EditNode />
                    Edit Node
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"uf_cut"}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              Children={
                <div>
                  <div className=" w-full h-full flex justify-center gap-2 items-center">
                    <Cut />
                    Cut
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"uf_copy"}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              Children={
                <div>
                  <div className=" w-full h-full flex justify-center gap-2 items-center">
                    <Copy />
                    Copy
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"uf_paste"}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              Children={
                <div>
                  <div className=" w-full h-full flex justify-center gap-2 items-center">
                    <Paste />
                    Paste
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"uf_delete"}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-red-200/60"
              }
              onPress={() => {
                deleteNode();
                props.onClick();
              }}
              Children={
                <div>
                  <div className=" w-full h-full flex justify-center gap-2 text-red-400 items-center">
                    <Delete />
                    Delete
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
