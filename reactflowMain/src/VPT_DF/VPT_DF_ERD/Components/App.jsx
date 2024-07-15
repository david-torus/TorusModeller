import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";

import { v4 as uuidv4 } from "uuid";
import dagre from "dagre";

import ContextMenu from "./ContextMenu.jsx";
import { CustomTableNode } from "./DynamicNodes";
import CustomEdge from "./CustomEdge";
import NodeInfoSidebar from "../../../commonComponents/CommonSideBar/NodeInfoSidebar.jsx";
import FabricsNavbar from "../../../commonComponents/layout/ActionBar/FabricsNavbar";
import FabricSidebar from "../../../commonComponents/layout/SideBar/FabricSidebar";

import { Toast } from "primereact/toast";

import {
  workflow_controlpolicy,
  config_controlpolicy,
  workflow_colorpolicy,
  config_colorpolicy,
} from "../utils/environment";

import { getdefaultVersion } from "../../../commonComponents/api/DF/api.js";
import { getLatestVersion } from "../../../commonComponents/api/fabricsApi";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext.js";

import useUndoRedo from "../../../commonComponents/react-flow-pro/useUndoRedo";

//Node Dimensions
const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;

/**
 * Creates a context for the UniQue name.
 *
 * @return {Context} The UniQue name context.
 */
export const uniQueNameContext = createContext(null);

