import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useReactFlow,
} from "reactflow";
import { useContext } from "react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";

import "reactflow/dist/base.css";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  label,
}) {
  const { darkMode } = useContext(DarkmodeContext);
  const [toogle, setToogle] = useState(false);
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  /**
   * Updates the label of the edge with the given id to the value of the target input element.
   *
   * @param {Event} e - The click event that triggered the function.
   * @return {void} This function does not return anything.
   */
  const onEdgeClick = (e) => {
    setEdges((edges) => {
      return edges.map((edge) => {
        if (edge.id === id) {
          return (edge = {
            ...edge,
            label: e.target.value,
          });
        }
        return edge;
      });
    });
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} id={id} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {toogle && (
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InputText
                placeholder="Type here..."
                value={label}
                onChange={(e) => {
                  onEdgeClick(e);
                }}
                style={{
                  width: "100px",
                  fontSize: 2,
                  backgroundColor: "transparent",
                  color: darkMode ? "white" : "black",
                }}
              />
              <button
                className="edgebutton"
                title="click save"
                onClick={() => setToogle(!toogle)}
                style={{
                  fontSize: 10,
                  backgroundColor: "transparent",
                  color: darkMode ? "white" : "black",
                }}
              >
                x
              </button>
            </div>
          )}
          {toogle === false && (
            <p
              style={{
                zIndex: 20,
                fontSize: 8,
                backgroundColor: "transparent",
                color: darkMode ? "white" : "black",
              }}
              onClick={() => setToogle(!toogle)}
            >
              {label || "Add Conditional Edge"}
            </p>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
