import { useContext, useState } from "react";
import { Sidebar } from "primereact/sidebar";

import { DefaultTabs } from "./DefaultTabs";
import DefaultDailog from "./DefaultDailog";
import _ from "lodash";
import { DarkmodeContext } from "../context/DarkmodeContext";
import { defaultInfoTabs } from "../utils/util";
export default function DefaultSideBar({
  visible,
  mode,
  setVisible,
  sideBarData,
  currentDefault,
  updatedNodeConfig,
}) {
  const { darkmode } = useContext(DarkmodeContext);
  const [tabData, setTabData] = useState({});
  const [tabDataHelper, setTabDataHelper] = useState({});
  const [openBuilder, setOpenBuilder] = useState(false);
  const [propertyWindow, setPropertywindow] = useState({});
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const [rendervalue, setRendervalue] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const handleFileUpload = (files) => {
    try {
      setTabData((data) => ({
        ...data,
        [rendervalue]: JSON.parse(files),
      }));

      setContextMenuVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(tabData, "tabbing");
  const handleTabData = (data) => {
    try {
      setTabData((prev) => ({
        ...prev,
        [activeTab]: data,
      }));
      setTabDataHelper((prev) => ({
        ...prev,
        [activeTab + ".helper"]: handlekeyjson(data, activeTab + ".helper"),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTabDataHelper = (data) => {
    try {
      setTabDataHelper((prev) => ({ ...prev, [activeTab + ".helper"]: data }));
    } catch (error) {
      console.error(error);
    }
  };
  const handlePropertyWindow = (data) => {
    try {
      setPropertywindow((prev) => ({
        ...prev,
        [activeTab + ".pw"]: Array.from(data)[0],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * A function that handles key JSON based on input data.
   *
   * @param {any} jss - The input JSON data.
   * @param {string} type - The type of key JSON.
   * @returns {void}
   */
  const handlekeyjson = (jss, type) => {
    let js = _.cloneDeep(jss);
    if (js) {
      if (
        sideBarData && 
        sideBarData?.data?.nodeProperty&& 
        (sideBarData?.data?.nodeProperty.hasOwnProperty(type) ||
        tabDataHelper.hasOwnProperty(type))
      ) {
        let keyjson = _.cloneDeep(
          sideBarData?.data?.nodeProperty[type] || tabDataHelper[type]
        );
        let newkeyJson = _.cloneDeep(generateKeyJson(js));
        let oldkeys = Object.keys(keyjson);
        let newkeys = Object.keys(newkeyJson);
        let updatekeys = [];
        oldkeys &&
          oldkeys.length > 0 &&
          oldkeys.forEach((k) => {
            if (newkeys.includes(k)) {
              updatekeys.push(k);
            }
          });
  

        newkeys &&
          newkeys.length > 0 &&
          newkeys.forEach((k) => {
            if (!updatekeys.includes(k)) {
              updatekeys.push(k);
            }
          });
        let newObj = {};
        Object.keys(keyjson)?.forEach((k) => {
          if (updatekeys.includes(k)) {
            newObj = { ...newObj, [k]: keyjson[k] };
          }
        });

        updatekeys &&
          updatekeys.length > 0 &&
          updatekeys.forEach((k) => {
            if (!Object.keys(newObj).includes(k)) {
              newObj = {
                ...newObj,
                [k]: {
                  helperText: "",
                  exampleText: "",
                },
              };
            }
          });
        return newObj;
      } else {
        return js;
      }
    }
  };

  /**
   * Generates a JSON object with keys representing the nested structure of the original JSON object.
   * Each key is a dot-separated string representing the path to the corresponding value in the original JSON object.
   * The generated JSON object also includes helperText and exampleText properties for each key.
   *
   * @param {Object} originalJson - The original JSON object to generate the key JSON from.
   * @return {Object} The generated key JSON object.
   */
  function generateKeyJson(originalJson) {
    let keyJson = {};
    function generateKeyJsonRecursive(json, parentKeys = []) {
      Object.keys(json).forEach((key) => {
        let currentKey = parentKeys.concat(key).join(".");
        let helperText = `${currentKey}-ht`;
        let exampleText = `${currentKey}-et`;
        if (Array.isArray(json[key])) {
          keyJson[currentKey] = {
            helperText: helperText,
            exampleText: exampleText,
          };
          json[key].forEach((item, index) => {
            if (typeof item === "object" && item !== null) {
              generateKeyJsonRecursive(
                item,
                parentKeys.concat(key, index.toString())
              );
            }
          });
        } else if (typeof json[key] === "object" && json[key] !== null) {
          keyJson[currentKey] = {
            helperText: helperText,
            exampleText: exampleText,
          };
          generateKeyJsonRecursive(json[key], parentKeys.concat(key));
        } else {
          keyJson[currentKey] = {
            helperText: helperText,
            exampleText: exampleText,
          };
        }
      });
      return keyJson;
    }
    return generateKeyJsonRecursive(originalJson);
  }

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
  const handleOpenModel = (model) => {
    setActiveTab(model);
    setTabData((prev) => ({
      ...prev,
      [model]:
        tabData?.[model] ?? sideBarData?.data?.nodeProperty?.[model] ?? {},
    }));
    setTabDataHelper((prev) => ({
      ...prev,
      [model + ".helper"]:
        tabDataHelper?.[model + ".helper"] ??
        sideBarData?.data?.nodeProperty?.[model + ".helper"] ??
        generateKeyJson(
          tabData?.[model] ?? sideBarData?.data?.nodeProperty?.[model] ?? {},
          model + ".helper"
        ) ??
        {},
    }));
    setPropertywindow((prev) => ({
      ...prev,
      [model + ".pw"]:
        propertyWindow?.[model + ".pw"] ??
        sideBarData?.data?.nodeProperty?.[model + ".pw"] ??
        "m1",
    }));

    setOpenBuilder(true);
  };

  return (
    <Sidebar
      className={`${darkmode ? "bg-[#242424]" : "bg-white"} `}
      position="right"
      visible={visible}
      onHide={() => {
        setVisible(false);
        updatedNodeConfig(
          sideBarData?.id,
          {
            nodeId: sideBarData?.id,
            nodeName: sideBarData?.data?.label || "",
            nodeType: sideBarData?.type,
            mode: mode,
          },
          {
            ...tabData,
            ...tabDataHelper,
            ...propertyWindow,
          }
        );
      }}
    >
      <DefaultTabs
        activeTab={activeTab}
        contextMenuPosition={contextMenuPosition}
        contextMenuVisible={contextMenuVisible}
        setContextMenuVisible={setContextMenuVisible}
        nodeInfoTabs={defaultInfoTabs}
        currentDefaults={currentDefault}
        darkmode={true}
        handleContextMenu={handleContextMenu}
        handleOpenModal={handleOpenModel}
        setFiles={handleFileUpload}
      />
      <DefaultDailog
        model={activeTab}
        tabData={tabData}
        tabDataHelper={tabDataHelper}
        visible={openBuilder}
        propertyWindow={propertyWindow}
        handlePropertyWindow={handlePropertyWindow}
        handleTabData={handleTabData}
        handleTabDataHelper={handleTabDataHelper}
        setVisible={setOpenBuilder}
      />
    </Sidebar>
  );
}
