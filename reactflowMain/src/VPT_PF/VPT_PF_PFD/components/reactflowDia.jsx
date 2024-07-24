import ReactFlow, {
  Background,
  ConnectionLineType,
  useReactFlow,
} from "reactflow";
import ContextMenu from "./ContextMenu";
import "reactflow/dist/style.css";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { useContext, useState } from "react";
import NodeInfoSidebar from "../../../commonComponents/CommonSideBar/NodeInfoSidebar";
import FabricsNavbar from "../../../commonComponents/layout/ActionBar/FabricsNavbar";
import { Gorule } from "../../../commonComponents/tabs/Gorule";
import { Mapper } from "../../../commonComponents/tabs/mapper";
import MonacoEditor from "../../../commonComponents/tabs/Monaco_Editor/MonacoEditor";
import FabricSidebar from "../../../commonComponents/layout/SideBar/FabricSidebar";
import { FabricsContexts } from "../../../Layout";

const ReactFlowDia = ({
  undoRedo,
  tenant,
  group,
  fabrics,
  currentDrawing,
  getDataFromNavBar,
  sendDataToNavBar,
  application,
  nodes,
  edges,
  onConnect,
  edgeTypes,
  onEdgesChange,
  onNodesChange,
  onDragOver,
  onDrop,
  reactFlowWrapper,
  setReactFlowInstance,
  onEdgeUpdate,
  nodeTypes,
  toogle,
  setToogle,
  sideBarData,
  setSidebarData,
  changeProperty,
  sideT,
  menu,
  widths,
  deleteNode,
  setMenu,
  updatedNodeConfig,
  isAdmin,
  nodeConfig,
  controlPolicyApi,
  connectionLine,

  onEdgeUpdateStart,
  onEdgeUpdateEnd,
  uniqueNames,
  defaults,
  setDefaults,
  setdomain,
  setartifact,
  children,
}) => {
  const proOptions = { hideAttribution: true };
  const { darkMode } = useContext(DarkmodeContext);
  const [fabricsKey, setFabricsKey] = useState(null);
  const [upIdKey, setUpIdKey] = useState(null);
  const [toggleReactflow, setToggleReactflow] = useState({
    rule: false,
    mapper: false,
    code: false,
  });
  const { ref, onNodeContextMenu, onPaneClick, nodePropertyData } =
    useContext(FabricsContexts);
  const { getNode } = useReactFlow();
  return (
    <>
      {/* <div
        style={{
          display:
            !toggleReactflow.rule &&
            !toggleReactflow.mapper &&
            !toggleReactflow.code
              ? "inline"
              : "none",
        }}
      >
        <FabricsNavbar
          setUpIdKey={setUpIdKey}
          setFabricsKey={setFabricsKey}
          tenant={tenant}
          group={group}
          fabrics={fabrics}
          application={application}
          getDataFromFabrics={sendDataToNavBar}
          sendDataToFabrics={getDataFromNavBar}
          setdomain={setdomain}
          setartifact={setartifact}
          undoredo={undoRedo}
        />

        <FabricSidebar fabrics={fabrics} />
      </div> */}

      {!toggleReactflow.rule &&
      !toggleReactflow.mapper &&
      !toggleReactflow.code ? (
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          edgeTypes={edgeTypes}
          onDragOver={onDragOver}
          fitView
          onInit={setReactFlowInstance}
          onEdgeUpdate={onEdgeUpdate}
          connectionLineType={ConnectionLineType.SmoothStep}
          nodeTypes={nodeTypes}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onNodeContextMenu}
          proOptions={proOptions}
          connectionLineComponent={connectionLine}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
        >
          {/* <NodeInfoSidebar
            upIdKey={upIdKey}
            setToggleReactflow={setToggleReactflow}
            defaults={defaults}
            customCodeKey={fabricsKey}
            nodeConfig={nodeConfig}
            updatedNodeConfig={updatedNodeConfig}
            currentDrawing={currentDrawing}
            visiblity={toogle}
            setVisiblity={sideT}
            sideT={sideT}
            sideBarData={getNode(sideBarData?.id)}
            setSidebarData={setSidebarData}
            uniqueNames={uniqueNames}
            changeProperty={changeProperty}
          /> */}
          {children &&
            (typeof children == "function"
              ? children({
                  setToggleReactflow,
                  uniqueNames,
                  changeProperty,
                  updatedNodeConfig,
                  sideBarData,
                  ...undoRedo,
                })
              : children)}
          {/* {menu && (
            <ContextMenu
              customCodeKey={fabricsKey}
              onClick={onPaneClick}
              {...menu}
              sideT={sideT}
              setToogle={setToogle}
              deleteNode={deleteNode}
              setMenu={setMenu}
              updatedNodeConfig={updatedNodeConfig}
              isAdmin={isAdmin}
              nodeConfig={nodeConfig}
              controlPolicyApi={controlPolicyApi}
              defaults={defaults}
              setDefaults={setDefaults}
            />
          )} */}
          <Background
            variant="dots"
            color={darkMode ? "#ccc" : "black"}
            gap={25}
            size={1}
          />
        </ReactFlow>
      ) : toggleReactflow.rule && !toggleReactflow.mapper ? (
        <Gorule
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={nodePropertyData}
          nodeConfig={nodeConfig}
        />
      ) : !toggleReactflow.rule && toggleReactflow.mapper ? (
        <Mapper
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={nodePropertyData}
          nodeConfig={nodeConfig}
        />
      ) : toggleReactflow.code ? (
        <MonacoEditor
          fabricsKey={fabricsKey}
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={nodePropertyData}
          nodeConfig={nodeConfig}
        />
      ) : (
        <>nothing</>
      )}
    </>
  );
};

export default ReactFlowDia;
