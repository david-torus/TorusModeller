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
  useStoreApi,
  updateEdge,
  useReactFlow,
  applyNodeChanges,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  InputNode,
  NavBarNode,
  Table,
  Form,
  Sidebarnav,
  ButtonNode,
  radioGroup,
  textarea,
  timeinput,
  dateinput,
  dropdown,
} from "./CustomNode";
import { Toast } from "primereact/toast";

import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { v4 as uuidv4 } from "uuid";
import ContextMenu from "./ContextMenu";
import { getHelperLines } from "../../../commonComponents/react-flow-pro/helperLines/getHelperLines";
import HelperLines from "../../../commonComponents/react-flow-pro/helperLines/helperLines";
import {
  getNodePositionInsideParent,
  sortNodes,
} from "../../../commonComponents/react-flow-pro/dynamicGrouping/utils";
import groupNode from "./groupNode";
import useUndoRedo from "../../../commonComponents/react-flow-pro/useUndoRedo";
import DefaultNavbar from "../../../commonComponents/layout/ActionBar/DefaultNavbar";
// import { dropdown } from "../../VPT_UF_SLD/components/customNodes/CustomNode";

//Node types
const NODE_TYPE = {
  navbar: NavBarNode,
  table: Table,
  form: Form,
  sidebarnav: Sidebarnav,
  button: ButtonNode,
  input: InputNode,
  group: groupNode,
  radiogroup: radioGroup,
  textarea: textarea,
  timeinput: timeinput,
  dateinput: dateinput,
  dropdown: dropdown,
};

