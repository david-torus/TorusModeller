import { useEffect, useState } from "react";
import { NodeInfoSidebarTabs } from "../commonComponents/CommonSideBar/NodeInfoSidebarTabs";
import { RenderData } from "../commonComponents/CommonSideBar/RenderData";
import { RenderJson } from "./JsonUI";

const NewNodeInfoSidebar = ({
  showNodeProperty,
  sideBarData,
  currentDrawing,
  setShowNodeProperty,
  nodeInfoTabs,
  setToggleReactflow,
  setDupJson,
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
  const[files , setFiles] = useState(null);
  const [helperjson, setHelperjson] = useState({});
  const [tabopen, seTabopen] = useState(1);

  function denormalizeJson(obj, prefix = "", result = {}) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let newKey = prefix ? `${prefix}/${key}` : key;
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          if (
            !(obj[key].hasOwnProperty("type") && obj[key].type === "dropdown")
          ) {
            result[newKey] = obj[key];
            denormalizeJson(obj[key], newKey, result);
            delete obj[key];
          }
        } else if (Array.isArray(obj[key]) && typeof obj[key][0] === "object") {
          result[newKey] = obj[key];
          obj[key].forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              const nestedKey = `${newKey}/${index}`;
              denormalizeJson(item, nestedKey, result);
            } else {
              result[newKey][index] = item;
            }
          });
          delete obj[key];
        } else {
          if (!prefix) {
            result[obj["label"]] = obj;
          }
        }
      }
    }
    return result;
  }


  useEffect(() => {
    try {
      if (files) {
        setJson((prev) => ({
          ...prev,
          [rendervalue]: JSON.parse(files),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    files,
    rendervalue,
    sideBarData?.data?.label,
    sideBarData?.id,
    sideBarData?.type,
  ]);

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

  const handleRender = (propw, js) => {
    try {
      let pw = sideBarData?.data?.nodeProperty?.[propw];
      let ConfigToRender;
      if (pw) {
        return null
        // switch (pw) {
        //   case "m1":
        //     ConfigToRender = (
        //       <Builder
        //         isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
        //         defaultJSOn={js?.[currentModel] ?? {}}
        //         controlPolicy={controlPolicy}
        //         colorPolicy={colorPolicy}
        //         updatedNodeConfig={updatejson}
        //         uiPolicy={cardUIPolicy}
        //         helperJson={
        //           sideBarData?.data?.nodeProperty?.[currentModel + ".helper"] ??
        //           {}
        //         }
        //       />
        //     );
        //     break;
        //   case "m2":
        //     ConfigToRender = (
        //       <AccordianWindow
        //         sideBarData={js?.[currentModel] ?? {}}
        //         helperJson={
        //           sideBarData?.data?.nodeProperty?.[currentModel + ".helper"] ??
        //           {}
        //         }
        //         setSidebarData={updatejson}
        //       />
        //     );
        //     break;
        //   case "m3":
        //     ConfigToRender = (
        //       <ListWindow
        //         sideBarData={js?.[currentModel] ?? {}}
        //         helperJson={
        //           sideBarData?.data?.nodeProperty?.[currentModel + ".helper"] ??
        //           {}
        //         }
        //         setSidebarData={updatejson}
        //       />
        //     );
        //     break;
        //   case "m4":
        //     ConfigToRender = (
        //       <Builder
        //         decider={decider}
        //         setDecider={setDecider}
        //         isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
        //         defaultJSOn={js?.[currentModel] ?? {}}
        //         controlPolicy={controlPolicy}
        //         colorPolicy={colorPolicy}
        //         updatedNodeConfig={updatejson}
        //         uiPolicy={cardUIPolicy}
        //         helperJson={
        //           sideBarData?.data?.nodeProperty?.[currentModel] ?? {}
        //         }
        //       />
        //     );
        //     break;
        //   default:
        //     ConfigToRender = null;
        // }
      } 
      else {
          console.log(js, "---->newjs")
       const hj = denormalizeJson(js)
       
        console.log(hj , "newjs")
      }
    
    } catch (error) {
      console.error(error);
    }
  };


  const handleOpenModal = async (flowType, isDockey = false, flow) => {
    console.log(flowType, isDockey, flow, "flow");
    try {
      setCurrentModel(flowType);
      if (currentDrawing === "DF") {
        if (flowType === "entities") {
            return null
        //   setJson((prev) => {
        //     if (prev && !prev?.entities)
        //       return {
        //         ...prev,
        //         [flowType]: {
        //           attributes: sideBarData?.data?.nodeProperty?.[flowType]
        //             ?.attributes ?? [
        //             {
        //               cname: "",
        //               dataType: {
        //                 selectedValue: "",
        //                 type: "singleSelect",
        //                 selectionList: [
        //                   "Int",
        //                   "String",
        //                   "Float",
        //                   "Boolean",
        //                   "DateTime",
        //                   "Json",
        //                 ],
        //               },
        //               constraints: "",
        //               length: "",

        //               isRequired: {
        //                 value: true,
        //                 type: "checkbox",
        //               },
        //             },
        //           ],
        //           methods:
        //             sideBarData?.data?.nodeProperty?.[flowType]?.methods ??
        //             handleMethod(
        //               sideBarData?.data?.nodeProperty?.[flowType]?.attributes ??
        //                 [],
        //               prev,
        //             ),
        //         },
        //       };
        //     else return prev;
        //   });

        //   setToggle(!toggle);
        } 
        
        else {
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

  return (
    <>
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
        // attributes={attributes}
        // methods={methods}
        // getNodeConfig={getNodeConfig}
        sendFabrics={sendFabrics}
        // tenant={tenant}
        // group={group}
        // application={application}
        // selectedproperty={selectedproperty}
        // darkMode={darkMode}
        // updatedNodeConfig={updatedNodeConfig}
        helperJson={helperjson}
      />
    </>
  );
};

export default NewNodeInfoSidebar;
