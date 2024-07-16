import React, { useContext } from "react";
import { useReactFlow } from "reactflow";
import { DarkmodeContext } from "../../commonComponents/context/DarkmodeContext";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  setToogleNodeInfo,
  setNodeInfoData,
  takeSnapshot,
  ...props
}) {
  const { getNode, setNodes, setEdges, getNodes, getEdges } = useReactFlow();
  const { darkmode } = useContext(DarkmodeContext);

  /**
   * Deletes a node and its associated edges from the graph.
   *
   * @return {void} This function does not return anything.
   */
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
        (node) => !childIds.includes(node.id)
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
                  (childId) => childId !== id
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
          !childIds.includes(edge.source) && !childIds.includes(edge.target)
      );
      setEdges(updatedEdges);
      takeSnapshot();
    } catch (error) {
      toast.error("Error while deleting", { autoClose: 1500 });
    }
  };

  /**
   * Renders a context menu component.
   *
   * @return {JSX.Element} The context menu component.
   */
  return (
    <div
      style={{ top, left, right, bottom }}
      className={
        `${darkmode ? "bg-[#363636]  " : "bg-white   "}` +
        `${
          getNode(id).data.label
            ? "w-[170px] h-[145px] flex flex-col items-center justify-center  z-10 absolute rounded-md "
            : "w-[170px] h-[130px] z-10 flex flex-col items-center justify-center  absolute  rounded-md "
        }`
      }
      {...props}
    >
      <div
        className={`w-full ${
          getNode(id).data.label
            ? "border-b-2 flex mt-1 items-center justify-center  border-gray-400/40  "
            : "   hidden"
        }`}
      >
        <span
          className={
            darkmode
              ? "text-start font-semibold capitalize mb-2  text-white"
              : "text-start font-semibold capitalize mb-2  text-black/75"
          }
        >
          {getNode(id).data.label}
        </span>
      </div>
      <div className={`${darkmode ? " p-2 w-full" : " p-2 w-full "}`}>
        <div
          className={
            darkmode
              ? "flex flex-row whitespace-nowrap w-full cursor-pointer  gap-[20px] p-[10px] hover:bg-slate-500/40 rounded-lg "
              : "flex flex-row whitespace-nowrap cursor-pointer gap-[20px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
          }
          onClick={() => {
            setNodeInfoData(getNode(id));
            setToogleNodeInfo(true);
          }}
        >
          <span>
            <BiEdit size={20} color={darkmode ? "#fff" : "#8C8C8C"} />
          </span>

          <button>
            <span
              className={`text-base ${
                darkmode ? "text-white" : "text-black/80"
              } ml-2`}
            >
              Edit Node
            </span>
          </button>
        </div>
        <div
          className={
            darkmode
              ? "flex flex-row whitespace-nowrap w-full cursor-pointer  gap-[20px] p-[10px] hover:bg-slate-500/40 rounded-lg "
              : "flex flex-row whitespace-nowrap cursor-pointer gap-[20px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
          }
          onClick={deleteNode}
        >
          <span>
            <AiOutlineDelete color={darkmode ? "#fff" : "#8C8C8C"} size={20} />
          </span>
          <button>
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
  );
}