//App Function
export default function App({
  tenant,
  group,
  fabrics,
  application,
  currentFabric,
}) {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const entityJson = {};
  const reactflowwrapper = useRef(null);
  const [menu, setMenu] = useState(null);
  const [nodeConfig, setNodeConfig] = useState({});
  const [uniqueNames, setUniqueNames] = useState([]);
  const [reactFlowInstance, setreactflowinstance] = useState(null);
  const toast = useRef(null);
  const drawingTrack = currentFabric;
  const [nodeData, setNodeData] = useState(null);
  const [toggleSide, setToggleSide] = useState(false);
  const [propertywindow, setPropertywindow] = useState(false);
  const [defaults, setDefaults] = useState({});
  const proOptions = { hideAttribution: true };
  const { darkmode } = useContext(DarkmodeContext);
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  //Declaring node types
  const NODE_TYPES = useMemo(
    () => ({
      customTable: CustomTableNode,
    }),
    []
  );

  //This is for edge type using for node connection
  const edgeTypes = useMemo(
    () => ({
      "start-end": CustomEdge,
    }),
    []
  );

  //This function is used for delete node
  const deleteNode = useCallback(
    (id) => {
      takeSnapshot();
      if (nodeConfig && nodeConfig.hasOwnProperty(id)) {
        let data = { ...nodeConfig };
        delete data[id];
        setNodeConfig(data);
      }
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) => edges.filter((edge) => edge.source !== id));
      setMenu(null);
    },
    [setNodes, setEdges, nodeConfig, setNodeConfig, takeSnapshot]
  );

  //useEFfect for get data from navbar

  //useEFfect for get data from flow
  useEffect(() => {
    if (nodes.length > 0) {
      let uniqNameArray = [];
      for (let node of nodes) {
        if (!uniqNameArray.includes(node.data.label)) {
          uniqNameArray.push(node.data.label);
        }
      }
      setUniqueNames(uniqNameArray);
    }
  }, [nodes]);

  //This function is used to update the edges
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      try {
        takeSnapshot();
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
      } catch (error) {
        console.error(error);
      }
    },
    [setEdges, takeSnapshot]
  );

  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      try {
        takeSnapshot();
        if (!edgeUpdateSuccessful.current) {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
      } catch (error) {
        console.error(error);
      }
    },
    [setEdges, takeSnapshot]
  );

  //This function is used to connect nodes
  const onConnect = useCallback(
    (params) => {
      try {
        takeSnapshot();
        const newEdge = {
          ...params,

          type: "start-end",
          data: {
            startLabel: "One",
            endLabel: "One",
          },
        };

        setEdges((eds) => addEdge(newEdge, eds));
      } catch (error) {
        console.error(error);
      }
    },
    [setEdges, takeSnapshot]
  );

  /**
   * A description of the entire function.
   *
   * @param {type} msg - description of parameter
   * @return {type} description of return value
   */
  const showsuccess = (msg) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `${msg}`,
      life: 1000,
    });
  };

  /**
   * Displays an error message in a toast notification.
   *
   * @param {string} msg - The error message to display.
   * @return {void} This function does not return a value.
   */
  const showerror = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };

  // This function is used to handle the drag over event.
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //This function is used to handle the drop event.
  const onDrop = useCallback(
    async (event) => {
      try {
        takeSnapshot();
        event.preventDefault();

        const type = event.dataTransfer.getData("application/reactflow");
        const name = event.dataTransfer.getData("application/name");
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        // create flow using DAGRE graph for Edges
        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));

        //calculateLayout for both nodes and edges
        const getLayoutedElements = (nodes, edges, direction = "TB") => {
          const isHorizontal = direction === "LR";
          dagreGraph.setGraph({ rankdir: direction });

          nodes.forEach((node) => {
            dagreGraph.setNode(node.id, {
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
            });
          });

          edges.forEach((edge) => {
            dagreGraph.setEdge(edge.source, edge.target);
          });

          dagre.layout(dagreGraph);

          nodes.forEach((node) => {
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? "left" : "top";
            node.sourcePosition = isHorizontal ? "right" : "bottom";

            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            node.position = {
              x: nodeWithPosition.x - NODE_WIDTH / 2,
              y: nodeWithPosition.y - NODE_HEIGHT / 2,
            };

            return node;
          });

          return { node: nodes, edge: edges };
        };
        let nodeProperty = {};
        const response = await getLatestVersion(
          "torus",
          "Fintech",
          "DF",
          type.toLocaleLowerCase()
        );
        if (response && response?.data?.nodes[0]?.data?.nodeProperty) {
          nodeProperty = response?.data?.nodes[0]?.data?.nodeProperty;
        }

        const newNode = {
          getLayoutedElements,
          id: uuidv4(),
          type,
          position,
          data: {
            label: name,

            nodeProperty: nodeProperty,
          },
          property: {
            name: name,
            nodeType: type,
            description: "",
          },
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.log(error);
      }
    },
    [reactFlowInstance, setNodes, takeSnapshot]
  );

  //This function is called when the user right clicks on the node.
  const onNodeContextMenu = useCallback(
    (event, node) => {
      try {
        event.preventDefault();
        const pane = reactflowwrapper.current.getBoundingClientRect();

        setMenu({
          id: node.id,
          top: event.clientY < pane.height - 200 && event.clientY - 80,
          left: event.clientX < pane.width - 200 && event.clientX - 80,
          right:
            event.clientX >= pane.width - 200 &&
            pane.width - event.clientX + 80,
          bottom:
            event.clientY >= pane.height - 200 &&
            pane.height - event.clientY - 80,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setMenu]
  );

  //Handles the click event on the pane.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  /**
   * Retrieves the default values for nodes from the server.
   *
   * @return {Promise<void>} - A promise that resolves when the default values are set.
   */
  const getDefaultsForNodes = async () => {
    try {
      const response = await getdefaultVersion();

      if (response && Object.keys(response).length > 0) {
        setDefaults(response);
      } else {
        setDefaults({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDefaultsForNodes();
  }, []);

  /**
   * Updates the ER JSON data for a specific node based on the provided data and ID.
   *
   * @param {Object} datas - The data object containing the attributes and methods to update.
   * @param {string} id - The ID of the node to update.
   * @return {void} This function does not return a value.
   */
  const updateERDJson = (datas, id) => {
    try {
      takeSnapshot();

      setNodes((nds) => {
        return nds?.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                attributes: datas.AT,
                methods: datas.MT,
              },
            };
          }

          return node;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updates the details of a node.
   *
   * @param {Object} data - An object containing the key-value pairs to update.
   * @return {void} This function does not return anything.
   */
  const updatenodeDetails = (data) => {
    try {
      takeSnapshot();
      let key = Object.keys(data)[0];
      let value = Object.values(data)[0];

      setNodes((nds) => {
        return nds?.map((nds) => {
          if (nds.id === nodeData.id) {
            if (key === "name") {
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
          }

          return nds;
        });
      });

      setNodeData((nds) => {
        if (key === "name") {
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
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Retrieves the control policy and color policy for a specific type from the config and workflow objects.
   *
   * @param {string} type - The type of control policy to retrieve.
   * @return {Promise<Object>} An object containing the workflow control policy, config control policy, config color policy, and workflow color policy for the specified type.
   */
  const controlPolicyApi = (type) => {
    try {
      const configControlpolicy = config_controlpolicy[type];
      const workflowControlpolicy = workflow_controlpolicy[type];
      const configColorpolicy = config_colorpolicy[type];
      const workflowColorpolicy = workflow_colorpolicy[type];

      return {
        workflowControlpolicy: { ...workflowControlpolicy },
        configControlpolicy: { ...configControlpolicy },
        configColorpolicy: { ...configColorpolicy },
        workflowColorpolicy: { ...workflowColorpolicy },
      };
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Sets the sidebar state and updates the node data asynchronously.
   *
   * @param {Object} node - The node data to be set.
   * @return {Promise<void>} A promise that resolves when the sidebar state is updated and the node data is set.
   */
  const setSidebar = async (node) => {
    try {
      setToggleSide(!toggleSide);
      setNodeData(node);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Toggles the value of the `toggleSide` state variable.
   *
   * @return {void} This function does not return a value.
   */
  const sideBarToggle = () => {
    setToggleSide(!toggleSide);
  };

  /**
   * Updates the configuration of a node with the given ID.
   *
   * @param {string} id - The ID of the node to update.
   * @param {string} keys - The key to update in the node's data.
   * @param {object} nodeDetalis - The new details to update in the node's data.
   * @param {any} data - The new value to set for the specified key in the node's data.
   * @return {void} This function does not return anything.
   */
  const updatedNodeConfig = (id, keys, nodeDetalis, updatedData) => {
    try {
      takeSnapshot();
      setNodes((prev) => {
        return prev?.map((node) => {
          if (node.id === id) {
            if (node.data.hasOwnProperty("nodeProperty")) {
              return {
                ...node,
                data: {
                  ...node.data,
                  nodeProperty: {
                    ...node.data.nodeProperty,
                    ...nodeDetalis,
                    ...updatedData,
                  },
                },
              };
            } else {
              return {
                ...node,
                data: {
                  ...node.data,
                  nodeProperty: { ...nodeDetalis, ...updatedData },
                },
              };
            }
          }

          return node;
        });
      });
      takeSnapshot();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Sends data to the navigation bar.
   *
   * @returns {Object} An object containing the nodes, edges, and nodeProperty.
   * @throws {Error} If an error occurs during the data sending process.
   */
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
  }, [nodes, edges]);

  /**
   * Retrieves data from the navigation bar and updates the state variables.
   *
   * @param {Object} data - The data object containing nodes, nodeEdges, and nodeProperty.
   * @throws {Error} If an error occurs during the data retrieval process.
   */
  const getDataFromNavBar = useCallback(
    (data) => {
      try {
        setNodes(data?.nodes ?? []);
        setEdges(data?.nodeEdges ?? []);
        setNodeConfig(data?.nodeProperty ?? {});
      } catch (error) {
        console.error(error);
      }
    },
    [setEdges, setNodeConfig, setNodes]
  );

  // Returns JSX
  return (
    <uniQueNameContext.Provider value={{ uniqueNames, nodeConfig }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: darkmode ? "#121212" : "#E9E8E8",
        }}
      >
        <Toast ref={toast} />
        <ReactFlow
          proOptions={proOptions}
          ref={reactflowwrapper}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          nodeTypes={NODE_TYPES}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onInit={setreactflowinstance}
          reactflowwrapper={reactflowwrapper}
          onDrop={onDrop}
          edgeTypes={edgeTypes}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          connectionLineType={ConnectionLineType.SimpleBezier}
          fitView
          fitViewOptions={{
            padding: 0.2,
          }}
        >
          <FabricsNavbar
            undoredo={{
              undo: undo,
              redo: redo,
              canRedo: canRedo,
              canUndo: canUndo,
            }}
            tenant={tenant}
            group={group}
            fabrics={fabrics}
            application={application}
            getDataFromFabrics={sendDataToNavBar}
            sendDataToFabrics={getDataFromNavBar}
          />
          {/* <Sidebar  /> */}
          <FabricSidebar fabrics={fabrics} />

          <NodeInfoSidebar
            nodeConfig={nodeConfig}
            defaults={defaults}
            changeProperty={updatenodeDetails}
            uniqueNames={uniqueNames}
            currentDrawing={drawingTrack}
            visiblity={toggleSide}
            setVisiblity={sideBarToggle}
            updatedNodeConfig={updatedNodeConfig}
            propertywindow={propertywindow}
            sideBarData={nodeData}
            funcNodedata={setNodeData}
            sideBarToggle={sideBarToggle}
            setPropertywindow={setPropertywindow}
          />

          <Background
            variant="dots"
            gap={25}
            size={1}
            color={darkmode ? "#ccc" : "black"}
          />

          {menu && (
            <ContextMenu
              deleteNode={deleteNode}
              nodeConfig={entityJson}
              showerror={showerror}
              showsuccess={showsuccess}
              updatedNodeConfig={updateERDJson}
              setMenu={setMenu}
              isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
              onClick={onPaneClick}
              controlPolicyApi={controlPolicyApi}
              sideBarToggle={sideBarToggle}
              funcNodedata={setSidebar}
              {...menu}
            />
          )}
        </ReactFlow>
      </div>
    </uniQueNameContext.Provider>
  );
}
