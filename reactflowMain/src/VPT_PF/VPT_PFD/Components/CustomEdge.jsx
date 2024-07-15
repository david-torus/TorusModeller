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
  const { darkmode } = useContext(DarkmodeContext);
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
   * Handles the click event on an edge.
   *
   * @param {Event} e - The click event object
   * @return {Array} The updated array of edges after mapping
   */
  const onEdgeClick = (e) => {
    try {
      setEdges((edges) => {
        return (
          edges &&
          edges.length > 0 &&
          edges.map((edge) => {
            if (edge.id === id) {
              return (edge = {
                ...edge,
                label: e.target.value,
              });
            }
            return edge;
          })
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  //Retruning the JSX
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
                  color: darkmode ? "white" : "black",
                }}
              />
              <button
                className="edgebutton"
                title="click save"
                onClick={() => setToogle(!toogle)}
                style={{
                  fontSize: 10,
                  backgroundColor: "transparent",
                  color: darkmode ? "white" : "black",
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
                color: darkmode ? "white" : "black",
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
