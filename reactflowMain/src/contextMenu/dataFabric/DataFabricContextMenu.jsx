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
          className="absolute z-50 flex cursor-default flex-col rounded-md bg-white    shadow-md dark:border dark:border-[#212121] dark:bg-[#161616] xl:h-52 xl:w-52 3xl:h-72 3xl:w-72  "
          {...props}
        >
          <Text className="h-5 w-full border-b py-1 text-xl capitalize text-black  dark:border-[#212121] dark:text-white ">
            {node?.data?.label}
          </Text>

          <div className="flex flex-col gap-1">
            <TorusButton
              key={"df_edit"}
              // buttonClassName={
              //   "   flex bg-blue-300 justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              onPress={() => props?.onEdit(id)}
              Children={
                <div className="flex h-5 w-[190px] flex-row items-center ">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" flex items-center justify-center gap-2  text-sm text-black dark:text-white">
                      <EditNode className={"stroke-black dark:stroke-white "} />
                      Edit Node
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-black dark:text-white"></div>
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-[#020202]/35 dark:text-white">
                      E
                    </div>
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"df_cut"}
              isDisabled={!canCopy}
              // buttonClassName={
              //   "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              onPress={() => cut(id)}
              Children={
                <div className="flex h-5 w-[190px] flex-row items-center ">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" flex items-center justify-center gap-2  text-sm text-black dark:text-white">
                      <Cut className={"stroke-black dark:stroke-white "} />
                      Cut
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-[#020202]/35 dark:text-white">
                      ⌘
                    </div>
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-[#020202]/35 dark:text-white">
                      X
                    </div>
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"df_copy"}
              isDisabled={!canCopy}
              onPress={() => copy(id)}
              // buttonClassName={
              //   "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              Children={
                <div className="flex h-5 w-[190px] flex-row items-center ">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" flex items-center justify-center gap-2  text-sm text-black dark:text-white">
                      <Copy className={"stroke-black dark:stroke-white "} />
                      Copy
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-[#020202]/35 dark:text-white">
                      ⌘
                    </div>
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-[#020202]/35 dark:text-white">
                      C
                    </div>
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"df_paste"}
              isDisabled={!canPaste}
              onPress={() => paste()}
              // buttonClassName={
              //   "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              Children={
                <div className="flex h-5 w-[190px] flex-row items-center ">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" flex items-center justify-center gap-2  text-sm text-black dark:text-white">
                      <Paste className={"stroke-black dark:stroke-white "} />
                      Paste
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-[#020202]/35 dark:text-white">
                      ⌘
                    </div>
                    <div className=" flex h-5 w-5 items-center justify-center bg-[#F2F3F8] text-xs text-[#020202]/35 dark:text-white">
                      V
                    </div>
                  </div>
                </div>
              }
            />

            <TorusButton
              key={"df_delete"}
              onPress={() => {
                deleteNode();
                props.onClick();
              }}
              Children={
                <div className="flex h-5 w-[190px] flex-row items-center ">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" flex items-center justify-center gap-2  text-sm text-[#F44336] dark:text-white">
                      <Delete />
                      Delete
                    </div>
                  </div>
                  <div className="flex w-[30%]  items-center justify-end gap-2 p-1">
                    <div className=" h-5 w-8 bg-[#F2F3F8] text-sm text-[#020202]/35 dark:text-white">
                      Del
                    </div>
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
