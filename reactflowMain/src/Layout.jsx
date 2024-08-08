import {
  useCallback,
  useState,
  useRef,
  createContext,
  useMemo,
  useEffect,
} from "react";
import {
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { FabricsSelector } from "./FabricsSelector";
import { v4 as uuidv4 } from "uuid";
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
import { getInitialEvents } from "./commonComponents/api/eventsApi";
import { ToastContainer } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
export const TorusModellerContext = createContext(null);
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
export default function Layout({
  client,
  clientLoginId,
  currentArtifactKey = null,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFabric, setSelectedFabric] = useState("Home");
  const [selectedTkey, setSelectedTkey] = useState("FRK");
  const [selectedArtifactGroup, setSelectedArtifactGroup] = useState("pgrp");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedComponentName, setSelectedComponentName] = useState(null);
  const [selectedControlName, setSelectedControlName] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showNodeProperty, setShowNodeProperty] = useState(false);
  const [showFabricSideBar, setShowFabricSideBar] = useState(true);
  const [menu, setMenu] = useState(null);
  const [sfNodeGalleryData, setSfNodeGalleryData] = useState(null);
  const [selectedControlEvents, setSelectedControlEvents] = useState(null);
  const [recentClicked, setrecentClicked] = useState(false);
  const ref = useRef(null);
  const [nodePropertyData, setNodePropertyData] = useState({});
  const [denormalizedata, setDenormalizedata] = useState(null);
  const { getNode } = useReactFlow();
  const [eventsNavBarData, setEventsNavBarData] = useState([]);
  const [controlJson, setControlJson] = useState(null);
  const [toggleReactflow, setToggleReactflow] = useState("fabrics");
  //   {
  //   flow: true,
  //   rule: false,
  //   mapper: false,
  //   code: false,
  // }
  const loadArtifact = useMemo(() => {
    if (!currentArtifactKey) return null;
    return currentArtifactKey.split(":");
  }, [currentArtifactKey]);
  const getTenantPolicy = async (tenant) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}tp/getTenantInfo?tenant=${tenant}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      data.orgGrp =
        data.orgGrp &&
        data.orgGrp.length > 0 &&
        data.orgGrp.map((orgGrp) => ({
          ...orgGrp,
          id: uuidv4(),
        }));

      data.psGrp =
        data.psGrp &&
        data.psGrp.length > 0 &&
        data.psGrp.map((psGrp) => ({
          ...psGrp,
          id: uuidv4(),
        }));

      data.roleGrp =
        data.roleGrp &&
        data.roleGrp.length > 0 &&
        data.roleGrp.map((roleGrp) => ({
          ...roleGrp,
          id: uuidv4(),
        }));

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleTabChange = (fabric) => {
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
          JSON.stringify([
            "TCL",
            selectedTkey,
            "UF",
            selectedProject,
            selectedArtifactGroup,
            selectedArtifact,
            selectedVersion,
          ]),
        ).then((res) => {
          if (res?.status == 200) {
            setEventsNavBarData(res?.data?.navBarData ?? []);
            setControlJson(res?.data?.controlJson ?? {});
          }
        });
    }
    if (fabric == "SF") {
      getTenantPolicy("ABC").then((data) => setSfNodeGalleryData(data));
    }
    if (fabric !== "events") {
      setSelectedProject("");
      setSelectedArtifact("");
      setSelectedVersion("");
    }

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

  const uniqueNames = useMemo(() => {
    if (nodes.length > 0) {
      let uniqNameArray = [];
      for (let node of nodes) {
        if (!uniqNameArray.includes(node.data.label)) {
          uniqNameArray.push(node.data.label);
        }
      }

      return uniqNameArray;
    } else {
      return [];
    }
  }, [nodes]);

  const updatedNodeConfig = (id, metadata, updatedData) => {
    console.log(id, metadata, updatedData, "upateconfg");
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

  console.log(nodes, "nodes", nodePropertyData, "nodePropertyData");

  const updateOptions = (data) => {
    try {
      setNodes((nds) => {
        return (
          nds &&
          nds.map((node) => {
            let updatedNode = { ...node };
            if (node.id === nodePropertyData.id) {
              updatedNode = {
                ...updatedNode,
                data: { ...node.data, ...data },
              };
              setNodePropertyData(updatedNode);
            }

            return updatedNode;
          })
        );
      });

      // setStatus(true);

      // setTimeout(() => {
      //   setStatus(false);
      // }, 2000);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to update options.");
    }
  };

  const changeNodeProperty = (values) => {
    try {
      // takeSnapshot();
      let key = Object.keys(values)[0];
      let value = Object.values(values)[0];
      console.log("values", values, key, value);
      if (key) {
        setNodes((nds) => {
          return (
            nds &&
            nds.map((nds) => {
              if (nds.id == nodePropertyData.id) {
                if (key == "name") {
                  return {
                    ...nds,
                    data: {
                      ...nds.data,
                      label: value,
                    },
                    property: {
                      ...nds.property,
                      [key]: value,
                    },
                  };
                } else if (key === "label") {
                  return {
                    ...nds,
                    data: {
                      ...nds.data,
                      label: value,
                    },
                  };
                } else if (key === "layoutFlag") {
                  return {
                    ...nds,
                    [key]: value,
                  };
                } else {
                  return {
                    ...nds,
                    property: {
                      ...nds.property,
                      [key]: value,
                    },
                  };
                }
              }

              return nds;
            })
          );
        });

        setNodePropertyData((prev) => {
          if (key == "name") {
            return {
              ...prev,
              data: {
                ...prev.data,
                label: value,
              },
              property: {
                ...prev.property,
                [key]: value,
              },
            };
          } else if (key == "label") {
            return {
              ...prev,
              data: {
                ...prev.data,
                label: value,
              },
            };
          } else {
            return {
              ...prev,
              property: {
                ...prev.property,
                [key]: value,
              },
            };
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendDataToFabrics = useMemo(() => {
    return {
      nodes: nodes,
      nodeEdges: edges,
    };
  }, [nodes, edges]);
  const switchReactFlow = (toogle) => {
    switch (toogle) {
      case "fabrics":
        return (
          <>
            <div className="sticky top-0 h-[8%] w-full">
              <Navbar
                tKey={"FRK"}
                project={""}
                handleTabChange={handleTabChange}
                color={colors[selectedFabric]?.light}
                sendDataToFabrics={(data) => {
                  setEdges(data?.nodeEdges ?? []);
                  setNodes(data?.nodes ?? []);
                }}
                getDataFromFabrics={sendDataToFabrics}
                clientLoginId={clientLoginId}
              />
            </div>

            <div
              className={`flex h-[92%] w-full bg-[#F4F5FA]   dark:bg-[#161616] `}
            >
              <div
                className={`flex h-[100%]  ${showNodeProperty ? "w-[79%]" : "w-[100%]"}`}
              >
                <FabricsSelector
                  nodes={nodes}
                  edges={edges}
                  setEdges={setEdges}
                  setNodes={setNodes}
                  fabric={selectedFabric}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                >
                  {({ redo, undo, canUndo, canRedo }) => (
                    <>
                      <SideBar showNodeProperty={showNodeProperty} />
                      {selectedFabric !== "Home" && (
                        <>
                          <NodeGallery
                            showFabricSideBar={showFabricSideBar}
                            color={""}
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
                              <ToastContainer
                                newestOnTop
                                icon={false}
                                pauseOnHover={false}
                                hideProgressBar={true}
                                className={`z-[999] flex min-h-11 min-w-[0%] max-w-[85%] flex-col items-center justify-end`}
                              />
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
                              onClick={() => {
                                selectedFabric !== "events" && onPaneClick();
                              }}
                              onClose={onPaneClick}
                              fabric={selectedFabric}
                              onEdit={(id, type = null) => {
                                setNodePropertyData(getNode(id));
                                if (type) {
                                  setToggleReactflow(type);
                                } else setShowNodeProperty(!showNodeProperty);
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
              </div>

              {showNodeProperty && (
                <div
                  className={`z-50 h-[100%] overflow-hidden  ${showNodeProperty ? "w-[21%]" : "hidden"} border dark:border-[#212121]  `}
                >
                  <div
                    className={`h-[100%] transform transition-transform delay-75 duration-300 ease-in-out dark:bg-[#161616] ${showNodeProperty ? "translate-x-0" : "translate-x-full"}`}
                  >
                    <div
                      className="top-0 flex w-[100%] cursor-pointer justify-end text-[#161616] dark:text-[#FFFFFF]"
                      onClick={() => setShowNodeProperty(!showNodeProperty)}
                    >
                     <IoCloseCircleOutline size={20} />
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
                      changeProperty={changeNodeProperty}
                      uniqueNames={uniqueNames}
                      nodes={nodes}
                      changedatavalues={updateOptions}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case "rule":
        return (
          <Gorule
            sideBarData={nodePropertyData}
            updatedNodeConfig={updatedNodeConfig}
            setToggleReactflow={setToggleReactflow}
          />
        );
      case "mapper":
        return (
          <Mapper
            sideBarData={nodePropertyData}
            updatedNodeConfig={updatedNodeConfig}
            setToggleReactflow={setToggleReactflow}
          />
        );
      case "code":
        return (
          <MonacoEditor
            sideBarData={nodePropertyData}
            updatedNodeConfig={updatedNodeConfig}
            setToggleReactflow={setToggleReactflow}
          />
        );
      default:
        return <div></div>;
    }
  };
  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <TorusModellerContext.Provider
      value={{
        ref,
        loadArtifact,
        setSelectedTkey,
        selectedTkey,
        client,
        selectedProject,
        selectedArtifact,
        selectedVersion,
        controlJson,
        onPaneClick,
        uniqueNames,
        selectedFabric,
        handleTabChange,
        eventsNavBarData,
        nodePropertyData,
        selectedArtifactGroup,
        setSelectedArtifactGroup,
        setSelectedComponentName,
        selectedComponentName,
        setSelectedControlName,
        selectedControlName,
        onNodeContextMenu,
        setSelectedArtifact,
        setSelectedProject,
        sfNodeGalleryData,
        setSelectedVersion,
        selectedControlEvents,

        setSelectedControlEvents,
      }}
    >
      <div
        className={`  flex h-full w-full flex-col max-md:gap-3 lg:max-xl:gap-0 xl:max-3xl:gap-0 xl:max-3xl:bg-gray-600 `}
      >
        {switchReactFlow(toggleReactflow)}
        {/* {toggleReactflow.flow ? (
          <>
            <div className="sticky top-0 h-[8%] w-full">
              <Navbar
                tKey={"FRK"}
                project={""}
                handleTabChange={handleTabChange}
                color={colors[selectedFabric]?.light}
                sendDataToFabrics={(data) => {
                  setEdges(data?.nodeEdges ?? []);
                  setNodes(data?.nodes ?? []);
                }}
                getDataFromFabrics={sendDataToFabrics}
              />
            </div>

            <div
              className={`flex h-[92%] w-full bg-[#F4F5FA]   dark:bg-[#161616] `}
            >
              <div
                className={`flex h-[100%]  ${showNodeProperty ? "w-[79%]" : "w-[100%]"}`}
              >
                <FabricsSelector
                  nodes={nodes}
                  edges={edges}
                  setEdges={setEdges}
                  setNodes={setNodes}
                  fabric={selectedFabric}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                >
                  {({ redo, undo, canUndo, canRedo }) => (
                    <>
                      <SideBar showNodeProperty={showNodeProperty} />
                      {selectedFabric !== "Home" && (
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
                              <ToastContainer
                                newestOnTop
                                icon={false}
                                pauseOnHover={false}
                                hideProgressBar={true}
                                className={`z-[999] flex min-h-11 min-w-[0%] max-w-[85%] flex-col items-center justify-end`}
                              />
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
                              onClick={() => {
                                selectedFabric !== "events" && onPaneClick();
                              }}
                              onClose={onPaneClick}
                              fabric={selectedFabric}
                              onEdit={(id, type = null) => {
                                setNodePropertyData(getNode(id));
                                if (type) {
                                  setToggleReactflow((prev) => ({
                                    ...prev,
                                    flow: false,
                                    [type]: true,
                                  }));
                                } else setShowNodeProperty(!showNodeProperty);
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
              </div>

              {showNodeProperty && (
                <div
                  className={`z-50 ${showNodeProperty ? "w-[21%]" : "hidden"} border dark:border-[#212121]  `}
                >
                  <div
                    className={`h-full transform   bg-[#FFFFFF] transition-transform delay-75 duration-300 ease-in-out dark:bg-[#161616] ${showNodeProperty ? "translate-x-0" : "translate-x-full"}`}
                  >
                    <div
                      className="top-0 flex w-[100%] cursor-pointer justify-end text-[#161616] dark:text-[#FFFFFF]"
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
                      changeProperty={changeNodeProperty}
                      uniqueNames={uniqueNames}
                      nodes={nodes}
                      changedatavalues={updateOptions}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : toggleReactflow.rule ? (
          <Gorule
            sideBarData={nodePropertyData}
            updatedNodeConfig={updatedNodeConfig}
            setToggleReactflow={setToggleReactflow}
          />
        ) : toggleReactflow.mapper ? (
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
          <div className="h-full w-full bg-white text-center italic">
            nothing
          </div>
        )} */}
      </div>
    </TorusModellerContext.Provider>
  );
}
