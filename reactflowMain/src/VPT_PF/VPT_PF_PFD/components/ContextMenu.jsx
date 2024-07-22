import React from "react";
import { useReactFlow } from "reactflow";
import { useContext } from "react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { AiOutlineDelete } from "react-icons/ai";
import { TbSettings2 } from "react-icons/tb";

export default function ContextMenu({
  customCodeKey,
  artifacts,
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
  setSelectedNodeid,
  key,
  defaults,
  setDefaults,
  ...props
}) {
  const { getNode } = useReactFlow();
  const node = getNode(id);
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <>
      {node && (
        <>
          <div
            style={{ top, left, right, bottom }}
            className={
              `${darkMode ? "bg-[#363636]  " : "bg-white   "}` +
              `${
                node.data.label
                  ? "w-[170px] h-[145px] flex flex-col items-center justify-center  z-10 absolute rounded-md "
                  : "w-[170px] h-[110px] z-10 flex flex-col items-center justify-center  absolute  rounded-md "
              }`
            }
          >
            <div
              className={`w-full ${
                node?.data.label
                  ? "border-b-2 flex  items-center justify-center  border-gray-400/40  "
                  : "   hidden"
              }`}
            >
              <span
                className={
                  darkMode
                    ? "text-start font-semibold capitalize mb-2  text-white"
                    : "text-start font-semibold capitalize mb-2  text-black/75"
                }
              >
                {node?.data.label}
              </span>
            </div>

            <div className={`${darkMode ? " p-2 w-full" : " p-2 w-full "}`}>
              <div
                className={
                  darkMode
                    ? "flex flex-row whitespace-nowrap w-full   gap-[20px] p-[10px] hover:bg-slate-500/40 rounded-lg "
                    : "flex flex-row whitespace-nowrap  gap-[20px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
                }
                style={{
                  cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                }}
              >
                <span>
                  <TbSettings2
                    size={20}
                    color={darkMode ? "#fff" : "#8C8C8C"}
                  />
                </span>

                <button
                  onClick={() => {
                    if (isAdmin.canEdit) {
                      sideT();
                      setToogle(node);
                      setMenu(null);
                      console.log(node , "jk")
                    }
                  }}
                  disabled={!isAdmin.canEdit}
                  className={`cursor-${
                    isAdmin.canEdit
                      ? "text-base text-gray-500 hover:text-black"
                      : "not-allowed"
                  } `}
                >
                  <span
                    className={`text-base ${
                      darkMode ? "text-white" : "text-black/80"
                    } ml-2`}
                  >
                    Edit Node
                  </span>
                </button>
              
              </div>
              <div
                className={
                  darkMode
                    ? "flex flex-row  gap-[20px]  p-[10px] whitespace-nowrap hover:bg-slate-500/40 rounded-lg "
                    : "flex flex-row gap-[20px]  whitespace-nowrap p-[10px] hover:bg-gray-300/50 rounded-lg "
                }
                style={{
                  cursor: !isAdmin.canEdit ? "not-allowed" : "pointer",
                }}
              >
                <span>
                  <AiOutlineDelete
                    color={darkMode ? "#fff" : "#8C8C8C"}
                    size={20}
                  />
                </span>
                <button
                  onClick={() => {
                    if (isAdmin.canDelete) deleteNode(id, node);
                  }}
                  disabled={!isAdmin.canDelete}
                  className={`cursor-${
                    isAdmin.canEdit
                      ? "text-base text-gray-500 hover:text-black"
                      : "not-allowed"
                  }`}
                >
                  <span
                    className={`text-base ml-[12px]  ${
                      darkMode ? "text-white" : "text-black/80"
                    }`}
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
