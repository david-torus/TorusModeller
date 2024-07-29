import React, { memo, useContext } from "react";

import AppDF from "./VPT_DF/VPT_DF_ERD/Components/App";
import { TorusModellerContext } from "./Layout";
import AppPF from "./VPT_PF/VPT_PF_PFD/components/App";
import AppUF from "./VPT_UF/VPT_UF_SLD/components/App";
// import EventsMain from "./VPT_UF/VPT_EVENTS/EventsMain";
// import EventDisplay from "./VPT_UF/VPT_EVENTS/components/EventDisplay";
import { EventDashBoard } from "./VPT_UF/VPT_EVENTS/components/DashBoard";

const proOptions = { hideAttribution: true };
export const FabricsSelector = memo(
  ({
    nodes,
    edges,
    setEdges,
    setNodes,
    children,

    onEdgesChange,
    onNodesChange,
    prevNodesEdges,
  }) => {
    const { selectedFabric } = useContext(TorusModellerContext);
    const cycleFabric = () => {
      switch (selectedFabric) {
        case "Home":
          return (
            <div className="relative flex h-full w-full items-center justify-center italic dark:text-white">
              Home Screen
              {children({
                setToggleReactflow: null,
                uniqueNames: null,
                changeProperty: null,
                updatedNodeConfig: null,
                sideBarData: null,
              })}
            </div>
          );

        case "DF":
          return (
            <AppDF
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children}
              proOptions={proOptions}
            />
          );
        case "UF":
          return (
            <AppUF
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children}
              proOptions={proOptions}
            />
          );
        case "PF":
          return (
            <AppPF
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children}
              proOptions={proOptions}
            />
          );
        case "SF":
          return (
            <div className="relative flex h-full w-full items-center justify-center italic dark:text-white">
              Not Implemented Yet
              {children({
                setToggleReactflow: null,
                uniqueNames: null,
                changeProperty: null,
                updatedNodeConfig: null,
                sideBarData: null,
              })}
            </div>
          );
        case "events":
          return (
            <EventDashBoard
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              children={children}
            />
          );
        default:
          return (
            <div className="relative flex h-full w-full items-center justify-center italic dark:text-white">
              No Tab Selected
            </div>
          );
      }
    };

    return cycleFabric();
  },
);
