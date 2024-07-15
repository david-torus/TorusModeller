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
  onNodeContextMenu,
  onPaneClick,
  widths,
  deleteNode,
  setMenu,
  updatedNodeConfig,
  isAdmin,
  nodeConfig,
  controlPolicyApi,
  connectionLine,
  showSuccess,
  showError,
  onEdgeUpdateStart,
  onEdgeUpdateEnd,
  uniqueNames,
  defaults,
  setDefaults,
  setdomain,
  setartifact,
}) => {
  const proOptions = { hideAttribution: true };
  const { darkmode } = useContext(DarkmodeContext);
  const [fabricsKey, setFabricsKey] = useState(null);
  const [upIdKey, setUpIdKey] = useState(null);
  const [toggleReactflow, setToggleReactflow] = useState({
    rule: false,
    mapper: false,
    code: false,
  });
  const { getNode } = useReactFlow();
  return (
    <div
      style={{
        width: widths,
        height: "100%",
        margin: "0",
        padding: "0",
        backgroundColor: darkmode ? "#121212" : "#E9E8E8",
      }}
    >
      <div
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
      </div>

      {!toggleReactflow.rule &&
      !toggleReactflow.mapper &&
      !toggleReactflow.code ? (
        <ReactFlow
          ref={reactFlowWrapper}
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
          <NodeInfoSidebar
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
          />

          {menu && (
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
              showerror={showError}
              showsuccess={showSuccess}
              defaults={defaults}
              setDefaults={setDefaults}
            />
          )}
          <Background
            variant="dots"
            color={darkmode ? "#ccc" : "black"}
            gap={25}
            size={1}
          />
        </ReactFlow>
      ) : toggleReactflow.rule && !toggleReactflow.mapper ? (
        <Gorule
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={sideBarData}
          nodeConfig={nodeConfig}
        />
      ) : !toggleReactflow.rule && toggleReactflow.mapper ? (
        <Mapper
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={sideBarData}
          nodeConfig={nodeConfig}
        />
      ) : toggleReactflow.code ? (
        <MonacoEditor
          fabricsKey={fabricsKey}
          setToggleReactflow={setToggleReactflow}
          updatedNodeConfig={updatedNodeConfig}
          sideBarData={sideBarData}
          nodeConfig={nodeConfig}
        />
      ) : (
        <>nothing</>
      )}
    </div>
  );
};

export default ReactFlowDia;
