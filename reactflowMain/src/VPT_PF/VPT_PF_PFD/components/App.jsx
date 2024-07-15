/* eslint-disable */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import ReactFlowDia from "./reactflowDia";
import dagre from "dagre";
import FloatingEdge from "./FloatEdge";

import "primereact/resources/themes/tailwind-light/theme.css";
import {
  StartNode,
  EndNode,
  DecisionNode,
  DefaultNode,
  ApiNode,
  DatabaseNode,
  KafkaNode,
  PostgresNode,
  DockerNode,
  InputNode,
  OutputNode,
  CustomCode,
  HumanTaskNode,
} from "./CustomNode";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "primereact/toast";
import CustomEdge from "./CustomEdge";
import { getLatestVersion } from "../../../commonComponents/api/fabricsApi";
import useUndoRedo from "../../../commonComponents/react-flow-pro/useUndoRedo";
import { TfiControlShuffle } from "react-icons/tfi";

//Node types
const NODE_TYPE = {
  startnode: StartNode,
  decisionnode: DecisionNode,
  endnode: EndNode,
  defaultndoe: DefaultNode,
  apinode: ApiNode,
  databasenode: DatabaseNode,
  kafkanode: KafkaNode,
  postgresnode: PostgresNode,
  dockernode: DockerNode,
  inputnode: InputNode,
  outputnode: OutputNode,
  customcode: CustomCode,
  humantasknode: HumanTaskNode,
};

//Edge types
const edgeTypes = {
  customedge: CustomEdge,
  floatEdge: FloatingEdge,
};

