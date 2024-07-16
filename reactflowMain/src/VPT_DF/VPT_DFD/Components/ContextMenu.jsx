/* eslint-disable*/
import React, { useState, useEffect, useContext } from "react";
import { useReactFlow } from "reactflow";
import { TbSettings2 } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";

import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import _ from "lodash";

import DefaultSideBar from "../../../commonComponents/DefaultsCommonSideBar/DefaultSideBar.jsx";

/**
 * Renders a context menu for a node in the React Flow editor.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - defaultsMode: The default mode for the context menu.
 *   - sideT: A function to toggle the side panel.
 *   - setToogle: A function to set the state for toggling the side panel.
 *   - deleteNode: A function to delete a node.
 *   - setMenu: A function to set the state for the context menu.
 *   - id: The ID of the node.
 *   - top: The top position of the context menu.
 *   - left: The left position of the context menu.
 *   - right: The right position of the context menu.
 *   - bottom: The bottom position of the context menu.
 *   - type: The type of the node.
 *   - updatedNodeConfig: A function to update the node configuration.
 *   - isAdmin: An object indicating if the user has admin privileges.
 *   - nodeConfig: The configuration for the node.
 *   - controlPolicyApi: A function to get the control policy for the node.
 *   - showerror: A function to show an error message.
 *   - showsuccess: A function to show a success message.
 *   - ...props: Additional props.
 * @return {JSX.Element} The context menu component.
 */
export default function ContextMenu({
  defaultsMode,
  sideT,
  setToogle,
  deleteNode,
  setMenu,
  id,
  top,
  left,
  right,
  bottom,
  type,
  updatedNodeConfig,
  isAdmin,

  controlPolicyApi,
  showerror,
  showsuccess,
  ...props
}) {
  const [mode, setMode] = useState("");
  const [visible, setVisible] = useState(false);
  const { getNode } = useReactFlow();
  const node = getNode(id);
  const [json, setJson] = useState([]);
  const [newJson, setNewJson] = useState({});

  const [kjDialog, setKjDialog] = useState(false);
  const [keyJson, setKeyJson] = useState(null);
  const [controlPolicy, setControlPolicy] = useState(null);
  const { darkmode } = useContext(DarkmodeContext);
  const [showSide, setShowSide] = useState(false);
  /**
   * Sets the mode to the default mode when the defaultsMode value changes.
   *
   * @param {string} defaultsMode - The default mode value.
   * @return {void}
   */
  useEffect(() => {
    setMode(defaultsMode);
  }, [defaultsMode]);

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

  /**
   * A function to set the new JSON configuration for a node.
   *
   * @param {Object} jsonb - The new JSON configuration object.
   * @return {void} No return value.
   */
  const getNodeConfig = (jsonb) => {
    setNewJson(jsonb);
  };

  /**
   * Sets the key JSON configuration by updating the state with the provided JSON object.
   *
   * @param {Object} jsonb - The new JSON configuration object.
   * @return {void} No return value.
   */
  const getKeyConfig = (jsonb) => {
    setKeyJson(jsonb);
  };

  /**
   * Sets the configuration state with the provided JSONs and logs the JSONs to the console.
   *
   * @param {Array<Object>} jsons - The JSONs to set the configuration state with.
   * @return {void} This function does not return anything.
   */
  const getConfig = (jsons) => {
    setJson(jsons);
  };

  /**
   * useEffect hook that sets the control policy state based on the node type and clears the JSON state when the component unmounts.
   *
   * @return {void} This function does not return anything.
   */
  useEffect(() => {
    /**
     * Async function that sets the control policy state based on the node type.
     * @return {Promise<void>} A Promise that resolves when the control policy state is set.
     */
    (async () => {
      if (!node) return;
      const result = controlPolicyApi(node.type);

      setControlPolicy(result);
    })();

    /**
     * Cleanup function that clears the JSON state.
     * @return {void} This function does not return anything.
     */
    return () => {
      setJson({});
    };
  }, [node, controlPolicyApi]);

  //Returning the JSX
  return (
    <>
      {node && (
        <>
          <div
            style={{ top, left, right, bottom  }}
            className={
              `${darkmode ? "bg-[#363636]  " : "bg-white   "}` +
              `${
                node.type
                  ? "min-w-[170px] max-w-[200px] min-h-[190px] max-h-[320px] shadow-lg flex flex-col items-center justify-center  z-10 absolute rounded-md "
                  : "w-[170px] h-[130px] z-10 flex flex-col items-center justify-center  absolute  rounded-md "
              }`
            }
          >
            <div
              className={`w-full ${
                node?.type
                  ? "border-b-2 flex  items-center justify-center  border-gray-400/40  "
                  : "   hidden"
              }`}

            >
              <p
                className={
                  darkmode
                    ? "text-start font-semibold capitalize mb-2 mt-2 text-white"
                    : "text-start font-semibold capitalize mb-2 mt-2 text-black/75"
                }
              >
                {node?.type}
              </p>
            </div>

            <div className={`${darkmode ? " p-2 w-full" : " p-2 w-full "}`}>
              <div
                className={
                  darkmode
                    ? "flex flex-row whitespace-nowrap w-full   gap-[11px] p-[10px] hover:bg-slate-500/40 rounded-lg "
                    : "flex flex-row whitespace-nowrap  gap-[11px]  p-[10px] hover:bg-gray-300/50 rounded-lg "
                }
              >
                <span>
                  <TbSettings2
                    size={20}
                    color={darkmode ? "#fff" : "#8C8C8C"}
                  />
                </span>
                <button
                  className={`cursor-${
                    isAdmin.canEdit
                      ? "text-base text-gray-500 hover:text-black"
                      : "not-allowed"
                  } `}
                  onClick={() => {
                    setShowSide(true);
                  }}
                >
                  <span
                    className={`text-base ${
                      darkmode ? "text-white" : "text-black/80"
                    } ml-2`}
                    style={{ cursor: "pointer" }}
                  >
                    Edit Node
                  </span>
                </button>
              </div>

              <div
                className={
                  darkmode
                    ? "flex flex-row  gap-[11px]  p-[10px] whitespace-nowrap hover:bg-slate-500/40 rounded-lg "
                    : "flex flex-row gap-[11px]  whitespace-nowrap p-[10px] hover:bg-gray-300/50 rounded-lg "
                }
                style={{
                  cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
                }}
              >
                <span>
                  <AiOutlineDelete
                    size={20}
                    color={darkmode ? "#fff" : "#8C8C8C"}
                  />
                </span>
                <button
                  className={`cursor-${
                    isAdmin.canEdit
                      ? "text-base text-gray-500 hover:text-black"
                      : "not-allowed"
                  } `}
                  onClick={() => {
                    if (isAdmin?.canDelete) deleteNode(id, node);
                  }}
                  disabled={!isAdmin?.canDelete}
                  style={{
                    cursor: !isAdmin?.canEdit ? "not-allowed" : "pointer",
                  }}
                >
                  <span
                    className={`text-base ${
                      darkmode ? "text-white" : "text-black/80"
                    } ml-2`}
                    style={{ cursor: "pointer" }}
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>

          <DefaultSideBar
            visible={showSide}
            mode={mode}
            currentDefault={"DF"}
            setVisible={setShowSide}
            sideBarData={getNode(id)}
            updatedNodeConfig={updatedNodeConfig}
          />
        </>
      )}
    </>
  );
}
