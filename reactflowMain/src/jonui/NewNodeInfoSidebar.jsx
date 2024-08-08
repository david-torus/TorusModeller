import React, { useContext, useEffect, useState } from "react";
import { NodeInfoSidebarTabs } from "../commonComponents/CommonSideBar/NodeInfoSidebarTabs";
import { RenderData } from "../commonComponents/CommonSideBar/RenderData";
import { RenderJson } from "./JsonUI";
import SideBar from "../SideBar";
import {
  cardUIPolicy,
  colorPolicy,
  controlPolicy,
} from "../commonComponents/utils/util";
import Builder from "../VPT_DJUI/builder";
import { AccordianWindow } from "../commonComponents/PropertyWIndow/AccordianWindow";
import ListWindow from "../commonComponents/PropertyWIndow/ListWindow";
import { DarkmodeContext } from "../commonComponents/context/DarkmodeContext";
import { NodeInfoSidebarNodeInformation } from "../commonComponents/CommonSideBar/NodeInfoSidebarNodeInformation";
import { SideBarDebugandFlag } from "../commonComponents/CommonSideBar/SideBarDebugandFlag";
import SFSidebar from "../VPT_SF/Components/layout/SFSidebar";
import TorusInput from "../torusComponents/TorusInput";
import { useReactFlow } from "reactflow";
import ReusableInput from "../commonComponents/reusableComponents/ReusableInput";

