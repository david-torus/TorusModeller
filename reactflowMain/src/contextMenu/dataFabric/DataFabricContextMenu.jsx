import React, { useCallback, useContext } from "react";
import { useReactFlow } from "reactflow";
import TorusButton from "../../torusComponents/TorusButton";
import { Text } from "react-aria-components";
import { Copy, Cut, Delete, EditNode, Paste } from "../../SVG_Application";
import { DarkmodeContext } from "../../commonComponents/context/DarkmodeContext";
import useCopyPaste from "../../commonComponents/react-flow-pro/useCopyPaste";

export default function DataFabricContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  console.log(top, left, right, bottom);
  const { getNode, setNodes, addNodes, setEdges, getNodes } = useReactFlow();
  const node = getNode(id);
  const { darkMode } = useContext(DarkmodeContext);
  const { cut, copy, paste, bufferedNodes } = useCopyPaste();
  const canCopy = getNodes().some(({ selected }) => selected);
  const canPaste = bufferedNodes.length > 0;
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
          className="absolute z-50 bg-white dark:bg-[#161616]  dark:border-[#212121] dark:border  shadow-md rounded-md cursor-default w-52 flex flex-col px-3 py-2  "
          {...props}
        >
          <Text className="text-xl capitalize py-1 text-black dark:text-white w-full  border-b dark:border-[#212121] ">
            {node?.data?.label}
          </Text>

          <div className="flex flex-col gap-1">
            <TorusButton
              key={"df_edit"}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              onPress={() => props?.onEdit(id)}
              Children={
                <div>
                  <div className=" w-full  text-black dark:text-white h-full flex justify-center gap-2 items-center">
                    <EditNode className={"stroke-black dark:stroke-white "} />
                    Edit Node
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"df_cut"}
              isDisabled={!canCopy}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              onPress={() => cut(id)}
              Children={
                <div>
                  <div className=" w-full h-full text-black dark:text-white   flex justify-center gap-2 items-center">
                    <Cut className={"stroke-black dark:stroke-white "} />
                    Cut
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"df_copy"}
              isDisabled={!canCopy}
              onPress={() => copy(id)}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              Children={
                <div>
                  <div className=" w-full h-full text-black dark:text-white  flex justify-center gap-2 items-center">
                    <Copy className={"stroke-black dark:stroke-white "} />
                    Copy
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"df_paste"}
              isDisabled={!canPaste}
              onPress={() => paste()}
              buttonClassName={
                "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              }
              Children={
                <div>
                  <div className=" w-full h-full text-black dark:text-white  flex justify-center gap-2 items-center">
                    <Paste className={"stroke-black dark:stroke-white "} />
                    Paste
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"df_delete"}
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
