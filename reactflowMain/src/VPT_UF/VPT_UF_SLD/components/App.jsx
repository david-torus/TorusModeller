/* eslint-disable */
import React, {
  useCallback,
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
} from "react";
import ReactFlow, {
  Background,
  ReactFlowProvider,
  useReactFlow,
  applyNodeChanges,
  useNodesState,
  useEdgesState,
  addEdge,
  useStoreApi,
  updateEdge,
  MarkerType,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { getLatestVersion } from "../../../commonComponents/api/fabricsApi";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { getHelperLines } from "../../../commonComponents/react-flow-pro/helperLines/getHelperLines";
import HelperLines from "../../../commonComponents/react-flow-pro/helperLines/helperLines";
import groupNode from "./customNodes/groupNode";
import { Builder } from "./Builder";
import FabricsNavbar from "../../../commonComponents/layout/ActionBar/FabricsNavbar";
import { VscPreview } from "react-icons/vsc";
import NodeInfoSidebar from "../../../commonComponents/CommonSideBar/NodeInfoSidebar";
import { v4 as uuidv4 } from "uuid";
import {
  getNodePositionInsideParent,
  sortNodes,
} from "../../../commonComponents/react-flow-pro/dynamicGrouping/utils";
import {
  NavBarNode,
  Table,
  Form,
  Sidebarnav,
  TextUpdaterNode,
  ButtonNode,
  InputNode,
  radioGroup,
  textarea,
  timeinput,
  dateinput,
  dropdown,
} from "./customNodes/CustomNode";
import { ContextMenu } from "../components/ContextMenu";
import { Button } from "@nextui-org/react";
import useUndoRedo from "../../../commonComponents/react-flow-pro/useUndoRedo";
import EventsMain from "../../../VPT_UF/VPT_EVENTS/EventsMain";
import _ from "lodash";
import FabricSidebar from "../../../commonComponents/layout/SideBar/FabricSidebar";
import NavBar from "../../../commonComponents/layout/ActionBar/Navbar copy";
import { FabricsContexts } from "../../../Layout";

//Node Types
const nodeTypes = {
  navbar: NavBarNode,
  table: Table,
  form: Form,
  sidebarnav: Sidebarnav,
  newNode: TextUpdaterNode,
  button: ButtonNode,
  input: InputNode,
  group: groupNode,
  radiogroup: radioGroup,
  textarea: textarea,
  timeinput: timeinput,
  dateinput: dateinput,
  dropdown: dropdown,
};

/**
 * Renders the App component.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - {string} tenant - The tenant value.
 *   - {string} appGroup - The appGroup value.
 *   - {function} stateTrack - The stateTrack function.
 *   - {string} application - The application value.
 *   - {string} currentFabric - The currentFabric value.
 * @returns {JSX.Element} The rendered App component.
 */
const AppUF = ({
  nodes,
  edges,
  setEdges,
  setNodes,

  onEdgesChange,

  children,
  proOptions,
}) => {
  const { ref, onNodeContextMenu, onPaneClick } = useContext(FabricsContexts);
  const [helperLineHorizontal, setHelperLineHorizontal] = useState(undefined);
  const [helperLineVertical, setHelperLineVertical] = useState(undefined);
  const { getIntersectingNodes, flowToScreenPosition, getNode } =
    useReactFlow();
  const store = useStoreApi();
  const [toggleSide, setToggleSide] = useState(false);
  const [nodeData, setNodeData] = useState(null);
  const [nodepropertydata, setNodePropertyData] = useState(null);
  const [selectedNodeid, setSelectedNodeid] = useState(null);
  const [nodeConfig, setNodeConfig] = useState([]);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showbuilder, setShowBuilder] = useState(false);
  const [menu, setMenu] = useState(false);
  const [propertywindow, setPropertywindow] = useState(null);
  const { darkMode } = useContext(DarkmodeContext);
  const [senddomain, setSendDomain] = useState(null);
  const [sendartifact, setSendArtifact] = useState(null);
  const [mainArtifacts, setMainArtifacts] = useState([]);
  const [mainVersion, setVersion] = useState([]);
  const [eventsArtifacts, setEventsArtifacts] = useState([]);
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  const [toggleReactflow, setToggleReactflow] = useState({
    rule: false,
    mapper: false,
    events: false,
  });
  const [selecetedWholeVersion, setSelectedWholeVersion] = useState(null);

  /**
   * Updates the node configuration with the provided ID, key, metadata, and data.
   *
   * @param {string} id - The ID of the node to update.
   * @param {string} key - The key to update in the node configuration.
   * @param {object} metadata - The metadata to merge into the node configuration.
   * @param {any} data - The data to assign to the specified key in the node configuration.
   * @return {void} This function does not return anything.
   */
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

      setNodeData((prev) => {
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

  console.log("nodes", nodes);
  /**
   * Handles the context menu event for a node.
   *
   * @param {Event} event - The event object.
   * @param {Object} node - The node object.
   */
  // const onNodeContextMenu = useCallback(
  //   (event, node) => {
  //     try {
  //       event.preventDefault();

  //       const pane = ref.current.getBoundingClientRect();
  //       setMenu({
  //         id: node.id,
  //         top: event.clientY < pane.height - 200 && event.clientY - 80,
  //         left: event.clientX < pane.width - 200 && event.clientX - 80,
  //         right:
  //           event.clientX >= pane.width - 200 &&
  //           pane.width - event.clientX + 80,
  //         bottom:
  //           event.clientY >= pane.height - 200 &&
  //           pane.height - event.clientY + 80,
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [setMenu]
  // );

  /**
   * Sets the sidebar data based on the provided node and id.
   *
   * @param {Object} node - The node object.
   * @param {string} id - The id of the node.
   * @return {Promise<void>} A promise that resolves when the sidebar is set.
   */
  const setSidebar = async (node, id) => {
    try {
      setToggleSide(!toggleSide);

      setNodeData(node);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    /**
     * Handles errors that occur during the execution of the function.
     *
     * @param {Error} e - The error object.
     * @return {void}
     */
    const errorHandler = (e) => {
      if (
        e.message.includes(
          "ResizeObserver loop completed with undelivered notifications" ||
            "ResizeObserver loop limit exceeded",
        )
      ) {
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay",
        );
        if (resizeObserverErr) {
          resizeObserverErr.style.display = "none";
        }
      }
    };
    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  const sideT = () => {
    setToggleSide(!toggleSide);
  };

  /**
   * Custom implementation of the applyNodeChanges hook.
   *
   * @param {Array} changes - An array of changes to apply to the nodes.
   * @param {Object} nodes - The nodes object.
   * @return {void} No return value.
   */
  const customApplyNodeChanges = useCallback((changes, nodes) => {
    // reset the helper lines (clear existing lines, if any)
    setHelperLineHorizontal(undefined);
    setHelperLineVertical(undefined);
    // this will be true if it's a single node being dragged
    // inside we calculate the helper lines and snap position for the position where the node is being moved to
    if (
      changes.length === 1 &&
      changes[0].type === "position" &&
      changes[0].dragging &&
      changes[0].position
    ) {
      const helperLines = getHelperLines(changes[0], nodes);
      // if we have a helper line, we snap the node to the helper line position
      // this is being done by manipulating the node position inside the change object
      changes[0].position.x =
        helperLines.snapPosition.x ?? changes[0].position.x;
      changes[0].position.y =
        helperLines.snapPosition.y ?? changes[0].position.y;
      // if helper lines are returned, we set them so that they can be displayed
      setHelperLineHorizontal(helperLines.horizontal);
      setHelperLineVertical(helperLines.vertical);
    }
    return applyNodeChanges(changes, nodes);
  }, []);

  /**
   * Generates a callback function that updates the nodes based on the given changes.
   *
   * @param {Object} changes - The changes to be applied to the nodes.
   * @return {Function} The callback function.
   */
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nodes) => customApplyNodeChanges(changes, nodes));
    },
    [setNodes, customApplyNodeChanges],
  );

  /**
   * Handles the 'dragover' event by preventing the default behavior and setting the
   * drop effect to 'move'.
   *
   * @param {DragEvent} event - The dragover event object.
   * @return {void} This function does not return anything.
   */
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  /**
   * Handles the drop event for the react flow instance.
   *
   * @param {Event} event - The drop event object.
   * @return {Promise<void>} - A promise that resolves when the function completes.
   */
  const onDrop = async (event) => {
    event.preventDefault();
    const reactFlowBounds = ref.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const name = event.dataTransfer.getData("application/name");
    const roles = event.dataTransfer.getData("application/roles");
    const rolesColor = event.dataTransfer.getData("application/roleColor");

    console.log(type, name, "tupe");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const nodeStyle =
      type === "group" ? { width: 400, height: 200 } : undefined;
    const intersections = getIntersectingNodes({
      x: position.x,
      y: position.y,
      width: 40,
      height: 40,
    }).filter((n) => n.type === "group");
    const groupNode = intersections[0];

    const nodeDetails = type;
    // let pushData = {};
    let pushData = [];
    let windowUiDecider = {};
    let nodeProperty = {
      elementInfo: {
        events: [
          {
            name: "onLoad",
            type: "Group",
            enabled: "true",
          },
        ],
      },
    };
    if (type !== "group") {
      const response = await getLatestVersion("torus", "Fintech", "UF", type);
      if (response && response?.data?.nodes?.[0]?.data?.nodeProperty) {
        nodeProperty = response?.data?.nodes?.[0]?.data?.nodeProperty;
      }
    }
    let ids = uuidv4();
    const newNode = {
      id: ids,
      type: nodeDetails,
      position,
      T_parentId: groupNode ? groupNode?.id : ids,
      layoutFlag: "no",
      positionAbsolute: position,
      viewport: {
        screenWidth,
        screenHeight,
      },
      data: {
        label: "",
        nodeColor: rolesColor,
        role: roles,
        height: "",
        width: "",
        nodeProperty: nodeProperty,
      },

      flowToScreenPosition: {
        ...flowToScreenPosition({ x: position.x, y: position.y }),
      },
      property: {
        name: "",
        nodeType: nodeDetails,
        description: "",
      },
      style: nodeStyle,
    };
    if (groupNode) {
      if (type === "group") {
        alert("Can't place group inside group 1");
        return;
      }
      // if we drop a node on a group node, we want to position the node inside the group
      newNode.position = getNodePositionInsideParent(
        {
          position,
          width: 40,
          height: 40,
        },
        groupNode,
      ) ?? { x: 0, y: 0 };
      newNode.parentNode = groupNode?.id;

      newNode.expandParent = true;
    }
    // we need to make sure that the parents are sorted before the children
    // to make sure that the children are rendered on top of the parents
    const sortedNodes = store
      .getState()
      .getNodes()
      .concat(newNode)
      .sort(sortNodes);
    setNodes(sortedNodes);
    takeSnapshot();
  };

  /**
   * Callback function for when a node is dragged and stopped.
   * Updates the node's position and parent node if it intersects with another node.
   *
   * @param {Object} _ - The event object.
   * @param {Object} node - The node being dragged.
   * @return {void}
   */
  const onNodeDragStop = useCallback(
    (_, node) => {
      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === "group",
      );
      const groupNode = intersections[0];
      // when there is an intersection on drag stop, we want to attach the node to its new parent
      if (intersections.length && node.parentNode !== groupNode?.id) {
        if (node.type === "group") {
          alert("Can't place group inside group 2");
          return;
        }
        const nextNodes = store
          .getState()
          .getNodes()
          .map((n) => {
            if (n.id === groupNode.id) {
              return {
                ...n,
                className: "",
                flowToScreenPosition: {
                  ...n?.flowToScreenPosition,
                  ...flowToScreenPosition({ x: n.position.x, y: n.position.y }),
                },
              };
            } else if (n.id === node.id) {
              const position = getNodePositionInsideParent(n, groupNode) ?? {
                x: 0,
                y: 0,
              };
              return {
                ...n,
                position,
                parentNode: groupNode.id,
                T_parentId: groupNode?.id,
                flowToScreenPosition: {
                  ...n?.flowToScreenPosition,
                  ...flowToScreenPosition({ x: position.x, y: position.y }),
                },
                extent: "parent",
              };
            }
            return n;
          })
          .sort(sortNodes);
        setNodes(nextNodes);
      }
    },
    [getIntersectingNodes, setNodes, store],
  );

  /**
   * Callback function that is triggered when a node is dragged.
   *
   * @param {Object} event - The event object.
   * @param {Object} node - The node being dragged.
   * @return {void}
   */
  const onNodeDrag = useCallback(
    (_, node) => {
      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === "group",
      );
      const groupClassName =
        intersections.length && node.parentNode !== intersections[0]?.id
          ? "active"
          : "";
      setNodes((nds) => {
        return (
          nds &&
          nds.map((n) => {
            if (n.type === "group") {
              return {
                ...n,
                className: groupClassName,
                flowToScreenPosition: {
                  ...n?.flowToScreenPosition,
                  ...flowToScreenPosition({ x: n.position.x, y: n.position.y }),
                },
              };
            } else if (n.id === node.id) {
              return {
                ...n,
                position: node.position,
                flowToScreenPosition: {
                  ...n?.flowToScreenPosition,
                  ...flowToScreenPosition({
                    x: node.position.x,
                    y: node.position.y,
                  }),
                },
              };
            }
            return { ...n };
          })
        );
      });
    },
    [getIntersectingNodes, setNodes],
  );

  /**
   * Callback function that is called when a new connection is made.
   *
   * @param {Object} params - The parameters of the connection.
   * @param {string} params.source - The source node of the connection.
   * @param {string} params.target - The target node of the connection.
   * @param {string} params.sourceHandle - The source handle of the connection.
   * @param {string} params.targetHandle - The target handle of the connection.
   * @return {void} This function does not return anything.
   */
  const onConnect = useCallback(
    (params) => {
      if (nodes.length) {
        setEdges((eds) => {
          if (eds.source !== params.target && eds.target !== params.source) {
            return addEdge(
              {
                ...params,

                type: nodes,
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              },
              eds,
            );
          } else {
            return addEdge(eds);
          }
        });
      }
      takeSnapshot();
    },
    [setEdges, nodes, takeSnapshot],
  );

  /**
   * Callback function that is called when an edge is updated.
   *
   * @param {Object} oldEdge - The old edge object.
   * @param {Object} newConnection - The new connection object.
   * @return {void} This function does not return anything.
   */
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      takeSnapshot();
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [takeSnapshot],
  );

  const connectionLineStyle = {
    strokeWidth: 3,
    stroke: "red",
  };

  let nodeProperty;
  /**
   * Retrieves the latest version of a flow from the Torus API based on the provided nodes, senddomain, and sendartifact.
   * Updates the node properties in the state with the elementInfo and elementInfoDockey from the response.
   *
   * @param {Array} nodes - The array of nodes to retrieve the latest version for.
   * @return {Promise<void>} A Promise that resolves when the node properties have been updated in the state.
   */
  const getCases = async (nodes) => {
    if (nodes && nodes.length > 0 && senddomain && sendartifact) {
      const response = await getLatestVersion(
        "torus",
        Array.from(senddomain)[0],
        "UF",
        Array.from(sendartifact)[0],
      );

      let pushData = {
        elementInfo: {},
        elementInfoDockey: {},
      };
      let windowUiDecider = {};

      nodeProperty = response.data.nodeProperty;
      console.log(nodeProperty, "np");

      if (nodeProperty) {
        setNodes((nds) => {
          return (
            nds &&
            nds.map((ndss) => {
              if (ndss) {
                if (nodeProperty) {
                  pushData = {
                    elementInfo: nodeProperty[ndss.type]?.elementInfo || {},
                    elementInfoDockey:
                      nodeProperty[ndss.type]?.elementInfoDockey || {},
                  };
                  windowUiDecider = nodeProperty[ndss.type]?.pw || {};
                }

                return {
                  ...ndss,
                  defaults: {
                    pw: windowUiDecider,
                    elementInfo: pushData,
                  },
                };
              }
              return ndss;
            })
          );
        });
      }
    }
  };

  // const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  /**
   * Toggles the state tracking and shows the builder.
   *
   * @return {void} This function does not return anything.
   */
  const settoggle = () => {
    stateTrack(true);

    setShowBuilder(true);
  };

  /**
   * Updates the node details based on the provided data.
   *
   * @param {Object} data - The data object containing the key-value pairs to update.
   * @return {void} This function does not return anything.
   */
  const updatenodeDetails = (data) => {
    let key = Object.keys(data)[0];
    let value = Object.values(data)[0];

    setNodes((nds) => {
      return (
        nds &&
        nds.map((nds) => {
          if (nds.id == nodeData.id) {
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

    setNodeData((nds) => {
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
      } else {
        return {
          ...nds,

          property: {
            ...nds.property,
            [key]: value,
          },
        };
      }
    });
  };

  const uniqueNames = useMemo(() => {
    if (nodes && nodes.length > 0) {
      let uniqNameArray = [];
      for (let node of nodes) {
        if (!uniqNameArray.includes(node.data.label)) {
          uniqNameArray.push(node.data.label);
        } else {
          uniqNameArray = uniqNameArray;
        }
      }
      return uniqNameArray;
    } else {
      return [];
    }
  });

  useEffect(() => {}, [nodes]);

  /**
   * Deletes a node from the state.
   *
   * @param {string} id - The ID of the node to delete.
   * @return {void}
   */
  const deleteNode = useCallback(
    (id) => {
      takeSnapshot();
      if (nodeConfig.hasOwnProperty(id)) {
        let data = { ...nodeConfig };
        delete data[id];
        setNodeConfig(data);
      }
      setNodes((nodes) =>
        nodes.filter((node) => {
          if (node.id !== id) {
            if (node.parentId && node.parentId.includes(id)) {
              return {
                ...node,
                parentId: node.parentId.filter((parentId) => parentId !== id),
              };
            }
            return node;
          }
        }),
      );

      setEdges((edges) =>
        edges.filter((edge) => {
          if (edge.source !== id && edge.target !== id) {
            return edge;
          }
        }),
      );
      setMenu(null);
    },
    [nodes, nodeConfig, takeSnapshot],
  );

  /**
   * Sets the send domain state with the provided data.
   *
   * @param {any} data - The data to set the send domain state to.
   * @return {void} This function does not return anything.
   */
  const setDomain = (data) => {
    setSendDomain(data);
  };

  /**
   * Sets the send artifact state with the provided data.
   *
   * @param {any} data - The data to set the send artifact state to.
   * @return {void} This function does not return anything.
   */
  const setArtifact = (data) => {
    setSendArtifact(data);
    setEventsArtifacts(data);
  };

  const sendDataToNavBar = useCallback(() => {
    try {
      return {
        nodes: nodes,
        nodeEdges: edges,
        nodeProperty: {},
      };
    } catch (error) {
      console.error(error);
    }
  }, [nodes, edges, nodeConfig]);

  const getDataFromNavBar = useCallback(
    (data) => {
      try {
        setNodes(data?.nodes ?? []);
        setEdges(data?.nodeEdges ?? []);
        setNodeConfig(data?.nodeProperty ?? {});
        getCases(data?.nodes ?? []);
      } catch (error) {
        console.error(error);
      }
    },
    [nodes, edges, nodeConfig, getCases],
  );

  return (
    <>
      {!showbuilder ? (
        <>
          {/* <div
            className={
              !toggleReactflow.events &&
              !toggleReactflow.mapper &&
              !toggleReactflow.rule
                ? ""
                : "hidden"
            }
          >
             <FabricsNavbar
              tenant={tenant}
              group={appGroup}
              application={application}
              fabrics={"UF"}
              sendDataToFabrics={getDataFromNavBar}
              getDataFromFabrics={sendDataToNavBar}
              setdomain={setDomain}
              setartifact={setArtifact}
              sendartifact={sendartifact}
              setMainArtifacts={setMainArtifacts}
              mainArtifacts={mainArtifacts}
              setMainVersion={setVersion}
              mainVersion={mainVersion}
              undoredo={{ undo, redo, canUndo, canRedo }}
              setToggleReactflow={setToggleReactflow}
              selecetedWholeVersion={selecetedWholeVersion}
              setSelectedWholeVersion={setSelectedWholeVersion}
            >
              <div className="flex flex-row">
                <Button
                  isIconOnly
                  size="sm"
                  variant="outline"
                  className=" flex flex-row w-full justify-center gap-2 items-center "
                  onClick={settoggle}
                >
                  <VscPreview
                    className={`border border-gray-600/50 p-[3px] rounded cursor-pointer active:opacity-50 transition-all ${
                      darkMode
                        ? " hover:text-white hover:border-gray-200/80 "
                        : " hover:text-gray-700 hover:border-gray-700 "
                    }`}
                    size={25}
                    color={darkMode ? "#F4F4F5" : "#616A6B "}
                  />

                  <p>Preview</p>
                </Button>
              </div>
            </FabricsNavbar> 
             <NavBar
              tenant={tenant}
              group={appGroup}
              application={application}
              fabrics={"UF"}
              sendDataToFabrics={getDataFromNavBar}
              getDataFromFabrics={sendDataToNavBar}
              setdomain={setDomain}
              setartifact={setArtifact}
              sendartifact={sendartifact}
              setMainArtifacts={setMainArtifacts}
              mainArtifacts={mainArtifacts}
              setMainVersion={setVersion}
              mainVersion={mainVersion}
              undoredo={{ undo, redo, canUndo, canRedo }}
              setToggleReactflow={setToggleReactflow}
              selecetedWholeVersion={selecetedWholeVersion}
              setSelectedWholeVersion={setSelectedWholeVersion}
            /> 
            <FabricSidebar fabrics={"UF"} />
            <Sidebar />
          </div> */}
          {!toggleReactflow.events &&
          !toggleReactflow.mapper &&
          !toggleReactflow.rule ? (
            <ReactFlow
              // onlyRenderVisibleElements={true}
              translateExtent={[
                [0, 0],
                [Infinity, Infinity],
              ]}
              nodeExtend={[
                [0, 0],
                [Infinity, Infinity],
              ]}
              ref={ref}
              nodes={nodes}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onNodesChange={onNodesChange}
              onConnect={onConnect}
              onNodeDrag={onNodeDrag}
              onNodeDragStop={onNodeDragStop}
              onDrop={onDrop}
              onDragOver={onDragOver}
              selectNodesOnDrag={false}
              onNodeContextMenu={onNodeContextMenu}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              panOnDrag={false}
              panOnScroll={true}
              zoomOnScroll={false}
              preventScrolling={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              autoPanOnNodeDrag={false}
              deleteNode={deleteNode}
              menu={menu}
              onPaneClick={onPaneClick}
              snapGrid={[10, 10]}
              snapToGrid={true}
              nodesDraggable={true}
              onEdgeUpdate={onEdgeUpdate}
              connectionLineStyle={connectionLineStyle}
            >
              {children &&
                (typeof children == "function"
                  ? children({
                      setToggleReactflow,
                      uniqueNames,
                      changeProperty: updatenodeDetails,
                      updatedNodeConfig,
                      sideBarData: nodeData,
                      undo,
                      redo,
                      canUndo,
                      canRedo,
                    })
                  : children)}
              {/* {menu && (
                <ContextMenu
                  setToogle={setSidebar}
                  sideT={sideT}
                  node={nodes}
                  onClick={onPaneClick}
                  deleteNode={deleteNode}
                  {...menu}
                  setMenu={setMenu}
                  setSelectedNodeid={setSelectedNodeid}
                  // updatedNodeConfig={updatedNodeConfig}
                />
              )} */}
              <HelperLines
                horizontal={helperLineHorizontal}
                vertical={helperLineVertical}
              />
              {/* <NodeInfoSidebar
                setToggleReactflow={setToggleReactflow}
                nodeConfig={nodeConfig}
                updatedNodeConfig={updatedNodeConfig}
                uniqueNames={uniqueNames}
                changeProperty={updatenodeDetails}
                currentDrawing={"UF"}
                visiblity={toggleSide}
                setVisiblity={sideT}
                nodeData={nodeData}
                propertywindow={propertywindow}
                sideBarData={nodeData}
                setSidebarData={setNodePropertyData}
                sideT={sideT}
                deleteNode={deleteNode}
                sidejson={nodeConfig}
                selectedNodeid={selectedNodeid}
                setPropertywindow={setPropertywindow}
              /> */}

              {/* 
              <Background
                variant="dots"
                color={darkMode ? "#ccc" : "black"}
                gap={25}
                size={1.4}
              />
              <MiniMap nodeStrokeWidth={3} pannable zoomable /> */}
            </ReactFlow>
          ) : (
            toggleReactflow.events &&
            !toggleReactflow.mapper &&
            !toggleReactflow.rule && (
              <>
                <EventsMain
                  currentDrawing={currentFabric}
                  updatedNodeConfig={updatedNodeConfig}
                  nodeConfig={nodeConfig}
                  setToggleReactflow={setToggleReactflow}
                  nodes={nodes}
                  sideBarData={nodeData}
                  tenant={tenant}
                  appGroup={appGroup}
                  application={application}
                  fabrics={"UF"}
                  artifacts={eventsArtifacts}
                  domain={senddomain}
                  mainArtifacts={mainArtifacts}
                  mainVersion={mainVersion}
                  selecetedWholeVersion={selecetedWholeVersion}
                  setSelectedWholeVersion={setSelectedWholeVersion}
                />
              </>
            )
          )}
        </>
      ) : (
        <>
          <Builder
            nodesj={nodes}
            edgesj={edges}
            jsonj={nodeConfig}
            widthj={window.innerWidth}
            heightj={window.innerHeight}
            showbuilder={showbuilder}
            setShowBuilder={setShowBuilder}
          />
        </>
      )}
    </>
  );
};

/**
 * Renders the FlowWithProvider component.
 *
 * @param {Object} props - The properties passed to the component.
 * @return {JSX.Element} The rendered React element.
 */

export default AppUF;
