import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  Background,
  addEdge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
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
import { Toast } from "primereact/toast";

import { v4 as uuidv4 } from "uuid";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import ContextMenu from "./ContextMenu";
import CustomEdge from "./CustomEdge";

import useUndoRedo from "../../../commonComponents/react-flow-pro/useUndoRedo";
import DefaultNavbar from "../../../commonComponents/layout/ActionBar/DefaultNavbar";
import { Gorule } from "../../../commonComponents/tabs/Gorule";

//Node types
const NODE_TYPE = {
  startnode: StartNode,
  decisionnode: DecisionNode,
  endnode: EndNode,
  defaultNdoe: DefaultNode,
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
//Custom Edge types
const edgeTypes = {
  customedge: CustomEdge,
};

/**
 * Renders the Index component which is the main component of the application.
 * It takes in several props including defaultsMode, sendJsonToParent, getJsonFromParent,
 * setDefaultsMode, fabricslist, fabrics, setFabrics, sendDataToFlow, getDataFromFlow.
 * It renders a ReactFlow component with various event handlers and state hooks.
 * It also renders a DefaultNavbar component and a ContextMenu component based on the state of toogleReactFlow.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - defaultsMode: The mode of the component (SingleNode or MultiNode).
 *   - sendJsonToParent: A function to send JSON data to the parent component.
 *   - getJsonFromParent: A function to get JSON data from the parent component.
 *   - setDefaultsMode: A function to set the defaults mode of the component.
 *   - fabricslist: An array of fabric objects.
 *   - fabrics: An object containing fabric data.
 *   - setFabrics: A function to set the fabrics object.
 *   - sendDataToFlow: A function to send data to the flow.
 *   - getDataFromFlow: A function to get data from the flow.
 * @return {JSX.Element} The rendered Index component.
 */
export default function App({
  defaultsMode,
  setDefaultsMode,
  fabricslist,
  fabrics,
  setFabrics,
  sendDataToFlow,
  getDataFromFlow,
}) {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [menu, setMenu] = useState([]);
  const [typesInFlow, setTypesInFlow] = useState([]);
  const toogleReactFlow = {
    rule: false,
    code: false,
  };
  const [nodeConfig, setNodeConfig] = useState({});
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();
  const [uniqueNames, setUniqueNames] = useState([]);
  const toast = useRef(null);

  const { darkMode } = useContext(DarkmodeContext);

  /**
   * Updates the PWUI state with the provided data.
   *
   * @param {Object} data - The new data to update the PWUI state with.
   * @return {void} This function does not return anything.
   */

  /**
   * Deletes a node from the flow.
   *
   * @param {string} id - The id of the node to be deleted.
   * @return {void} This function does not return anything.
   */
  const deleteNode = useCallback(
    (id) => {
      takeSnapshot();

      setNodes((nodes) => nodes.filter((node) => node.id !== id));

      setMenu(null);
    },
    [setNodes, takeSnapshot]
  );

  /**
   * Displays an error message using a toast notification.
   *
   * @param {string} msg - The error message to be displayed.
   * @return {void} This function does not return anything.
   */
  const showErr = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };

  /**
   * Handles the connection event when two nodes are connected.
   *
   * @param {Object} params - The parameters for the connection event.
   * @param {string} params.source - The source node id.
   * @param {string} params.target - The target node id.
   * @return {void} This function does not return anything.
   */
  const onConnect = useCallback(
    (params) => {
      takeSnapshot();
      if (nodes.length) {
        setEdges((eds) => {
          if (eds.source !== params.target && eds.target !== params.source) {
            return addEdge(
              {
                ...params,

                type:
                  nodes &&
                  nodes.filter((node) => node.id === params.source)[0]?.type ===
                    "decisionNode"
                    ? "customedge"
                    : "smoothstep",
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              },
              eds
            );
          } else {
            showErr("Source and Target cannot be same");
            return addEdge(eds);
          }
        });
      }
    },
    [setEdges, nodes, takeSnapshot]
  );

  /**
   * Generates an array of node types present in the flow.
   *
   * @return {Array} An array of node types present in the flow.
   */
  const getTypesinFlow = useCallback(() => {
    let typeinFlow = [];

    for (let i = 0; i < nodes.length; i++) {
      if (!typeinFlow.includes(nodes[i].type)) {
        typeinFlow.push(nodes[i].type);
      }
    }

    setTypesInFlow(typeinFlow);
  }, [nodes]);

  useEffect(() => {
    if (
      nodes &&
      edges &&
      (nodes.length > 0 || edges.length > 0 || nodeConfig)
    ) {
      getTypesinFlow();

      if (nodes.length > 0) {
        let uniqNameArray = [];
        for (let node of nodes) {
          if (!uniqNameArray.includes(node.data.label)) {
            uniqNameArray.push(node.data.label);
          }
        }
        setUniqueNames(uniqNameArray);
      }
    } else {
      setTypesInFlow([]);
    }
  }, [nodes, edges, nodeConfig, defaultsMode, getTypesinFlow]);

  /**
   * Handles the onDrop event.
   *
   * @param {Object} event - The onDrop event object.
   * @return {void}
   */
  const onDrop = useCallback(
    (event) => {
      takeSnapshot();
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const rolesColor = event.dataTransfer.getData("application/roleColor");
      try {
        if (defaultsMode === "SingleNode") {
          if (nodes.length > 0) {
            throw new Error("single node mode can only have one node");
          }
          if (typesInFlow.includes(type)) {
            throw new Error("type already exists");
          }
        }
        if (typeof type === "undefined" || type === null) {
          throw new Error("type is undefined");
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeDetails = type;
        const newNode = {
          id: uuidv4(),
          type: nodeDetails,
          position,
          parentId: [],
          data: {
            label: "",
            nodeType: nodeDetails,
            nodeColor: rolesColor,
            nodeProperty: {},
          },
          property: {
            name: "",
            description: "",
            nodeType: nodeDetails,
            defaultConfig: {},
            defaultWorkflow: {},
          },
        };

        setNodes((nds) => nds.concat(newNode));
      } catch (err) {
        showErr(err);
      }
    },
    [
      reactFlowInstance,
      nodes,
      typesInFlow,
      defaultsMode,
      setNodes,
      takeSnapshot,
    ]
  );
  console.log(nodes , 'nod')

  /**
   * Handles the 'dragover' event by preventing the default behavior and setting the
   * drop effect to 'move'.
   *
   * @param {DragEvent} event - The dragover event object.
   * @return {void} This function does not return anything.
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Updates the node configuration for a given id and key.
   *
   * @param {string} id - The id of the node to update.
   * @param {string} key - The key to update in the node's configuration.
   * @param {string} name - The new name for the node.
   * @param {any} data - The new value for the key in the node's configuration.
   * @return {void} This function does not return anything.
   */
  const updatedNodeConfig = (id, metaData, updatedData) => {
    takeSnapshot();

    setNodes((prev) => {
      return prev.map((node) => {
        if (node.id === id) {
          if (node.data.nodeProperty)
            return {
              ...node,
              data: {
                ...node.data,
                nodeProperty: {
                  ...node.data.nodeProperty,
                  ...metaData,
                  ...updatedData,
                },
              },
            };
          else
            return {
              ...node,
              data: {
                ...node.data,
                nodeProperty: {
                  ...metaData,

                  ...updatedData,
                },
              },
            };
        }
        return node;
      });
    });
  };

  useEffect(() => {
    setNodes([]);
  }, [defaultsMode, setNodes]);

  /**
   * Handles the context menu event for a node.
   *
   * @param {MouseEvent} event - The context menu event.
   * @param {Node} node - The node that was right-clicked.
   * @return {void} This function does not return anything.
   */
  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const pane = reactFlowWrapper.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY - 80,
        left: event.clientX < pane.width - 200 && event.clientX - 80,
        right: event.clientX >= pane.width && pane.width - event.clientX + 80,
        bottom:
          event.clientY >= pane.height - 200 &&
          pane.height - event.clientY + 80,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

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
        nodeProperty: nodeConfig,
      };
    } catch (error) {
      console.error(error);
    }
  }, [nodes, edges, nodeConfig]);

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
  //Returning the JSX
  return (
    <div
      className="TNR-main"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: darkMode ? "#121212" : "#E9E8E8",
      }}
    >
      <div
        className={
          !toogleReactFlow.code && !toogleReactFlow.rule ? "block" : "hidden"
        }
      >
        <DefaultNavbar
          undoredo={{
            undo: undo,
            redo: redo,
            canRedo: canRedo,
            canUndo: canUndo,
          }}
          setFabrics={setFabrics}
          fabrics={fabrics}
          tenant={"torus"}
          group={"Fintech"}
          sendDataToFlow={sendDataToFlow}
          getDataFromFlow={getDataFromFlow}
          fabricsList={fabricslist}
          setDefaultsMode={setDefaultsMode}
          defaultsMode={defaultsMode}
          getDataFromDefault={sendDataToNavBar}
          sendDataToDefault={getDataFromNavBar}
        />
      </div>

      <Toast ref={toast} />
      {!toogleReactFlow.code && !toogleReactFlow.rule ? (
        <ReactFlow
          onConnect={onConnect}
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodesChange={onNodesChange}
          nodeTypes={NODE_TYPE}
          onInit={setReactFlowInstance}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView={true}
          panOnDrag={false}
          nodesConnectable={defaultsMode === "SingleNode" ? false : true}
        >
          {menu && (
            <ContextMenu
              uniqueNames={uniqueNames}
              defaultsMode={defaultsMode}
              onClick={onPaneClick}
              {...menu}
              deleteNode={deleteNode}
              setMenu={setMenu}
              updatedNodeConfig={updatedNodeConfig}
              isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
              nodeConfig={nodeConfig}
            />
          )}
          <Background variant="dots" />
        </ReactFlow>
      ) : toogleReactFlow.rule && !toogleReactFlow.code ? (
        <>
          <Gorule />
        </>
      ) : toogleReactFlow.code && !toogleReactFlow.rule ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
}
