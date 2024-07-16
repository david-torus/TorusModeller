/* eslint-disable */
import React, { useState, useEffect,useContext, useCallback } from "react";
import { ScrollShadow } from "@nextui-org/react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { DarkmodeContext } from "../context/DarkmodeContext";
import ReusableInput from "../reusableComponents/ReusableInput";

const _ = require("lodash");

/**
 * Renders a JSON editor component.
 *
 * @param {Object} props - The properties for the JSON editor.
 * @param {Object} props.data - The JSON data to be edited.
 * @param {Function} props.setData - The function to update the JSON data.
 * @param {Function} props.setSidebarData - The function to update the sidebar data.
 * @param {string} props.keyJson - The key-value pairs for tooltips.
 * @return {JSX.Element} The rendered JSON editor component.
 */
const JsonEditor = ({ data, setData, setSidebarData, keyJson }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [tooltip, setTooltip] = useState(null);
  const [path, setPath] = useState(null);
  const [blockVisibility, setBlockVisibility] = useState({
    hasObject: false,
    hasString: false,
  });
  const   {darkmode} = useContext(DarkmodeContext);

  /**
   * Retrieves the data at the specified path in the given object.
   *
   * @param {string[]} path - An array of strings representing the path to the desired data.
   * @return {*} - The data at the specified path.
   */

  const getDataAtPath = (path) => {
    let current = data;
    for (const crumb of path) {
      current = current[crumb];
    }
    return current;
  }

  useEffect(() => {
    setCurrentData(getDataAtPath(breadcrumbs));
  }, [data]);

  useEffect(() => {
    setCurrentData(data);
  }, []);


  useEffect(() => {
    setBlockVisibility(() => ({
      hasString: false,
      hasObject: false,
    }));
    Object.keys(currentData).map((key) => {
      if (typeof currentData[key] == "object") {
        setBlockVisibility((prev) => ({
          ...prev,
          hasObject: true,
        }));
      } else {
        setBlockVisibility((prev) => ({
          ...prev,
          hasString: true,
        }));
      }
      return key;
    });
  }, [currentData]);

  

  /**
   * Handles the click event on a breadcrumb link.
   *
   * @param {number} index - The index of the breadcrumb being clicked.
   */
  const handleBreadcrumbClick = (index) => {
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    setCurrentData(getDataAtPath(breadcrumbs.slice(0, index + 1)));
    const breadcrumb = breadcrumbs.slice(0, index + 1);
    const breadcrumbPath = breadcrumb.join(".");
    setPath(breadcrumbPath);
  };

  /**
   * Handles the click event on a tab.
   *
   * @param {string} key - The key of the tab.
   * @param {any} value - The value associated with the tab.
   * @return {void}
   */
  const handleTabClick = (key, value) => {
    setCurrentData(value);
    const newData = [...breadcrumbs, key];
    setBreadcrumbs(newData);
    const breadcrumbPath = breadcrumbs.join(".");
    const path = breadcrumbPath ? breadcrumbPath + "." + key : key;
    setPath(path);
  };

  /**
   * Handles the input change event for a specific key.
   *
   * @param {Event} e - The input change event.
   * @param {string} key - The key of the input field.
   * @return {void} This function does not return anything.
   */
  const handleInputChange = (e, key) => {
    const breadcrumbPath = breadcrumbs.join(".");
    const path = breadcrumbPath ? breadcrumbPath + "." + key : key;
    _.set(data, path, e);
    setData(data);
    setSidebarData(data);
  };

  /**
   * A function to handle the tooltip based on the key.
   *
   * @param {any} key - The key used to determine the tooltip.
   * @return {void} Sets the tooltip based on the key.
   */
  const handleTooltip = (key) => {
    const currentPath = breadcrumbs.join(".");
    const path = currentPath ? currentPath + "." + key : key;
    setTooltip(keyJson[path]);
  };

  /**
   * Renders a breadcrumb component with a list of breadcrumb items.
   * The breadcrumb items are generated from the breadcrumbs array.
   * The breadcrumb items have click event handlers that call the handleBreadcrumbClick function.
   * The breadcrumb items are styled based on the darkmode state.
   *
   * @return {JSX.Element} The rendered breadcrumb component.
   */
  const renderBreadcrumb = () => {
    return (
      <div className="flex flex-col gap-2 p-2 w-[100%] h-full m-auto shadow-[#20516d]/60  ">
        <div className="border-b border-b-gray-400 pl-[4%] pb-[2%]   ">
          <Breadcrumbs>
            <BreadcrumbItem
              classNames={{
                item: darkmode
                  ? "text-white font-bold"
                  : "text-slate-700 font-bold",
                separator: darkmode ? "text-white" : "text-slate-700",
              }}
              onClick={() => handleBreadcrumbClick(-1)}
              style={{ cursor: "pointer", color: "black" }}
            >
              home
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem
                classNames={{
                  item: darkmode
                    ? "text-white font-bold"
                    : "text-slate-700 font-bold",
                  separator: darkmode ? "text-white" : "text-slate-700",
                }}
                key={index}
                onClick={() => handleBreadcrumbClick(index)}
              >
                {crumb}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </div>
      </div>
    );
  };

  /**
   * Renders a tab component with a list of tab items.
   * The tab items are generated from the object keys.
   * If the value of a key is an object, it renders a button with the key as the button label.
   * The button has a click event handler that calls the handleTabClick function.
   * The button is styled based on the darkmode state.
   * If the value of a key is not an object, it returns null.
   *
   * @param {object} obj - The object used to generate the tab items.
   * @return {JSX.Element} The rendered tab component.
   */
  const renderTab = (obj) => {
    return (
      <div className="  rounded-2xl p-3  ">
        <div className="flex flex-col gap-3">
          {Object.keys(obj).map((key) => {
            if (typeof obj[key] === "object") {
              return (
                <div>
                  <Button
                    size="sm"
                    className={`${
                      darkmode
                        ? "mt-0 w-[100%] text-sm text-white border shadow-none hover:bg-[#5a5a5a] bg-[#363636] hover:text-slate-700 border-slate-500/50 rounded-md h-[35px]"
                        : "mt-0 w-[100%] text-sm  text-black/70 border hover:bg-[#D9DEE8] bg-[#D9DEE8] hover:text-gray-600 border-slate-500/50 rounded-md h-[35px]"
                    }`}
                    variant="shadow"
                    key={key}
                    onClick={() => handleTabClick(key, obj[key])}
                  >
                    <div className="flex flex-row justify-around items-center">
                      <span className="px-[10px] py-[3px] text-sm font-bold">
                        {key}
                      </span>
                      {keyJson &&
                        keyJson.hasOwnProperty(
                          path ? path + "." + key : key
                        ) && (
                          <Tooltip
                            showArrow
                            placement="bottom"
                            closeDelay={50}
                            delay={10}
                            classNames={{
                              base: [
                                "before:bg-neutral-400 dark:before:bg-white",
                              ],
                              content: ["py-2 px-4 shadow-xl ", "text-black "],
                            }}
                            content={<RenderTooltip tooltip={tooltip} />}
                          >
                            <span onMouseEnter={() => handleTooltip(key)}>
                              <AiOutlineInfoCircle />
                            </span>
                          </Tooltip>
                        )}
                    </div>
                  </Button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  /**
   * Renders a tab content component with a grid layout.
   * The grid contains a list of input fields based on the object keys.
   * If the value of a key is not an object, it renders an input field with the key as the label.
   * The input field has a default value, onValueChange event handler, and onKeyDown event handler.
   * If the key has a corresponding tooltip in the keyJson object, it renders a tooltip with the tooltip content.
   * The input field is styled based on the darkmode state.
   * If the value of a key is an object, it returns null.
   *
   * @param {object} obj - The object used to generate the input fields.
   * @return {JSX.Element} The rendered tab content component.
   */
  const renderTabContent = (obj) => {
    return (
      <div className="grid grid-cols-1 mt-3 gap-1 border m-0 border-blue-300/30 p-3 rounded-2xl">
        {Object.keys(obj).map((key) => {
          if (typeof obj[key] !== "object") {
            return (
              <div className="my-3" key={key}>
                {
                  <>
                    <div className="flex items-center z-50">
                      <span className="mr-2">{key}:</span>
                      {keyJson &&
                        keyJson.hasOwnProperty(
                          path ? path + "." + key : key
                        ) && (
                          <Tooltip
                            showArrow
                            placement="bottom"
                            closeDelay={50}
                            delay={10}
                            classNames={{
                              base: [
                                "before:bg-neutral-400 dark:before:bg-white",
                              ],
                              content: [
                                "py-2 px-4 shadow-xl w-[300px] max-h-[300px] overflow-y-scroll",
                                "text-black ",
                              ],
                            }}
                            content={
                              <ScrollShadow>
                                <RenderTooltip tooltip={tooltip} />
                              </ScrollShadow>
                            }
                          >
                            <span onMouseEnter={() => handleTooltip(key)}>
                              <AiOutlineInfoCircle />
                            </span>
                          </Tooltip>
                        )}
                    </div>
                    <ReusableInput
                      darkmode={darkmode}
                      key={path ? path + "." + key : key}
                      type="text"
                      defaultValue={obj[key]}
                      labelPlacement="outside"
                      handleChange={(e) =>
                        handleInputChange(e.target.value, key)
                      }
                    />
                  </>
                }
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <>
      <div> {renderBreadcrumb()}</div>
      {
        <div className="flex gap-2 h-[77vh] m-[10px] overflow-y-scroll">
          <div
            className="col-span-2"
            style={{ display: blockVisibility.hasObject ? "block" : "none" }}
          >
            {renderTab(currentData)}
          </div>
          <div
            className={`transition-all delay-50  ${!blockVisibility.hasString ? "hidden" : blockVisibility.hasObject ? "col-span-3" : "col-span-5 px-3 pt-1"}`}
          >
            {Object.keys(currentData).length > 0 &&
              renderTabContent(currentData)}
          </div>
        </div>
      }
    </>
  );
};

/**
 * Renders a tooltip component based on the provided tooltip object.
 *
 * @param {object} tooltip - The object containing tooltip information.
 * @return {JSX.Element} The rendered tooltip component.
 */
const RenderTooltip = ({ tooltip }) => {
  return (
    <div>
      {tooltip &&
        Object.keys(tooltip).map((key) => {
          return (
            <div className="px-2 py-2 bg-[D9DEE8]">
              <div className="text-small font-bold p-0">{key}:</div>
              <div className="text-tiny p-0">{tooltip[key]}</div>
            </div>
          );
        })}
    </div>
  );
};

/**
 * Renders the ListWindow component with JSON data and sets the sidebar data.
 *
 * @param {Object} helperJson - The helper JSON data.
 * @param {Object} sideBarData - The sidebar data.
 * @param {Function} setSidebarData - A function to set the sidebar data.
 * @return {JSX.Element} The rendered ListWindow component.
 */
const ListWindow = ({ helperJson, sideBarData, setSidebarData }) => {
  const [json, setJson] = useState({});
  const [keyJson, setKeyJson] = useState({});
  useEffect(() => {
    setJson(structuredClone(sideBarData));
    setKeyJson(structuredClone(helperJson));
  }, [sideBarData, helperJson]);
  return (
    <div>
      <JsonEditor
        data={json}
        setData={setJson}
        setSidebarData={setSidebarData}
        sideBarData={sideBarData}
        keyJson={keyJson}
      />
    </div>
  );
};

export default ListWindow;
