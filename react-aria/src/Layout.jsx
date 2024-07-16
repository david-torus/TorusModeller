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

import { FabricsSelector } from "./FabricsSelector";
import { v4 as uuidv4 } from "uuid";
import UserNode from "./DynamicNode";

import ContextMenuSelector from "./contextMenu/ContextMenuSelector";
import NodeGallery from "./NodeGallery";

import CanvasPanel from "./CanvasPanel";
import SideBar from "./SideBar";
import { RenderJson } from "./jonui/JsonUI";
import Navbar from "./Navbar";

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFabric, setSelectedFabric] = useState("Home");
  const [selectedTab, setSelectedTab] = useState("DF");
  const { screenToFlowPosition } = useReactFlow();
  const [showFabricSideBar, setShowFabricSideBar] = useState(true);
  const [reactFlowInstance, setreactflowinstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const colors = {
    hidden: { dark: "#008080", light: "#008080" },
    DF: {
      dark: "#0736C4",
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

  const handleTabChange = (fabric) => {
    if (fabric === selectedFabric) return;
    setSelectedFabric(fabric);
    setShowFabricSideBar(true);
    setNodes([]);
    setEdges([]);
    setMenu(null);
  };
  const handleSidebarToggle = () => {
    setShowFabricSideBar(!showFabricSideBar);
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
      className={`  w-[100%]   h-[100vh] 
         max-h-min mx-auto  
        flex flex-col   xl:max-3xl:bg-gray-600  lg:max-xl:gap-0 xl:max-3xl:gap-0
        max-md:gap-3 
         `}
    >
      <div className="w-full h-[8%] sticky top-0">
        <Navbar    color={colors[selectedFabric]?.light} />
      </div>

      <div className={`h-[92%] w-full flex dark:bg-[#0F0F0F]   bg-[#F4F5FA] `}>
        <div className="h-full flex w-[100%]">
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
            <SideBar
              selectedFabric={selectedFabric}
              color={colors[selectedFabric]?.dark}
              showFabricSideBar={showFabricSideBar}
              handleSidebarToggle={handleSidebarToggle}
              handleTabChange={handleTabChange}
            />
            <NodeGallery
              selectedFabric={selectedFabric}
              color={colors[selectedFabric]?.light}
              showFabricSideBar={showFabricSideBar}
              handleSidebarToggle={handleSidebarToggle}
            />
            <MiniMap
              position="bottom-right"
              style={{ bottom: "3rem" }}
              maskColor="transparent"
              // maskStrokeColor="rgba(22, 22, 22, 0.6)"
              className="border border-slate-300 rounded-lg   dark:bg-[#161616] dark:border-[#21212126]/15"
            />
            <CanvasPanel />

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

          <RenderJson />
        </div>
      </div>
    </div>
  );
}
