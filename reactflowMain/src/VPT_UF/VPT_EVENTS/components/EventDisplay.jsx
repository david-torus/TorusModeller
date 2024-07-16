import React, { createContext, useContext } from "react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { ReactFlowProvider } from "reactflow";
import { EventDashBoard } from "../components/DashBoard";

import { AnimatePresence, motion } from "framer-motion";

export const eventSourceNodesJsonContext = createContext([]);

export default function EventDisplay({
  datas,
  sendData,
  controlJson,
  currentDrawing,
  selectedControlEvents,
}) {
  const { darkmode } = useContext(DarkmodeContext);

  return (
    <eventSourceNodesJsonContext.Provider value={controlJson}>
      <div
        className={`w-full h-full flex items-center mt-[0px] ${darkmode ? "bg-[#1D1D1D]" : "bg-[#f0f0f0]"}`}
      >
        {selectedControlEvents && (
          <AnimatePresence mode="sync">
            <motion.div
              className={`h-[100%] w-[15%] overflow-scroll transition-all  ${darkmode ? "bg-[#1D1D1D]/90  " : "bg-[#e4e3e3] "} border-r border-neutral-600`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <EventScreen json={selectedControlEvents} />
            </motion.div>
          </AnimatePresence>
        )}

        <div
          className={
            " h-full border-r border-gray-600 transition-all duration-75 ease-in-out delay-75 " +
            (selectedControlEvents ? "w-[85%]" : "w-full")
          }
        >
          <div className="w-full h-full flex justify-center items-center">
            <ReactFlowProvider>
              <EventDashBoard
                data={datas}
                sendData={sendData}
                currentDrawing={currentDrawing}
              />
            </ReactFlowProvider>
          </div>
        </div>
      </div>
    </eventSourceNodesJsonContext.Provider>
  );
}

/**
 * Renders the event screen with the provided JSON data.
 * Allows dragging of events to reorder them.
 *
 * @param {Object} json - The JSON data containing the event information.
 * @return {JSX.Element} The rendered event screen.
 */
const EventScreen = ({ json }) => {
  const onDragStart = (event, eventName, parentNode) => {
    event.dataTransfer.setData(
      "application/parentNode",
      JSON.stringify(parentNode)
    );
    event.dataTransfer.setData("application/eventName", eventName);
    event.dataTransfer.effectAllowed = "move";
  };

  const { darkmode } = useContext(DarkmodeContext);

  return (
    <>
      {json && (
        <>
          <span className={`${darkmode ? "text-white" : "text-black"} `}>
            {json?.nodeName || json?.nodeType}
          </span>
          {json?.events &&
            json?.events.length > 0 &&
            json?.events.map((item) => {
              return (
                <div
                  className="text-left text-sm flex cursor-grab justify-start pl-[10px] flex-row mt-2 gap-2"
                  onDragStart={(event) => onDragStart(event, item.name, json)}
                  draggable
                >
                  <span className={`${darkmode ? "text-white" : "text-black"}`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};
