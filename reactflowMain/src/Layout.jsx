import { useCallback, useState, useRef, createContext, useMemo } from "react";
import {
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { FabricsSelector } from "./FabricsSelector";

import ContextMenuSelector from "./contextMenu/ContextMenuSelector";
import CanvasPanel from "./CanvasPanel";
import { nodeInfoTabs } from "./jonui/JsonUI";
import Navbar from "./Navbar";
import NodeGallery from "./NodeGallery";
import SideBar from "./SideBar";
import { Gorule } from "./commonComponents/tabs/Gorule";
import { Mapper } from "./commonComponents/tabs/mapper";
import MonacoEditor from "./commonComponents/tabs/Monaco_Editor/MonacoEditor";
import NewNodeInfoSidebar from "./jonui/NewNodeInfoSidebar";
import {
  gettingValues,
  transformNodesToProps,
} from "./VPT_UF/VPT_EVENTS/utils/utils";
import { getInitialEvents } from "./commonComponents/api/eventsApi";

export const TorusModellerContext = createContext(null);

export default function Layout({ client }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFabric, setSelectedFabric] = useState("Home");
  const [selectedtKey, setSelectedtKey] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showNodeProperty, setShowNodeProperty] = useState(false);
  const { screenToFlowPosition } = useReactFlow();
  const [showFabricSideBar, setShowFabricSideBar] = useState(true);
  const [reactFlowInstance, setreactflowinstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const [prevNodesEdges, setPrevNodesEdges] = useState({
    nodes: [],
    edges: [],
  });
  const [selectedControlEvents, setSelectedControlEvents] = useState(null);
  const [recentClicked, setrecentClicked] = useState(false);
  const ref = useRef(null);
  const [nodePropertyData, setNodePropertyData] = useState({});
  const [denormalizedata, setDenormalizedata] = useState(null);
  const { getNode } = useReactFlow();
  const [eventsNavBarData, setEventsNavBarData] = useState([]);
  const [controlJson, setControlJson] = useState(null);
  const [toggleReactflow, setToggleReactflow] = useState({
    rule: false,
    mapper: false,
    code: false,
  });

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

  const handleTabChange = (fabric) => {
    console.log("clicked", fabric, recentClicked);
    if (fabric == selectedFabric) {
      setShowFabricSideBar(!showFabricSideBar);
      return;
    }
    setSelectedFabric(fabric);
    setrecentClicked(!recentClicked);
    setShowFabricSideBar(true);
    if (fabric == "events") {
      if (selectedVersion && typeof selectedVersion == "string")
        getInitialEvents(
          "FRK",
          client,
          selectedProject,
          "UF",
          selectedArtifact,
          selectedVersion,
        ).then((res) => {
          if (res?.status == 200) {
            setEventsNavBarData(res?.data?.navBarData ?? []);
            setControlJson(res?.data?.controlJson ?? {});
          }
        });
    }
    setPrevNodesEdges({
      nodes: nodes,
      edges: edges,
    });
    setNodes([]);
    setEdges([]);

    setShowNodeProperty(false);
  };

  const handleSidebarToggle = () => {
    setShowFabricSideBar(!showFabricSideBar);
  };

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

  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <TorusModellerContext.Provider
      value={{
        ref,
        controlJson,
        onPaneClick,
        selectedFabric,
        handleTabChange,
        eventsNavBarData,
        nodePropertyData,
        onNodeContextMenu,
        selectedArtifact,
        setSelectedArtifact,
        selectedProject,
        setSelectedProject,
        selectedVersion,
        setSelectedVersion,
        selectedControlEvents,
        setSelectedControlEvents,
      }}
    >
      <div
        className={`  flex  h-full   w-full flex-col   max-md:gap-3  lg:max-xl:gap-0 xl:max-3xl:gap-0 xl:max-3xl:bg-gray-600 `}
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
                handleTabChange={handleTabChange}
                color={colors[selectedFabric]?.light}
                sendDataToFabrics={(data) => {
                  setEdges(data?.nodeEdges ?? []);
                  setNodes(data?.nodes ?? []);
                }}
                selectedArtifacts={selectedArtifact}
                setSelectedArtifacts={setSelectedArtifact}
                selectedApplication={selectedProject}
                setSelectedAppliction={setSelectedProject}
                selectedVerison={selectedVersion}
                setSelectedVerison={setSelectedVersion}
                getDataFromFabrics={() => ({
                  nodes: nodes,
                  edges: edges,
                })}
                // setdomain={setDomain}
                // setartifact={setArtifact}
                // mainVersion={mainVersion}
                // setMainVersion={setVersion}
                // sendartifact={sendartifact}
                // mainArtifacts={mainArtifacts}
                // setMainArtifacts={setMainArtifacts}
                // setToggleReactflow={setToggleReactflow}
                // undoredo={{ undo, redo, canUndo, canRedo }}
                // selecetedWholeVersion={selecetedWholeVersion}
                // setSelectedWholeVersion={setSelectedWholeVersion}
              />
            </div>

            <div
              className={`flex h-[92%] w-full bg-[#F4F5FA]   dark:bg-[#161616] `}
            >
              <div
                className={`flex h-[100%]  ${showNodeProperty ? "w-[79%]" : "w-[100%]"}`}
              >
                <TorusModellerContext.Provider
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
                    nodes={nodes}
                    edges={edges}
                    setEdges={setEdges}
                    setNodes={setNodes}
                    fabric={selectedFabric}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={setreactflowinstance}
                    prevNodesEdges={prevNodesEdges}
                  >
                    {({
                      redo,
                      undo,
                      canUndo,
                      canRedo,
                      uniqueNames,
                      changeProperty,
                      updatedNodeConfig,
                      setToggleReactflow,
                    }) => (
                      <>
                        <SideBar showNodeProperty={showNodeProperty} />
                        {selectedFabric !== "Home" &&
                          selectedFabric !== "SF" && (
                            <>
                              <NodeGallery
                                showFabricSideBar={showFabricSideBar}
                                color={colors[selectedFabric]?.light}
                                handleSidebarToggle={handleSidebarToggle}
                                showNodeProperty={showNodeProperty}
                              />

                              {!showNodeProperty && (
                                <div
                                  className={`transition-transform duration-500 ease-in-out ${
                                    !showNodeProperty
                                      ? "animate-fadeIn"
                                      : "animate-fadeOut"
                                  }`}
                                >
                                  <MiniMap
                                    position="bottom-right"
                                    style={{ bottom: "8%" }}
                                    maskColor="transparent"
                                    className="rounded-lg border border-slate-300 dark:border-[#21212126]/15 dark:bg-[#161616]  xl:h-[22%] xl:w-[15%]"
                                  />
                                  <CanvasPanel
                                    undo={undo}
                                    redo={redo}
                                    canUndo={canUndo}
                                    canRedo={canRedo}
                                  />
                                </div>
                              )}

                              {menu && (
                                <ContextMenuSelector
                                  onClick={onPaneClick}
                                  fabric={selectedFabric}
                                  onEdit={(id) => {
                                    setNodePropertyData(getNode(id));
                                    setShowNodeProperty(!showNodeProperty);
                                  }}
                                  {...menu}
                                />
                              )}
                              <Background variant="dots" gap={12} size={1} />
                            </>
                          )}
                      </>
                    )}
                  </FabricsSelector>
                </TorusModellerContext.Provider>
              </div>

              {showNodeProperty && (
                <div
                  className={`z-50 ${showNodeProperty ? "w-[21%]" : "hidden"} `}
                >
                  <div
                    className={`h-full transform border bg-[#FFFFFF] transition-transform delay-75 duration-300 ease-in-out ${showNodeProperty ? "translate-x-0" : "translate-x-full"}`}
                  >
                    <div
                      className="top-0 flex w-[100%] cursor-pointer justify-end"
                      onClick={() => setShowNodeProperty(!showNodeProperty)}
                    >
                      x
                    </div>

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
                  </div>
                </div>
              )}
            </div>
          </>
        ) : toggleReactflow.rule && !toggleReactflow.mapper ? (
          <Gorule
            sideBarData={nodePropertyData}
            updatedNodeConfig={updatedNodeConfig}
            setToggleReactflow={setToggleReactflow}
          />
        ) : !toggleReactflow.rule && toggleReactflow.mapper ? (
          <Mapper
            sideBarData={nodePropertyData}
            updatedNodeConfig={updatedNodeConfig}
            setToggleReactflow={setToggleReactflow}
          />
        ) : toggleReactflow.code ? (
          <MonacoEditor
            sideBarData={nodePropertyData}
            updatedNodeConfig={updatedNodeConfig}
            setToggleReactflow={setToggleReactflow}
          />
        ) : (
          <>nothing</>
        )}
      </div>
    </TorusModellerContext.Provider>
  );
}
