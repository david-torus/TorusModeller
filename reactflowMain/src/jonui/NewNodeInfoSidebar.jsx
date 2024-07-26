import { useEffect, useState } from "react";
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

const NewNodeInfoSidebar = ({
  showNodeProperty,
  sideBarData,
  currentDrawing,
  setShowNodeProperty,
  nodeInfoTabs,
  setToggleReactflow,
  setDenormalizedata,
  updatedNodeConfig,
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

  const handleOpen = (value) => {
    try {
      setActiveTab(value);
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
          }
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

         return  updatedNodeConfig(
          sideBarData?.id,
          {
            nodeId: sideBarData?.id,
            nodeName: sideBarData?.data?.label,
            nodeType: sideBarData?.type,
          },
          {
            ...json,
          }
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
            }
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
      <div className="h-full">
        <RenderJson
          json={js}
          nodedata={side}
          updatedNodeConfig={updatedNodeConfig}
        />
      </div>
    );
  };

  const handleOpenModal = async (flowType, isDockey = false, flow) => {
    console.log(flowType, isDockey, flow, "flow");
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
  console.log(sideBarData, "sidebardatatabaasa");

  return (
    <div className="flex flex-col">
      <div className="h-10 bg-transparent">
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
      </div>

      <div className=" h-full bg-red-400 ">
        <RenderData
          sideBarData={sideBarData}
          currentModel={currentModel}
          currentDrawing={currentDrawing}
          json={json}
          setJson={setJson}
          setToggle={setToggle}
          toggle={toggle}
          handleRender={handleRender}
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
