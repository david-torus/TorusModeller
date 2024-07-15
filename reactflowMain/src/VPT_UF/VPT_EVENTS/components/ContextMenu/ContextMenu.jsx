import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReactFlow } from "reactflow";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Divider, Tooltip } from "@nextui-org/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styles from "../styles.module.css";
import { eventSourceNodesJsonContext } from "../EventDisplay";
import { Tabs, Tab } from "@nextui-org/react";
import { Dialog } from "primereact/dialog";
import { IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import {
  ElementInfo,
  RaiseAndListenIcon,
  RiseIcon,
  SelfIcon,
  SourceIcon,
} from "../../../../asset/SvgsApplication";
import { Toast } from "primereact/toast";
import { Upload } from "../../../../commonComponents/Model/UploadJson";
import Builder from "../../../../VPT_DJUI/builder";
import { DarkmodeContext } from "../../../../commonComponents/context/DarkmodeContext";
import {
  cardUIPolicy,
  colorPolicy,
  controlPolicy,
} from "../../../../commonComponents/utils/util";
import ReusableDropDown from "../../../../commonComponents/reusableComponents/ReusableDropDown";
import ReusableInput from "../../../../commonComponents/reusableComponents/ReusableInput";
export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  uniqueNames,
  setMenu,
  currentDrawing,
  changeProperty,
  setToogle,
  updatedNodeConfig,
  nodeConfig,
  nodeData,
  menu,
  ...props
}) {
  const eventJson = useContext(eventSourceNodesJsonContext);
  const { getNode, setNodes, setEdges, getNodes, getEdges } =
    useReactFlow();
  const [editedHeader, setEditedHeader] = useState("");
  const [toogleInputNameEdit, setToogleInputNameEdit] = useState(false);
  const [isOpen, onOpenChange] = useState(false);
  const [DropdownData, setDropdownData] = useState([]);
  // const [selectedListener, setSelectedListener] = useState(new Set([""]));
  const [clickedGroup, setClickedGroup] = useState([]);
  // const [showEvents, setShowEvents] = useState(false);
  // const [clickedJson, setClickedJson] = useState(null);
  const [visible, setVisible] = useState({
    bool: false,
    type: "",
  });
  const responsedata = ["defaults", "success", "fail"];
  const [selectedResponseData, setSelectedResponseData] = useState("defaults");
  const { darkmode } = useContext(DarkmodeContext);
  const [files, setFiles] = useState(null);
  const toast = useRef(null);
  const [nodeInfo, setNodeInfo] = useState(null);
  const activeTab = "";
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [rendervalue, setRendervalue] = useState(null);
  const [currentModel, setCurrentModel] = useState(null);
  const [json, setJson] = useState({});

  const [opensideTab, setOpensideTab] = useState(false);

  

  const node = getNode(id);
  const nodes = getNodes();
  const edges = getEdges();

  useEffect(() => {
    setNodeInfo({
      nodeInfoTabs: {
        PF: [],
        UF: [
          {
            label: "Params",
            icon: <ElementInfo />,
            modelOpen: "Params",
          },
          {
            label: "StateTransitionTable",
            icon: <SourceIcon />,
            modelOpen: "STT",
          },
          {
            label: "StateTransitionStreams",
            icon: <SourceIcon />,
            modelOpen: "STS",
          },
        ],
        DF: [],
      },
    });
  }, []);

  useEffect(() => {
    try {
      if (files) {
        updatedNodeConfig(
          node.id,
          rendervalue,
          {
            nodeId: node.id,
            nodeName: node.data.label,
            nodeType: node.type,
          },
          {
            ...JSON.parse(files),
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [files,node.id, node.data.label, node.type, rendervalue, updatedNodeConfig]);

  useEffect(() => {
    const handleOutsideClick = () => {
      setContextMenuVisible(false);
    };

    if (contextMenuVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [
    contextMenuVisible,
    node.data.label,
    node.id,
    node.type,
    rendervalue,
    updatedNodeConfig,
  ]);

  /**
   * Handles the context menu event and sets the context menu position.
   *
   * @param {Event} e - The context menu event.
   * @param {any} value - The value passed to the context menu.
   * @return {void} This function does not return a value.
   */
  const handleContextMenu = (e, value) => {
    e.preventDefault();

    setRendervalue(value);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setContextMenuVisible(true);
  };

  /**
   * Handles the opening of a modal based on the provided flow type.
   *
   * @param {string} flowType - The type of flow to open the modal for.
   * @param {boolean} [isDockey=false] - Indicates whether the flow is a docky flow.
   * @param {Object} [flow] - The flow object to use.
   * @return {Promise<void>} A promise that resolves when the modal is opened.
   */
  const handleOpenModal = async (flowType, isDockey = false, flow) => {
    try {
      
      setCurrentModel(flowType);
      if (currentDrawing !== "DF") {
        if (nodeData) {
          if (nodeData.data.nodeProperty.hasOwnProperty(flowType)) {
            setOpensideTab(true);
            setJson(nodeData.data.nodeProperty[flowType]);
          } else {
            setOpensideTab(true);
            setJson(nodeData.data.nodeProperty[flowType]);
          }
        }

        // if (nodeConfig && nodeConfig.hasOwnProperty(id)) {
        //   if (nodeConfig[id].hasOwnProperty(flowType)) {
        //     setToggle(!toggle);
        //     setJson(nodeConfig[id][flowType]);
        //   }
        // }
      }
    } catch (error) {
      console.error("error in Loading handleopenjson");
    }
  };

  console.log(opensideTab, "opensideTab");

  /**
   * Updates the JSON object with the provided JSON.
   *
   * @param {Object} js - The JSON object to update.
   * @return {void} This function does not return a value.
   */
  const updatejson = (js) => {
    try {
      setJson(js);
    } catch (err) {
      console.error("error in updating json");
    }
  };

  /**
   * Renders a Builder component based on the provided model and JSON configuration.
   *
   * @param {Object} propw - The props object containing the necessary configuration for the Builder component.
   * @param {Object} model - The model object used to determine the UI policy for the Builder component.
   * @param {Object} js - The JSON object used as the default configuration for the Builder component.
   * @return {JSX.Element|null} The rendered Builder component or null if an error occurred.
   */
  const handleRender = (propw, model, js) => {
    try {
      let ConfigToRender;
      if (model) {
        ConfigToRender = (
          <Builder
          key={model}
            isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
            defaultJSOn={js}
            controlPolicy={controlPolicy}
            colorPolicy={colorPolicy}
            updatedNodeConfig={updatejson}
            uiPolicy={cardUIPolicy}
            showError={showError}
            helperJson={{}}

          />
        );
      } else {
        ConfigToRender = (
          <Builder
            isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
            defaultJSOn={js}
            controlPolicy={controlPolicy}
            colorPolicy={colorPolicy}
            updatedNodeConfig={updatejson}
            uiPolicy={cardUIPolicy}
            showError={showError}
            helperJson={{}}
          />
        );
      }
      return ConfigToRender;
    } catch (error) {
      console.error("Something went wrong on handle render");
    }
  };


  //function used to
  const risenode = useCallback(
    (type, nodeType, resdata) => {
      try {
        if (node?.type === "rise") return;

        let cuurrentNode = getNode(node.id);
        if (type === "rise") {
          const maxChildId = nodes.reduce((initialId, currentNode) => {
            if (currentNode.id.startsWith(`${node.id}.`)) {
              const hasChild = currentNode.id.split(".");
              const lastChild = hasChild[hasChild.length - 1];
              const childId = parseInt(lastChild, 10);
              return childId;
            }
            return initialId;
          }, 0);
          const newChildId = maxChildId + 1;
          let childId = `${node.id}.${newChildId}`;
          let seq = childId.split(".").splice(1).join(".");
          let validateSuccess = false;
          let validateFailure = false;
          cuurrentNode &&
            cuurrentNode.data.children.length > 0 &&
            getNodes().map((elem) => {
              if (node.data.children.includes(elem.id)) {
                if (
                  elem.data.responseType === "success" &&
                  resdata === "success"
                ) {
                  validateSuccess = true;
                  alert("success exists");
                  return elem;
                } else if (
                  elem.data.responseType === "fail" &&
                  resdata === "fail"
                ) {
                  validateFailure = true;
                  alert("fail exists");
                  return elem;
                }
              }
              return elem;
            });
          let handlerNode;
          let handlerEdge;

          if (resdata) {
            if (resdata === "fail" && !validateFailure) {
              const failNode = {
                id: `${node.id}.${newChildId}`,
                type: "responseNode",
                position: {
                  x: node.position.x + Math.random() * (500 - 300) + 100,
                  y: node.position.y + Math.random() * (500 - 300) + 100,
                },

                data: {
                  label: "fail",
                  responseType: "fail",
                  parentId: node.id,
                  sequence: `${seq}`,
                  children: [],
                },
              };
              const failEdge = {
                id: `${node.id}->${failNode.id}`,
                source: node.id,
                type: "straight",
                target: failNode.id,
              };

              const handlerNode = {
                id: `${failNode.id}.1`,
                type: "handlerNode",
                position: {
                  x: failNode.position.x + Math.random() * (150 - 100) + 100,
                  y: failNode.position.y + Math.random() * (150 - 100) + 100,
                },
                data: {
                  label: "rise",
                  sequence: `${seq}.1`,
                  parentId: failNode.id,
                  children: [],
                },

                className: styles.node,
              };

              cuurrentNode = {
                ...cuurrentNode,
                data: {
                  ...cuurrentNode.data,
                  children: [...cuurrentNode.data.children, failNode.id],
                },
              };

              const handlerEdge = {
                id: `${failNode.id}->${failNode.id}.${newChildId}`,
                source: failNode.id,
                type: "straight",
                target: handlerNode.id,
              };

              failNode.data.children = [handlerNode.id];
              setNodes((nds) => [
                ...nds.filter((n) => n.id !== node.id),
                cuurrentNode,
                handlerNode,
                failNode,
              ]);
              setEdges((eds) => [...eds, handlerEdge, failEdge]);
            }

            if (resdata === "success" && !validateSuccess) {
              const successNode = {
                id: `${node.id}.${newChildId}`,
                type: "responseNode",
                position: {
                  x: node.position.x + Math.random() * (150 - 100) + 100,
                  y: node.position.y + Math.random() * (150 - 100) + 100,
                },

                data: {
                  label: "success",
                  responseType: "success",
                  parentId: node.id,
                  children: [],
                  sequence: `${seq}`,
                },
              };

              const handlerNode = {
                id: `${successNode.id}.1`,
                type: "handlerNode",
                position: {
                  x: successNode.position.x + Math.random() * (150 - 100) + 100,
                  y: successNode.position.y + Math.random() * (150 - 100) + 100,
                },
                data: {
                  label: "rise",
                  sequence: `${seq}.1`,
                  parentId: successNode.id,
                  children: [],
                },

                className: styles.node,
              };

              cuurrentNode = {
                ...cuurrentNode,
                data: {
                  ...cuurrentNode.data,
                  children: [...cuurrentNode.data.children, successNode.id],
                },
              };

              const handlerEdge = {
                id: `${successNode.id}->${successNode.id}.${newChildId}`,
                source: successNode.id,
                type: "straight",
                target: handlerNode.id,
              };

              const successEdge = {
                id: `${node.id}->${successNode.id}`,
                source: node.id,
                type: "straight",
                target: successNode.id,
              };

              successNode.data.children = [handlerNode.id];

              setNodes((nds) => [
                ...nds.filter((n) => n.id !== node.id),
                cuurrentNode,
                handlerNode,
                successNode,
              ]);
              setEdges((eds) => [...eds, handlerEdge, successEdge]);
            }
            if (resdata === "defaults") {
              const handlerNode = {
                id: `${node.id}.${newChildId}`,
                type: "handlerNode",
                position: {
                  x: node.position.x + Math.random() * (150 - 100) + 100,
                  y: node.position.y + Math.random() * (150 - 100) + 100,
                },
                data: {
                  label: "rise",
                  sequence: `${seq}`,
                  parentId: node.id,
                  children: [],
                },

                className: styles.node,
              };

              cuurrentNode = {
                ...cuurrentNode,
                data: {
                  ...cuurrentNode.data,
                  children: [...cuurrentNode.data.children, handlerNode.id],
                },
              };

              const handlerEdge = {
                id: `${node.id}->${node.id}.${newChildId}`,
                source: node.id,
                type: "straight",
                target: `${node.id}.${newChildId}`,
              };

              setNodes((nds) => [
                ...nds.filter((n) => n.id !== node.id),
                cuurrentNode,
                handlerNode,
              ]);
              setEdges((eds) => [...eds, handlerEdge]);
            }
          } else {
            setNodes((nds) => [
              ...nds.filter((n) => n.id !== node.id),
              cuurrentNode,
              handlerNode,
            ]);
            setEdges((eds) => [...eds, handlerEdge]);
          }
        }

        if (type === "riseListen") {
          let isValidate = false;
          cuurrentNode &&
            cuurrentNode.data.children.length > 0 &&
            getNodes().map((elem) => {
              if (node.data.children.includes(elem.id)) {
                if (
                  elem.data.responseType === "success" &&
                  resdata === "success"
                ) {
                  alert("success exists");
                  isValidate = true;
                  return elem;
                } else if (
                  elem.data.responseType === "fail" &&
                  resdata === "fail"
                ) {
                  alert("fail exists");
                  isValidate = true;
                  return elem;
                }
              }
              return elem;
            });
          if (!isValidate) {
            onOpenChange(true);
          }
        }
        if (type === "self") {
          const maxChildId = nodes.reduce((initialId, currentNode) => {
            if (currentNode.id.startsWith(`${node.id}.`)) {
              const hasChild = currentNode.id.split(".");
              const lastChild = hasChild[hasChild.length - 1];
              const childId = parseInt(lastChild, 10);
              return childId > initialId ? childId : initialId;
            }
            return initialId;
          }, 0);
        
          const newChildId = maxChildId + 1;
          const childId = `${node.id}.${newChildId}`;
          const seq = childId.split(".").splice(1).join(".");
        
          let handlerNode;
          let handlerEdge;
        
          if (resdata === "fail") {
            const failNode = {
              id: `${node.id}.${newChildId}`,
              type: "responseNode",
              position: {
                x: node.position.x + Math.random() * (500 - 300) + 100,
                y: node.position.y + Math.random() * (500 - 300) + 100,
              },
              data: {
                label: "fail",
                responseType: "fail",
                parentId: node.id,
                sequence: `${seq}`,
                children: [],
              },
            };
        
            const failEdge = {
              id: `${node.id}->${failNode.id}`,
              source: node.id,
              type: "straight",
              target: failNode.id,
            };
        
            handlerNode = {
              id: `${failNode.id}.1`,
              type: "handlerNode",
              position: {
                x: failNode.position.x + Math.random() * (150 - 100) + 100,
                y: failNode.position.y + Math.random() * (150 - 100) + 100,
              },
              data: {
                label: "self",
                targetId: failNode.id,
                sequence: `${seq}.1`,
                parentId: failNode.id,
                children: [],
              },
              className: styles.node,
            };
        
            cuurrentNode = {
              ...cuurrentNode,
              data: {
                ...cuurrentNode.data,
                children: [...cuurrentNode.data.children, failNode.id],
              },
            };
        
            handlerEdge = {
              id: `${failNode.id}->${failNode.id}.${newChildId}`,
              source: failNode.id,
              type: "straight",
              target: handlerNode.id,
            };
        
            failNode.data.children = [handlerNode.id];
        
            setNodes((nds) => [
              ...nds.filter((n) => n.id !== node.id),
              cuurrentNode,
              handlerNode,
              failNode,
            ]);
            setEdges((eds) => [...eds, handlerEdge, failEdge]);
          } else if (resdata === "success") {
            const successNode = {
              id: `${node.id}.${newChildId}`,
              type: "responseNode",
              position: {
                x: node.position.x + Math.random() * (150 - 100) + 100,
                y: node.position.y + Math.random() * (150 - 100) + 100,
              },
              data: {
                label: "success",
                responseType: "success",
                parentId: node.id,
                children: [],
                sequence: `${seq}`,
              },
            };
        
            handlerNode = {
              id: `${successNode.id}.1`,
              type: "handlerNode",
              position: {
                x: successNode.position.x + Math.random() * (150 - 100) + 100,
                y: successNode.position.y + Math.random() * (150 - 100) + 100,
              },
              data: {
                label: "self",
                targetId: successNode.id,
                sequence: `${seq}.1`,
                parentId: successNode.id,
                children: [],
              },
              className: styles.node,
            };
        
            cuurrentNode = {
              ...cuurrentNode,
              data: {
                ...cuurrentNode.data,
                children: [...cuurrentNode.data.children, successNode.id],
              },
            };
        
            const handlerEdge = {
              id: `${successNode.id}->${successNode.id}.${newChildId}`,
              source: successNode.id,
              type: "straight",
              target: handlerNode.id,
            };
        
            const successEdge = {
              id: `${node.id}->${successNode.id}`,
              source: node.id,
              type: "straight",
              target: successNode.id,
            };
        
            successNode.data.children = [handlerNode.id];
        
            setNodes((nds) => [
              ...nds.filter((n) => n.id !== node.id),
              cuurrentNode,
              handlerNode,
              successNode,
            ]);
            setEdges((eds) => [...eds, handlerEdge, successEdge]);
          } else if (resdata === "defaults") {
            handlerNode = {
              id: `${node.id}.${newChildId}`,
              type: "handlerNode",
              position: {
                x: node.position.x + Math.random() * (150 - 100) + 100,
                y: node.position.y + Math.random() * (150 - 100) + 100,
              },
              data: {
                label: "self",
                targetId: node.id,
                sequence: `${seq}`,
                parentId: node.id,
                children: [],
              },
              className: styles.node,
            };
        
            cuurrentNode = {
              ...cuurrentNode,
              data: {
                ...cuurrentNode.data,
                children: [...cuurrentNode.data.children, handlerNode.id],
              },
            };
        
            const handlerEdge = {
              id: `${node.id}->${node.id}.${newChildId}`,
              source: node.id,
              type: "straight",
              target: `${node.id}.${newChildId}`,
            };
        
            setNodes((nds) => [
              ...nds.filter((n) => n.id !== node.id),
              cuurrentNode,
              handlerNode,
            ]);
            setEdges((eds) => [...eds, handlerEdge]);
          } else {
            setNodes((nds) => [...nds.filter((n) => n.id !== node.id), cuurrentNode]);
          }
        }
        
      } catch (error) {
        console.error(error);
      }
    },
    [node, setNodes, setEdges,getNode,getNodes,nodes]
  );

  const filterNodes = (nodes, parentId, id) => {
    try {
      const stack = [parentId];
      const visited = new Set();

      while (stack.length > 0) {
        const nodeId = stack.pop();

        if (visited.has(nodeId)) {
          continue;
        }
        visited.add(nodeId);

        const childrenIndexes = nodes
          .map((node, index) =>
            node.data &&
            (node.data.parent === nodeId || node.data.parentId === nodeId)
              ? index
              : -1
          )
          .filter((index) => index !== -1);
        stack.push(
          ...childrenIndexes.map((childIndex) => nodes[childIndex].id)
        );

        const nodeIndex = nodes.findIndex((node) => node.id === nodeId);
        if (nodeIndex !== -1) {
          nodes.splice(nodeIndex, 1);
        }
      }

      return nodes;
    } catch (error) {
      console.error(error);
    }
  };

  const filterEdges = (edges, remainingNodeIds) => {
    try {
      return edges.filter((edge) => {
        return (
          remainingNodeIds.includes(edge.source) &&
          remainingNodeIds.includes(edge.target)
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNodesAndEdges = (nodes, edges, prefix) => {
    try {
      const nod = getNode(prefix);
      let parentId = null;
      if (nod.data.hasOwnProperty("parentId")) {
        parentId = nod.data.parentId;
      }
      let remainingNodes = filterNodes(nodes, prefix);
      const remainingNodeIds = remainingNodes.map((node) => node.id);
      const remainingEdges = filterEdges(edges, remainingNodeIds);
      if (parentId) {
        remainingNodes =
          remainingNodes &&
          remainingNodes.length > 0 &&
          remainingNodes.map((node) => {
            if (node.id === parentId) {
              return {
                ...node,
                data: {
                  ...node.data,
                  children: node.data.children.filter(
                    (childId) => childId !== prefix
                  ),
                },
              };
            }
            return node;
          });
      }

      setNodes(remainingNodes);
      setEdges(remainingEdges);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHeaderChange = (e) => {
    try {
      if (
        uniqueNames.includes(e.target.value) &&
        e.target.value !== node?.data.label
      ) {
        e.target.value = "";
        return;
      } else {
        setEditedHeader(e.target.value);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const flatenEventJson = () => {
      try {
        let flatenJson = [];
  
        const flaten = (obj) => {
          let data = {};
          Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "object") {
              flaten(obj[key]);
            } else {
              if (key === "nodeName") {
                data = {
                  ...data,
                  label: obj[key],
                };
              }
              if (key === "nodeType") {
                data = {
                  ...data,
                  type: obj[key],
                };
              }
              if (key === "nodeId") {
                data = {
                  ...data,
                  key: obj[key],
                };
              }
            }
          });
  
          if (Object.keys(data).length) flatenJson.push(data);
        };
  
        flaten(eventJson);
  
        setDropdownData(flatenJson);
      } catch (error) {
        console.error(error);
      }
    };
  
    flatenEventJson();
  }, [eventJson]);
  

  const handleSelectedListener = (e, resdata) => {
    try {
      let parentNode = getNode(node.id);

      if (parentNode.data.parentId === e) {
        alert("cannot select parent");
        return;
      }
      let id = e;
      // setSelectedListener(e);
      let nod = getNode(id);

      const maxChildId = getNodes().reduce((initialId, currentNode) => {
        if (currentNode.id.startsWith(`${parentNode.id}.`)) {
          const hasChild = currentNode.id.split(".");
          const lastChild = hasChild[hasChild.length - 1];
          const childId = parseInt(lastChild, 10);
          return childId;
        }
        return initialId;
      }, 0);
      const newChildId = maxChildId + 1;
      let childId = `${parentNode.id}.${newChildId}`;
      let seq = childId.split(".").splice(1).join(".");

      if (resdata !== "defaults") {
        let responseNode = {
          id: childId,
          type: "responseNode",
          position: {
            x: parentNode.position.x + Math.random() * (150 - 100) + 100,
            y: parentNode.position.y + Math.random() * (150 - 100) + 100,
          },

          data: {
            label: resdata,
            responseType: resdata,
            parentId: parentNode.id,
            children: [],
            sequence: seq,
          },
        };

        const responseEdge = {
          id: `${parentNode.id}->${responseNode.id}`,
          source: parentNode.id,
          type: "straight",
          target: responseNode.id,
        };

        let handlerNode = {
          id: `${responseNode.id + ".1"}` ,
          type: "handlerNode",
          position: {
            x: responseNode.position.x + Math.random() * (150 - 100) + 100,
            y: responseNode.position.y + Math.random() * (150 - 100) + 100,
          },
          data: {
            label: "riseListen",
            parentId: responseNode.id,
            sequence: `${seq}.1`,
            children: [],
          },
          className: styles.node,
        };

        const handlerEdge = {
          id: `${responseNode.id}->${handlerNode.id}`,
          source: responseNode.id,
          type: "straight",
          target: handlerNode.id,
        };

        responseNode = {
          ...responseNode,
          data: {
            ...responseNode.data,
            children: [...responseNode.data.children, handlerNode.id],
          },
        };
        parentNode = {
          ...parentNode,
          data: {
            ...parentNode.data,
            children: [...parentNode.data.children, responseNode.id],
          },
        };
        if (nod) {
          let idw = nod.id.split(".")[0];
          const copyofNode = {
            id: idw + `${handlerNode.data.sequence}.1`,
            type: nod.type,
            position: {
              x: handlerNode.position.x + Math.random() * (150 - 100) + 100,
              y: handlerNode.position.y + Math.random() * (150 - 100) + 100,
            },
            data: {
              ...nod.data,
              parentId: handlerNode.id,
              children: [],
              sequence: `${handlerNode.data.sequence}.1`,
            },
          };

          handlerNode = {
            ...handlerNode,
            data: {
              ...handlerNode.data,

              children: [...handlerNode.data.children, copyofNode.id],
            },
          };

          const edge = {
            id: `${handlerNode.id}->${copyofNode.id}`,
            source: handlerNode.id,
            type: "straight",
            target: copyofNode.id,
          };
          setNodes((nds) => [
            ...nds.filter((n) => n.id !== parentNode.id),
            copyofNode,
            responseNode,
            handlerNode,
            parentNode,
          ]);
          setEdges((eds) => [...eds, handlerEdge, edge, responseEdge]);
        } else {
          const nodesData = DropdownData.filter((node) => {
            return node.key === id;
          });
          let newNode = {
            id: nodesData[0].key,
            type: nodesData[0].type !== "group" ? "controlNode" : "groupNode",
            position: {
              x: handlerNode.position.x + Math.random() * (150 - 100) + 100,
              y: handlerNode.position.y + Math.random() * (150 - 100) + 100,
            },
            data: {
              sequence: `${handlerNode.data.sequence}.1`,
              parentId: handlerNode.id,
              nodeName: nodesData[0].label,
              nodeId: nodesData[0].key,
              nodeType: nodesData[0].type,
              children: [],
            },
          };
          const edge = {
            id: `${id}->${newNode.id}`,
            source: handlerNode.id,
            type: "straight",
            target: newNode.id,
          };

          handlerNode = {
            ...handlerNode,
            data: {
              ...handlerNode.data,
              children: [...handlerNode.data.children, newNode.id],
            },
          };

          setNodes((nds) => [
            ...nds.filter((node) => node.id !== parentNode.id),
            parentNode,
            handlerNode,
            responseNode,

            newNode,
          ]);
          setEdges((eds) => [...eds, handlerEdge, edge, responseEdge]);
        }
      } else {
        let handlerNode = {
          id: childId,
          type: "handlerNode",
          position: {
            x: parentNode.position.x + Math.random() * (150 - 100) + 100,
            y: parentNode.position.y + Math.random() * (150 - 100) + 100,
          },
          data: {
            label: "riseListen",
            parentId: parentNode.id,
            sequence: `${seq}`,
            children: [],
          },
          className: styles.node,
        };

        const handlerEdge = {
          id: `${parentNode.id}->${handlerNode.id}`,
          source: parentNode.id,
          type: "straight",
          target: handlerNode.id,
        };
        parentNode = {
          ...parentNode,
          data: {
            ...parentNode.data,

            children: [...parentNode.data.children, handlerNode.id],
          },
        };
        if (nod) {
          let idw = nod.id.split(".")[0];
          const copyofNode = {
            id: idw + `.${seq}.1`,
            type: nod.type,
            position: {
              x: handlerNode.position.x + Math.random() * (150 - 100) + 100,
              y: handlerNode.position.y + Math.random() * (150 - 100) + 100,
            },
            data: {
              ...nod.data,
              parentId: handlerNode.id,
              children: [],
              sequence: `${seq}.1`,
            },
          };

          const edge = {
            id: `${handlerNode.id}->${copyofNode.id}`,
            source: handlerNode.id,
            type: "straight",
            target: copyofNode.id,
          };
          handlerNode = {
            ...handlerNode,
            data: {
              ...handlerNode.data,
              children: [...handlerNode.data.children, copyofNode.id],
            },
          };

          setNodes((nds) => [
            ...nds.filter((node) => node.id !== parentNode.id),
            handlerNode,
            copyofNode,
            parentNode,
          ]);
          setEdges((eds) => [...eds, edge, handlerEdge]);
        } else {
          const nodesData = DropdownData.filter((node) => {
            return node.key === id;
          });
          let newNode = {
            id: nodesData[0].key,
            type: nodesData[0].type !== "group" ? "controlNode" : "groupNode",
            position: {
              x: parentNode.position.x + Math.random() * (150 - 100) + 100,
              y: parentNode.position.y + Math.random() * (150 - 100) + 100,
            },
            data: {
              sequence: `${seq}.1`,
              parentId: handlerNode.id,
              nodeName: nodesData[0].label,
              nodeId: nodesData[0].key,
              nodeType: nodesData[0].type,
              children: [],
            },
          };
          const edge = {
            id: `${handlerNode.id}->${newNode.id}`,
            source: handlerNode.id,
            type: "straight",
            target: newNode.id,
          };

          handlerNode = {
            ...handlerNode,
            data: {
              ...handlerNode.data,
              children: [...handlerNode.data.children, newNode.id],
            },
          };

          setNodes((nds) => [
            ...nds.filter((node) => node.id !== parentNode.id),
            parentNode,
            handlerNode,
            newNode,
          ]);
          setEdges((eds) => [...eds, edge, handlerEdge]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleHeaderBlur = (e) => {
    try {
      if (editedHeader === "") {
        return;
      }

      setNodes((nds) => {
        return (
          nds &&
          nds.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                data: {
                  ...node.data,
                  label: editedHeader,
                },
              };
            }
            return node;
          })
        );
      });
    } catch (error) {
      console.error(error);
    }
  };
  const showError = (msg) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 1000,
    });
  };

  return (
    <>
      <Toast baseZIndex={10000} position="bottom-left" ref={toast} />

      <div
        style={{
          top,
          left,
          right,
          bottom,
        }}
        {...props}
        className={`${
          node?.data?.label
            ? `${darkmode ? "bg-[#363636] " : "bg-[#ffffff]"} p-[8px] gap-[8px] z-[1000] w-[190px] shadow-md ${node?.type === "controlNode" || node?.type === "componentNode" ? "h-[140px]" : node?.type === "groupNode" ? "h-[200px]" : "h-[290px]"} flex flex-col items-center justify-center  absolute rounded-md `
            : `${darkmode ? "bg-[#363636] " : "bg-[#ffffff]"} p-[8px] gap-[8px] z-[1000] w-[190px] shadow-md ${node?.type === "controlNode" || node?.type === "componentNode" ? "h-[140px]" : node?.type === "groupNode" ? "h-[200px]" : "h-[290px]"} flex flex-col items-center justify-center  absolute  rounded-md `
        }`}
      >
        <div
          className={`flex justify-between gap-3 w-full  
          ${darkmode ? "bg-[#363636] py-1 px-1 rounded-md border border-[#979BA1]" : "bg-[#ffffff] border border-[#15181a]  py-1 px-1 rounded-md"}`}
        >
          {" "}
          {!toogleInputNameEdit ? (
            <div className="flex justify-center items-center min-w-max-[80%]">
              {node?.type === "controlNode" ? (
                <p
                  onClick={() => {
                    setToogleInputNameEdit(!toogleInputNameEdit);
                  }}
                  className={
                    darkmode
                      ? "w-full text-white font-semibold text-medium cursor-pointer"
                      : "w-full text-black font-semibold text-medium cursor-pointer"
                  }
                >
                  {node?.data.nodeName}
                </p>
              ) : (
                <p
                  onClick={() => {
                    setToogleInputNameEdit(!toogleInputNameEdit);
                  }}
                  className={
                    darkmode
                      ? "w-full text-white font-semibold text-medium cursor-pointer"
                      : "w-full text-black font-semibold text-medium cursor-pointer"
                  }
                >
                  {node?.data.label}
                </p>
              )}
            </div>
          ) : (
            <InputText
              placeholder="Type here..."
              value={editedHeader || node?.data.label}
              onChange={(e) => {
                handleHeaderChange(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleHeaderBlur(e);
                }
              }}
            />
          )}
          <div className="min-w-max-[20%] flex items-center justify-center">
            <Tooltip content={id}>
              <button className={darkmode ? "text-white" : "text-black"}>
                <AiOutlineInfoCircle color={darkmode ? "white" : "black"} />
              </button>
            </Tooltip>
          </div>
        </div>

        {(node?.type === "handlerNode" || node?.type === "eventNode") && (
          <div className="flex items-center justify-center w-[100%]">
            <ReusableDropDown
              darkmode={darkmode}
              key={node.id + node.type}
              title={
                (selectedResponseData && selectedResponseData) ||
                "select response type"
              }
              selectedKey={new Set([selectedResponseData])}
              handleSelectedKey={(keys) => {
                setSelectedResponseData(Array.from(keys)[0]);
              }}
              items={
                responsedata &&
                responsedata.length > 0 &&
                responsedata.map((data, index) => {
                  return {
                    key: data,

                    label: data,
                  };
                })
              }
            />

            <hr />
          </div>
        )}

        {node?.type !== "groupNode" && node?.type !== "controlNode" && (
          <div className="flex justify-center flex-col w-[100%] pl-3">
            <button
              onClick={() => {
                risenode(
                  "rise",
                  node.type,
                  selectedResponseData ? selectedResponseData : ""
                );

                setToogle(node, id);

                setTimeout(() => {
                  setMenu(null);
                }, 1000);
              }}
              className={
                darkmode
                  ? "w-full rounded-md bg-transparent text-white text-sm mt-1"
                  : "w-full rounded-md bg-transparent text-black text-sm mt-1"
              }
            >
              <div className=" flex w-full justify-between gap-5 item-center">
                <div className="w-[25%] flex justify-center items-center">
                  <RiseIcon />
                </div>
                <div className="w-[75%] flex justify-start items-center text-sm">
                  Rise
                </div>
              </div>
            </button>
            {
              <button
                onClick={() => {
                  risenode(
                    "riseListen",
                    node.type,
                    selectedResponseData ? selectedResponseData : ""
                  );
                  setToogle(node, id);
                }}
                className={
                  darkmode
                    ? "w-full rounded-md bg-transparent text-white text-sm mt-1"
                    : "w-full rounded-md bg-transparent text-black text-sm mt-1"
                }
              >
                <div className=" flex w-full justify-between gap-5 item-center">
                  <div className="w-[25%] flex justify-center items-center">
                    <RaiseAndListenIcon />
                  </div>
                  <div className="w-[75%] flex justify-start items-center text-sm">
                    Rise & Listen
                  </div>
                </div>
              </button>
            }
            <button
              onClick={() => {
                risenode("self", node.type, selectedResponseData);
                setToogle(node, id);

                setTimeout(() => {
                  setMenu(null);
                }, 1000);
              }}
              className={
                darkmode
                  ? "w-full rounded-md bg-transparent text-white mt-1 text-sm"
                  : "w-full rounded-md bg-transparent text-black mt-1 text-sm"
              }
            >
              <div className="flex w-full justify-between gap-5 item-center ">
                <div className="w-[25%] flex justify-center items-center">
                  <SelfIcon />
                </div>
                <div className="w-[75%] flex justify-start items-center text-sm">
                  Self
                </div>
              </div>
            </button>
          </div>
        )}
        <Divider className={darkmode ? "bg-white" : "bg-black"} />

        {/*Edit node */}
        <button
          onClick={() => {
            setVisible({ bool: true, type: "rise" });
            setToogle(node, id);
          }}
          className={
            darkmode
              ? "w-full bg-transparent text-slate-50 font-bold rounded-md py-1"
              : "w-full bg-transparent text-slate-950 font-bold rounded-md py-1"
          }
        >
          Edit Node
        </button>

        {/*Delete node */}
        <button
          className={
            darkmode
              ? "w-full bg-transparent  text-slate-50 font-bold rounded-md py-1"
              : "w-full bg-transparent  text-slate-950 font-bold rounded-md py-1"
          }
          onClick={() => {
            deleteNodesAndEdges(nodes, edges, node.id);
            setMenu(null);
          }}
        >
          Delete
        </button>

        <Dialog
          visible={isOpen}
          onHide={() => {
            onOpenChange(false);
            setMenu(null);
          }}
          headerStyle={{ width: "400px", maxHeight: "50px" }}
          headerClassName="bg-neutral-100"
          header="Events"
          contentStyle={{ width: "400px", minHeight: "400px" }}
          contentClassName="w-[50px] h-[50px] "
        >
          <div className="flex items-center justify-center mt-[11px]">
            <div className="w-[400px] h-[400px] flex flex-col items-center justify-center overflow-y-scroll">
              {eventJson &&
                DropdownData &&
                DropdownData.length &&
                eventJson.length > 0 &&
                eventJson.map((item, index) => {
                  return (
                    Object.keys(item) &&
                    Object.keys(item).length > 0 &&
                    Object.keys(item)?.map((key) => {
                      return (
                        <>
                          {key === "nodeType" && item[key] !== "group" && (
                            <div
                              className=" text-lg items-start cursor-pointer select-none"
                              onClick={() => {
                                // setClickedJson(item);
                                // setShowEvents(true);
                              }}
                            >
                              {key} : {item[key]}
                            </div>
                          )}

                          {key === "nodeType" && item[key] === "group" && (
                            <div className=" text-lg    items-start  cursor-pointer select-none mb-[20px]">
                              <div
                                className=" text-lg  transition-all-ease-in duration-500
                flex   rounded-2xl"
                                onClick={() => {
                                  if (clickedGroup.includes(item.nodeId)) {
                                    setClickedGroup(
                                      clickedGroup.filter(
                                        (group) => group !== item.nodeId
                                      )
                                    );
                                  } else {
                                    setClickedGroup([
                                      ...clickedGroup,
                                      item.nodeId,
                                    ]);
                                  }
                                  // setClickedJson(item);
                                  // setShowEvents(true);
                                }}
                              >
                                <span>
                                  <IoIosArrowForward
                                    color="#90A4AE"
                                    className={`  mt-[3px] text-lg
                           ${clickedGroup.includes(item.nodeId) ? "rotate-90" : "rotate-0"}`}
                                  />
                                </span>

                                <span className="ml-[4px] text-md">
                                  {key} : {item[key]}
                                  <span className="text-[#FF66AA] font-bold text-sm whitespace-nowrap">
                                    {`{${item["children"].length}}`}
                                  </span>
                                </span>
                              </div>
                            </div>
                          )}

                          {key === "nodeName" && (
                            <div
                              onClick={() => {
                                onOpenChange(false);
                                handleSelectedListener(
                                  item.nodeId,
                                  selectedResponseData
                                );
                                onOpenChange(false);
                                setTimeout(() => {
                                  setMenu(null);
                                }, 500);
                              }}
                              className="w-full cursor-pointer overflow-ellipsis flex items-start text-lg justify-center"
                            >
                              {key} : {item[key]}
                            </div>
                          )}

                          <AnimatePresence>
                            {clickedGroup.includes(item.nodeId) &&
                              key === "children" && (
                                <motion.div
                                  className="border border-gray-400 rounded-md  w-[210px] p-[20px]  "
                                  initial={{ height: 0, opacity: 0 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                >
                                  {item[key] &&
                                    item[key].length > 0 &&
                                    item[key]?.map((key1) => {
                                      return Object.keys(key1).map((key2) => {
                                        return (
                                          <div className="text-lg flex flex-row gird grid-row-2 gap-5">
                                            {key2 === "nodeType" && (
                                              <div
                                                className=" text-lg gap-5 cursor-pointer select-none"
                                                onClick={() => {
                                                  // setClickedJson(key1);
                                                  // setShowEvents(true);
                                                  setTimeout(() => {
                                                    setMenu(null);
                                                  }, 500);
                                                }}
                                              >
                                                <div
                                                  className={`${darkmode ? "text-black" : ""} text-lg`}
                                                >
                                                  {key2} : {key1[key2]}
                                                </div>
                                              </div>
                                            )}
                                            {key2 === "nodeName" && (
                                              <div
                                                onClick={() => {
                                                  handleSelectedListener(
                                                    key1.nodeId,
                                                    selectedResponseData
                                                  );
                                                  onOpenChange(false);
                                                  setTimeout(() => {
                                                    setMenu(null);
                                                  }, 1000);
                                                }}
                                                className={`${darkmode ? "text-black" : ""} text-lg`}
                                              >
                                                {key2} : {key1[key2]}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      });
                                    })}
                                </motion.div>
                              )}
                          </AnimatePresence>
                        </>
                      );
                    })
                  );
                })}
            </div>
          </div>
        </Dialog>

        <Sidebar
          visible={visible.bool}
          onHide={() => {
            setVisible({ ...visible, bool: false });
            setMenu(null);
          }}
          position="right"
          className={darkmode ? "bg-[#333334]" : "bg-[#f0f0f0]"}
        >
          <div className=" flex flex-col justify-start items-start w-[100%]">
            {node && node?.type === "handlerNode" && (
              <div>
                {nodeInfo && (
                  <Tabs
                    aria-label="Options"
                    variant="underlined"
                    classNames={{
                      tabList:
                        "gap-1 w-full relative rounded-none p-0  border-divider bg-transparent",
                      cursor: "w-full bg-transparent",
                      base: "w-full h-full",
                      tab: "max-w-fit px-0 h-12",
                    }}
                  >
                    {Object.entries(nodeInfo) &&
                      Object.entries(nodeInfo).length > 0 &&
                      Object.entries(nodeInfo)?.map(([key, value]) => {
                        if (key === "nodeInfoTabs") {
                          return Object.entries(value[currentDrawing]).map(
                            ([key, value]) => {
                              return (
                                <Tab
                                  title={
                                    <Tooltip content={value.label}>
                                      <span
                                        className={` rounded-md w-[35px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
																			${activeTab === value.label ? "bg-[#009BC9] text-slate-800/65" : " bg-slate-600 text-slate-50"} 
																			flex items-center justify-center cursor-pointer px-[3px] shadow-md`}
                                        onContextMenu={(e) =>
                                          handleContextMenu(e, value.modelOpen)
                                        }
                                        onClick={() => {
                                          // handleOpen(value.label);
                                          if (value.label === "Params") {
                                            handleOpenModal(
                                              value.modelOpen,
                                              false,
                                              "Params"
                                            );
                                          }
                                          if (
                                            value.label ===
                                            "StateTransitionStreams"
                                          ) {
                                            handleOpenModal(
                                              value.modelOpen,
                                              false,
                                              "STS"
                                            );
                                          }
                                          if (
                                            value.label ===
                                            "StateTransitionTable"
                                          ) {
                                            handleOpenModal(
                                              value.modelOpen,
                                              false,
                                              "STT"
                                            );
                                          }
                                        }}
                                      >
                                        {value.icon}
                                      </span>
                                    </Tooltip>
                                  }
                                >
                                  <div className="App">
                                    <div
                                      className={
                                        `fixed  rounded-md bg-[#242424]`
                                      }
                                        
                                      
                                      style={{
                                        zIndex: 9999,
                                        display: contextMenuVisible
                                          ? "block"
                                          : "none",
                                        top: contextMenuPosition.y,
                                        left: contextMenuPosition.x,
                                      }}
                                    >
                                      <div className=" px-3 py-3">
                                        <Upload  id={value.label} setFiles={setFiles} />
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                              );
                            }
                          );
                        }
                        return null;
                      })}
                  </Tabs>
                )}
              </div>
            )}

            <div>
              <div
                className={`${darkmode ? "text-white text-sm font-semibold mb-3 cursor-pointer" : "text-black text-sm font-semibold mb-3 cursor-pointer"}  `}
              >
                nodeID :
              </div>
              <div
                className={`${darkmode ? "text-white text-xs font-medium whitespace-nowrap" : "text-black text-xs font-medium whitespace-nowrap  "}`}
              >
                {node?.id}
              </div>
            </div>
            <div className="col-span-4 w-[100%]">
              {node &&
                Object.entries(node) &&
                Object.entries(node).length > 0 &&
                Object.entries(node)?.map(([key, value]) => (
                  <React.Fragment>
                    {key === "type" && (
                      <div className="mt-2 px-2 pr-3 w-[100%] py-2 flex justify-between">
                        <div className="w-[50%] flex justify-start">
                          <div
                            className={
                              darkmode
                                ? "text-white font-semibold "
                                : "text-black font-semibold"
                            }
                          >
                            {key}
                          </div>{" "}
                        </div>
                        :
                        <div className="w-[50%] flex justify-start">
                          <div
                            className={darkmode ? "text-white" : "text-black"}
                          >
                            {value}
                          </div>
                        </div>
                      </div>
                    )}

                    {key === "data" &&
                      Object.entries(value) &&
                      Object.entries(value).length > 0 &&
                      Object.entries(value)?.map(([key, value]) => (
                        <>
                          {key === "sequence" && (
                            <div className="mt-2 px-2 pr-3 w-[100%] py-2 flex justify-between">
                              <div className="w-[50%] flex justify-start">
                                <div
                                  className={
                                    darkmode
                                      ? "text-white font-semibold "
                                      : "text-black font-semibold"
                                  }
                                >
                                  {key}
                                </div>{" "}
                              </div>
                              :
                              <div className="w-[50%] flex justify-start">
                                <div
                                  className={
                                    darkmode ? "text-white" : "text-black"
                                  }
                                >
                                  {value}
                                </div>
                              </div>
                            </div>
                          )}
                          {key === "label" && (
                            <div className="mt-2 px-2 w-[100%] py-2">
                              <ReusableInput
                                key={key + "contextmenu"}
                                handleChange={(e) =>
                                  changeProperty({ [key]: e.target.value })
                                }
                                label={key}
                                darkmode={darkmode}
                                defaultValue={value}
                              />
                            </div>
                          )}
                        </>
                      ))}
                  </React.Fragment>
                ))}
            </div>
          </div>
        </Sidebar>

        <Sidebar
          className={"bg-[#242424]"}
          position="right"
          visible={opensideTab}
          onHide={async () => {
            if (currentDrawing === "PF" || currentDrawing === "UF") {
              updatedNodeConfig(
                nodeData.id,
                currentModel,
                {
                  nodeId: nodeData.id,
                  nodeName: nodeData.data.label,
                  nodeType: nodeData.type,
                  sequence: nodeData.data.sequence,
                },
                {
                  ...json,
                }
              );
              setOpensideTab(false);
            }
          }}
          style={{ height: "100%", width: "30vw" }}
        >
          {currentDrawing && currentModel === "Params"
            ? handleRender("", currentModel, json)
            : currentDrawing && currentModel === "STS"
              ? handleRender("", currentModel, json)
              : currentDrawing && currentModel === "STT"
                ? handleRender("", currentModel, json)
                : ""}
        </Sidebar>
      </div>
    </>
  );
}
