import React, { useState, useEffect, useContext } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { InputText } from "primereact/inputtext";
import { uniQueNameContext } from "./App";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";

export function CustomTableNode({ data, id }) {
  const { uniqueNames } = useContext(uniQueNameContext);
  const [datas, setDatas] = useState({});
  const [editingHeader, setEditingHeader] = useState(false);
  const [editedHeader, setEditedHeader] = useState("");
  const [showError, setShowError] = useState(false);
  const { darkmode } = useContext(DarkmodeContext);
  const { setNodes } = useReactFlow();

  //UseEffect for editing header
  useEffect(() => {
    let nodeProperty = data.nodeProperty;
    if (nodeProperty && nodeProperty.hasOwnProperty("entities"))
      setDatas(nodeProperty.entities || []);
    else setDatas([]);
    setEditedHeader(data.label);
  }, [data, id]);

  // Position Styles for Handles
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
   * Handles the change event for the header input field.
   *
   * @param {Event} e - The event object containing information about the change event.
   * @return {void} This function does not return anything.
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
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the blur event for the header input field.
   *
   * @param {Event} e - The event object containing information about the blur event.
   * @return {void} This function does not return anything.
   */
  const handleHeaderBlur = (e) => {
    try {
      if (editedHeader === "") {
        return;
      }
      setShowError(false);
      setEditingHeader(false);
      setNodes((nds) => {
        return nds?.map((node) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the header click event.
   *
   * @return {void} This function does not return anything.
   */
  const handleHeaderClick = () => {
    setEditingHeader(true);
  };

  /**
   * Renders a table with a header and body.
   *
   * @return {JSX.Element} The rendered table component.
   */
  return (
    <table
      removeWrapper
      topContentPlacement="top"
      className={`${darkmode ? "ring-neutral-500/60 bg-neutral-700" : "ring-neutral-400 bg-neutral-400"} w-[200px] ring-2    rounded-sm    `}
    >
      <th className="relative ">
        <tr
          onClick={handleHeaderClick}
          className={`${darkmode ? "bg-neutral-800 text-white" : "bg-neutral-300/70 text-black"} h-[40px]   flex items-center justify-center `}
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
                id={`header-${id}-left`}
                type="target"
                position={Position.Left}
                style={{
                  width: "6%",
                  height: "28%",
                  backgroundColor: darkmode ? "#363636" : "#E9E8E8",
                  cursor: "crosshair",
                  border: "2px solid #E9E8E8",
                  borderColor: darkmode ? "#E9E8E8" : "#9E9E9E",
                  marginLeft: "8.5px",
                  ...positionStyles[Position.Left],
                }}
              />
              {data.label || "click to give entity name"}

              <Handle
                id={`header-${id}-right`}
                type="source"
                position={Position.Right}
                style={{
                  width: "6%",
                  height: "28%",
                  backgroundColor: darkmode ? "#A3A3A3" : "#A3A3A3",
                  cursor: "crosshair",
                  border: "2px solid ",
                  borderColor: darkmode ? "#363636" : "#E9E8E8",
                  marginRight: "10px",
                  ...positionStyles[Position.Right],
                }}
              />
            </div>
          )}
        </tr>
      </th>
      <tbody className="w-full">
        {datas &&
          Object.keys(datas).length > 0 &&
          datas?.attributes &&
          Object.keys(datas?.attributes).length > 0 &&
          Object.keys(datas?.attributes).map(
            (key, index) =>
              datas?.attributes[key].cname !== "" && (
                <td
                  key={index}
                  className={`${darkmode ? "bg-[#333333] text-white border-neutral-500" : "bg-neutral-200/80 text-black/70 border-neutral-400"}  flex h-[43px] text-md flex-col  justify-center   border-t-2 p-[10px] 
                  hover:bg-neutral-600/10
                  transition-ease-in-out duration-150 last:rounded-b-sm first:border-none`}
                >
                  <tr className="relative ">
                    <Handle
                      type="target"
                      id={`${index}-right`}
                      position={Position.Left}
                      style={{
                        width: "6.5%",
                        height: "50%",
                        position: "absolute",
                        left: "-17px",
                        backgroundColor: darkmode ? "#363636" : "#E9E8E8",
                        border: "2px solid #E9E8E8",
                        borderColor: darkmode ? "#E9E8E8" : "#9E9E9E",
                      }}
                    />

                    {datas?.attributes[key].cname}

                    <Handle
                      type="source"
                      id={`${index}-left`}
                      position={Position.Right}
                      style={{
                        width: "6.5%",
                        height: "50%",
                        position: "absolute",
                        right: "-17px",
                        backgroundColor: darkmode ? "#A3A3A3" : "#A3A3A3",
                        border: "2px solid #E9E8E8",
                        borderColor: darkmode ? "#363636" : "#E9E8E8",
                      }}
                    />
                  </tr>
                </td>
              )
          )}
      </tbody>
    </table>
  );
}
