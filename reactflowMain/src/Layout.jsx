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

import { nodeInfoTabs, RenderJson } from "./jonui/JsonUI";
import Navbar from "./Navbar";

import NodeGallery from "./NodeGallery";
import SideBar from "./SideBar";
import NodeInfoSidebar from "./commonComponents/CommonSideBar/NodeInfoSidebar";
import { Gorule } from "./commonComponents/tabs/Gorule";
import { Mapper } from "./commonComponents/tabs/mapper";
import MonacoEditor from "./commonComponents/tabs/Monaco_Editor/MonacoEditor";
import NewNodeInfoSidebar from "./jonui/NewNodeInfoSidebar";
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
  const [denormalizedata, setDenormalizedata] = useState(null);
  const { getNode } = useReactFlow();
  const [toggleReactflow, setToggleReactflow] = useState({
    rule: false,
    mapper: false,
    code: false,
  });
  const [nodeData, setNodeData] = useState(null);
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
    [],
  );

  const handleTabChange = (fabric) => {
    console.log("clicked", fabric, recentClicked);
    if (fabric == selectedFabric) return;
    setSelectedFabric(fabric);
    setrecentClicked(!recentClicked);
    setShowFabricSideBar(true);
    setNodes([]);
    setEdges([]);
    setShowNodeProperty(false);
  };

  const handleSidebarToggle = () => {
    setShowFabricSideBar(!showFabricSideBar);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
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
    [reactFlowInstance, setNodes],
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
    [setMenu],
  );

  const updatedNodeConfig = (id, metadata, updatedData) => {
    try {
      setNodes((prev) => {
        return prev?.map((node) => {
          if (node.id === id) {
            if (node?.data.hasOwnProperty("nodeProperty")) {
              return {
                ...node,
                data: {
                  ...node.data,
                  nodeProperty: {
                    ...node.data.nodeProperty,
                    ...metadata,
                    ...updatedData,
                  },
                },
              };
            } else {
              return {
                ...node,
                data: {
                  ...node.data,
                  nodeProperty: {
                    ...metadata,
                    ...updatedData,
                  },
                },
              };
            }
          }
          return node;
        });
      });

      setNodePropertyData((prev) => {
        if (prev?.id === id) {
          if (prev?.data?.nodeProperty) {
            return {
              ...prev,
              data: {
                ...prev.data,
                nodeProperty: {
                  ...prev.data.nodeProperty,
                  ...metadata,
                  ...updatedData,
                },
              },
            };
          } else
            return {
              ...prev,
              data: {
                ...prev.data,
                nodeProperty: {
                  ...metadata,
                  ...updatedData,
                },
              },
            };
        }
        return prev;
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(nodes ,nodePropertyData, "nodePropertyData");
  console.log(showNodeProperty, "showNodeProperty");
  console.log(denormalizedata, "denormalizedata");
  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div
      className={`  flex  h-full   w-full flex-col   max-md:gap-3  lg:max-xl:gap-0 xl:max-3xl:gap-0 xl:max-3xl:bg-gray-600 
         `}
    >
      {!toggleReactflow.rule &&
      !toggleReactflow.mapper &&
      !toggleReactflow.code ? (
        <>
          <div className="sticky top-0 h-[8%] w-full">
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

          <div
            className={`flex h-[92%] w-full bg-[#F4F5FA]   dark:bg-[#0F0F0F] `}
          >
            <div className="flex h-[100%] w-[100%]">
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
                    undo,
                    redo,
                    canUndo,
                    canRedo,
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
                        className="rounded-lg border border-slate-300 dark:border-[#21212126]/15 dark:bg-[#161616]  xl:h-[22%] xl:w-[15%]"
                      />
                      <CanvasPanel
                        canRedo={canRedo}
                        canUndo={canUndo}
                        redo={redo}
                        undo={undo}
                      />

                      {/* <NodeInfoSidebar
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
                  /> */}

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
              <div className="h-[100%] ">
                <div className="sticky h-[7%]">
                  {showNodeProperty && (
                    <>
                      <span
                        className="  top-0  cursor-pointer"
                        onClick={() => setShowNodeProperty(!showNodeProperty)}
                      >
                        x
                      </span>

                      <NewNodeInfoSidebar
                        showNodeProperty={showNodeProperty}
                        sideBarData={nodePropertyData}
                        updatedNodeConfig={updatedNodeConfig}
                        currentDrawing={selectedFabric}
                        setShowNodeProperty={setShowNodeProperty}
                        nodeInfoTabs={nodeInfoTabs}
                        setToggleReactflow={setToggleReactflow}
                        setDenormalizedata={setDenormalizedata}
                      />
                    </>
                  )}
                </div>
                <div className="h-[93%]">
                  {/* <RenderJson
                    showNodeProperty={showNodeProperty}
                    setShowNodeProperty={setShowNodeProperty}
                    sideBarData={nodePropertyData}
                    currentDrawing={selectedFabric}
                    upIdKey={"FRK"}
                    setToggleReactflow={setToggleReactflow}
                    customCodeKey={"gg"}
                    updatedNodeConfig={updatedNodeConfig}
                    setNodes = {setNodes}
                    setNodePropertyData={setNodePropertyData}
                    // uniqueNames={uniqueNames}
                    // changeProperty={changeProperty}
                  /> */}
                </div>
              </div>

              {/* <RenderJson /> */}
            </div>
          </div>
        </>
      ) : toggleReactflow.rule && !toggleReactflow.mapper ? (
        <Gorule
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={nodePropertyData}
          // nodeConfig={nodeConfig}
        />
      ) : !toggleReactflow.rule && toggleReactflow.mapper ? (
        <Mapper
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={nodePropertyData}
          // nodeConfig={nodeConfig}
        />
      ) : toggleReactflow.code ? (
        <MonacoEditor
          // fabricsKey={fabricsKey}
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={nodePropertyData}
          // nodeConfig={nodeConfig}
        />
      ) : (
        <>nothing</>
      )}
    </div>
  );
}
