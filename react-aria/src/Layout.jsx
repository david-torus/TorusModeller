import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useMemo,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import Navbar from "./Navbar";
import SelectedTabPanel from "./SelectedTabPanel";
import { FabricsSelector } from "./FabricsSelector";
import { v4 as uuidv4 } from "uuid";
import UserNode from "./DynamicNode";

import FabricsSideBar from "./sidebars/fabricsSideBar/FabricsSideBar";
import ContextMenuSelector from "./contextMenu/ContextMenuSelector";

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFabric, setSelectedFabric] = useState("DF");
  const [selectedTab, setSelectedTab] = useState("DF");
  const { screenToFlowPosition } = useReactFlow();
  const [reactFlowInstance, setreactflowinstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const colors = {
    hidden: { dark: "#008080", light: "#008080" },
    DF: {
      dark: "#2257f7",
      light: "#244DCB",
    },
    UF: {
      dark: "#33CCFF",
      light: "#00BFFF",
    },
    PF: { dark: "#2AE38F", light: "#13CC78" },

    SF: { dark: "#FFc723", light: "#FFBE00" },
  };

  const NODE_TYPES = useMemo(
    () => ({
      usernode: UserNode,
    }),
    []
  );

  const handleFabrciselector = (fabric) => {
    setSelectedFabric(fabric);
    setNodes([]);
    setEdges([]);
  };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div
      className={`w-full   h-full  
        max-h-min mx-auto  
        flex flex-col   xl:max-3xl:bg-gray-600  lg:max-xl:gap-0 xl:max-3xl:gap-0
        max-md:gap-3 `}
    >
      <div className="sticky top-0 ">
        <Navbar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedFabric={selectedFabric}
          setSelectedFabric={handleFabrciselector}
        />
      </div>
      <div className={`h-[95%] w-full flex dark:bg-[#1E2428]   bg-[#F4F5FA] `}>
        <div className="h-full w-[78%]">
          <FabricsSelector
            nodeTypes={NODE_TYPES}
            fabric={selectedFabric}
            nodes={nodes}
            edges={edges}
            setEdges={setEdges}
            setNodes={setNodes}
            onNodeContextMenu={onNodeContextMenu}
            onPaneClick={onPaneClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setreactflowinstance}
            ref={ref}
          >
            <Panel
              position="top-left"
              className={` 
                md:w-4/12 
                lg:w-2/12 
                xl:w-[18.5%] 
                2xl:w-3/12 
                3xl:w-[12%] 
                4xl:w-4/12  h-[95%] ${
                  selectedTab.startsWith("hidden") ? "hidden" : "block"
                }  `}
            >
              <SelectedTabPanel
                color={colors[selectedTab]?.dark}
                selectedTab={selectedTab}
              />
            </Panel>

            <Controls position="right-bottom" />

            {/* <MiniMap /> */}
            {menu && (
              <ContextMenuSelector
                fabric={selectedFabric}
                onClick={onPaneClick}
                {...menu}
              />
            )}
            <Background variant="dots" gap={12} size={1} />
          </FabricsSelector>
        </div>
        <div className="h-full w-[22%] ">
          <FabricsSideBar color={colors[selectedTab]?.dark} />
        </div>
      </div>
    </div>
  );
}
