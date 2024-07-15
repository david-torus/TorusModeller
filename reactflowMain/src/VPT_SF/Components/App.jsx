import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  useReactFlow,
} from "reactflow";
import { GiOrganigram } from "react-icons/gi";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
import FabricsNavbar from "../../commonComponents/layout/ActionBar/FabricsNavbar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import OrpsSidebar from "./layout/sidebar";
import { v4 as uuidv4 } from "uuid";
import {
  OrgName,
  OrgNode,
  PsName,
  PsNode,
  RoleName,
  RoleNode,
} from "./customNode";
import ContextMenu from "./ContextMenu";
import NodeInfoSidebar from "../../commonComponents/CommonSideBar/NodeInfoSidebar";
import useUndoRedo from "../../commonComponents/react-flow-pro/useUndoRedo";
import { toast } from "react-toastify";
const BASEURL = `${process.env.REACT_APP_API_URL}tp/getTenantInfo`;

const App = ({ tenant, appGroup, application, currentFabric }) => {
  //reactflow states
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const [toogleNodeInfo, setToogleNodeInfo] = useState(false);
  const [nodeInfoData, setNodeInfoData] = useState(null);
  const [status, setStatus] = useState(false);
  const [renderPolicyJson, setRenderPolicyJson] = useState(null);

  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();
  const { getNode, getNodes } = useReactFlow();
  const fabrics = [
    { fabricName: "orgGrp", fabricIcon: <GiOrganigram /> },
    { fabricName: "roleGrp", fabricIcon: <RiUserSettingsLine /> },
    { fabricName: "psGrp", fabricIcon: <FaRegHandshake /> },
  ];

console.log(tenant, appGroup, application, currentFabric , "sajh")



  const getTenantPolicy = async (tenant) => {
    try {
      const response = await fetch(`${BASEURL}?tenant=${tenant}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      data.orgGrp =
        data.orgGrp &&
        data.orgGrp.length > 0 &&
        data.orgGrp.map((orgGrp) => ({
          ...orgGrp,
          id: uuidv4(),
        }));

      data.psGrp =
        data.psGrp &&
        data.psGrp.length > 0 &&
        data.psGrp.map((psGrp) => ({
          ...psGrp,
          id: uuidv4(),
        }));

      data.roleGrp =
        data.roleGrp &&
        data.roleGrp.length > 0 &&
        data.roleGrp.map((roleGrp) => ({
          ...roleGrp,
          id: uuidv4(),
        }));

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    getTenantPolicy(tenant).then((res) => {
      setRenderPolicyJson(res);
    });
  }, [tenant]);

  const NODE_TYPES = useMemo(
    () => ({
      orgGrp: OrgNode,
      roleGrp: RoleNode,
      psGrp: PsNode,
      ps: PsName,
      org: OrgName,
      roles: RoleName,
    }),
    []
  );

  const onConnect = useCallback(
    (params) => {
      const source = getNode(params.source);
      const target = getNode(params.target);
      let canEdge = false;
      if (
        (source.type === "orgGrp" && target.type === "org") ||
        (source.type === "roleGrp" && target.type === "roles") ||
        (source.type === "psGrp" && target.type === "ps")
      ) {
        if (source.data.label !== target.data.childParent) {
          alert("Group/Item Mismatched");
          return;
        }
      }
      const targetNode = getNodes().find((node) => node.id === target.id);
      if (targetNode && targetNode.data.T_parentId) {
        alert("Target has parent already");
        return;
      }
      const sourceNode = getNodes().find((node) => node.id === source.id);
      const childLabels =
        sourceNode.data.children &&
        sourceNode.data.children.length > 0 &&
        sourceNode.data.children.map((id) => getNode(id).data.label);
      if (childLabels && childLabels.includes(target.data.label)) {
        alert("Cannot have same children");
        return;
      }
      if (
        (source.type === "orgGrp" && target.type === "org") ||
        (source.type === "org" && target.type === "roleGrp") ||
        (source.type === "roleGrp" && target.type === "roles") ||
        (source.type === "roles" && target.type === "psGrp") ||
        (source.type === "psGrp" && target.type === "ps")
      ) {
        canEdge = true;
      } else {
        alert("Invalid edge connection");
        return;
      }
      const updateParentWithChild = (nds) =>
        nds &&
        nds.map((node) => {
          if (canEdge && node.id === params.target) {
            return {
              ...node,
              data: {
                ...node.data,
                T_parentId: params.source,
              },
            };
          }
          if (canEdge && node.id === params.source) {
            if (node.data && node.data.hasOwnProperty("children")) {
              return {
                ...node,
                data: {
                  ...node.data,
                  children: node.data.children
                    ? [...node.data.children, params.target]
                    : [params.target],
                },
              };
            }
          }
          return node;
        });
      const updatedNodes = updateParentWithChild(getNodes());
      setNodes(updatedNodes);
      takeSnapshot();
      canEdge &&
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              type: "smoothstep",
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#2196f3",
              },
            },
            eds
          )
        );
    },
    [getNode, setNodes, setEdges, getNodes,takeSnapshot]
  );

  const updateOptions = (data) => {
    try {
      setNodes((nds) => {
        return (
          nds &&
          nds.map((node) => {
            let updatedNode = { ...node };
            if (node.id === nodeInfoData.id) {
              updatedNode = {
                ...updatedNode,
                data: { ...node.data, ...data },
              };
              setNodeInfoData(updatedNode);
            }

            return updatedNode;
          })
        );
      });

      setStatus(true);

      setTimeout(() => {
        setStatus(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update options.");
    }
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);



  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      let orgGrp = event.dataTransfer.getData("application/orgGroup");
      let roleGrp = event.dataTransfer.getData("application/roleGroup");
      let psGrp = event.dataTransfer.getData("application/psGroup");
      let org = event.dataTransfer.getData("application/groupName");
      let roles = event.dataTransfer.getData("application/roleName");
      let ps = event.dataTransfer.getData("application/psName");

      let parentNode = event.dataTransfer.getData("application/parentNode");
      let childparent = event.dataTransfer.getData("application/childparent");

      const rolesColor = event.dataTransfer.getData("application/roleColor");

      const validateGroup =(nodeType) => {
        return getNodes().some((node) => {
          return node.type === nodeType;
        });
      }

      if (orgGrp) {
        let validateOrgGrp = validateGroup("orgGrp");
        if (validateOrgGrp) {
          alert("Group already exists");
          return;
        }
      }

      if (
        typeof roleGrp === "undefined" &&
        typeof orgGrp === "undefined" &&
        typeof org === "undefined" &&
        typeof roles === "undefined" &&
        typeof psGrp === "undefined" &&
        typeof ps === "undefined" &&
        typeof parentNode === "undefined" &&
        typeof childparent === "undefined"
      ) {
        return;
      }

      if (parentNode) parentNode = JSON.parse(parentNode);
      if (childparent) childparent = JSON.parse(childparent);

      let xtype;
      if (orgGrp) {
        xtype = JSON.parse(orgGrp);
      }
      if (roleGrp) {
        xtype = JSON.parse(roleGrp);
      }
      if (psGrp) {
        xtype = JSON.parse(psGrp);
      }
      if (org) org = JSON.parse(org);

      if (roles) roles = JSON.parse(roles);

      if (ps) ps = JSON.parse(ps);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const calculateChildPosition = (index, parentPosition, totalNodes) => {
        const offsetX = 80;
        const offsetY = 100;
        const halfNodes = Math.ceil(totalNodes / 2);
        const isLeftHalf = index < halfNodes;
        const x =
          parentPosition.x +
          (isLeftHalf
            ? -offsetX * (index + 1)
            : offsetX * (index - halfNodes + 1));
        const y = parentPosition.y + offsetY;
        return { x, y };
      };
      let ids = uuidv4();

      if (parentNode) {
        const parentId = uuidv4();

        let newNode = {
          id: parentId,
          type: xtype.type,
          position,
          positionAbsolute: position,
          data: {
            label: xtype.nodeName,
            code: xtype.obj,
            height: "",
            width: "",
            children: [],
            nodeProperty: {},
            SIFlag: "",
            actionAllowed: [],
            actionDenied: [],
          },
          property: {
            name: "",
            description: "",
          },
        };
        const childNodes = [];
        const childEdges = [];
        xtype.childNodes &&
          Array.isArray(xtype.childNodes) &&
          xtype.childNodes.length > 0 &&
          xtype.childNodes.forEach((item, i) => {
            const childId = uuidv4();
            const totalNodes = xtype.childNodes.length;
            const childPosition = calculateChildPosition(
              i,
              newNode.position,
              totalNodes
            );
            childNodes.push({
              id: childId,
              type: xtype.childType,
              position: {
                x: childPosition.x,
                y: childPosition.y,
              },
              data: {
                label: item[xtype.label],
                code: item[xtype.code],
                height: "",
                width: "",
                nodeProperty: {},
                T_parentId: parentId,
                children: [],
                SIFlag: "",
                actionAllowed: [],
                actionDenied: [],
              },
              property: {
                name: "",
                description: "",
              },
            });
            newNode = {
              ...newNode,
              data: {
                ...newNode.data,
                children: [...newNode.data.children, childId],
              },
            };
            childEdges.push({
              id: `${parentId}->${childId}`,
              source: parentId,
              type: "smoothstep",
              target: childId,
            });
          });
        setNodes((nds) => nds.concat(newNode, ...childNodes));
        setEdges((eds) => eds.concat(...childEdges));
        takeSnapshot();
      }

      if (!parentNode) {
        const newNode = {
          id: ids,
          type: roleGrp
            ? "roleGrp"
            : orgGrp
              ? "orgGrp"
              : org
                ? "org"
                : roles
                  ? "roles"
                  : psGrp
                    ? "psGrp"
                    : ps
                      ? "ps"
                      : "ORPnode",
          position,
          positionAbsolute: position,
          data: {
            label: roleGrp
              ? roleGrp?.nodeName
              : orgGrp
                ? orgGrp?.nodeName
                : org
                  ? org?.nodeName
                  : roles
                    ? roles?.nodeName
                    : psGrp
                      ? psGrp?.nodeName
                      : ps
                        ? ps?.nodeName
                        : "ORPnode",

            code: roleGrp
              ? roleGrp.code
              : orgGrp
                ? orgGrp.code
                : org
                  ? org.code
                  : roles
                    ? roles.code
                    : psGrp
                      ? psGrp.code
                      : ps
                        ? ps.code
                        : "ORPnode",
            nodeColor: rolesColor,
            nodeProperty: {},
            role: roles,
            height: "",
            width: "",
            SIFlag: "",
            actionAllowed: [],
            actionDenied: [],
            T_parentId: "",
            children: [],
            childParent: childparent.name,
          },

          property: {
            name: "",
            description: "",
          },
        };

        setNodes((nds) => nds.concat(newNode));
        takeSnapshot();
      }
    },
    [reactFlowInstance, setNodes, setEdges,getNodes,takeSnapshot]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const updatedNodeConfig = (id,  nodeDetalis, datas) => {
    try {
      setNodes((prev) => {
        return (
          prev &&
          prev.map((node) => {
            if (node.id === id) {
              if (node.data.hasOwnProperty("nodeProperty")) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    nodeProperty: {
                      ...node.data.nodeProperty,
                      ...nodeDetalis,
                       ...datas,
                    },
                  },
                };
              } else {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    nodeProperty: { ...nodeDetalis,  ...datas },
                  },
                };
              }
            }

            return node;
          })
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  const getDataFromNavBar = useCallback(
    (data) => {
      try {
        setNodes(data?.nodes ?? []);
        setEdges(data?.nodeEdges ?? []);
      } catch (error) {
        console.error(error);
      }
    },
    [setNodes, setEdges]
  );

  return (
    <>
      <div>
        <FabricsNavbar
          undoredo={{
            undo: undo,
            redo: redo,
            canRedo: canRedo,
            canUndo: canUndo,
          }}
          tenant={tenant}
          group={appGroup}
          application={application}
          fabrics={currentFabric}
          getDataFromFabrics={sendDataToNavBar}
          sendDataToFabrics={getDataFromNavBar}
        ></FabricsNavbar>
        <OrpsSidebar dropdownJson={renderPolicyJson} fabrics={fabrics} />
      </div>

      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={NODE_TYPES}
        onNodeContextMenu={onNodeContextMenu}
        fitView
      >
        <NodeInfoSidebar
          updatedNodeConfig={updatedNodeConfig}
          currentDrawing={currentFabric}
          sideBarData={nodeInfoData}
          visiblity={toogleNodeInfo}
          setVisiblity={setToogleNodeInfo}
          tenant={tenant}
          group={appGroup}
          application={application}
          changedatavalues={updateOptions}
          status={status}
          setStatus={setStatus}
          nodes={nodes}
        />
        <Background />
        {menu && (
          <ContextMenu
            onClick={onPaneClick}
            {...menu}
            setToogleNodeInfo={setToogleNodeInfo}
            setNodeInfoData={setNodeInfoData}
            takeSnapshot={takeSnapshot}
          />
        )}
        <MiniMap />
      </ReactFlow>
    </>
  );
};

function ReactFlowWrapper(props) {
  return (
    <ReactFlowProvider>
      <div style={{ height: "100vh", width: "100%" }}>
        <App {...props} />
      </div>
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