const NewNodeInfoSidebar = ({
  showNodeProperty,
  sideBarData,
  currentDrawing,
  setShowNodeProperty,
  nodeInfoTabs,
  setToggleReactflow,
  setDenormalizedata,
  updatedNodeConfig,
  changeProperty,
  uniqueNames,
  upIdKey,
  customCodeKey,
  changedatavalues,
  setSideT,
  status,
  nodes,
}) => {
  const { getNode } = useReactFlow();
  const [activeTab, setActiveTab] = useState("");
  const [sendFabrics, setSendFabrics] = useState(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [rendervalue, setRendervalue] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [json, setJson] = useState({});
  const [currentModel, setCurrentModel] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [files, setFiles] = useState(null);
  const [helperjson, setHelperjson] = useState({});
  const [tabopen, seTabopen] = useState(1);
  const [attributes] = useState([]);
  const [methods] = useState([]);
  const { darkMode } = useContext(DarkmodeContext);
  const [selectedIPC, setSelectedIPC] = useState("");
  const [err, setErr] = useState(false);
  const [request, setRequest] = useState({});
  const [response, setResponse] = useState(null);
  const [SIFlag, setSIFlag] = useState("");

  const [sideResponse, setSideResponse] = useState(false);

  const [actionAllowed, setActionAllowed] = useState([]);
  const [actionDenied, setActionDenied] = useState([]);
  const [getDisplayNames, setGetDisplayNames] = useState([]);
  const emptyStatus = false;
  const valueMsg = false;
  const options = [
    { key: "A", label: "A" },
    { key: "E", label: "E" },
  ];
  const [showsfsidebar, setshowsfsidebar] = useState(false);
  const [toggleSFflow, setToggleSFflow] = useState({
    SF: {
      PF: false,
      DF: false,
      UF: false,
    },
    events: {
      eventParams: false,
      eventSTT: false,
      eventSTS: false,
    },
  });
  const [jsonUpdateCompleteAT, setJsonUpdateCompleteAT] = useState(false);
  const [jsonUpdateCompleteMT, setJsonUpdateCompleteMT] = useState(false);

  const items = [
    { key: "*", label: "*" },
    ...(getDisplayNames?.map((item) => ({ key: item, label: item })) || []),
  ];
  useEffect(() => {
    try {
      if (files) {
        setJson((prev) => ({
          ...prev,
          [rendervalue]: JSON.parse(files),
        }));
        setToggle(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [files]);
  console.log(json, "files");

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }, [contextMenuVisible, setContextMenuVisible]);

  useEffect(() => {
    if (currentDrawing === "SF" && sideBarData) {
      if (sideBarData.data?.hasOwnProperty("children")) {
        if (nodes && nodes.length > 0) {
          const displayNames = nodes
            ?.filter((node) => sideBarData?.data?.children.includes(node.id))
            ?.map((node) => node?.data?.code);

          setGetDisplayNames((prevDisplayNames) => [
            ...prevDisplayNames,
            ...displayNames,
          ]);
        }
      }
    }
    return () => {
      setGetDisplayNames([]);
    };
  }, [sideBarData, nodes, currentDrawing]);

  const handleOpen = (value) => {
    try {
      setActiveTab(value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIPCselection = (e) => {
    try {
      setSelectedIPC(e);
      changeProperty({ IPC_flag: Array.from(e)[0] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleJsonUpdate = (json, type) => {
    if (type === "AT") {
      setJsonUpdateCompleteAT(true);
    }
    if (type === "MT") {
      setJsonUpdateCompleteMT(true);
    }
  };
  const getNodeConfig = (jsons, toogle) => {
    try {
      if (toogle === "AT") {
        setJson(
          (prev) => {
            if (prev?.entities)
              return {
                ...prev,
                entities: {
                  ...prev.entities,
                  attributes: jsons,
                  methods: handleMethod(jsons, prev),
                },
              };
            else
              return {
                ...prev,
                entities: {
                  attributes: jsons,
                  methods: handleMethod(jsons, prev),
                },
              };
          },
          handleJsonUpdate(json, "AT"),
        );
        updatedNodeConfig(
          sideBarData?.id,
          {
            nodeId: sideBarData?.id,
            nodeName: sideBarData?.data?.label,
            nodeType: sideBarData?.type,
          },
          {
            ...json,
          },
        );
      }

      if (toogle === "MT") {
        setJson(
          (prev) => {
            if (prev?.entities)
              return {
                ...prev,
                entities: {
                  ...prev.entities,
                  methods: jsons,
                },
              };
            else
              return {
                ...prev,
                entities: {
                  methods: jsons,
                },
              };
          },
          handleJsonUpdate(json, "MT"),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (jsonUpdateCompleteAT) {
      updatedNodeConfig(
        sideBarData?.id,
        {
          nodeId: sideBarData?.id,
          nodeName: sideBarData?.data?.label,
          nodeType: sideBarData?.type,
        },
        { ...json },
      );
      setJsonUpdateCompleteAT(false);
    }

    if (jsonUpdateCompleteMT) {
      updatedNodeConfig(
        sideBarData?.id,
        {
          nodeId: sideBarData?.id,
          nodeName: sideBarData?.data?.label,
          nodeType: sideBarData?.type,
        },
        { ...json },
      );
      setJsonUpdateCompleteMT(false);
    }
  }, [jsonUpdateCompleteAT, jsonUpdateCompleteMT, json]);
  const handleMethod = (attri, json) => {
    try {
      let MT = [];
      if (
        attri.length > 0 &&
        attri[0].hasOwnProperty("cname") &&
        attri[0].cname !== ""
      ) {
        let cname = [];
        attri &&
          attri.map((item) => {
            if (item.cname) cname.push(item.cname);
            return item;
          });

        let getCname = [];

        attri &&
          attri.forEach((item) => {
            if (
              item?.constraints.includes("@unique") ||
              item?.constraints.includes("@id")
            ) {
              if (item.cname) getCname.push(item.cname);
            }
          });

        if (!json?.entities?.methods || json?.entities?.methods?.length === 0) {
          MT.push(
            {
              isActive: {
                value: true,
                type: "checkbox",
              },
              methodName: "Get",

              QueryParams: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...cname],
              },
              QueryConditions: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...getCname],
              },
            },
            {
              isActive: {
                value: true,
                type: "checkbox",
              },
              methodName: "GetALL",
              QueryParams: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...cname],
              },
            },

            {
              isActive: {
                value: true,
                type: "checkbox",
              },
              methodName: "Post",
              QueryParams: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...cname],
              },
            },
            {
              isActive: {
                value: true,
                type: "checkbox",
              },
              methodName: "Put",
              QueryParams: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...cname],
              },
              QueryConditions: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...getCname],
              },
            },
            {
              isActive: {
                value: true,
                type: "checkbox",
              },
              methodName: "Delete",
              QueryParams: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...cname],
              },
              QueryConditions: {
                selectedValue: [],
                type: "multipleSelect",
                selectionList: [...getCname],
              },
            },
          );
        } else {
          MT =
            (json?.entities?.methods &&
              json?.entities?.methods.map((item) => {
                if (
                  item.hasOwnProperty("QueryConditions") &&
                  item.hasOwnProperty("QueryParams")
                ) {
                  return {
                    ...item,
                    QueryParams: {
                      ...item.QueryParams,

                      selectionList: [...cname],
                    },
                    QueryConditions: {
                      ...item.QueryConditions,

                      selectionList: [...getCname],
                    },
                  };
                }
                if (
                  item.hasOwnProperty("QueryConditions") &&
                  !item.hasOwnProperty("QueryParams")
                ) {
                  return {
                    ...item,
                    QueryConditions: {
                      ...item.QueryConditions,

                      selectionList: [...getCname],
                    },
                  };
                }
                if (
                  !item.hasOwnProperty("QueryConditions") &&
                  item.hasOwnProperty("QueryParams")
                ) {
                  return {
                    ...item,
                    QueryParams: {
                      ...item.QueryParams,

                      selectionList: [...cname],
                    },
                  };
                }
                return item;
              })) ||
            [];
        }
      }

      return MT;
    } catch (err) {
      console.error(err);
    }
  };

  const updatejson = (value) => {
    try {
      setJson((prev) => ({
        ...prev,
        [currentModel]: value,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRender = (cm, js, side) => {
    console.log(js, side, cm, js[cm], "handle");
    return (
      <div className="h-full w-full">
        <RenderJson
          json={js[cm]}
          setJson={setJson}
          nodedata={side}
          cm={cm}
          updatedNodeConfig={updatedNodeConfig}
        />
      </div>
    );
  };

  const handleSfSidebar = (toggleSFflow, setToggleSFflow, tab) => {
    return (
      <div className="">
        {toggleSFflow && (
          <SFSidebar
            updatedNodeConfig={() => {
              setToggleSFflow((prev) => {
                if (tab === "PF") {
                  return {
                    ...prev,
                    SF: {
                      ...prev.SF,
                      PF: false,
                    },
                  };
                }
                if (tab === "DF") {
                  return {
                    ...prev,
                    SF: {
                      ...prev.SF,
                      DF: false,
                    },
                  };
                }
                if (tab === "UF") {
                  return {
                    ...prev,
                    SF: {
                      ...prev.SF,
                      UF: false,
                    },
                  };
                }
                return prev;
              });
            }}
            currentModel={currentModel}
            setJson={setJson}
            updateconfig={updatedNodeConfig}
            json={json}
            sendFabrics={sendFabrics}
            sidebarVisible={toggle}
            setSidebarVisible={setToggle}
            sideBarData={sideBarData}
            cm={tab}
          />
        )}
      </div>
    );
  };

  console.log(json, "sfflow");
  const handleOpenModal = async (
    flowType,
    isDockey = false,
    flow,
    tabtoOpen,
  ) => {
    console.log(flowType, isDockey, flow, tabtoOpen, sideBarData, "flow");
    try {
      setCurrentModel(flowType);
      if (currentDrawing === "DF") {
        if (flowType === "entities") {
          setJson((prev) => {
            if (prev && !prev?.entities)
              return {
                ...prev,
                [flowType]: {
                  attributes: sideBarData?.data?.nodeProperty?.[flowType]
                    ?.attributes ?? [
                    {
                      cname: "",
                      dataType: {
                        selectedValue: "",
                        type: "singleSelect",
                        selectionList: [
                          "Int",
                          "String",
                          "Float",
                          "Boolean",
                          "DateTime",
                          "Json",
                        ],
                      },
                      constraints: "",
                      length: "",

                      isRequired: {
                        value: true,
                        type: "checkbox",
                      },
                    },
                  ],
                  methods:
                    sideBarData?.data?.nodeProperty?.[flowType]?.methods ??
                    handleMethod(
                      sideBarData?.data?.nodeProperty?.[flowType]?.attributes ??
                        [],
                      prev,
                    ),
                },
              };
            else return prev;
          });

          setToggle(!toggle);
        } else {
          setToggle(!toggle);
          setJson((prev) => ({
            ...prev,
            [flowType]: sideBarData?.data?.nodeProperty?.[flowType] ?? {},
          }));
          setHelperjson((prev) => ({
            ...prev,
            [flowType + ".helper"]:
              sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ?? {},
          }));
        }
      } else if (currentDrawing === "SF") {
        if (tabtoOpen == "SFPF") {
          setToggleSFflow((prev) => ({
            ...prev,
            SF: {
              UF: false,
              DF: false,
              PF: !prev.SF.PF,
            },
          }));
          setJson((prev) => ({
            ...prev,
            [flowType]:
              prev?.[flowType] ??
              sideBarData?.data?.nodeProperty?.[flowType] ??
              {},
          }));
          setHelperjson((prev) => ({
            ...prev,
            [flowType + ".helper"]:
              prev?.[flowType + ".helper"] ??
              sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ??
              {},
          }));
        }
        if (tabtoOpen == "SFUF") {
          setToggleSFflow((prev) => ({
            ...prev,
            SF: {
              PF: false,
              DF: false,
              UF: !prev.SF.UF,
            },
          }));
          setJson((prev) => ({
            ...prev,
            [flowType]:
              prev?.[flowType] ??
              sideBarData?.data?.nodeProperty?.[flowType] ??
              {},
          }));
          setHelperjson((prev) => ({
            ...prev,
            [flowType + ".helper"]:
              prev?.[flowType + ".helper"] ??
              sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ??
              {},
          }));
        }

        if (tabtoOpen == "SFDF") {
          setToggleSFflow((prev) => ({
            ...prev,
            SF: {
              PF: false,
              UF: false,
              DF: !prev.SF.DF,
            },
          }));
          setJson((prev) => ({
            ...prev,
            [flowType]:
              prev?.[flowType] ??
              sideBarData?.data?.nodeProperty?.[flowType] ??
              {},
          }));
          setHelperjson((prev) => ({
            ...prev,
            [flowType + ".helper"]:
              prev?.[flowType + ".helper"] ??
              sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ??
              {},
          }));
        }
      } else if (currentDrawing === "events") {
        if (tabtoOpen == "eventParams" && flowType === "Params") {
          setToggleSFflow((prev) => ({
            ...prev,
            events: {
              eventParams: !prev.events.eventParams,
              eventSTT: false,
              eventSTS: false,
            },
          }));
          setJson((prev) => ({
            ...prev,
            [flowType]:
              prev?.[flowType] ??
              sideBarData?.data?.nodeProperty?.[flowType] ??
              {},
          }));
          setHelperjson((prev) => ({
            ...prev,
            [flowType + ".helper"]:
              prev?.[flowType + ".helper"] ??
              sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ??
              {},
          }));
        } else if (tabtoOpen == "eventSTT" && flowType === "STT") {
          setToggleSFflow((prev) => ({
            ...prev,
            events: {
              eventParams: false,
              eventSTT: !prev.events.eventSTT,
              eventSTS: false,
            },
          }));
          setJson((prev) => ({
            ...prev,
            [flowType]:
              prev?.[flowType] ??
              sideBarData?.data?.nodeProperty?.[flowType] ??
              {},
          }));
          setHelperjson((prev) => ({
            ...prev,
            [flowType + ".helper"]:
              prev?.[flowType + ".helper"] ??
              sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ??
              {},
          }));
        } else if (tabtoOpen == "eventSTS" && flowType === "STS") {
          setToggleSFflow((prev) => ({
            ...prev,
            events: {
              eventParams: false,
              eventSTT: false,
              eventSTS: !prev.events.eventSTS,
            },
          }));
          setJson((prev) => ({
            ...prev,
            [flowType]:
              prev?.[flowType] ??
              sideBarData?.data?.nodeProperty?.[flowType] ??
              {},
          }));
          setHelperjson((prev) => ({
            ...prev,
            [flowType + ".helper"]:
              prev?.[flowType + ".helper"] ??
              sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ??
              {},
          }));
        } else {
          return null;
        }
      } else {
        setToggle(!toggle);
        setJson((prev) => ({
          ...prev,
          [flowType]:
            prev?.[flowType] ??
            sideBarData?.data?.nodeProperty?.[flowType] ??
            {},
        }));
        setHelperjson((prev) => ({
          ...prev,
          [flowType + ".helper"]:
            prev?.[flowType + ".helper"] ??
            sideBarData?.data?.nodeProperty?.[flowType + ".helper"] ??
            {},
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const tabvisible = (index) => {
    try {
      seTabopen(index);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNames = (e, key) => {
    try {
      if (key === "name") {
        if (uniqueNames.includes(e.toLowerCase())) {
          if (e.toLowerCase() === sideBarData.property.name.toLowerCase()) {
            return;
          }
        } else {
          changeProperty({ [key]: e });
        }
      } else changeProperty({ [key]: e });
    } catch (err) {
      console.error(err);
    }
  };

  const handleContextMenu = (e, value) => {
    try {
      e.preventDefault();

      setRendervalue(value);

      setContextMenuPosition({ x: e.clientX, y: e.clientY });
      setContextMenuVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDebug = async () => {
    try {
      if (upIdKey) {
        await fetch(`${process.env.REACT_APP_API_URL}pe/debughtrequest`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            role: "Admin",
          },

          body: JSON.stringify({
            key: customCodeKey,
            upId: upIdKey,
            nodeName: sideBarData?.data?.label,
            nodeType: sideBarData?.type,
            nodeId: sideBarData?.id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.hasOwnProperty("request")) {
              window.open(
                `${data.request}?key=${customCodeKey}&upId=${upIdKey}&nodeName=${sideBarData?.data?.label}&nodeType=${sideBarData?.type}&nodeId=${sideBarData?.id}&mode=${data.mode}`,
                "_blank",
              );
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequest = async () => {
    try {
      if (upIdKey) {
        const responses = await fetch(
          `${process.env.REACT_APP_API_URL}pe/debugrequest`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              role: "Admin",
            },
            body: JSON.stringify({
              key: customCodeKey,
              upId: upIdKey,
              nodeName: sideBarData.data.label,
              nodeType: sideBarData.type,
              nodeId: sideBarData.id,
            }),
          },
        ).then((response) => response.json());
        setRequest(responses);
        setSideT(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (upIdKey) {
        const responses = await fetch(
          `${process.env.REACT_APP_API_URL}pe/debugnode`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              role: "Admin",
            },
            body: JSON.stringify({
              key: customCodeKey,
              upId: upIdKey,
              nodeName: sideBarData.data.label,
              nodeType: sideBarData.type,
              nodeId: sideBarData.id,
              params: request,
            }),
          },
        ).then((response) => response.json());
        setResponse(responses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSIFlagselection = (e) => {
    try {
      if (Array.from(e)[0]) {
        setSIFlag(Array.from(e)[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAAlag = (e) => {
    try {
      const selectedItems = Array.from(e);
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      const firstSelectedItem = selectedItems[0];
      const filterItems = selectedItems.filter((item) => item === "*");

      if (
        lastSelectedItem === "*" ||
        firstSelectedItem === "*" ||
        filterItems.includes("*")
      ) {
        setActionAllowed(["*"]);
      } else if (
        selectedItems.length == items.length - 1 &&
        !selectedItems.includes("*")
      ) {
        setActionAllowed(["*"]);
      } else {
        setActionAllowed(selectedItems);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(actionAllowed, "actionAllowed");
  const handleADlag = (e) => {
    try {
      const selectedItems = Array.from(e);
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      const firstSelectedItem = selectedItems[0];
      const filterItems = selectedItems.filter((item) => item === "*");

      if (
        lastSelectedItem === "*" ||
        firstSelectedItem === "*" ||
        filterItems.includes("*")
      ) {
        setActionDenied(["*"]);
      } else if (
        selectedItems.length == items.length - 1 &&
        !selectedItems.includes("*")
      ) {
        setActionDenied(["*"]);
      } else {
        setActionDenied(selectedItems);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    if (
      SIFlag.length > 0 &&
      actionAllowed.length > 0 &&
      actionDenied.length > 0
    ) {
      const newData = {
        SIFlag,
        actionAllowed,
        actionDenied,
      };

      if (newData) {
        changedatavalues(newData);
      }
    } else {
      alert("Please select all the fields");
    }
  };

  console.log(sideBarData, "sidebardatatabaasa");

  return (
    <div className="flex h-[92%] w-[100%]  flex-col ">
      <div className=" w-[100%] items-center justify-center bg-transparent">
     <div className="w-[100%]   overflow-x-scroll px-2 py-1">

          {currentDrawing &&
            nodeInfoTabs &&
            currentDrawing !== "events" &&
            nodeInfoTabs[currentDrawing] &&
            sideBarData.type !== "orgGrp" &&
            sideBarData.type !== "roleGrp" &&
            sideBarData.type !== "org" &&
            sideBarData.type !== "roles" &&
            sideBarData.type !== "psGrp" && (
              <NodeInfoSidebarTabs
                nodeInfoTabs={nodeInfoTabs}
                currentDrawing={currentDrawing}
                activeTab={activeTab}
                handleContextMenu={handleContextMenu}
                setSendFabrics={setSendFabrics}
                handleOpen={handleOpen}
                handleOpenModal={handleOpenModal}
                setToggleReactflow={setToggleReactflow}
                setFiles={setFiles}
                setJson={setJson}
                //   darkMode={darkMode}
                contextMenuVisible={contextMenuVisible}
                contextMenuPosition={contextMenuPosition}
              />
            )}
          {currentDrawing &&
            nodeInfoTabs &&
            currentDrawing === "events" &&
            nodeInfoTabs[currentDrawing] && (
              <NodeInfoSidebarTabs
                nodeInfoTabs={nodeInfoTabs}
                currentDrawing={currentDrawing}
                activeTab={activeTab}
                handleContextMenu={handleContextMenu}
                setSendFabrics={setSendFabrics}
                handleOpen={handleOpen}
                sideBarData={sideBarData}
                handleOpenModal={handleOpenModal}
                setToggleReactflow={setToggleReactflow}
                setFiles={setFiles}
                //   darkMode={darkMode}
                contextMenuVisible={contextMenuVisible}
                contextMenuPosition={contextMenuPosition}
              />
            )}
     
     </div>

       
          {!toggleSFflow.events.eventParams &&
            !toggleSFflow.events.eventSTS &&
            !toggleSFflow.events.eventSTT &&
            currentDrawing === "events" && (
              <div className=" flex w-[100%] flex-col items-start justify-start">
                <div className="m-2">
                  <div
                    className={`${darkMode ? "mb-3 cursor-pointer text-sm font-semibold text-white" : "mb-3 cursor-pointer text-sm font-semibold text-black"}  `}
                  >
                    nodeID :
                  </div>
                  <div
                    className={`${darkMode ? "whitespace-nowrap text-xs font-medium text-white" : "whitespace-nowrap text-xs font-medium text-black  "}`}
                  >
                    {sideBarData?.id}
                  </div>
                </div>
                <div className="col-span-2 w-[100%]">
                  {sideBarData &&
                    Object.entries(sideBarData) &&
                    Object.entries(sideBarData).length > 0 &&
                    Object.entries(sideBarData)?.map(([key, value]) => (
                      <React.Fragment>
                        {key === "type" && (
                          <div className="mt-2 flex w-[100%] justify-between px-2 py-2 ">
                            <div className="flex w-[30%] justify-start">
                              <div
                                className={
                                  darkMode
                                    ? "font-semibold text-white "
                                    : "font-semibold text-black"
                                }
                              >
                                {key}
                              </div>{" "}
                            </div>
                            <span
                              className={
                                darkMode
                                  ? "font-semibold text-white "
                                  : "font-semibold text-black"
                              }
                            >
                              :
                            </span>
                            <div className="flex w-[50%] justify-start">
                              <div
                                className={
                                  darkMode ? "text-white" : "text-black"
                                }
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
                                <div className="mt-2 flex w-[100%] justify-between px-2 py-2 pr-3">
                                  <div className="flex w-[30%] justify-start">
                                    <div
                                      className={
                                        darkMode
                                          ? "font-semibold text-white "
                                          : "font-semibold text-black"
                                      }
                                    >
                                      {key}
                                    </div>{" "}
                                  </div>
                                  <span
                                    className={
                                      darkMode
                                        ? "font-semibold text-white "
                                        : "font-semibold text-black"
                                    }
                                  >
                                    :
                                  </span>
                                  <div className="flex w-[50%] justify-start">
                                    <div
                                      className={
                                        darkMode ? "text-white" : "text-black"
                                      }
                                    >
                                      {value}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {key === "label" && (
                                <div className="mt-2 w-[100%] px-2 py-2">
                                  <ReusableInput
                                    key={key + "contextmenu"}
                                    handleChange={(e) =>
                                      changeProperty({ [key]: e.target.value })
                                    }
                                    label={key}
                                    darkMode={darkMode}
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
            )}

          {!toggleSFflow.SF.PF &&
            !toggleSFflow.SF.DF &&
            !toggleSFflow.SF.UF &&
            !toggle &&
            sideBarData &&
            currentDrawing !== "events" && (
              <>
                <div className=" ">
                  <div className="  w-[100%] ">
                    <div
                      className={` flex items-start ${" flex flex-col items-start justify-between  px-2 py-2"} `}
                    >
                      <h1
                        className={`${"mb-2  font-bold   text-black/80 dark:text-[#F4F4F5]"}   cursor-pointer  `}
                      >
                        nodeID :
                      </h1>

                      {sideBarData?.id ? (
                        <div
                          className={`${"whitespace-nowrap text-xs font-medium  text-black/80 dark:text-[#F4F4F5]"}`}
                        >
                          {sideBarData?.id}
                        </div>
                      ) : (
                        <p
                          className={`${"text-sm font-medium text-black  dark:text-[#F4F4F5] "}`}
                        >
                          there is no value in this field
                        </p>
                      )}

                      <div className="mt-4 flex w-full items-center justify-start">
                        <h1
                          className={`${"mb-2  font-bold  text-black/80 dark:text-[#F4F4F5] "}cursor-pointer  `}
                        >
                          Node Name :{" "}
                        </h1>

                        {sideBarData?.data?.label ? (
                          <div
                            className={`${"whitespace-nowrap pl-3 text-xs font-medium    text-black/80  dark:text-[#F4F4F5]"}`}
                          >
                            {sideBarData?.data?.label}
                          </div>
                        ) : (
                          <p
                            className={`${"pl-3 text-sm font-medium  text-black dark:text-[#F4F4F5]"}`}
                          >
                            there is no value in this field
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-4 w-[100%] ">
                      {sideBarData &&
                        Object.entries(sideBarData?.property).map(
                          ([key, value]) => (
                            <React.Fragment>
                              {key === "nodeType" && (
                                <div className="mt-0 w-[100%] px-2 py-2">
                                  <div className="flex flex-row ">
                                    <h1
                                      className={` font-bold text-black/80  dark:text-white`}
                                    >
                                      nodeType :
                                    </h1>
                                    <span
                                      className={`ml-[5px] font-normal text-black/80 dark:text-white`}
                                    >
                                      {value && value}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          ),
                        )}
                    </div>
                  </div>
                </div>  

                <div className="  w-[100%] h-64 overflow-y-scroll ">
                  {currentDrawing !== "SF" && (
                    <NodeInfoSidebarNodeInformation
                      sideBarData={sideBarData}
                      currentDrawing={currentDrawing}
                      handleNames={handleNames}
                      darkMode={darkMode}
                      changeProperty={changeProperty}
                      selectedIPC={selectedIPC}
                      handleIPCselection={handleIPCselection}
                      err={err}
                    />
                  )}

                  {sideBarData && currentDrawing === "SF" && (
                
                      <SideBarDebugandFlag
                        upIdKey={upIdKey}
                        activeTab={activeTab}
                        handleDebug={handleDebug}
                        handleRequest={handleRequest}
                        handleSubmit={handleSubmit}
                        setSideResponse={setSideResponse}
                        sideResponse={sideResponse}
                        currentDrawing={currentDrawing}
                        sideBarData={sideBarData}
                        darkMode={darkMode}
                        SIFlag={SIFlag}
                        handleSIFlagselection={handleSIFlagselection}
                        actionAllowed={actionAllowed}
                        setActionAllowed={setActionAllowed}
                        handleAAlag={handleAAlag}
                        actionDenied={actionDenied}
                        setActionDenied={setActionDenied}
                        handleADlag={handleADlag}
                        handleSave={handleSave}
                        status={status}
                        emptyStatus={emptyStatus}
                        valueMsg={valueMsg}
                        options={options}
                        items={items}
                      />
               
                  )}

                  {sideBarData && currentDrawing === "PF" && (
                    <SideBarDebugandFlag
                      upIdKey={upIdKey}
                      activeTab={activeTab}
                      handleDebug={handleDebug}
                      handleRequest={handleRequest}
                      handleSubmit={handleSubmit}
                      setSideResponse={setSideResponse}
                      sideResponse={sideResponse}
                      currentDrawing={currentDrawing}
                      sideBarData={sideBarData}
                      darkMode={darkMode}
                      SIFlag={SIFlag}
                      handleSIFlagselection={handleSIFlagselection}
                      actionAllowed={actionAllowed}
                      setActionAllowed={setActionAllowed}
                      handleAAlag={handleAAlag}
                      actionDenied={actionDenied}
                      setActionDenied={setActionDenied}
                      handleADlag={handleADlag}
                      handleSave={handleSave}
                      status={status}
                      emptyStatus={emptyStatus}
                      valueMsg={valueMsg}
                      options={options}
                      items={items}
                    />
                  )}
                </div>
              </>
            )}
        </div>
   

      <div className=" h-[92%]  w-[100%]  ">
        <RenderData
          sideBarData={sideBarData}
          currentModel={currentModel}
          currentDrawing={currentDrawing}
          json={json}
          setJson={setJson}
          setToggle={setToggle}
          toggle={toggle}
          handleRender={handleRender}
          toggleSFflow={toggleSFflow}
          setToggleSFflow={setToggleSFflow}
          handleSfSidebar={handleSfSidebar}
          setshowsfsidebar={setshowsfsidebar}
          tabvisible={tabvisible}
          tabopen={tabopen}
          attributes={attributes}
          methods={methods}
          getNodeConfig={getNodeConfig}
          sendFabrics={sendFabrics}
          // tenant={tenant}
          // group={group}
          // application={application}
          // selectedproperty={selectedproperty}
          // darkMode={darkMode}
          // updatedNodeConfig={updatedNodeConfig}
          helperJson={helperjson}
        />
      </div>
    </div>
  );
};

export default NewNodeInfoSidebar;
