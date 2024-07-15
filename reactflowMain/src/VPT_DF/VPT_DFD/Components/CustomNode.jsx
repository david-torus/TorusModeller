import { Handle, Position, useReactFlow } from "reactflow";
import { useContext, useEffect, useState } from "react";
import { CiViewTable } from "react-icons/ci";
import { InputText } from "primereact/inputtext";
import { uniQueNameDFDContext } from "./App";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";

export function CustomTableNode({ id, data, isConnectable }) {
  const { darkmode } = useContext(DarkmodeContext);
  const [editingHeader, setEditingHeader] = useState(false);
  const [editedHeader, setEditedHeader] = useState("");
  const [showError, setShowError] = useState(false);
  const { uniqueNames } = useContext(uniQueNameDFDContext);
  const { setNodes } = useReactFlow();

  useEffect(() => {
    setEditedHeader(data.label);
  }, [data, isConnectable]);

  const positionStyles = {
    [Position.Left]: {
      left: "-16px",
      top: "51%",
      transform: "translateY(-50%)",
    },
    [Position.Right]: {
      right: "-16px",
      top: "50%",
      transform: "translateY(-50%)",
    },
    [Position.Top]: {
      top: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    [Position.Bottom]: {
      bottom: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
    },
  };

  /**
   * A function that handles the change in the header.
   *
   * @param {Event} e - The event object triggered by the change.
   * @return {void} No return value.
   */
  const handleHeaderChange = (e) => {
    try {
      if (
        uniqueNames.includes(e.target.value) &&
        e.target.value !== data.label
      ) {
        setShowError(true);
        e.target.value = "";
        return;
      } else {
        showError && setShowError(false);
        setEditedHeader(e.target.value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * A function that handles the blur event on the header.
   *
   * @param {Event} e - The event object triggered by the blur.
   * @return {void} No return value if the edited header is empty.
   */
  const handleHeaderBlur = (e) => {
    try {
      if (editedHeader === "") {
        return;
      }
      setShowError(false);
      setEditingHeader(false);
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

  /**
   * A function that handles the click event on the header.
   *
   * @return {void} No return value, sets editingHeader to true.
   */
  const handleHeaderClick = () => {
    setEditingHeader(true);
  };

  //Returning the JSX
  return (
    <>
      {!isConnectable ? (
        <div className="custom-node-img">
          <div
            className="custom-node"
            style={{
              border: "1px solid" + data.nodeColor,
              backgroundColor: darkmode ? "transparent" : "#F1EFEF",
            }}
          >
            {
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3px",
                  marginBottom: "-5px",
                }}
              >
                <CiViewTable />
              </span>
            }
            {isConnectable && (
              <>
                <Handle
                  type="source"
                  position={Position.Right}
                  isConnectable={isConnectable}
                  className="custom-node-handle"
                  style={{
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: data.nodeColor,
                  }}
                />
                <Handle
                  type="target"
                  position={Position.Left}
                  id="a"
                  className="custom-node-handle"
                  style={{
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: data.nodeColor,
                  }}
                  isConnectable={isConnectable}
                />
              </>
            )}
            <div
              style={{
                width: "80%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: darkmode ? "white" : "black",
                textAlign: "center",
              }}
            >
              <label
                title={isConnectable ? data.label : data?.nodeType}
                style={{
                  fontSize: "8px",
                  color: darkmode ? "white" : "black",
                  fontFamily: "monospace",
                }}
                htmlFor=""
              >
                {isConnectable ? data.label : data?.nodeType}
              </label>
            </div>
          </div>
        </div>
      ) : (
        <table
          removeWrapper
          topContentPlacement="top"
          className="w-[200px] ring-2 ring-gray-400  bg-gray-700 rounded-sm   "
        >
          <th className="relative ">
            <tr
              onClick={handleHeaderClick}
              className="h-[40px] bg-transparent text-white flex items-center justify-center "
            >
              {editingHeader ? (
                <div>
                  <InputText
                    className="border border-[#DCDCDC] w-full text-gray-600"
                    aria-describedby="username-help"
                    value={editedHeader}
                    onChange={handleHeaderChange}
                    onBlur={handleHeaderBlur}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleHeaderBlur(e);
                      }
                    }}
                    autoFocus
                  />
                  {showError && (
                    <small id="username-help">Table name already exists</small>
                  )}
                </div>
              ) : (
                <div>
                  <Handle
                    className={` w-[6%] h-[28%] absolute cursor-crosshair bg-gray-300
          left-[-18px] border-2 border-gray-300 transtion ease-in-out ml-[8.5px]`}
                    id={`header-${id}-left`}
                    type="target"
                    position={Position.Left}
                    style={{
                      ...positionStyles[Position.Left],
                    }}
                  />
                  {data.label || "click to give entity name"}

                  <Handle
                    className={`w-[6%] h-[29%] absolute cursor-crosshair bg-gray-600
          right-[-18px] border-2 border-gray-300 transtion ease-in-out mr-[9.5px]
      type="source`}
                    id={`header-${id}-right`}
                    type="source"
                    position={Position.Right}
                    style={{
                      ...positionStyles[Position.Right],
                    }}
                  />
                </div>
              )}
            </tr>
          </th>
          <tbody className="w-full">
            {Object.keys(data?.attributes).map(
              (key, index) =>
                data?.attributes[key].cname !== "" && (
                  <td
                    key={index}
                    className="flex h-[43px] text-md flex-col  justify-center bg-gray-800 text-white border-t-2 p-[10px] border-gray-500
                 odd:bg-gray-50 even:bg-gray-50 hover:bg-gray-600
                 transition-ease-in-out duration-150 last:rounded-b-sm first:border-none  "
                  >
                    <tr className="relative ">
                      <Handle
                        className="w-[6.5%] h-[50%] absolute cursor-crosshair bg-gray-300
                    left-[-17px] border-2 border-gray-800 transtion ease-in-out"
                        type="target"
                        id={`${index}-right`}
                        position={Position.Left}
                      />

                      {data?.attributes[key].cname}

                      <Handle
                        className="w-[6.5%] h-[50%] absolute cursor-crosshair bg-gray-300
                  right-[-17px] border-2 border-gray-800 transtion ease-in-out"
                        type="source"
                        id={`${index}-left`}
                        position={Position.Right}
                      />
                    </tr>
                  </td>
                )
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

/**
 * Renders a custom table node with optional connectability and a label.
 *
 * @param {Object} props - The properties for the table node.
 * @param {Object} props.data - The data for the table node.
 * @param {boolean} props.isConnectable - Whether the table node is connectable.
 * @return {JSX.Element} The custom table node component.
 */
export function TableNode({ data, isConnectable }) {
  const { darkmode } = useContext(DarkmodeContext);

  //Returning th JSX for the table node
  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <CiViewTable />
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                position: "absolute",

                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="a"
              className="custom-node-handle"
              style={{
                position: "absolute",

                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}
