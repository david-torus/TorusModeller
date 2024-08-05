import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReactFlow } from "reactflow";
import { Copy, Cut, Delete, EditNode, Paste } from "../../SVG_Application";
import TorusButton from "../../torusComponents/TorusButton";
import { Label, Tag, TagGroup, TagList, Text } from "react-aria-components";
import useCopyPaste from "../../commonComponents/react-flow-pro/useCopyPaste";
import { DarkmodeContext } from "../../commonComponents/context/DarkmodeContext";
import { MdDataArray, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { CustomCode, MapperIcon, RulesIcon } from "../../asset/SvgsApplication";
import TorusToolTip from "../../torusComponents/TorusToolTip";
import { TorusModellerContext } from "../../Layout";
export default function ProcessFabricContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}) {
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
          className="absolute z-50 flex cursor-default flex-col rounded-md bg-white    shadow-md dark:border dark:border-[#212121] dark:bg-[#161616] xl:h-56 xl:w-52 3xl:h-72 3xl:w-72  "
          {...props}
        >
          <div className=" h-[40px] w-full border-b p-3  py-1  dark:border-[#212121]  ">
            <Text className="flex items-center justify-start text-lg capitalize text-black  dark:text-white">
              {node?.data?.label}
            </Text>
          </div>
          <div className=" flex h-[40px] w-full items-center justify-center border-b p-3  py-1  dark:border-[#212121]  ">
            <div className={"flex w-full items-center  justify-between gap-1"}>
              <TorusToolTip
                placement="top"
                triggerElement={
                  <TorusButton
                    id={"pf_rule"}
                    buttonClassName={"w-1/3"}
                    isIconOnly={true}
                    onPress={() => {
                      props?.onEdit(id, "rule");
                    }}
                    Children={<RulesIcon />}
                  />
                }
                color={"#ccc"}
                tooltipFor={"pf_rule"}
                tooltipContent={"rule"}
              />
              <TorusToolTip
                placement="top"
                triggerElement={
                  <TorusButton
                    id={"pf_customCode"}
                    buttonClassName={"w-1/3"}
                    isIconOnly={true}
                    onPress={() => {
                      props?.onEdit(id, "code");
                    }}
                    Children={<CustomCode />}
                  />
                }
                color={"#ccc"}
                tooltipFor={"pf_customCode"}
                tooltipContent={"code"}
              />

              <TorusToolTip
                placement="top"
                triggerElement={
                  <TorusButton
                    id={"pf_mapper"}
                    buttonClassName={"w-1/3"}
                    onPress={() => {
                      props?.onEdit(id, "mapper");
                    }}
                    isIconOnly={true}
                    Children={<MapperIcon />}
                  />
                }
                color={"#ccc"}
                tooltipFor={"pf_mapper"}
                tooltipContent={"mapper"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <TorusButton
              key={"pf_edit"}
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
              key={"pf_cut"}
              isDisabled={!canCopy}
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
              key={"pf_copy"}
              isDisabled={!canCopy}
              onPress={() => copy(id)}
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
              key={"pf_delete"}
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
