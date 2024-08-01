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
    PF: false,
    DF: false,
    UF: false,
  });

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

  const getNodeConfig = (jsons, toogle) => {
    try {
      if (toogle === "AT") {
        setJson((prev) => {
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
        });

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
        setJson((prev) => {
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
        });

        return updatedNodeConfig(
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
    } catch (err) {
      console.error(err);
    }
  };
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

  const handleRender = (propw, js, side) => {
    console.log(js, side, js[currentModel], "handle ");
    return (
      <div className="h-[500px]">
        <RenderJson
          json={js}
          nodedata={side}
          updatedNodeConfig={updatedNodeConfig}
        />
      </div>
    );
  };

  const handleSfSidebar = (toggleSFflow , setToggleSFflow , tab) => {
    return (
      <div className="">
        {toggleSFflow && (
          <SFSidebar
            updatedNodeConfig={() => {
              setToggleSFflow((prev) => {
                if (tab === "PF") {
                  return {
                    ...prev,
                    PF: false,
                  };
                }
                if (tab === "DF") {
                  return {
                    ...prev,
                    DF: false,
                  };
                }
                if (tab === "UF") {
                  return {
                    ...prev,
                    UF: false,
                  };
                }
                return prev;
              });
            }}
            currentModel={currentModel}
            setJson={setJson}
            json={json}
            sendFabrics={sendFabrics}
            sidebarVisible={toggle}
            setSidebarVisible={setToggle}
          />
        )}
      </div>
    );
  };


  console.log(toggleSFflow , "sfflow")
  const handleOpenModal = async (
    flowType,
    isDockey = false,
    flow,
    tabtoOpen,
  ) => {
    console.log(flowType, isDockey, flow,tabtoOpen, "flow");
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
      } 
      
      else if (currentDrawing === "SF") {
        if (tabtoOpen == "SFPF") {
          setToggleSFflow((prev) => ({
            ...prev,
            UF:false,
            DF: false,
            PF: !prev.PF,
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
            PF:false,
            DF: false,
            UF: !prev.UF,
          }));;
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
            PF:false,
            UF: false,
            DF: !prev.DF,
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
      }
      
      else {
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
    <div className="flex flex-col">
      <div className="h-10 bg-transparent">
        {currentDrawing &&
          nodeInfoTabs &&
          nodeInfoTabs[currentDrawing] &&
          sideBarData.type !== "orgGrp" &&
          sideBarData.type !== "roleGrp" &&
          sideBarData.type !== "org" &&
          sideBarData.type !== "roles" && (
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
              //   darkMode={darkMode}
              contextMenuVisible={contextMenuVisible}
              contextMenuPosition={contextMenuPosition}
            />
          )}

        {((!toggleSFflow.PF && !toggleSFflow.DF && !toggleSFflow.UF ) && !toggle )&& sideBarData && (
          <div className="h-40">
            <div className="grid h-40 w-[100%] grid-cols-4 gap-2">
              <div
                className={` flex items-start ${"col-span-4 mt-3 flex flex-col items-start justify-between  px-2 py-2"} `}
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
                  Object.entries(sideBarData?.property).map(([key, value]) => (
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
                  ))}
              </div>

              <div className="h-100 col-span-4 w-[100%] ">
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
                  <div className="h-10">
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
                  </div>
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
            </div>
          </div>
        )}
      </div>

      <div className=" h-full  ">
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
