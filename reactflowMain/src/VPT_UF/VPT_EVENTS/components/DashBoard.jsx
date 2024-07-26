import {
  useCallback,
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ReactFlow, {
  Background,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { PiMapTrifoldBold } from "react-icons/pi";
import { GiCircularSaw } from "react-icons/gi";
import styles from "./styles.module.css";
import { Accordion, AccordionItem, Button, Slider } from "@nextui-org/react";
import {
  GroupNode,
  ControlNode,
  EventNode,
  HandlerNode,
  ResponseNode,
} from "./DynamicNodes";
import ContextMenu from "./ContextMenu/ContextMenu";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { AnimatePresence, motion } from "framer-motion";
import { MinimapComponent } from "./ContextMenu/Minimap/Minimap";
import { TorusModellerContext } from "../../../Layout";

const proOptions = { account: "paid-pro", hideAttribution: true };

const nodeOrigin = [0.5, 0.5];

const defaultEdgeOptions = { style: { stroke: "#ff66aa", strokeWidth: 3 } };

/**
 * Renders the event dashboard component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.data - The data for the component.
 * @param {Object} props.currentDrawing - The current drawing.
 * @param {Function} props.sendData - The function to send data.
 * @return {JSX.Element} The rendered event dashboard component.
 */
export function EventDashBoard({
  nodes,
  edges,
  setEdges,
  setNodes,
  onNodesChange,
  onEdgesChange,
  children,
  currentDrawing = "UF",
}) {
  const { getNode } = useReactFlow();
  const { screenToFlowPosition } = useReactFlow();
  const { ref, onNodeContextMenu, onPaneClick } =
    useContext(TorusModellerContext);
  const [nodeConfig, setNodeConfig] = useState([]);
  // const [strength, setStrength] = useState(-1000);
  // const [distance, setDistance] = useState(750);
  const [menu, setMenu] = useState(null);

  const [uniqueNames, setUniqueNames] = useState([]);
  const [nodeData, setNodeData] = useState(null);
  const [mainSequence, setMainSequence] = useState(0);
  const { darkMode } = useContext(DarkmodeContext);
  const [miniMapOpn, setMinimapOpn] = useState(true);

  const NODE_TYPES = useMemo(
    () => ({
      groupNode: GroupNode,
      controlNode: ControlNode,
      eventNode: EventNode,
      handlerNode: HandlerNode,
      responseNode: ResponseNode,
    }),
    [],
  );

  /**
   * Validates the children of a node against an event name.
   *
   * @param {Object} node - The node to validate.
   * @param {string} eventName - The event name to validate against.
   * @return {boolean} Returns true if the node has children and the event name does not exist, otherwise false.
   */
  const validateChildern = useCallback(
    (node, eventName) => {
      try {
        let isValid = true;
        node?.data?.children &&
          node?.data?.children.length > 0 &&
          node.data.children.map((child) => {
            const childNode = getNode(child);

            if (childNode && childNode.data.label === eventName) {
              isValid = false;
              return child;
            }
            return child;
          });

        return isValid;
      } catch (error) {
        console.error(error);
      }
    },
    [getNode],
  );

  /**
   * Adds a node on drop with parent.
   *
   * @param {Object} node - The node to add.
   * @param {string} eventName - The event name to validate against.
   * @return {void}
   *
   * */
  const addNodeOnDropWithParent = useCallback(
    (node, eventName) => {
      try {
        if (!node) return;
        const valitateChild = validateChildern(node, eventName);
        if (valitateChild) {
          let sequenceArr = [];
          if (node.data.children.length > 0) {
            sequenceArr =
              node.data.children &&
              node.data.children.length > 0 &&
              node.data.children.map((elem) => {
                return elem.split(".").slice(1).join(".");
              });
          }

          const maxValue = Math.max(...sequenceArr);
          const incrementLastDigit = (num) => {
            const numStr = num.toString();
            const lastDigitIndex = numStr.length - 1;
            const lastDigit = parseInt(numStr[lastDigitIndex], 10);
            const newLastDigit = (lastDigit + 1) % 10;
            return parseFloat(numStr.slice(0, lastDigitIndex) + newLastDigit);
          };
          const newChildId = incrementLastDigit(maxValue);
          let childId = `${node.id}.${newChildId}`;
          const childNode = {
            id: `${node.id}.${newChildId}`,
            type: "eventNode",
            position: {
              x: node.position.x + Math.random() * (150 - 100) + 100,
              y: Math.random() * (400 - 300) + 300,
            },
            data: {
              label: eventName,
              sequence: childId.split(".").splice(1).join("."),
              parentId: node.id,
              children: [],
              nodeProperty: {},
            },
            className: styles.node,
          };
          node = {
            ...node,
            data: {
              ...node.data,
              children: [...node.data.children, `${node.id}.${newChildId}`],
            },
          };
          const childEdge = {
            id: `${node.id}->${node.id}.${newChildId}`,
            source: node.id,
            type: "straight",
            target: `${node.id}.${newChildId}`,
          };

          setNodes((nds) => [...nds, node, childNode]);
          setEdges((eds) => [...eds, childEdge]);
        } else {
          alert("Event already exists");
        }
      } catch (error) {
        console.error(error);
      }
    },

    [setNodes, setEdges, validateChildern],
  );

  /**
   * Handles the connection event.
   *
   * @param {Object} params - The parameters for the connection.
   * @return {void}
   */
  const onConnect = useCallback(
    (params) => {
      try {
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              type: "straight",
            },
            eds,
          ),
        );
      } catch (error) {
        console.error(error);
      }
    },
    [setEdges],
  );

  useEffect(() => {
    try {
      if (nodes && nodes?.length > 0) {
        let uniqNameArray = [];
        for (let node of nodes) {
          if (!uniqNameArray.includes(node.data.label)) {
            uniqNameArray.push(node.data.label);
          }
        }
        setUniqueNames(uniqNameArray);
      }
    } catch (error) {
      console.error(error);
    }
  }, [nodes]);

  /**
   * Handles the dragover event on the component.
   *
   * @param {Event} event - The dragover event.
   * @return {void}
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Handles the drop event on the component.
   *
   * @param {Event} event - The drop event.
   * @return {void}
   */
  const onDrop = useCallback(
    (event) => {
      try {
        event.preventDefault();

        const eventName = event.dataTransfer.getData("application/eventName");
        const parentNode = JSON.parse(
          event.dataTransfer.getData("application/parentNode"),
        );
        let parentGroupNode = event.dataTransfer.getData(
          "application/parentGroupNode",
        );

        if (parentGroupNode) parentGroupNode = JSON.parse(parentGroupNode);

        const node = getNode(parentNode.nodeId);
        if (parentGroupNode) {
          let parentGroup = getNode(parentGroupNode?.nodeId);

          if (!eventName || !parentNode) {
            return;
          }

          const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
          if (!parentGroup) {
            let parentIds = parentGroupNode.nodeId;

            let parentGroupNodes = {
              id: parentIds,
              type: "groupNode",
              position,
              data: {
                ...parentGroupNode,
                children: [],
                sequence: "1",
                nodeProperty: {},
              },
            };

            let parentGroupToNode = {
              id: parentIds + "->" + parentNode.nodeId,
              source: parentIds,
              type: "straight",
              target: parentNode.nodeId,
            };

            let ids = parentNode.nodeId;
            let newChildId = "1.1.1";
            let newNode = {
              id: ids,
              type: "controlNode",
              position: {
                x: parentGroupNodes.position.x + 300,
                y: parentGroupNodes.position.y + 300,
              },
              data: {
                ...parentNode,
                children: [],
                sequence: "1.1",
                nodeProperty: {},
              },
            };

            parentGroupNodes = {
              ...parentGroupNodes,
              data: {
                ...parentGroupNodes.data,
                children: [...parentGroupNodes.data.children, newNode.id],
              },
            };
            const childNode = {
              id: `${newNode.id}.${newChildId}`,
              type: "eventNode",
              position: {
                x: newNode.position.x + 300,
                y: newNode.position.y + 300,
              },
              data: {
                label: eventName,
                sequence: newChildId,
                parentId: newNode.id,
                children: [],
                nodeProperty: {},
              },
              className: styles.node,
            };

            const childEdge = {
              id: `${newNode.id}->${newNode.id}.${newChildId}`,
              source: newNode.id,
              type: "straight",
              target: `${newNode.id}.${newChildId}`,
            };

            newNode = {
              ...newNode,
              data: {
                ...newNode.data,
                children: [
                  ...newNode.data.children,
                  `${newNode.id}.${newChildId}`,
                ],
              },
            };

            setNodes((nds) => [...nds, parentGroupNodes, newNode, childNode]);
            setEdges((eds) => [...eds, parentGroupToNode, childEdge]);
          } else {
            if (!parentGroup.data.children.includes(parentNode.nodeId)) {
              let ids = parentNode.nodeId;
              let lastSequence = parseInt(
                getNode(
                  parentGroup.data.children[
                    parentGroup.data.children.length - 1
                  ],
                ).data.sequence.split(".")[1],
                10,
              );

              let newChildId = `${parentGroup.data.sequence}.${lastSequence + 1}.1`;
              let newNode = {
                id: ids,
                type: "controlNode",
                position,
                data: {
                  ...parentNode,
                  children: [],
                  nodeProperty: {},
                  sequence: `${parentGroup.data.sequence}.${lastSequence + 1}`,
                },
              };

              parentGroup = {
                ...parentGroup,
                data: {
                  ...parentGroup.data,
                  children: [...parentGroup.data.children, newNode.id],
                },
              };

              let parentToNodeEdge = {
                id: parentGroup.id + "->" + parentNode.nodeId,
                source: parentGroup.id,
                type: "straight",
                target: parentNode.nodeId,
              };
              const childNode = {
                id: `${newNode.id}.${newChildId}`,
                type: "eventNode",
                position: {
                  x: newNode.position.x + 300,
                  y: newNode.position.y + 300,
                },
                data: {
                  label: eventName,
                  sequence: newChildId,
                  parentId: newNode.id,
                  children: [],
                  nodeProperty: {},
                },
                className: styles.node,
              };

              const childEdge = {
                id: `${newNode.id}->${newNode.id}.${newChildId}`,
                source: newNode.id,
                type: "straight",
                target: `${newNode.id}.${newChildId}`,
              };

              newNode = {
                ...newNode,
                data: {
                  ...newNode.data,
                  children: [
                    ...newNode.data.children,
                    `${newNode.id}.${newChildId}`,
                  ],
                },
              };

              setNodes((nds) => [
                ...nds.filter((n) => n.id !== parentGroup.id),
                parentGroup,
                newNode,
                childNode,
              ]);
              setEdges((eds) => [...eds, parentToNodeEdge, childEdge]);
            } else {
              addNodeOnDropWithParent(node, eventName);
            }
          }
        } else {
          if (!eventName || !parentNode) {
            return;
          }

          // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
          // and you don't need to subtract the reactFlowBounds.left/top anymore
          // details: https://reactflow.dev/whats-new/2023-11-10
          if (!node) {
            const position = screenToFlowPosition({
              x: event.clientX,
              y: event.clientY,
            });
            let ids = parentNode.nodeId;

            let sequence = 1;
            nodes.forEach((node) => {
              if (Number.isInteger(node.data.sequence)) {
                sequence = sequence + 1;
              }
            });
            let newChildId = `${sequence}.1`;
            let newNode = {
              id: ids,
              type:
                parentNode.nodeType !== "group" ? "controlNode" : "groupNode",
              position,
              data: {
                ...parentNode,
                label: parentNode.nodeName,
                children: [],
                sequence: sequence,
                nodeProperty: {},
              },
            };
            const childNode = {
              id: `${newNode.id}.${newChildId}`,
              type: "eventNode",
              position: {
                x: newNode.position.x + Math.random() * (150 - 100) + 100,
                y: newNode.position.y + Math.random() * (150 - 100) + 100,
              },
              data: {
                label: eventName,
                sequence: newChildId,
                parent: newNode.id,
                children: [],
                nodeProperty: {},
              },
              className: styles.node,
            };

            const childEdge = {
              id: `${newNode.id}->${newNode.id}.${newChildId}`,
              source: newNode.id,
              type: "straight",
              target: `${newNode.id}.${newChildId}`,
            };

            newNode = {
              ...newNode,
              data: {
                ...newNode.data,
                children: [
                  ...newNode.data.children,
                  `${newNode.id}.${newChildId}`,
                ],
              },
            };
            setMainSequence(mainSequence + 1);
            setNodes((nds) => [...nds, newNode, childNode]);
            setEdges((eds) => [...eds, childEdge]);
          }
          addNodeOnDropWithParent(node, eventName);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      nodes,
      getNode,
      addNodeOnDropWithParent,
      mainSequence,
      setMainSequence,
      setEdges,
      setNodes,
      screenToFlowPosition,
    ],
  );

  /**
   * Sets the node data in the state.
   *
   * @param {Object} node - The node object.
   * @param {string} id - The id of the node.
   * @return {Promise<void>} - A promise that resolves when the node data is set.
   **/
  const setSidebar = async (node, id) => {
    try {
      setNodeData(node);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Updates the node details.
   *
   * @param {Object} data - The data object containing the key-value pair to be updated.
   * @return {void} This function does not return anything.
   */
  const updatenodeDetails = (data) => {
    try {
      let key = Object.keys(data)[0];
      let value = Object.values(data)[0];

      setNodes((nds) => {
        return (
          nds &&
          nds.map((nds) => {
            if (nds.id === nodeData.id) {
              if (key === "label") {
                return {
                  ...nds,
                  data: {
                    ...nds.data,
                    label: value,
                  },
                };
              } else if (key === "type") {
                return {
                  ...nds,
                  [key]: value,
                };
              } else {
                return nds;
              }
            }

            return nds;
          })
        );
      });

      setNodeData((nds) => {
        if (key === "label") {
          return {
            ...nds,
            data: {
              ...nds.data,
              label: value,
            },
          };
        } else {
          return nds;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updates the configuration of a node.
   *
   * @param {string} id - The ID of the node.
   * @param {string} key - The key of the configuration property to update.
   * @param {Object} metadata - Additional metadata to update.
   * @param {any} data - The new value for the configuration property.
   * @return {void} This function does not return anything.
   */
  const updatedNodeConfig = (id, key, metadata, data) => {
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
                    [key]: data,
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
                    [key]: data,
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
          return {
            ...prev,
            data: {
              ...prev.data,
              nodeProperty: {
                ...prev.data.nodeProperty,
                ...metadata,
                [key]: data,
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

  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={proOptions}
      onConnect={onConnect}
      nodeOrigin={nodeOrigin}
      defaultEdgeOptions={defaultEdgeOptions}
      onDrop={onDrop}
      onDragOver={onDragOver}
      nodeTypes={NODE_TYPES}
      onPaneClick={onPaneClick}
      onNodeContextMenu={onNodeContextMenu}
    >
      {children &&
        (typeof children === "function"
          ? children({ setSidebar, updatenodeDetails, updatedNodeConfig })
          : children)}
      {/* <Panel
        position="top-right"
        className={darkMode ? "bg-[#323232]" : "bg-[#eeeeee]"}
      >
        <Accordion
          variant="shadow"
          className="flex max-h-[300px] w-full max-w-[200px] flex-col gap-1"
          itemClasses={{
            base: "py-0 w-[75%] h-[500px] bg-transparent border-0",
            title: darkMode
              ? "font-normal text-small text-black font-bold whitespace-nowrap"
              : "font-normal text-small text-black font-bold whitespace-nowrap",
            trigger:
              "py-0 data-[hover=true]:bg-pink-500 bg-blue-500 rounded-lg h-14 flex items-center",
            indicator: "text-large",
            content: "text-small px-1 ml-[-2px] py-0",
          }}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          <AccordionItem
            expanded={true}
            indicator={
              <GiCircularSaw
                className="text font-bolder text-xl"
                color="blue-500"
              />
            }
            title="Strength Distance"
            classNames={{
              base: "py-0 w-full ml-[-20px]  bg-pink-500 border-0",
              heading: "py-0 bg-transparent border-0",
              trigger:
                "px-1 py-0 data-[hover=true]:bg-default-200 bg-transparent rounded-lg h-14 flex items-center",
            }}
            className="border-0 bg-transparent p-2"
          >
            <div className="ml-[-10px] flex w-[200px] flex-col items-center justify-center gap-2">
              <div className="ml-[-20px] p-2">
                <Slider
                  size="sm"
                  // onChange={(e) => setStrength(e)}
                  label="Strength"
                  step={100}
                  maxValue={0}
                  minValue={-2000}
                  defaultValue={-2000}
                  hideValue={false}
                  className="w-full"
                  classNames={{
                    base: "max-w-sm",
                    filler: darkMode ? "bg-[#5080BC]" : "bg-[#3F8AE5]",
                    labelWrapper: "mb-2 ",
                    label: darkMode
                      ? "font-medium text-gray-700 text-small"
                      : "font-small text-gray-700 text-small",
                    value: darkMode
                      ? "font-small text-gray-700 text-small"
                      : "font-small text-gray-700 text-small",
                    track: "border-1-slate-100",
                    trackWrapper: "w-[100px]",
                  }}
                  showTooltip={true}
                  showOutline={true}
                  tooltipProps={{
                    offset: 10,
                    placement: "bottom",
                    classNames: {
                      base: darkMode
                        ? [
                            "before:bg-gradient-to-r before:from-[#3F8AE5] before:to-[#0000]",
                          ]
                        : [
                            "before:bg-gradient-to-r before:from-[#3F8AE5] before:to-[#0000]",
                          ],
                      content: darkMode
                        ? [
                            "py-2 shadow-xl",
                            "text-white bg-gradient-to-r from-[#3F8AE5] to-gray-900",
                          ]
                        : [
                            "py-2 shadow-xl",
                            "text-white bg-gradient-to-r from-[#3F8AE5] to-gray-900",
                          ],
                    },
                  }}
                  renderThumb={(props) => (
                    <div
                      {...props}
                      className={`group top-1/2  p-[6px] ${darkMode ? "bg-gradient-to-br from-[#3F8AE5] to-slate-500" : "bg-gradient-to-tr from-[#d8dce2] to-slate-50"} border-1 ${darkMode ? "border border-slate-950" : "border border-blue-500"}  cursor-grab rounded-full shadow-medium data-[dragging=true]:cursor-grabbing`}
                    >
                      <span className="block h-4 w-3 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-500 shadow-small transition-transform group-data-[dragging=true]:scale-100" />
                    </div>
                  )}
                />
              </div>
              <div className="ml-[-20px] p-2">
                <Slider
                  radius="full"
                  size="sm"
                  // onChange={(e) => setDistance(e)}
                  label="Distance"
                  hideValue={false}
                  maxValue={1000}
                  minValue={0}
                  defaultValue={1000}
                  className="w-full"
                  classNames={{
                    base: "max-w-sm",
                    filler: darkMode ? "bg-[#5080BC]" : "bg-[#3F8AE5]",
                    labelWrapper: "mb-2",
                    label: darkMode
                      ? "font-medium text-gray-700 text-medium"
                      : "font-medium text-gray-700 text-medium",
                    value: darkMode
                      ? "font-medium text-gray-700 text-small"
                      : "font-medium text-gray-700 text-medium",
                    track: "border-1-slate-100",
                    trackWrapper: "w-[100px]",
                  }}
                  showTooltip={true}
                  showOutline={true}
                  tooltipProps={{
                    offset: 10,
                    placement: "bottom",
                    classNames: {
                      base: darkMode
                        ? [
                            "before:bg-gradient-to-r before:from-[#3F8AE5] before:to-[#0000]",
                          ]
                        : [
                            "before:bg-gradient-to-r before:from-[#3F8AE5] before:to-[#0000]",
                          ],
                      content: darkMode
                        ? [
                            "py-2 shadow-xl",
                            "text-white bg-gradient-to-r from-[#3F8AE5] to-gray-900",
                          ]
                        : [
                            "py-2 shadow-xl",
                            "text-white bg-gradient-to-r from-[#3F8AE5] to-gray-900",
                          ],
                    },
                  }}
                  renderThumb={(props) => (
                    <div
                      {...props}
                      className={`group top-1/2  p-[6px] ${darkMode ? "bg-gradient-to-br from-[#3F8AE5] to-slate-500" : "bg-gradient-to-tr from-[#d8dce2] to-slate-50"} border-1 ${darkMode ? "border border-slate-950" : "border border-blue-500"}  cursor-grab rounded-full shadow-medium data-[dragging=true]:cursor-grabbing`}
                    >
                      <span className="block h-4 w-3 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-500 shadow-small transition-transform group-data-[dragging=true]:scale-100" />
                    </div>
                  )}
                />
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </Panel>

      {!miniMapOpn && (
        <Button
          className="absolute bottom-3 right-3 z-50 w-1 rounded-md bg-[#333334]  p-1 "
          onPress={() => setMinimapOpn(true)}
          isIconOnly
        >
          <PiMapTrifoldBold color={darkMode ? "white" : "black"} />
        </Button>
      )}

      {miniMapOpn && (
        <Button
          className={
            darkMode
              ? "absolute bottom-[180px] right-0 z-50 w-[5px] cursor-pointer rounded-full bg-[#333334]"
              : "absolute bottom-[180px] right-0 z-50 w-[5px] cursor-pointer rounded-full bg-[#E4E3E3]"
          }
          onClick={() => setMinimapOpn(false)}
          isIconOnly
        >
          <IoMdCloseCircleOutline
            color={darkMode ? "white" : "black"}
            size={25}
          />
        </Button>
      )}

      <AnimatePresence>
        {miniMapOpn && (
          <motion.div
            className="z-2000"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MiniMap
              maskColor={darkMode ? "#333334" : "#E4E3E3"}
              className="rounded-md"
              nodeComponent={MinimapComponent}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Background
        variant="dots"
        gap={25}
        size={1.8}
        color={darkMode ? "#ccc" : "black"}
      />
      {menu && (
        <ContextMenu
          uniqueNames={uniqueNames}
          setMenu={setMenu}
          menu={menu}
          {...menu}
          currentDrawing={currentDrawing}
          changeProperty={updatenodeDetails}
          setToogle={setSidebar}
          updatedNodeConfig={updatedNodeConfig}
          nodeConfig={nodeConfig}
          nodeData={nodeData}
        />
      )} */}
    </ReactFlow>
  );
}
