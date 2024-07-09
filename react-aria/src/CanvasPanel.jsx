import React, { useCallback, useEffect, useState } from "react";
import { Panel, useReactFlow, MiniMap } from "reactflow";
import TorusButton from "./torusComponents/TorusButton";
import TorusInput from "./torusComponents/TorusInput";

export default function CanvasPanel() {
  const { zoomIn, zoomOut, fitView, getZoom, zoomTo } = useReactFlow();

  const handleZoom = (type) => {
    if (type === "In") {
      zoomIn();
    }
    if (type === "Out") {
      zoomOut();
    }
  };

  return (
    <Panel
      position="bottom-right"
      className="w-[40%] bg-transparent flex gap-9 h-[8%] "
    >
      <div className="w-[40%] h-full border border-slate-300 flex items-center rounded-md bg-white">
        <TorusButton key={"undo"} Children={"Zoom To"} onPress={zoomTo} />

        <TorusButton key={"redo"} Children={"Zoom To"} onPress={zoomTo} />
      </div>
      <div className="w-[60%] h-full border border-slate-300 flex items-center rounded-md bg-white ">
        <TorusButton
          key={"zoomIn"}
          className="col-span-1 border-2"
          Children={"Zoom In"}
          onPress={() => handleZoom("In")}
        />

        <TorusButton
          key={"zoomOut"}
          className="col-span-1 border-2"
          Children={"Zoom Out"}
          onPress={() => handleZoom("Out")}
        />
        <TorusButton
          key={"fitView"}
          className="col-span-1 border-2"
          Children={"Fit View"}
          onPress={fitView}
        />
      </div>
    </Panel>
  );
}
