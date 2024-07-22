import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useMemo,
  createContext,
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

import ContextMenuSelector from "./contextMenu/ContextMenuSelector";

import CanvasPanel from "./CanvasPanel";

import { RenderJson } from "./jonui/JsonUI";
import Navbar from "./Navbar";

import NodeGallery from "./NodeGallery";
import SideBar from "./SideBar";
import NodeInfoSidebar from "./commonComponents/CommonSideBar/NodeInfoSidebar";
export const FabricsContexts = createContext(null);
export default function Layout({ client }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFabric, setSelectedFabric] = useState("Home");
  const [showNodeProperty, setShowNodeProperty] = useState(false);
  const { screenToFlowPosition } = useReactFlow();
  const [showFabricSideBar, setShowFabricSideBar] = useState(true);
  const [reactFlowInstance, setreactflowinstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const [recentClicked, setrecentClicked] = useState(false);
  const ref = useRef(null);
  const [nodePropertyData, setNodePropertyData] = useState({});
  const { getNode } = useReactFlow();
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
      usernode: "s",
    }),
    []
  );

  const handleTabChange = (fabric) => {
    console.log("clicked", fabric, recentClicked);
    if (fabric == selectedFabric) return;
    setSelectedFabric(fabric);
    setrecentClicked(!recentClicked);
    setShowFabricSideBar(true);
    setNodes([]);
    setEdges([]);
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
  console.log(showNodeProperty, "showNodeProperty");
  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div
      className={`  w-full  h-full   flex flex-col   xl:max-3xl:bg-gray-600  lg:max-xl:gap-0 xl:max-3xl:gap-0 max-md:gap-3 
         `}
    >
      <div className="w-full h-[8%] sticky top-0">
        <Navbar
          tKey={"FRK"}
          client={client}
          project={""}
          fabrics={selectedFabric}
          sendDataToFabrics={(data) => {
            setEdges(data?.nodeEdges ?? []);
            setNodes(data?.nodes ?? []);
          }}
          getDataFromFabrics={() => ({
            nodes: nodes,
            edges: edges,
          })}
          // setdomain={setDomain}
          // setartifact={setArtifact}
          // sendartifact={sendartifact}
          // setMainArtifacts={setMainArtifacts}
          // mainArtifacts={mainArtifacts}
          // setMainVersion={setVersion}
          // mainVersion={mainVersion}
          // undoredo={{ undo, redo, canUndo, canRedo }}
          // setToggleReactflow={setToggleReactflow}
          // selecetedWholeVersion={selecetedWholeVersion}
          // setSelectedWholeVersion={setSelectedWholeVersion}
          color={colors[selectedFabric]?.light}
        />
      </div>

      <div className={`h-[92%] w-full flex dark:bg-[#0F0F0F]   bg-[#F4F5FA] `}>
        <div className="h-full flex w-[100%]">
          <FabricsContexts.Provider
            value={{
              selectedFabric,
              handleTabChange,
              ref,
              onNodeContextMenu,
              onPaneClick,
              nodePropertyData,
            }}
          >
            <FabricsSelector
              fabric={selectedFabric}
              nodes={nodes}
              edges={edges}
              setEdges={setEdges}
              setNodes={setNodes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onInit={setreactflowinstance}
            >
              {({
                setToggleReactflow,
                uniqueNames,
                changeProperty,
                updatedNodeConfig,
              }) => (
                <>
                  <SideBar />
                  <NodeGallery
                    color={colors[selectedFabric]?.light}
                    showFabricSideBar={showFabricSideBar}
                    handleSidebarToggle={handleSidebarToggle}
                  />
                  <MiniMap
                    position="bottom-right"
                    style={{ bottom: "8%" }}
                    maskColor="transparent"
                    // maskStrokeColor="rgba(22, 22, 22, 0.6)"
                    className="border border-slate-300 rounded-lg w-[17%] h-[22%]  dark:bg-[#161616] dark:border-[#21212126]/15"
                  />
                  <CanvasPanel />

                  <NodeInfoSidebar
                    upIdKey={"FRK"}
                    setToggleReactflow={setToggleReactflow}
                    customCodeKey={"gg"}
                    updatedNodeConfig={updatedNodeConfig}
                    currentDrawing={selectedFabric}
                    visiblity={showNodeProperty}
                    setVisiblity={() => setShowNodeProperty(!showNodeProperty)}
                    sideBarData={getNode(nodePropertyData?.id)}
                    uniqueNames={uniqueNames}
                    changeProperty={changeProperty}
                  />

                  {/* <MiniMap /> */}
                  {menu && (
                    <ContextMenuSelector
                      onEdit={(id) => {
                        setNodePropertyData(getNode(id));
                        setShowNodeProperty(!showNodeProperty);
                      }}
                      fabric={selectedFabric}
                      onClick={onPaneClick}
                      {...menu}
                    />
                  )}
                  <Background variant="dots" gap={12} size={1} />
                </>
              )}
            </FabricsSelector>
          </FabricsContexts.Provider>

          {/* <RenderJson /> */}
        </div>
      </div>
    </div>
  );
}