export default function Index({
  defaultsMode,

  setDefaultsMode,
  fabricslist,
  fabrics,
  setFabrics,
}) {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [menu, setMenu] = useState([]);
  const [uniqueNames, setUniqueNames] = useState([]);
  const [helperLineHorizontal, setHelperLineHorizontal] = useState(undefined);
  const [helperLineVertical, setHelperLineVertical] = useState(undefined);
  const { getIntersectingNodes } = useReactFlow();
  const store = useStoreApi();
  const [typesInFlow, setTypesInFlow] = useState([]);

  const toast = useRef(null);
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();
  const { darkmode } = useContext(DarkmodeContext);

  /**
   * Deletes a node from the flow.
   *
   * @param {string} id - The id of the node to be deleted.
   * @return {void} This function does not return anything.
   */
  const deleteNode = useCallback(
    (id) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
      setEdges((edges) =>
        edges.filter((edge) => {
          if (edge.source !== id && edge.target !== id) {
            return edge;
          }
          return edge;
        })
      );
      takeSnapshot();
      setMenu(null);
    },
    [takeSnapshot, setEdges, setNodes]
  );

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
            "ResizeObserver loop limit exceeded"
        )
      ) {
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
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
   * Retrieves the unique types of nodes in the flow.
   *
   * @callback getTypesinFlow
   * @returns {void}
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
    if (nodes && nodes.length > 0) {
      getTypesinFlow();

      let uniqNameArray = [];
      for (let node of nodes) {
        if (!uniqNameArray.includes(node.data.label)) {
          uniqNameArray.push(node.data.label);
        }
      }
      setUniqueNames(uniqNameArray);
    } else {
      setTypesInFlow([]);
    }
  }, [nodes, edges, getTypesinFlow]);

  /**
   * Applies custom changes to the nodes.
   * If there is only one change of type "position" with dragging enabled and a position,
   * it calculates helper lines and updates the position with the snap position if available.
   *
   * @callback customApplyNodeChanges
   * @param {NodeChange[]} changes - The array of node changes to apply.
   * @param {Node[]} nodes - The array of nodes.
   * @returns {Node[]} - The updated array of nodes.
   */
  const customApplyNodeChanges = useCallback((changes, nodes) => {
    setHelperLineHorizontal(undefined);
    setHelperLineVertical(undefined);
    if (
      changes.length === 1 &&
      changes[0].type === "position" &&
      changes[0].dragging &&
      changes[0].position
    ) {
      const helperLines = getHelperLines(changes[0], nodes);
      changes[0].position.x =
        helperLines.snapPosition.x ?? changes[0].position.x;
      changes[0].position.y =
        helperLines.snapPosition.y ?? changes[0].position.y;
      setHelperLineHorizontal(helperLines.horizontal);
      setHelperLineVertical(helperLines.vertical);
    }
    return applyNodeChanges(changes, nodes);
  }, []);

  /**
   * Handles the change event for nodes.
   * Applies custom changes to the nodes.
   *
   * @callback onNodesChange
   * @param {NodeChange[]} changes - The array of node changes to apply.
   * @returns {void}
   */
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nodes) => customApplyNodeChanges(changes, nodes));
    },
    [setNodes, customApplyNodeChanges]
  );

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
              eds
            );
          } else {
            return addEdge(eds);
          }
        });
      }
      takeSnapshot();
    },
    [setEdges, nodes, takeSnapshot]
  );

  /**
   * Handles the update event for an edge.
   * Takes a snapshot and updates the edges.
   *
   * @callback onEdgeUpdate
   * @param {Edge} oldEdge - The old edge.
   * @param {Connection} newConnection - The new connection.
   * @returns {void}
   */
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      takeSnapshot();
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [takeSnapshot, setEdges]
  );

  /**
   * Handles the onDrop event.
   *
   * @param {Object} event - The onDrop event object.
   * @return {void}
   */
  const onDrop = useCallback(
    (event) => {
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
        let ids = uuidv4();
        const newNode = {
          id: ids,
          type: nodeDetails,
          position,

          T_parentId: groupNode ? groupNode?.id : ids,
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
          },
          style: nodeStyle,
        };
        if (groupNode) {
          // if we drop a node on a group node, we want to position the node inside the group
          newNode.position = getNodePositionInsideParent(
            {
              position,
              width: 40,
              height: 40,
            },
            groupNode
          ) ?? { x: 0, y: 0 };
          newNode.parentNode = groupNode?.id;
          newNode.expandParent = true;
        }
        const sortedNodes = store
          .getState()
          .getNodes()
          .concat(newNode)
          .sort(sortNodes);
        setNodes(sortedNodes);
        takeSnapshot();

        // setNodes((nds) => nds.concat(newNode));
      } catch (err) {
        showErr(err);
      }
    },
    [
      reactFlowInstance,
      setNodes,
      nodes,
      typesInFlow,
      defaultsMode,
      getIntersectingNodes,
      store,
      takeSnapshot,
    ]
  );

  /**
   * Handles the drag stop event for a node.
   * If the node intersects with a group node, it moves the node to the group node.
   *
   * @callback onNodeDragStop
   * @param {Event} event - The drag stop event.
   * @param {Node} node - The node being dragged.
   * @returns {void}
   */
  const onNodeDragStop = useCallback(
    (_, node) => {
      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === "group"
      );
      const groupNode = intersections[0];
      if (intersections.length && node.parentNode !== groupNode?.id) {
        const nextNodes = store
          .getState()
          .getNodes()
          .map((n) => {
            if (n.id === groupNode.id) {
              return {
                ...n,
                className: "",
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
                extent: "parent",
              };
            }
            return n;
          })
          .sort(sortNodes);
        setNodes(nextNodes);
      }
    },
    [getIntersectingNodes, setNodes, store]
  );

  /**
   * Handles the drag event for a node.
   * Updates the class name of the group node and the position of the dragged node.
   *
   * @callback onNodeDrag
   * @param {Event} event - The drag event.
   * @param {Node} node - The node being dragged.
   * @returns {void}
   */
  const onNodeDrag = useCallback(
    (_, node) => {
      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === "group"
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
              };
            } else if (n.id === node.id) {
              return {
                ...n,
                position: node.position,
              };
            }
            return { ...n };
          })
        );
      });
    },
    [getIntersectingNodes, setNodes]
  );

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

  useEffect(() => {
    setNodes([]);
  }, [defaultsMode, setNodes]);

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

  return (
    <div
      className="TNR-main"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: darkmode ? "#121212" : "#E9E8E8",
      }}
    >
      <Toast ref={toast} />
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodesChange={onNodesChange}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={NODE_TYPE}
        onInit={setReactFlowInstance}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView={false}
        panOnDrag={false}
        nodesConnectable={defaultsMode === "SingleNode" ? false : true}
        onEdgeUpdate={onEdgeUpdate}
        selectNodesOnDrag={false}
        onlyRenderVisibleElements={false}
        panOnScroll={true}
        zoomOnScroll={false}
        preventScrolling={false}
        zoomOnPinch={false}
        autoPanOnNodeDrag={false}
        snapGrid={[15, 15]}
        snapToGrid={true}
        nodesDraggable={true}
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
          sendDataToDefault={getDataFromNavBar}
          getDataFromDefault={sendDataToNavBar}
          fabricsList={fabricslist}
          setDefaultsMode={setDefaultsMode}
          defaultsMode={defaultsMode}
        />
        <MiniMap />
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
          />
        )}
        <Background variant="dots" />
        <HelperLines
          horizontal={helperLineHorizontal}
          vertical={helperLineVertical}
        />
      </ReactFlow>
    </div>
  );
}
