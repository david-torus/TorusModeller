import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { Text } from "react-aria-components";
import { Copy, Cut, Delete, EditNode, Paste } from "../../SVG_Application";
import TorusButton from "../../torusComponents/TorusButton";
import useCopyPaste from "../../commonComponents/react-flow-pro/useCopyPaste";
export default function SecurityFabricContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
  const { getNode, setNodes, addNodes, getEdges, setEdges, getNodes } =
    useReactFlow();
  const { cut, copy, paste, bufferedNodes } = useCopyPaste();
  const canCopy = getNodes().some(({ selected }) => selected);
  const node = getNode(id);
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
  const deleteNode = () => {
    try {
      const getChildIds = (parentId, nodes) => {
        const childIds = [];
        const stack = [parentId];
        while (stack.length > 0) {
          const currentNodeId = stack.pop();
          const currentNode = nodes.find((node) => node.id === currentNodeId);
          if (currentNode) {
            childIds.push(currentNodeId);
            if (currentNode.data.children) {
              stack.push(...currentNode.data.children);
            }
          }
        }
        return childIds;
      };
      const nodeToDelete = getNodes().find((node) => node.id === id);
      if (!nodeToDelete) {
        return;
      }
      const childIds = getChildIds(id, getNodes());
      const updatedNodes = getNodes().filter(
        (node) => !childIds.includes(node.id),
      );
      if (
        updatedNodes &&
        Array.isArray(updatedNodes) &&
        updatedNodes.length > 0
      ) {
        const rmvChildFrmPrnt = updatedNodes.map((node) => {
          if (node.data.children && node.data.children.includes(id)) {
            return {
              ...node,
              data: {
                ...node.data,
                children: node.data.children.filter(
                  (childId) => childId !== id,
                ),
              },
            };
          }
          return node;
        });
        setNodes(rmvChildFrmPrnt);
      } else {
        setNodes([]);
      }
      const updatedEdges = getEdges().filter(
        (edge) =>
          !childIds.includes(edge.source) && !childIds.includes(edge.target),
      );
      setEdges(updatedEdges);
      // takeSnapshot();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {node && (
        <div
          style={{ top, left, right, bottom }}
          className="absolute z-50 flex cursor-default flex-col rounded-md bg-white    shadow-md dark:border dark:border-[#212121] dark:bg-[#161616] xl:h-56 xl:w-52 3xl:h-72 3xl:w-72  "
          {...props}
        >
          <div className=" h-[40px] w-full border-b p-3  py-1  dark:border-[#212121]  ">
            <Text className="flex items-center justify-start text-lg capitalize text-black  dark:text-white">
              {node?.data?.label}
            </Text>
          </div>

          <div className="flex flex-col gap-[6px]">
            <TorusButton
              key={"sf_edit"}
              // buttonClassName={
              //   "   flex   justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              onPress={() => props?.onEdit(id)}
              Children={
                <div className="mt-1 flex h-[30px]  w-full cursor-pointer flex-row   items-center p-2">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" ml-[10px] flex items-center justify-center gap-3  text-sm text-black dark:text-white">
                      <EditNode className={"stroke-black dark:stroke-white "} />
                      Edit Node
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5  items-center justify-center  rounded-sm bg-[#F2F3F8] text-xs
text-[#020202]/35 dark:bg-[#0F0F0F]  dark:text-[#FFFFFF]/35"
                    ></div>
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5 items-center justify-center  rounded-sm bg-[#F2F3F8] text-xs
text-[#020202]/35 dark:bg-[#0F0F0F]  dark:text-[#FFFFFF]/35"
                    >
                      E
                    </div>
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"sf_cut"}
              isDisabled={!canCopy}
              // buttonClassName={
              //   "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              onPress={() => cut(id)}
              Children={
                <div className="flex h-[30px] w-full  cursor-pointer flex-row items-center    p-2">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" ml-[10px] flex items-center justify-center gap-3  text-sm text-black dark:text-white">
                      <Cut className={"stroke-black dark:stroke-white "} />
                      Cut
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5 items-center  justify-center rounded-sm  bg-[#F2F3F8] text-xs text-[#020202]/35
dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35"
                    >
                      ⌘
                    </div>
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5  items-center justify-center rounded-sm  bg-[#F2F3F8] text-xs text-[#020202]/35
dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35"
                    >
                      X
                    </div>
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"sf_copy"}
              isDisabled={!canCopy}
              onPress={() => copy(id)}
              // buttonClassName={
              //   "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              Children={
                <div className="flex h-[30px] w-full  cursor-pointer flex-row items-center   p-2">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" ml-[10px] flex items-center justify-center gap-3  text-sm text-black dark:text-white">
                      <Copy className={"stroke-black dark:stroke-white "} />
                      Copy
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5 items-center  justify-center rounded-sm  bg-[#F2F3F8] text-xs text-[#020202]/35
dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35"
                    >
                      ⌘
                    </div>
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5  items-center justify-center rounded-sm  bg-[#F2F3F8] text-xs text-[#020202]/35
dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35"
                    >
                      C
                    </div>
                  </div>
                </div>
              }
            />
            <TorusButton
              key={"sf_paste"}
              isDisabled={!canPaste}
              onPress={() => paste()}
              // buttonClassName={
              //   "p-1 m-0 w-full h-full flex justify-start torus-pressed:animate-none torus-hover:outline-none torus-hover:scale-100 torus-hover:bg-gray-300/60"
              // }
              Children={
                <div className="flex h-[30px] w-full  cursor-pointer flex-row  items-center    p-2">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" ml-[10px] flex items-center justify-center gap-3  text-sm text-black dark:text-white">
                      <Paste className={"stroke-black dark:stroke-white "} />
                      Paste
                    </div>
                  </div>
                  <div className="flex w-[30%] flex-row items-center justify-end gap-2 p-1">
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5 items-center  justify-center rounded-sm  bg-[#F2F3F8] text-xs text-[#020202]/35
dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35"
                    >
                      ⌘
                    </div>
                    <div
                      className=" darktext-[ #FFFFFF]/35 flex h-5 w-5 items-center  justify-center rounded-sm  bg-[#F2F3F8] text-xs text-[#020202]/35
dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35"
                    >
                      V
                    </div>
                  </div>
                </div>
              }
            />

            <TorusButton
              key={"sf_delete"}
              onPress={() => {
                deleteNode();
                props.onClick();
              }}
              Children={
                <div className="flex h-[30px] w-full  cursor-pointer flex-row items-center   p-2">
                  <div className="flex w-[70%] items-center justify-start">
                    <div className=" ml-[10px] flex items-center justify-center gap-3  text-sm text-[#F44336] dark:text-[#F44336]">
                      <Delete />
                      Delete
                    </div>
                  </div>
                  <div className="flex w-[30%]  items-center justify-end gap-2 p-1">
                    <div
                      className=" darktext-[ #FFFFFF]/35 h-5  w-8 rounded-sm  bg-[#F2F3F8] text-sm text-[#020202]/35
dark:bg-[#0F0F0F] dark:text-[#FFFFFF]/35"
                    >
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
