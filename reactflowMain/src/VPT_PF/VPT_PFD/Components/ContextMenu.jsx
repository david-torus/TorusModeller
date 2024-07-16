import React, { useState, useEffect, useContext } from "react";
import { useReactFlow } from "reactflow";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { TbSettings2 } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { InputText } from "primereact/inputtext";
import DefaultSideBar from "../../../commonComponents/DefaultsCommonSideBar/DefaultSideBar";

/**
 * ContextMenu component props
 * @typedef {Object} ContextMenuProps
 * @property {Function} setToogleReactFlow - Function to toggle ReactFlow
 * @property {Array} uniqueNames - unique names array
 * @property {boolean} defaultsMode - defaults mode flag
 * @property {Object} pwUI - PW UI object
 * @property {Function} setPWUI - Function to set PW UI
 * @property {boolean} sideT - sidebar toggle flag
 * @property {Function} setToogle - Function to toggle sidebar
 * @property {Function} deleteNode - Function to delete node
 * @property {Function} setMenu - Function to set menu
 * @property {string} id - Node id
 */
export default function ContextMenu({
  setToogleReactFlow,
  uniqueNames,
  defaultsMode,
  pwUI,
  setPWUI,
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
  nodeConfig,
  controlPolicyApi,
  showerror,
  showsuccess,
  ...props
}) {
  const { getNode } = useReactFlow();
  const node = getNode(id);

  const [editedHeader, setEditedHeader] = useState("");

  const [toogleInputNameEdit, setToogleInputNameEdit] = useState(false);

  const { darkmode } = useContext(DarkmodeContext);
  const [mode, setMode] = useState("");
  const { setNodes } = useReactFlow();
  const [showSide, setShowSide] = useState(false);
  /**
   * Handles the change event for the header input field.
   *
   * @param {Event} e - The event object for the change event.
   * @return {void} This function does not return anything.
   */
  const handleHeaderChange = (e) => {
    try {
      if (
        uniqueNames.includes(e.target.value) &&
        e.target.value !== node.data.label
      ) {
        e.target.value = "";
        return;
      } else {
        setEditedHeader(e.target.value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the blur event on the header.
   *
   * @param {Event} e - The event object
   * @return {void}
   */
  const handleHeaderBlur = (e) => {
    try {
      if (editedHeader === "") {
        return;
      }

      setToogleInputNameEdit(false);
      setNodes((nds) => {
        return (
          nds &&
          nds.map((node) => {
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
          })
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      setMode(defaultsMode);
    } catch (error) {
      console.error(error);
    }
  }, [defaultsMode]);

  //Returning the JSX
  return (
    <>
      {node && (
        <>
          <div
            style={{ top, left, right, bottom }}
            className={
              `${darkmode ? "bg-[#363636]  " : "bg-white   "}` +
              `${
                node.type
                  ? "min-w-[170px] max-w-[200px] min-h-[240px] max-h-[320px] shadow-lg flex flex-col items-center justify-center  z-10 absolute rounded-md "
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
                      ? "text-start font-semibold capitalize mb-2 mt-2 text-white"
                      : "text-start font-semibold capitalize mb-2 mt-2 text-black/75"
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
                  <TbSettings2
                    size={20}
                    color={darkmode ? "#fff" : "#8C8C8C"}
                  />
                </span>
                <button
                  className={`cursor-${
                    isAdmin.canEdit
                      ? "text-base text-gray-500 hover:text-black"
                      : "not-allowed"
                  } `}
                  onClick={() => {
                    setShowSide(true);
                  }}
                >
                  <span
                    className={`text-base ${
                      darkmode ? "text-white" : "text-black/80"
                    } ml-2`}
                    style={{ cursor: "pointer" }}
                  >
                    Edit Node
                  </span>
                </button>
              </div>

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
                  } `}
                  onClick={() => {
                    if (isAdmin?.canDelete) deleteNode(id, node);
                  }}
                  disabled={!isAdmin?.canDelete}
                  style={{
                    cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
                  }}
                >
                  <span
                    className={`text-base ${
                      darkmode ? "text-white" : "text-black/80"
                    } ml-2`}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <DefaultSideBar
        visible={showSide}
        mode={mode}
        currentDefault={"PF"}
        setVisible={setShowSide}
        sideBarData={getNode(id)}
        updatedNodeConfig={updatedNodeConfig}
      />
    </>
  );
}
