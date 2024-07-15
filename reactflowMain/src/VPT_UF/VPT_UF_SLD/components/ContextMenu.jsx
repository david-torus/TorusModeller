
import React from "react";
import { useReactFlow, useStore, useStoreApi } from "reactflow";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FaRegObjectUngroup } from "react-icons/fa";
import { GrDetach } from "react-icons/gr";
import useDetachNodes from "../../../commonComponents/react-flow-pro/dynamicGrouping/useDetachNodes";
import { getRelativeNodesBounds } from "../../../commonComponents/react-flow-pro/dynamicGrouping/utils";
export const ContextMenu = ({
  id,
  top,
  left,
  right,
  bottom,
  setToogle,
  sideT,
  setMenu,
  setSelectedNodeid,
}) => {
  const { getNode } = useReactFlow();
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  /**
   * Ungroups a node by detaching its child nodes from the store.
   *
   * @return {void} This function does not return anything.
   */
  const onunGroup = () => {
    const childNodeIds = Array.from(store.getState().nodeInternals.values())
      .filter((n) => n.parentNode === id)
      .map((n) => n.id);
    detachNodes(childNodeIds, id);
  };
  const store = useStoreApi();
  const {  hasChildNodes } = useStore((store) => {
    const childNodes = Array.from(store.nodeInternals.values()).filter(
      (n) => n.parentNode === id
    );
    const rect = getRelativeNodesBounds(childNodes);
    return {
      minWidth: rect.x + rect.width,
      minHeight: rect.y + rect.height,
      hasChildNodes: childNodes.length > 0,
    };
  }, isEqual);

  /**
   * A function that checks if the properties of two objects are equal.
   *
   * @param {object} prev - The previous object to compare.
   * @param {object} next - The next object to compare.
   * @return {boolean} Returns true if the properties are equal, false otherwise.
   */
  function isEqual(prev, next) {
    return (
      prev.minWidth === next.minWidth &&
      prev.minHeight === next.minHeight &&
      prev.hasChildNodes === next.hasChildNodes
    );
  }
  const node = getNode(id);
  const hasParent = useStore(
    (store) => !!store.nodeInternals.get(id)?.parentNode
  );
  const onDetach = () => detachNodes([id]);
  const { darkmode } = React.useContext(DarkmodeContext);

  return (
    <div
      style={{ top, left, right, bottom }}
      className={
        `${darkmode ? "bg-[#363636]  " : "bg-white   "}` +
        `${
          hasChildNodes || hasParent
            ? "w-[170px] h-[180px] flex flex-col items-center justify-center  z-10 absolute rounded-md "
            : "w-[170px] h-[130px] z-10 flex flex-col items-center justify-center  absolute  rounded-md "
        }`
      }
    >
      <div
        className={`w-full ${
          node?.type
            ? "border-b-2 flex  items-center justify-center  border-gray-400/40  "
            : "   hidden"
        }`}
      >
        <p
          className={
            darkmode
              ? "text-start font-semibold capitalize mb-2 mt-2 text-white"
              : "text-start font-semibold capitalize mb-2 mt-2 text-black/75"
          }
        >
          {node?.type}
        </p>
      </div>

      {/* contextmenu-menu */}
      <div className={`${darkmode ? " p-2 w-full" : " p-2 w-full "}`}>
        <div
          className={
            darkmode
              ? "flex flex-row whitespace-nowrap w-full   gap-[18px] p-[10px] hover:bg-slate-500/40 rounded-lg "
              : "flex flex-row whitespace-nowrap  gap-[18px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
          }
        >
          <span>
            <BiEdit size={20} color={darkmode ? "#fff" : "#8C8C8C"} />
          </span>
          <button
            onClick={() => {
              sideT();
              setToogle(node, id);
              setMenu(null);
              setSelectedNodeid(id);
            }}
          >
            <span
              className={`text-base ${
                darkmode ? "text-white" : "text-black/80"
              } ml-2`}
            >
              Edit Node
            </span>
          </button>
        </div>

        {node.type === "group" && hasChildNodes && (
          <div
            className={
              darkmode
                ? "flex flex-row whitespace-nowrap w-full   gap-[18px] p-[10px] hover:bg-slate-500/40 rounded-lg "
                : "flex flex-row whitespace-nowrap  gap-[18px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
            }
          >
            <span>
              <FaRegObjectUngroup
                size={20}
                color={darkmode ? "#fff" : "#8C8C8C"}
              />
            </span>
            <button
              onClick={() => {
                onunGroup();

                setMenu(null);
              }}
            >
              <span
                className={`text-base ${
                  darkmode ? "text-white" : "text-black/80"
                } ml-2`}
              >
                Ungroup
              </span>
            </button>
          </div>
        )}
        {node.type !== "group" && hasParent && (
          <div
            className={
              darkmode
                ? "flex flex-row whitespace-nowrap w-full   gap-[18px] p-[10px] hover:bg-slate-500/40 rounded-lg "
                : "flex flex-row whitespace-nowrap  gap-[18px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
            }
          >
            <span>
              <GrDetach size={20} color={darkmode ? "#fff" : "#8C8C8C"} />
            </span>
            <button
              onClick={() => {
                onDetach();

                setMenu(null);
              }}
            >
              <span
                className={`text-base ${
                  darkmode ? "text-white" : "text-black/80"
                } ml-2`}
              >
                Detach
              </span>
            </button>
          </div>
        )}
        <div
          className={
            darkmode
              ? "flex flex-row  gap-[20px]  p-[10px] whitespace-nowrap hover:bg-slate-500/40 rounded-lg "
              : "flex flex-row gap-[20px]  whitespace-nowrap p-[10px] hover:bg-gray-300/50 rounded-lg "
          }
        >
          <button
            onClick={() => {
              // deleteNode(id, node);
              deleteElements({ nodes: [{ id }] });
              setMenu(null);
            }}
            className="flex "
          >
            <span>
              <AiOutlineDelete
                color={darkmode ? "#fff" : "#8C8C8C"}
                size={20}
              />
            </span>
            <span
              className={`text-base ml-[26px]  ${
                darkmode ? "text-white" : "text-black/80"
              }`}
            >
              Delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