const App = ({ tenant, group, fabrics, application, admin, currentFabric }) => {
  const [uniqueNames, setUniqueNames] = useState([]);
  const [defaults, setDefaults] = useState({});
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [toggleSide, setToggleSide] = useState(false);
  const [nodeData, setNodeData] = useState(null);
  const dagreGraph = new dagre.graphlib.Graph();
  const [menu, setMenu] = useState(null);
  const [nodeConfig, setNodeConfig] = useState({});
  const edgeUpdateSuccessful = useRef(true);
  const toast = useRef(null);
  const isAdmin = admin;
  const userRoleDetails = null;
  const drawingTrack = currentFabric;
  const [selectedRole, setSelectedRole] = useState(null);
  const [senddomain, setSendDomain] = useState(null);
  const [sendartifact, setSendArtifact] = useState(null);
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  const showSuccess = (msg) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `${msg}`,
      life: 1000,
    });
  };
  const showError = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };
  const setDomain = (data) => {
    setSendDomain(data);
  };
  const setArtifact = (data) => {
    setSendArtifact(data);
  };

  /**
   * Callback function that is invoked when the edge update ends.
   *
   * @param {Event} _ - The event object.
   * @param {Object} edge - The edge object.
   * @return {void}
   */
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  /**
   * Deletes a node with the specified ID from the nodes state.
   *
   * @param {string} id - The ID of the node to delete.
   * @return {void}
   */
  const deleteNode = useCallback(
    (id) => {
      try {
        takeSnapshot();
        if (nodeConfig && nodeConfig.hasOwnProperty(id)) {
          let data = { ...nodeConfig };
          delete data[id];
          setNodeConfig(data);
        }

        setNodes((nodes) => nodes.filter((node) => {
          if(node.id !== id) {
            if(node.T_parentId.includes(id)) {
              node.T_parentId = node.T_parentId.filter((parentId) => parentId !== id);
              return node;
            }
            return node;

          }
        }));
    
        setEdges((edges) =>
          edges.filter((edge) => {
            if (edge.source !== id && edge.target !== id) {
              return edge;
            }
            return edge;
          })
        );

        setMenu(null);
      } catch (error) {
        console.error(error);
      }
    },
    [nodeConfig, setNodes, setEdges, takeSnapshot]
  );
  console.log("-->", nodes);

  /**
   * A description of the entire function.
   *
   * @param {type} node - description of parameter
   * @return {type} description of return value
   */
  const setSidebar = (node) => {
    try {
      setToggleSide(!toggleSide);
      setNodeData(node);

      setSelectedRole({
        role: node.data.role,
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Toggles the value of `toggleSide` state variable.
   *
   * @return {void}
   */
  const sideT = () => {
    setToggleSide(!toggleSide);
  };

  /**
   * Changes the color and role of child nodes based on the parent node color and role.
   *
   * @param {Array} nodes - The array of nodes to update.
   * @param {Array} childID - The array of child IDs.
   * @param {string} Id - The ID of the parent node.
   * @return {Array} - The updated array of nodes.
   */
  const changeChildColor = (nodes, childID, Id) => {
    try {
      return (
        nodes &&
        nodes.map((node) => {
          if (childID.includes(node.id)) {
            return {
              ...node,
              data: {
                ...node.data,
                nodeColor: nodes.find((node) => node.id === Id)?.data.nodeColor,
                role: nodes.find((node) => node.id === Id)?.data.role,
              },
            };
          }
          return node;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updates the node property based on the provided values.
   *
   * @param {Object} values - The values to update the node property with.
   * @return {void} This function does not return anything.
   */
  const changeNodeProperty = (values) => {
    try {
      // takeSnapshot();
      const key = Object.keys(values);
      if (key === "name") {
        if (
          nodeConfig &&
          (Object.keys(nodeConfig).includes(
            `${nodeData.property.name}.config`
          ) ||
            Object.keys(nodeConfig).includes(`${nodeData.property.name}.WF`))
        ) {
          let nodeDatas = {};

          Object.keys(nodeConfig) &&
            Object.keys(nodeConfig).map((keys) => {
              if (keys === `${nodeData.property.name}.config`) {
                nodeDatas = {
                  ...nodeDatas,
                  [`${values["name"]}.config`]: nodeConfig[keys],
                };
              }

              if (keys === `${nodeData.property.name}.WF`) {
                nodeDatas = {
                  ...nodeDatas,
                  [`${values["name"]}.WF`]: nodeConfig[keys],
                };
              }
              nodeDatas = {
                ...nodeDatas,
                [keys]: nodeConfig[keys],
              };
              return nodeDatas;
            });
          setNodeConfig(nodeDatas);
        }
      }

      const nds =
        nodes &&
        nodes.length > 0 &&
        nodes.map((nodes) => {
          if (nodes.id === nodeData.id) {
            if (key[0] === "role") {
              setSelectedRole(values.role);
              return {
                ...nodes,
                data: {
                  ...nodes.data,
                  nodeColor: values?.role.color,
                  role: values?.role.role,
                },
                ...values?.role,
              };
            }
            return {
              ...nodes,
              data: {
                ...nodes.data,
                label: key === "name" ? values[key] : nodes?.data.label,
              },
              property: {
                ...nodes.property,
                [key]: values[key],
              },

              IPC_flag: key === "IPC_flag" ? values[key] : nodes?.IPC_flag,
            };
          }
          return nodes;
        });

      if (key[0] === "role") {
        const childID = getChildId(nodeData.id, edges);
        const node = changeChildColor(nds, childID, nodeData.id);
        setNodes(node);
      } else {
        setNodes(nds);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //context menu
  const onNodeContextMenu = useCallback(
    (event, node) => {
      try {
        event.preventDefault();
        const pane = reactFlowWrapper.current.getBoundingClientRect();

        setMenu({
          id: node.id,
          top: event.clientY < pane.height - 200 && event.clientY - 80,
          left: event.clientX < pane.width - 200 && event.clientX - 80,
          right:
            event.clientX >= pane.width - 200 &&
            pane.width - event.clientX + 80,
          bottom:
            event.clientY >= pane.height - 200 &&
            pane.height - event.clientY + 80,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  /**
   * Function to handle connect nodes in react flow work space through edges
   *
   * @return {void} This function does not return a value.
   */
  const onConnect = useCallback(
    (params) => {
      try {
        takeSnapshot();
        if (nodes && nodes.length) {
          updateAddedEdges(params);
          setEdges((eds) => {
            if (eds.source !== params.target && eds.target !== params.source) {
              return addEdge(
                {
                  ...params,

                  type:
                    nodes &&
                    nodes.filter((node) => node.id === params.source)[0]
                      ?.type === "decisionnode"
                      ? "customedge"
                      : "smoothstep",
                  markerEnd: {
                    type: MarkerType.ArrowClosed,
                  },
                },
                eds
              );
            } else {
              showError("Source and Target cannot be same");
              return addEdge(eds);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [setEdges, nodes, takeSnapshot]
  );

  /**
   * Function to handle drag over event in react flow work space.
   *
   * @param {Object} event - The drag over event object.
   * @return {void} This function does not return anything.
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Updates the details of a node in the nodes array based on the oldEdge, newEdges, and childID.
   *
   * @param {Array} nodes - The array of nodes to update.
   * @param {Object} oldEdge - The old edge object.
   * @param {Object} newEdges - The new edges object.
   * @param {Array} childID - The array of child IDs.
   * @return {Array} - The updated nodes array.
   */
  const updateNodeDetails = useCallback(
    (nodes, oldEdge, newEdges, getChildId) => {
      try {
        // takeSnapshot();
        return (
          nodes &&
          nodes.map((node) => {
            const childID = getChildId(newEdges.target, edges);
            if (node.id === oldEdge.target) {
              return {
                ...node,
                T_parentId: [...node.T_parentId, newEdges.source],

                data: {
                  ...node.data,
                  nodeColor: nodes[newEdges.source]?.data.nodeColor,
                  role: nodes[newEdges.source]?.data.role,
                },
              };
            }
            if (childID.includes(node.id)) {
              return {
                ...node,
                data: {
                  ...node.data,
                  nodeColor: nodes[newEdges.source]?.data.nodeColor,
                  role: nodes[newEdges.source]?.data.role,
                },
              };
            }
            return node;
          })
        );
      } catch (error) {
        console.error(error);
        return nodes; // Return original nodes array in case of error
      }
    },
    [edges] // Dependency array should include all dependencies used within this function
  );

  // find child node Id using edges and targetId
  const getChildId = useCallback(
    (target, edges, sr = []) => {
      try {
        const sources = [];
        for (let index in edges) {
          if (
            edges[index].source === target &&
            !sr.includes(edges[index].target)
          ) {
            sr.push(edges[index].source);
            sources.push(edges[index].target);
            sources.push(...getChildId(edges[index].target, edges, sr));
          }
        }
        return sources;
      } catch (error) {
        console.error(error);
        return []; // Return an empty array or handle error case appropriately
      }
    },
    [] // Ensure to include all dependencies used inside getChildId if any
  );

  /**
   * Function to update JSON based on old and new edges.
   *
   * @param {Object} oldEdge - The old edge object.
   * @param {Object} newEdges - The new edges object.
   * @param {Array} nodes - The nodes array.
   * @param {Array} edges - The edges array.
   * @param {Function} setNodes - The state setter for nodes.
   * @param {Function} getChildId - Function to get child ID.
   * @param {Function} updateNodeDetails - Function to update node details.
   * @return {void} This function does not return anything.
   */
  const updateJson = useCallback(
    (
      oldEdge,
      newEdges,
      nodes,
      edges,
      setNodes,
      getChildId,
      updateNodeDetails
    ) => {
      if (nodes && nodes.length) {
        try {
          const childID = getChildId(newEdges.target, edges);

          const updatedNodes = updateNodeDetails(
            nodes,
            oldEdge,
            newEdges,
            childID
          );

          setNodes(updatedNodes);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [] // Dependency array should ideally include all dependencies used within this function.
  );

  /**
   * Function to handle edge update in react flow work space.
   *
   * @param {Object} oldEdge - The old edge object.
   * @param {Object} newConnection - The new connection object.
   * @return {void} This function does not return anything.
   */
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      try {
        takeSnapshot();
        edgeUpdateSuccessful.current = true;
        updateJson(
          oldEdge,
          newConnection,
          nodes,
          edges,
          setNodes,
          getChildId,
          updateNodeDetails
        );
        return setEdges((els) => {
          return updateEdge(oldEdge, newConnection, els);
        });
      } catch (error) {
        console.error(error);
      }
    },
    [
      setEdges,
      takeSnapshot,
      updateJson,
      nodes,
      edges,
      setNodes,
      getChildId,
      updateNodeDetails,
    ]
  );

  /**
   * Function to get cases asynchronously.
   *
   * @param {Array} nodes - The nodes array
   * @param {Array} edges - The edges array
   * @param {Object} nodeConfig - The node configuration object
   * @return {Promise} A promise for the function execution
   */
  const getCases = useCallback(
    async (nodes, edges, nodeConfig) => {
      try {
        // takeSnapshot();
        if (senddomain && sendartifact) {
          const response = await getLatestVersion(
            "torus",
            Array.from(senddomain)[0],
            "PF",
            Array.from(sendartifact)[0]
          );

          if (
            response &&
            response.hasOwnProperty("data") &&
            response?.data.hasOwnProperty("nodeProperty")
          ) {
            let nodeProperty = response.data.nodeProperty;
            if (nodeProperty) {
              setNodes((nds) => {
                return (
                  nds &&
                  nds.map((ndss) => {
                    if (ndss) {
                      let ConfigDefaults = {
                        data: {},
                        dataDockey: {},
                      };
                      let workFlowDefaults = {
                        workflow: {},
                        workflowDockey: {},
                      };
                      let propertyDefaults = {};

                      if (nodeProperty.hasOwnProperty(ndss.type)) {
                        ConfigDefaults.data =
                          nodeProperty[ndss.type]?.data || {};
                        ConfigDefaults.dataDockey =
                          nodeProperty[ndss.type]?.dataDockey || {};

                        workFlowDefaults.workflow =
                          nodeProperty[ndss.type]?.workflow || {};
                        workFlowDefaults.workflowDockey =
                          nodeProperty[ndss.type]?.workflowDockey || {};

                        propertyDefaults = nodeProperty[ndss.type]?.pw || {};
                      }

                      return {
                        ...ndss,
                        defaults: {
                          data: ConfigDefaults,
                          workflow: workFlowDefaults,
                          pw: propertyDefaults,
                        },
                      };
                    }
                    return ndss;
                  })
                );
              });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [sendartifact, senddomain, setNodes]
  );

  /**
   * Callback function for handling onDrop event.
   * Generates a new ID for the dropped node and adds it to the nodes array.
   *
   * @param {Event} event - The onDrop event object.
   * @return {Promise<void>} A promise that resolves when the function completes.
   */
  const onDrop = useCallback(
    async (event) => {
      try {
        takeSnapshot();
        event.preventDefault();
        const reactFlowBounds =
          reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData("application/reactflow");
        const name = event.dataTransfer.getData("application/name");
        if (typeof type === "undefined" || !type) {
          return;
        }

       
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        let nodeProperty = {};

        const response = await getLatestVersion(
          "torus",
          "Fintech",
          fabrics,
          type
        );
        console.log(response, type, "response");
        if (response && (type!=="startnode" && type!=="endnode") ) {
          nodeProperty = response?.data?.nodes[0]?.data?.nodeProperty ?? {};
        }

        const nodeDetails = type;
        const newNode = {
          id: uuidv4(),
          type: nodeDetails,
          position,
          T_parentId: [],
          data: {
            label: "",
            nodeColor: "#ccc",
            role: "testing",
            nodeProperty: nodeProperty,
          },
          property: {
            name: name,
            nodeType: nodeDetails,
            description: "",
          },

          IPC_flag: "N",
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        console.error(error);
      }
    },
    [reactFlowInstance, setNodes, takeSnapshot, fabrics]
  );

  console.log(nodes, "<--nodes");
  /**
   * Updates the nodes based on the provided role and childID.
   * @param {string} [role=""] - The role to be assigned to the nodes.
   * @param {Array} [childID=[]] - The array of child IDs.
   * @return {Promise<void>} - A promise that resolves when the update is complete.
   */
  const updateNode = useCallback(
    (role = "", childID = [], newEdge) => {
      try {
        // takeSnapshot();

        setNodes((node) => {
          let sourceIndex;
          node &&
            node.length > 0 &&
            node.forEach((ele, index) => {
              if (ele.id === newEdge.source) {
                sourceIndex = index;
              }
            });
          const nds =
            node &&
            node.length > 0 &&
            node.map((nodes, index) => {
              if (nodes.id === newEdge.target) {
                return {
                  ...nodes,
                  T_parentId: [...nodes.T_parentId, newEdge.source],

                  data: {
                    ...nodes.data,
                    nodeColor: node[sourceIndex]?.data.nodeColor,
                    role,
                  },
                };
              }
              if (childID.includes(nodes.id)) {
                return {
                  ...nodes,

                  data: {
                    ...nodes.data,

                    nodeColor: node[sourceIndex]?.data.nodeColor,
                    role,
                  },
                };
              }
              return nodes;
            });
          return nds;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setNodes] // Include dependencies used inside updateNode
  );

  const updateAddedEdges = useCallback(
    (edge) => {
      if (edge) {
        try {
          const edgesSource = getChildId(edge.target, edges);
          let sourceIndex;
          // let targeTIndex;
          nodes &&
            nodes.length > 0 &&
            nodes.forEach((ele, index) => {
              // if (ele.id === newEdge.target) targeTIndex = index;
              if (ele.id === edge.source) sourceIndex = index;
            });
          edgesSource.unshift(edge.target);
          const role = nodes[Number(sourceIndex)]?.data?.role;
          updateNode(role, edgesSource, edge);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [updateNode, nodes, edges]
  );

  /**
   * Updates the node configuration in the Redux store by adding or updating a property.
   *this is the function that used to set the nodeProperty on redis
   * @param {string} id - The ID of the node.
   * @param {string} key - The key of the property to update.
   * @param {object} metadata - Additional metadata for the property.
   * @param {any} data - The new value of the property.
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

  useEffect(() => {
    if (nodes && nodes.length > 0) {
      let uniqueName = [];
      for (let i = 0; i < nodes.length; i++) {
        if (
          !uniqueName.includes(nodes[i].property.name.toLowerCase()) &&
          nodes[i]?.property?.name !== ""
        )
          uniqueName.push(nodes[i].property.name.toLowerCase());
      }
      setUniqueNames(uniqueName);
    }
  }, [nodes]);

  /**
   * Retrieves the control policy configuration and workflow policy for a given type.
   *
   * @param {type} type - the type for which the control policy is retrieved
   * @return {Object} an object containing the retrieved policies
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

  const getDataFromNavBar = useCallback(
    (data) => {
      try {
        setNodes(data?.nodes ?? []);
        setEdges(data?.nodeEdges ?? []);
        setNodeConfig(data?.nodeProperty ?? {});
        getCases(
          data?.nodes ?? [],
          data?.nodeEdges ?? [],
          data?.nodeProperty ?? {}
        );
      } catch (error) {
        console.error(error);
      }
    },
    [setNodes, setEdges, getCases] // Include getCases as a dependency for getDataFromNavBar
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toast ref={toast} />
      <ReactFlowDia
        tenant={tenant}
        group={group}
        undoRedo={{
          undo: undo,
          redo: redo,
          canRedo: canRedo,
          canUndo: canUndo,
        }}
        fabrics={fabrics}
        application={application}
        getDataFromNavBar={getDataFromNavBar}
        sendDataToNavBar={sendDataToNavBar}
        currentDrawing={drawingTrack}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        setdomain={setDomain}
        setartifact={setArtifact}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onDragOver={onDragOver}
        onDrop={onDrop}
        reactFlowWrapper={reactFlowWrapper}
        setReactFlowInstance={setReactFlowInstance}
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={NODE_TYPE}
        toogle={toggleSide}
        setToogle={setSidebar}
        sideBarData={nodeData}
        setSidebarData={setNodeData}
        defaults={defaults}
        setDefaults={setDefaults}
        changeProperty={changeNodeProperty}
        sideT={sideT}
        menu={menu}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        widths={"100%"}
        deleteNode={deleteNode}
        setMenu={setMenu}
        updatedNodeConfig={updatedNodeConfig}
        isAdmin={isAdmin}
        nodeConfig={nodeConfig}
        userRoleDetails={userRoleDetails}
        selectedRole={selectedRole}
        showSuccess={showSuccess}
        showError={showError}
        uniqueNames={uniqueNames}
      />
    </div>
  );
};

export default App;
