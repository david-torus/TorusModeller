import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  createContext,
  useMemo,
} from "react";
import ReactFlow, { useNodesState, useEdgesState, Background } from "reactflow";
import "reactflow/dist/style.css";
import { CustomTableNode, TableNode } from "./CustomNode";
import { Toast } from "primereact/toast";
import {
  workflow_controlpolicy,
  config_controlpolicy,
  workflow_colorpolicy,
  config_colorpolicy,
} from "../utils/environment";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { v4 as uuidv4 } from "uuid";
import ContextMenu from "./ContextMenu";

import useUndoRedo from "../../../commonComponents/react-flow-pro/useUndoRedo";
import DefaultNavbar from "../../../commonComponents/layout/ActionBar/DefaultNavbar";

//Node types
const NODE_TYPE = {
  customTable: CustomTableNode,
  Table: TableNode,
};

export const uniQueNameDFDContext = createContext(null);
export default function App({
  defaultsMode,
  setDefaultsMode,
  fabricslist,
  fabrics,
  setFabrics,
}) {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [menu, setMenu] = useState([]);
  const [typesInFlow, setTypesInFlow] = useState([]);

  const { darkMode } = useContext(DarkmodeContext);
  const toast = useRef(null);
  const [uniqueNames, setUniqueNames] = useState([]);
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  /**
   * Deletes a node from the list of nodes and updates the nodeConfig state.
   * Also sets the menu state to null.
   *
   * @param {string} id - The ID of the node to delete.
   */
  const deleteNode = useCallback(
    (id) => {
      try {
        takeSnapshot();

        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setMenu(null);
      } catch (error) {
        console.error(error);
      }
    },
    [setNodes, takeSnapshot]
  );

  /**
   * A function that shows an error toast message.
   *
   * @param {string} msg - The error message to display
   * @return {void}
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
   * Retrieves the unique types of nodes in the flow and sets the state.
   *
   * @return {void}
   */
  const getTypesinFlow = useCallback(() => {
    try {
      let typeinFlow = [];
      for (const node of nodes) {
        if (!typeinFlow.includes(node.type)) {
          typeinFlow.push(node.type);
        }
      }

      setTypesInFlow(typeinFlow);
    } catch (error) {
      console.error(error);
    }
  }, [nodes]);

  /**
   * This useEffect hook is triggered whenever the `nodes` or `nodeConfig` state changes.
   * It performs the following actions:
   * 1. Checks if `nodes` is not null and has a length greater than 0.
   * 2. Iterates through each node in the `nodes` array and adds unique labels to the `uniqNameArray`.
   * 3. Sets the `uniqNameArray` as the state for `uniqueNames`.
   * 4. Calls the `getTypesinFlow` function.
   * 5. Sends a JSON object to the parent component with the `nodes`, `nodeConfig`, and an empty `nodeEdges` array.
   * 6. If `nodes` is null or has a length of 0, sets the `typesInFlow` state to an empty array.
   *
   * @return {void}
   */
  useEffect(() => {
    if (nodes && nodes.length > 0) {
      let uniqNameArray = [];
      for (let node of nodes) {
        if (!uniqNameArray.includes(node.data.label)) {
          uniqNameArray.push(node.data.label);
        }
      }
      setUniqueNames(uniqNameArray);

      getTypesinFlow();
    } else {
      setTypesInFlow([]);
    }
  }, [nodes, getTypesinFlow]);

  /**
   * This useEffect hook is triggered whenever the `getJsonFromParent` state changes.
   * It performs the following actions:
   * 1. Sets the `nodes` state to the value of `getJsonFromParent.nodes`.
   * 2. Sets the `edges` state to the value of `getJsonFromParent.nodeEdges`.
   * 3. Sets the `nodeConfig` state to the value of `getJsonFromParent.nodeProperty`.
   * 4. Calls the `takeSnapshot` function.
   *
   * @return {void}
   */

  /**
   * This useEffect hook is triggered whenever the `defaultsMode` state changes.
   * It performs the following actions:
   * 1. Sets the `nodes` state to an empty array.
   * 2. Sets the `edges` state to an empty array.
   * 3. Sets the `nodeConfig` state to an empty object.
   *
   * @return {void}
   */
  useEffect(() => {
    setNodes([]);
    setEdges([]);
  }, [defaultsMode, setNodes, setEdges]);

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
      } catch (error) {
        console.error(error);
      }
    },
    [setEdges, setNodes]
  );

  /**
   * Handles the drop event when an item is dropped onto the target.
   *
   * @param {DragEvent} event - The drop event.
   * @return {void} This function does not return a value.
   */
  const onDrop = useCallback(
    (event) => {
      takeSnapshot();
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const rolesColor = event.dataTransfer.getData("application/roleColor");

      try {
        if (typeof type === "undefined" || type === null) {
          throw new Error("type is undefined");
        }
        if (defaultsMode === "SingleNode") {
          if (nodes.length > 0) {
            throw new Error("single node mode can only have one node");
          }
          if (typesInFlow.includes(type)) {
            throw new Error("type already exists");
          }
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
            attributes: [],
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
      setNodes,
      typesInFlow,
      defaultsMode,
      takeSnapshot,
      nodes.length,
    ]
  );

  /**
   * Handles the dragover event for a draggable element.
   * Prevents the default behavior of the event to allow dropping.
   * Sets the dropEffect to "move" to indicate that the dragged item can be moved.
   *
   * @param {DragEvent} event - The dragover event object.
   * @return {void}
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Updates the configuration of a node with the given ID.
   *
   * @param {string} id - The ID of the node to update.
   * @param {object} data - The new data to merge into the node's configuration.
   * @return {void} This function does not return a value.
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

  /**
   * Handles the context menu event for a node.
   *
   * @param {MouseEvent} event - The context menu event.
   * @param {object} node - The node object.
   * @return {void} This function does not return a value.
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

  /**
   * Handles the click event on a pane.
   * Closes the menu by setting the menu state to null.
   */
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  /**
   * Retrieves the control policy and color policy for a given type.
   *
   * @param {string} type - The type of policy to retrieve.
   * @return {object} An object containing the workflow control policy,
   *                   config control policy, config color policy, and
   *                   workflow color policy.
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

  //Returning the JSX
  return (
    <uniQueNameDFDContext.Provider
      value={useMemo(() => ({ uniqueNames }), [uniqueNames])}
    >
      <div
        className="TNR-main"
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: darkMode ? "#121212" : "#E9E8E8",
        }}
      >
        <Toast ref={toast} />
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
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
            fabricsList={fabricslist}
            setDefaultsMode={setDefaultsMode}
            defaultsMode={defaultsMode}
            getDataFromDefault={sendDataToNavBar}
            sendDataToDefault={getDataFromNavBar}
          />
          {menu && (
            <ContextMenu
              defaultsMode={defaultsMode}
              onClick={onPaneClick}
              {...menu}
              deleteNode={deleteNode}
              setMenu={setMenu}
              updatedNodeConfig={updatedNodeConfig}
              isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
              controlPolicyApi={controlPolicyApi}
            />
          )}
          <Background variant="dots" />
        </ReactFlow>
      </div>
    </uniQueNameDFDContext.Provider>
  );
}
