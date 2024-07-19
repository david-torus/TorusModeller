import React from "react";
import { useState, useContext } from "react";
import { Dropdown } from "primereact/dropdown";
import { SiRelay } from "react-icons/si";
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  useReactFlow,
} from "reactflow";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
  const [toogle, setToogle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { darkMode } = useContext(DarkmodeContext);

  /**
   * Updates the edges array by modifying the specified edge's data based on the type of click.
   * If the click is on the start label, updates the startLabel property of the edge's data.
   * If the click is on the end label, updates the endLabel property of the edge's data.
   * Toggles the toogle state if the click is on the start label.
   * Toggles the toggle state if the click is on the end label.
   *
   * @param {Event} e - The click event.
   * @param {string} type - The type of click ('start' or 'end').
   * @return {void}
   */
  const onEdgeClick = (e, type) => {
    try {
      setEdges((edges) => {
    
        return edges?.map((edge) => {
          if (edge.id === id) {
            if (type === "start") {
              return (edge = {
                ...edge,
                data: {
                  ...edge.data,
                  startLabel: e.target.value,
                },
              });
            }
            if (type === "end") {
              return (edge = {
                ...edge,
                data: {
                  ...edge.data,
                  endLabel: e.target.value,
                },
              });
            }
          }
          return edge;
        });
      });
      if (type === "start") {
        setToogle(!toogle);
      }
      if (type === "end") {
        setToggle(!toggle);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Cardinalities = [
    { name: "ONE", value: "ONE" },
    { name: "MANY", value: "MANY" },
  ];

  /**
   * Component representing a JSX structure with conditional rendering and event handling.
   * @param {object} props - The props object containing various properties.
   * @param {string} props.id - The id of the element.
   * @param {string} props.edgePath - The path of the edge.
   * @param {number} props.labelX - The x-coordinate for label positioning.
   * @param {number} props.labelY - The y-coordinate for label positioning.
   * @param {boolean} props.toogle - The toggle state for conditional rendering.
   * @param {object} props.data - The data object containing startLabel and endLabel properties.
   * @param {boolean} props.darkMode - The dark mode state.
   * @param {function} props.onEdgeClick - The function to handle edge click event.
   * @param {function} props.setToogle - The function to set the toggle state.
   */
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            pointerEvents: "all",
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "transparent",
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan text-white font-normal "
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
              <Dropdown
                inputId="cardinality"
                value={data.startLabel}
                options={Cardinalities}
                optionLabel="name"
                className="w-full"
                placeholder="Cardinality"
                onChange={(e) => {
                  onEdgeClick(e, "start");
                }}
                style={{
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          )}
          {!toogle && (
            <div>
              <span
                style={{
                  color: darkMode ? "white" : "#616A6B ",
                  cursor: "pointer",
                  fontSize: 15,
                  backgroundColor: "transparent",
                }}
                onClick={(e) => {
                  setToogle(!toogle);
                }}
              >
                {data.startLabel || " "}
              </span>
            </div>
          )}
          <SiRelay
            className="text-2xl p-1"
            color={darkMode ? "white" : "#616A6B "}
          />
          {toggle && (
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Dropdown
                inputId="cardinality"
                value={data.endLabel}
                options={Cardinalities}
                optionLabel="name"
                className="w-full"
                placeholder="Cardinality"
                onChange={(e) => {
                  onEdgeClick(e, "end");
                }}
                style={{
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              />
            </div>
          )}
          {!toggle && (
            <span
              style={{
                color: darkMode ? "white" : "#616A6B ",
                fontSize: 15,
                fontFamily: "sans-serif",
                backgroundColor: "transparent",
              }}
              onClick={() => setToggle(!toggle)}
            >
              {data.endLabel || " "}
            </span>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
