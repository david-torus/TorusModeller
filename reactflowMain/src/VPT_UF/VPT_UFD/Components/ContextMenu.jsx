
import React, { useState, useEffect,  useContext } from "react";
import { useReactFlow, useStore, useStoreApi } from "reactflow";
import { TbSettings2 } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";

import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { InputText } from "primereact/inputtext";
import { GrDetach } from "react-icons/gr";
import useDetachNodes from "../../../commonComponents/react-flow-pro/dynamicGrouping/useDetachNodes";
import { getRelativeNodesBounds } from "../../../commonComponents/react-flow-pro/dynamicGrouping/utils";
import { FaRegObjectUngroup } from "react-icons/fa6";

import DefaultSideBar from "../../../commonComponents/DefaultsCommonSideBar/DefaultSideBar";

export default function ContextMenu({
  uniqueNames,
  defaultsMode,
  sideT,
  setToogle,
  deleteNode,
  setMenu,
  id,
  top,
  left,
  right,
  bottom,
  type,
  updatedNodeConfig,
  isAdmin,

  showerror,
  showsuccess,
  ...props
}) {
  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const [showSide, setShowSide] = useState(false);
  const onunGroup = () => {
    const childNodeIds = Array.from(store.getState().nodeInternals.values())
      .filter((n) => n.parentNode === id)
      .map((n) => n.id);
    detachNodes(childNodeIds, id);
  };

  const { hasChildNodes } = useStore((store) => {
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

  function isEqual(prev, next) {
    return (
      prev.minWidth === next.minWidth &&
      prev.minHeight === next.minHeight &&
      prev.hasChildNodes === next.hasChildNodes
    );
  }
  const detachNodes = useDetachNodes();
  const hasParent = useStore(
    (store) => !!store.nodeInternals.get(id)?.parentNode
  );
  const onDetach = () => detachNodes([id]);

  const { getNode } = useReactFlow();
  const node = getNode(id);

  const { darkmode } = useContext(DarkmodeContext);
  const [mode, setMode] = useState("");
  const [toogleInputNameEdit, setToogleInputNameEdit] = useState(false);
  const [editedHeader, setEditedHeader] = useState("");
  const { setNodes } = useReactFlow();

  const handleHeaderChange = (e) => {
    if (
      uniqueNames.includes(e.target.value) &&
      e.target.value !== node.data.label
    ) {
      e.target.value = "";
      return;
    } else {
      setEditedHeader(e.target.value);
    }
  };

  const handleHeaderBlur = (e) => {
    if (editedHeader === "") {
      return;
    }

    setToogleInputNameEdit(false);
    setNodes((nds) => {
      return nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: editedHeader,
            },
            property: {
              ...node.property,
              name: editedHeader,
            },
          };
        }
        return node;
      });
    });
  };

  useEffect(() => {
    setMode(defaultsMode);
  }, [defaultsMode]);

  return (
    <>
      {node && (
        <div
          style={{ top, left, right, bottom }}
          className={
            `${darkmode ? "bg-[#363636]  " : "bg-white   "}` +
            `${
              node.type
                ? "w-[180px] min-h-[190px] max-h-[215px] shadow-lg flex flex-col items-center justify-center  z-10 absolute rounded-md "
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
            {!toogleInputNameEdit ? (
              <p
                onClick={() => {
                  if (mode && mode === "MultiNode") {
                    setToogleInputNameEdit(!toogleInputNameEdit);
                  }
                }}
                className={
                  darkmode
                    ? "text-start font-semibold capitalize mb-2 mt-3  text-white"
                    : "text-start font-semibold capitalize mb-2  mt-3 text-black/75"
                }
              >
                {node.data.label || node?.type}
              </p>
            ) : (
              <InputText
                placeholder="Type here..."
                value={editedHeader || node.data.label}
                onChange={(e) => {
                  handleHeaderChange(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleHeaderBlur(e);
                  }
                }}
                style={{
                  width: "100px",
                  fontSize: 2,
                  backgroundColor: "transparent",
                  color: darkmode ? "white" : "black",
                }}
              />
            )}
          </div>

          <div className={`${darkmode ? " p-2 w-full" : " p-2 w-full "}`}>
            <div
              className={
                darkmode
                  ? "flex flex-row whitespace-nowrap w-full   gap-[11px] p-[10px] hover:bg-slate-500/40 rounded-lg "
                  : "flex flex-row whitespace-nowrap  gap-[11px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
              }
            >
              <span>
                <TbSettings2 size={20} color={darkmode ? "#fff" : "#8C8C8C"} />
              </span>
              <button
                onClick={() => {
                  setShowSide(true);
                }}
                className={`cursor-${
                  isAdmin.canEdit
                    ? "text-base text-gray-500 hover:text-black"
                    : "not-allowed"
                } `}
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
                  ? "flex flex-row  gap-[11px]  p-[10px] whitespace-nowrap hover:bg-slate-500/40 rounded-lg "
                  : "flex flex-row gap-[11px]  whitespace-nowrap p-[10px] hover:bg-gray-300/50 rounded-lg "
              }
              style={{
                cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
              }}
            >
              <span>
                <AiOutlineDelete
                  size={20}
                  color={darkmode ? "#fff" : "#8C8C8C"}
                />
              </span>
              <button
                className={`cursor-${
                  isAdmin.canEdit
                    ? "text-base text-gray-500 hover:text-black"
                    : "not-allowed"
                }`}
                onClick={() => {
                  if (isAdmin?.canDelete) deleteElements({ nodes: [{ id }] });
                }}
                disabled={!isAdmin?.canDelete}
                style={{
                  cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
                }}
              >
                <span
                  className={`text-base ml-[12px]  ${
                    darkmode ? "text-white" : "text-black/80"
                  }`}
                >
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      <DefaultSideBar
        visible={showSide}
        mode={mode}
        currentDefault={"UF"}
        setVisible={setShowSide}
        sideBarData={getNode(id)}
        updatedNodeConfig={updatedNodeConfig}
      />
    </>
  );
}
