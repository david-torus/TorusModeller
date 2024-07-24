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
      className="flex h-[6%] w-[25%] justify-end bg-transparent  "
    >
      <div className="flex  h-full  w-[100%] items-center justify-between rounded-lg">
        <div className="flex h-full w-[25%]  items-center justify-center rounded-lg border border-slate-300 bg-white dark:border-[#21212126]/15 dark:bg-[#161616]">
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
        <div className="  h-full w-[55%] items-center  rounded-lg  border border-slate-300  bg-white dark:border-[#21212126]/15 dark:bg-[#161616] ">
          <div className="grid h-full w-full grid-cols-6 items-center justify-between gap-1">
            <TorusButton
              key={"FullScreen"}
              Children={
                <div className="flex items-center justify-center   p-1">
                  <FullScreen
                    className={"stroke-[#1C274C] dark:stroke-white"}
                  />
                </div>
              }
              onPress={fitView}
            />
            <TorusButton
              key={"fitView"}
              Children={
                <div className="flex items-center justify-center   p-1">
                  <Fitview className={"stroke-[#1C274C] dark:stroke-white"} />
                </div>
              }
              onPress={fitView}
            />
            <TorusButton
              key={"zoomOut"}
              Children={
                <div className="flex items-center justify-center   p-1">
                  <ZoomOut className={"stroke-[#1C274C] dark:stroke-white"} />
                </div>
              }
              onPress={() => handleZoom("Out")}
            />
            <span className="flex items-center justify-center   p-1 font-inter text-xs font-bold text-[#1C274C] dark:text-white">
              100%
            </span>
            <TorusButton
              key={"zoomIn"}
              Children={
                <div className="  flex items-center justify-center p-1">
                  <ZoomIn className={"stroke-[#1C274C] dark:stroke-white"} />
                </div>
              }
              onPress={() => handleZoom("In")}
            />

            <TorusButton
              key={"help"}
              Children={
                <div className="  flex items-center justify-center p-1">
                  <Help className={"stroke-[#1C274C] dark:stroke-white"} />
                </div>
              }
              onPress={() => handleZoom("Out")}
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
