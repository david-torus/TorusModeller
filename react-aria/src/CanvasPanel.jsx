import React, { useCallback, useEffect, useState } from "react";
import { Panel, useReactFlow, MiniMap } from "reactflow";
import TorusButton from "./torusComponents/TorusButton";
import TorusInput from "./torusComponents/TorusInput";
import {
  Fitview,
  FullScreen,
  Help,
  Redo,
  Undo,
  ZoomIn,
  ZoomOut,
} from "./SVG_Application";

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
      className="w-[30%] bg-transparent flex justify-between h-[6%] "
    >
      <div className="w-[25%] ml-[25px]  h-full border border-slate-300 flex items-center rounded-lg bg-white">
        <TorusButton key={"undo"} Children={<Undo />} onPress={zoomTo} />

        <TorusButton key={"redo"} Children={<Redo />} onPress={zoomTo} />
      </div>
      <div className="w-[65%] h-full border border-slate-300 flex items-center rounded-lg bg-white ">
        <TorusButton
          key={"FullScreen"}
          Children={<FullScreen />}
          onPress={fitView}
        />

        <TorusButton key={"fitView"} Children={<Fitview />} onPress={fitView} />
        <TorusButton
          key={"zoomOut"}
          Children={<ZoomOut />}
          onPress={() => handleZoom("Out")}
        />
        <span className="font-bold text-base font-inter">100%</span>
        <TorusButton
          key={"zoomIn"}
          Children={<ZoomIn />}
          onPress={() => handleZoom("In")}
        />

        <TorusButton
          key={"help"}
          Children={<Help />}
          onPress={() => handleZoom("Out")}
        />
      </div>
    </Panel>
  );
}
