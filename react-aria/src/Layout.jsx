import React, {
  useCallback,
  useContext,
  useState,
  useRef,
  useMemo,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import Navbar from "./Navbar";
import SelectedTabPanel from "./SelectedTabPanel";
import FabricsSelector from "./FabricsSelector";
import { v4 as uuidv4 } from "uuid";
import UserNode from "./DynamicNode";

const getId = () => uuidv4();

export default function Layout() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedFabric, setSelectedFabric] = useState("DF");
  const [selectedTab, setSelectedTab] = useState("DF");
  const { screenToFlowPosition } = useReactFlow();
  const [reactFlowInstance, setreactflowinstance] = useState(null);

  const NODE_TYPES = useMemo(
    () => ({
      usernode: UserNode,
    }),
    []
  );

  const handleFabrciselector = (fabric) => {
    setSelectedFabric(fabric);
    setNodes([]);
    setEdges([]);
  };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex flex-col gap-3 w-full h-full ">
      <div className="h-[5%] sticky top-0">
        <Navbar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedFabric={selectedFabric}
          setSelectedFabric={handleFabrciselector}
        />
      </div>
      <div className={`h-[95%] dark:bg-[#1E2428]  bg-[#F4F5FA] `}>
        <FabricsSelector
          nodeTypes={NODE_TYPES}
          fabric={selectedFabric}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setreactflowinstance}
        >
          <Panel
            position="top-left"
            className={`w-2/12 h-[95%] ${
              selectedTab.startsWith("hidden") ? "hidden" : "block"
            }  `}
          >
            <SelectedTabPanel selectedTab={selectedTab} />
          </Panel>

          <Controls position="right-bottom" />
          {/* <MiniMap /> */}

          <Background variant="dots" gap={12} size={1} />
        </FabricsSelector>
      </div>
    </div>
  );
}
