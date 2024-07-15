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
      className="w-[30%] bg-transparent flex justify-end h-[6%]  "
    >
      <div className="w-[95%]  h-full  flex justify-between items-center rounded-lg">
        <div className="w-[25%] h-full border  border-slate-300 flex items-center justify-center rounded-lg bg-white dark:bg-[#161616] dark:border-[#21212126]/15">
          <TorusButton
            key={"undo"}
            buttonClassName={"w-1/2"}
            fontStyle={"flex items-center justify-center"}
            Children={<Undo className={"stroke-[#1C274C] dark:stroke-white"} />}
            onPress={zoomTo}
          />
          <TorusButton
            key={"redo"}
            buttonClassName={"w-1/2"}
            fontStyle={"flex items-center justify-center"}
            Children={<Redo className={"stroke-[#1C274C] dark:stroke-white"} />}
            onPress={zoomTo}
          />
        </div>
        <div className="w-[65%] p-2 gap-2 h-full border border-slate-300 flex items-center rounded-lg  bg-white dark:bg-[#161616] dark:border-[#21212126]/15 ">
          <TorusButton
            key={"FullScreen"}
            Children={
              <FullScreen className={"stroke-[#1C274C] dark:stroke-white"} />
            }
            onPress={fitView}
          />
          <TorusButton
            key={"fitView"}
            Children={
              <Fitview className={"stroke-[#1C274C] dark:stroke-white"} />
            }
            onPress={fitView}
          />
          <TorusButton
            key={"zoomOut"}
            Children={
              <ZoomOut className={"stroke-[#1C274C] dark:stroke-white"} />
            }
            onPress={() => handleZoom("Out")}
          />
          <span className="font-bold text-base font-inter text-[#1C274C] dark:text-white">
            100%
          </span>
          <TorusButton
            key={"zoomIn"}
            Children={
              <ZoomIn className={"stroke-[#1C274C] dark:stroke-white"} />
            }
            onPress={() => handleZoom("In")}
          />

          <TorusButton
            key={"help"}
            Children={<Help className={"stroke-[#1C274C] dark:stroke-white"} />}
            onPress={() => handleZoom("Out")}
          />
        </div>
      </div>
    </Panel>
  );
}
