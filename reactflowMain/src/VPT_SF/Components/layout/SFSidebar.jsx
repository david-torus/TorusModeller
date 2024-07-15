/* eslint-disable*/
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import {
  applicationLists,
  artifactList,
  getNodeList,
  versionList,
} from "../../../commonComponents/api/fabricsApi";
import Builder from "../../../VPT_DJUI/builder";
import {
  cardUIPolicy,
  controlPolicy,
  colorPolicy,
} from "../../../commonComponents/utils/util";
import { toast } from "react-toastify";
import ReusableDropDown from "../../../commonComponents/reusableComponents/ReusableDropDown";
import { handleErrorLog } from "../../../commonComponents/api/errorlogApi";

const SFSidebar = ({
  updatedNodeConfig,
  setJson,
  currentModel,
  json,
  sendFabrics,
  sidebarVisible,
  tenant,
  group,
  application,
}) => {
  const { darkmode } = useContext(DarkmodeContext);
  const [artifactsList, setArtifactsList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [versionsList, setVersionList] = useState([]);
  const [selectedJson, setSelectedJson] = useState({});
  const [selectedArtifacts, setSelectedArtifacts] = useState(null);
  const [selectedapplication, setSelectedApplication] = useState(null);
  const [selectedVerison, setSelectedVerison] = useState(null);
  const [gettingNodes, setGettingNodes] = useState([]);
  const [selectionNodeId, setSelectionNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [fabricsOptions, setFabricsOptions] = useState({});
  {
    console.log(json, "sd");
  }

  /**
   * Updates the selected JSON object based on the provided event and name.
   *
   * @param {Object} e - The event object.
   * @param {string} name - The name of the JSON object.
   * @return {void} This function does not return a value.
   */
  const updateselectedJson = (e, name) => {
    try {
      if (Object.keys(e).length > 0) {
        setSelectedJson(e);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getArtifacts = async (selectedApplicationss) => {
    try {
      const response = await artifactList(
        tenant,
        group,
        selectedApplicationss,
        sendFabrics
      );
      if (response && response.data) {
        setArtifactsList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Retrieves a list of versions for the given artifacts.
   *
   * @param {Array} selectedArtifacts - The list of selected artifacts.
   * @return {Promise<void>} A Promise that resolves when the versions are retrieved.
   */
  const getVersions = async (selectedArtifacts) => {
    try {
      const response = await versionList(
        tenant,
        group,
        Array.from(selectedapplication)[0],
        selectedArtifacts,
        sendFabrics
      );
      if (response && response.data) {
        setVersionList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updates the fabric options based on the provided details and type.
   *
   * @param {Object} js - The fabric options object.
   * @param {Array} details - The details of the fabric options.
   * @param {string} type - The type of fabric options.
   * @return {Object} The updated fabric options object.
   */
  const handleFabricsOptions = (js, details, type) => {
    try {
      if (details && details.length > 0) {
        if (
          js.hasOwnProperty("actionAllowed") &&
          js.hasOwnProperty("actionDenied")
        ) {
          return {
            ...js,
            actionAllowed: {
              ...js?.actionAllowed,
              type: "allMultipleSelect",
              selectionList: ["*", ...details?.map((item) => item.resource)],
            },
            actionDenied: {
              ...js?.actionDenied,
              type: "allMultipleSelect",
              selectionList: ["*", ...details?.map((item) => item.resource)],
            },
            [type]: details,
          };
        } else {
          return {
            ...js,
            actionAllowed: {
              type: "allMultipleSelect",
              selectedValue: ["*"],
              selectionList: ["*", ...details?.map((item) => item.resource)],
            },
            actionDenied: {
              type: "allMultipleSelect",
              selectedValue: ["*"],
              selectionList: ["*", ...details?.map((item) => item.resource)],
            },
            [type]: details,
          };
        }
      } else {
        return {
          ...js,
          ...fabricsOptions,
          [type]: details,
        };
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Retrieves the nodes based on selected version, artifacts, application, tenant, group, and fabric details.
   *
   * @return {void} Sets the retrieved nodes using setGettingNodes.
   */
  const getNodes = useCallback(() => {
    try {
      getNodeList(
        Array.from(selectedapplication)[0],
        Array.from(selectedVerison)[0],
        Array.from(selectedArtifacts)[0],
        tenant,
        group,
        sendFabrics
      )
        .then((response) => {
          if (response && response.data) {
            setGettingNodes(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [
    selectedapplication,
    selectedVerison,
    selectedArtifacts,
    tenant,
    group,
    sendFabrics,
  ]);

  /**
   * Generates an array of control objects based on the provided control array.
   *
   * @param {Array} control - The array of control objects.
   * @return {Array} An array of control objects with the following properties:
   *   - resourceType: The resource type of the control.
   *   - resource: The resource name of the control.
   *   - SIFlag: An object with the following properties:
   *     - type: The type of the dropdown.
   *     - selectedValue: The selected value of the dropdown.
   *     - selectionList: The list of available selection values.
   *   - actionAllowed: An object with the following properties:
   *     - type: The type of the dropdown.
   *     - selectedValue: The selected value of the dropdown.
   *     - selectionList: The list of available selection values.
   *   - actionDenied: An object with the following properties:
   *     - type: The type of the dropdown.
   *     - selectedValue: The selected value of the dropdown.
   *     - selectionList: The list of available selection values.
   * If the control array is empty, an empty array is returned.
   */
  const handleControl = (control) => {
    if (control && control.length > 0) {
      return (
        control &&
        control.map((item) => {
          return {
            resourceType: "controls",
            resource: item.nodeName || "",
            // SIFlag: {
            //   type: "dropdown",
            //   selectedValue: "A",
            //   selectionList: ["A", "E"],
            // },
            // actionAllowed: {
            //   type: "dropdown",
            //   selectedValue: ["*"],
            //   selectionList: ["*", "Y", "N"],
            // },
            // actionDenied: {
            //   type: "dropdown",
            //   selectedValue: ["*"],
            //   selectionList: ["*", "Y", "N"],
            // },
          };
        })
      );
    } else return [];
  };

  /**
   * Handles the selection of nodes based on the value of `sendFabrics`.
   * If `sendFabrics` is "pf" or "PF", it filters the selected nodes from `selectionNodeId` and updates the `selectedJson` object accordingly.
   * If `sendFabrics` is "df" or "DF", it filters the selected nodes from `selectionNodeId` and updates the `selectedJson` object for `tableDetails` and `apiDetails`.
   * If `sendFabrics` is "uf" or "UF", it filters the selected nodes from `selectionNodeId` and updates the `selectedJson` object for `componentDetails`.
   *
   * @return {void} This function does not return anything.
   */
  const handleNodeSelection = useCallback(() => {
    try {
      if (sendFabrics === "pf" || sendFabrics === "PF") {
        let nodeIds = Array.from(selectionNodeId);

        let js = selectedJson;
        if (nodeIds && nodeIds.length > 0) {
          if (js.nodeDetails.length > 0) {
            js.nodeDetails = js.nodeDetails.filter((item) =>
              nodeIds.includes(item.id)
            );
            if (js.nodeDetails.length !== nodeIds.length) {
              let jsIds = js?.nodeDetails?.forEach((item) => item.id);
              let diff = nodeIds.filter((x) => !jsIds.includes(x));
              if (diff.length > 0) {
                let selectedN = gettingNodes.filter((item) => {
                  return diff && diff.includes(item.nodeId);
                });
                let ds = selectedN.map((item) => {
                  return {
                    id: item.nodeId,
                    resourceType: "ProcessFlow",
                    resource: item.nodeName || item?.data?.label || "",
                    SIFlag: {
                      type: "dropdown",
                      selectedValue: "A",
                      selectionList: ["A", "E"],
                    },
                    ...fabricsOptions,
                    nodeDetails: [],
                  };
                });
                js = {
                  ...handleFabricsOptions(
                    js,
                    [...js.nodeDetails, ...ds],
                    "nodeDetails"
                  ),
                };
              }
            } else {
              js = {
                ...handleFabricsOptions(
                  js,
                  js.nodeDetails || [],
                  "nodeDetails"
                ),
              };
            }
          } else {
            let selectedN = gettingNodes.filter((item) => {
              return nodeIds && nodeIds.includes(item.nodeId);
            });
            let ds = selectedN.map((item) => {
              return {
                id: item.nodeId,
                resourceType: "ProcessFlow",
                resource: item.nodeName || item?.data?.label || "",

                SIFlag: {
                  type: "dropdown",
                  selectedValue: "A",
                  selectionList: ["A", "E"],
                },
                ...fabricsOptions,
              };
            });

            js = {
              ...handleFabricsOptions(js, ds, "nodeDetails"),
            };
          }
        } else {
          js = {
            ...handleFabricsOptions(js, [], "nodeDetails"),
          };
        }
        updateselectedJson(js, "nodeDetails");
      }
      if (sendFabrics === "df" || sendFabrics === "DF") {
        let nodeIds = Array.from(selectionNodeId);
        let js = selectedJson;

        if (nodeIds && nodeIds.length > 0) {
          if (js.tableDetails.length > 0 || js.apiDetails.length > 0) {
            js.tableDetails = js.tableDetails.filter((item) =>
              nodeIds.includes(item.id)
            );
            js.apiDetails = js.apiDetails.filter((item) =>
              nodeIds.includes(item.id)
            );
            if (
              js.tableDetails.length !== nodeIds.length ||
              js.apiDetails.length !== nodeIds.length
            ) {
              let jsIds = js.tableDetails?.map((item) => item.id);
              let diff = nodeIds.filter((x) => !jsIds.includes(x));
              if (diff.length > 0) {
                let selectedN = gettingNodes.filter((item) => {
                  return diff && diff.includes(item.nodeId);
                });
                let ds = selectedN?.map((item) => {
                  return {
                    id: item.nodeId,
                    resourceType: "tables",
                    resource: item.nodeName || item?.data?.label || "",
                    SIFlag: {
                      type: "dropdown",
                      selectedValue: "A",
                      selectionList: ["A", "E"],
                    },
                    ...fabricsOptions,
                  };
                });
                js = {
                  ...handleFabricsOptions(
                    js,
                    [...js.tableDetails, ...ds],
                    "tableDetails"
                  ),
                };
                js = {
                  ...handleFabricsOptions(
                    js,
                    [...js.apiDetails, ...ds],
                    "apiDetails"
                  ),
                };
              }
            } else {
              js = {
                ...js,
                tableDetails: [...(js.tableDetails || [])],
                apiDetails: [...(js.apiDetails || [])],
              };
            }
          } else {
            let selectedN = gettingNodes.filter((item) => {
              return nodeIds && nodeIds.includes(item.nodeId);
            });
            let ds = selectedN?.map((item) => {
              return {
                id: item.nodeId,
                resourceType: "tables",
                resource: item.nodeName || item?.data?.label || "",
                SIFlag: {
                  type: "dropdown",
                  selectedValue: "A",
                  selectionList: ["A", "E"],
                },
                ...fabricsOptions,
              };
            });

            js = {
              ...handleFabricsOptions(
                js,
                [...js.tableDetails, ...ds],
                "tableDetails"
              ),
            };
            js = {
              ...handleFabricsOptions(
                js,
                [...js.apiDetails, ...ds],
                "apiDetails"
              ),
            };
          }
        } else {
          js = {
            ...js,
            tableDetails: [],
            apiDetails: [],
          };
        }

        updateselectedJson(js, "nodeDetails");
      }
      if (sendFabrics === "uf" || sendFabrics === "UF") {
        let nodeIds = Array.from(selectionNodeId);
        let js = selectedJson;
        if (nodeIds && nodeIds.length > 0) {
          if (js.componentDetails.length > 0) {
            js.componentDetails = js.componentDetails.filter((item) =>
              nodeIds.includes(item.id)
            );
            if (js.componentDetails.length !== nodeIds.length) {
              let jsIds = js.componentDetails?.map((item) => item.id);
              let diff = nodeIds.filter((x) => !jsIds.includes(x));
              if (diff.length > 0) {
                let selectedN = gettingNodes.filter((item) => {
                  return diff && diff.includes(item.nodeId);
                });

                let dts = selectedN?.map((item) => {
                  return {
                    ...handleFabricsOptions(
                      {
                        id: item.nodeId,
                        resourceType: "Component",
                        resource:
                          item.nodeName || item?.data?.label || item.nodeType,
                        SIFlag: {
                          type: "dropdown",
                          selectedValue: "A",
                          selectionList: ["A", "E"],
                        },
                      },
                      handleControl(item.control),
                      "controlDetails"
                    ),
                  };
                });
                js = {
                  ...handleFabricsOptions(
                    js,
                    [...js.componentDetails, ...dts],
                    "componentDetails"
                  ),
                };
              }
            } else {
              js = {
                ...handleFabricsOptions(
                  js,
                  js?.componentDetails,
                  "componentDetails"
                ),
              };
            }
          } else {
            let selectedN = gettingNodes.filter((item) => {
              return nodeIds && nodeIds.includes(item.nodeId);
            });
            let dts = selectedN?.map((item) => {
              return {
                ...handleFabricsOptions(
                  {
                    id: item.nodeId,
                    resourceType: "Component",
                    resource:
                      item.nodeName || item?.data?.label || item.nodeType,
                    SIFlag: {
                      type: "dropdown",
                      selectedValue: "A",
                      selectionList: ["A", "E"],
                    },
                  },
                  handleControl(item.control),
                  "controlDetails"
                ),
              };
            });
            js = {
              ...handleFabricsOptions(
                js,
                [...js.componentDetails, ...dts],
                "componentDetails"
              ),
            };
          }
        } else {
          js = {
            ...handleFabricsOptions(js, [], "componentDetails"),
          };
        }
        updateselectedJson(js, "nodeDetails");
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    selectionNodeId,
    sendFabrics,
    gettingNodes,
    handleControl,
    handleFabricsOptions,
    updateselectedJson,
  ]);

  useEffect(() => {
    if (selectionNodeId) {
      handleNodeSelection();
    }
  }, [selectionNodeId]);

  console.log(json, "nodeid");

  //this function for change the structure of json
  useEffect(() => {
    try {
      getNodes();
      if (
        selectedVerison &&
        json?.[currentModel] &&
        json?.[currentModel].length > 0
      ) {
        let filterJson = json?.[currentModel].filter((item) => {
          return (
            item.resource ===
            tenant +
              ":" +
              group +
              ":" +
              Array.from(selectedapplication)[0] +
              ":" +
              Array.from(selectedArtifacts)[0] +
              ":" +
              Array.from(selectedVerison)[0]
          );
        });

        if (filterJson && filterJson.length > 0) {
          let selectedJsons;
          if (sendFabrics === "pf" || sendFabrics === "PF") {
            selectedJsons = filterJson[0]?.nodeDetails;
          }
          if (sendFabrics === "df" || sendFabrics === "DF") {
            selectedJsons = filterJson[0]?.tableDetails;
          }
          if (sendFabrics === "uf" || sendFabrics === "UF") {
            selectedJsons = filterJson[0]?.componentDetails;
          }

          updateselectedJson(filterJson[0]);
          if (selectedJsons && selectedJsons.length > 0) {
            setSelectionNodeId(
              new Set(
                selectedJsons?.map((item) => {
                  return item.id;
                })
              )
            );
          }
        } else {
          if (sendFabrics === "pf" || sendFabrics === "PF") {
            updateselectedJson({
              resourceType: "ProcessFlow",
              resource:
                tenant +
                ":" +
                group +
                ":" +
                Array.from(selectedapplication)[0] +
                ":" +
                Array.from(selectedArtifacts)[0] +
                ":" +
                Array.from(selectedVerison)[0],
              SIFlag: {
                type: "dropdown",
                selectedValue: "A",
                selectionList: ["A", "E"],
              },
              ...fabricsOptions,
              nodeDetails: [],
            });
          }
          if (sendFabrics === "df" || sendFabrics === "DF") {
            updateselectedJson({
              resourceType: "tables",
              resource:
                tenant +
                ":" +
                group +
                ":" +
                Array.from(selectedapplication)[0] +
                ":" +
                Array.from(selectedArtifacts)[0] +
                ":" +
                Array.from(selectedVerison)[0],

              tableDetails: [],
              apiDetails: [],
            });
          }
          if (sendFabrics === "uf" || sendFabrics === "UF") {
            updateselectedJson({
              resourceType: "Page",
              resource:
                tenant +
                ":" +
                group +
                ":" +
                Array.from(selectedapplication)[0] +
                ":" +
                Array.from(selectedArtifacts)[0] +
                ":" +
                Array.from(selectedVerison)[0],
              SIFlag: {
                type: "dropdown",
                selectedValue: "A",
                selectionList: ["A", "E"],
              },
              ...fabricsOptions,
              componentDetails: [],
            });
          }
        }
      } else if (selectedVerison) {
        if (sendFabrics === "pf" || sendFabrics === "PF") {
          updateselectedJson({
            resourceType: "ProcessFlow",
            resource:
              tenant +
              ":" +
              group +
              ":" +
              Array.from(selectedapplication)[0] +
              ":" +
              Array.from(selectedArtifacts)[0] +
              ":" +
              Array.from(selectedVerison)[0],
            SIFlag: {
              type: "dropdown",
              selectedValue: "A",
              selectionList: ["A", "E"],
            },
            ...fabricsOptions,
            nodeDetails: [],
          });
        }
        if (sendFabrics === "df" || sendFabrics === "DF") {
          updateselectedJson({
            resourceType: "tables",
            resource:
              tenant +
              ":" +
              group +
              ":" +
              Array.from(selectedapplication)[0] +
              ":" +
              Array.from(selectedArtifacts)[0] +
              ":" +
              Array.from(selectedVerison)[0],

            tableDetails: [],
            apiDetails: [],
          });
        }
        if (sendFabrics === "uf" || sendFabrics === "UF") {
          updateselectedJson({
            resourceType: "Page",
            resource:
              tenant +
              ":" +
              group +
              ":" +
              Array.from(selectedapplication)[0] +
              ":" +
              Array.from(selectedArtifacts)[0] +
              ":" +
              Array.from(selectedVerison)[0],
            SIFlag: {
              type: "dropdown",
              selectedValue: "A",
              selectionList: ["A", "E"],
            },
            ...fabricsOptions,
            componentDetails: [],
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    selectedVerison,
    sendFabrics,
    selectedapplication,
    fabricsOptions,

    selectedArtifacts,
    tenant,
    group,
    json,
  ]);

  useEffect(() => {
    try {
      let options = {
        actionAllowed: [],
        actionDenied: [],
      };

      if (sendFabrics === "pf" || sendFabrics === "PF") {
        options.actionAllowed = {
          type: "multipleSelect",
          selectedValue: ["*"],
          selectionList: ["*", "Read", "Execute", "Debug"],
        };
        options.actionDenied = {
          type: "multipleSelect",
          selectedValue: ["*"],
          selectionList: ["*", "Read", "Execute", "Debug"],
        };
      }
      if (sendFabrics === "df" || sendFabrics === "DF") {
        options.actionAllowed = {
          type: "multipleSelect",
          selectedValue: ["*"],
          selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
        };
        options.actionDenied = {
          type: "multipleSelect",
          selectedValue: ["*"],
          selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
        };
      }
      if (sendFabrics === "uf" || sendFabrics === "UF") {
        options.actionAllowed = {
          type: "multipleSelect",
          selectedValue: ["*"],
          selectionList: ["*", "Y", "N"],
        };
        options.actionDenied = {
          type: "multipleSelect",
          selectedValue: ["*"],
          selectionList: ["*", "Y", "N"],
        };
      }
      setFabricsOptions(options);
    } catch (error) {
      console.error(error);
    }
  }, [sendFabrics]);

  // useEffect(() => {
  //   if (selectedapplication) {
  //     try {
  //       artifactList(tenant, group, Array.from(selectedapplication)[0], sendFabrics).then(
  //         (response) => {
  //           if (response && response.data) {
  //             setArtifactsList(response.data);
  //           }
  //         }
  //       );
  //     } catch (error) {
  //       const errObj = {
  //         tname: "TM",
  //         errGrp: "Technical",
  //         fabrics: "SF",
  //         errType: "Fatal",
  //         errCode: "TM005",
  //       };
  //       const Token =
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoidGVzdCIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6IiIsIm1vYmlsZSI6IiIsIjJGQUZsYWciOiJZIiwicm9sZSI6InNlbmlvcmRldiIsImNsaWVudCI6IkFCQyIsImlhdCI6MTcxOTU1NDIyOX0.1Gk5Lpf14W9twZEYxov1pik1vYunYP5CwKEoG2YEKG4";

  //       const key = `${tenant}:${group}:${application}:${"SF"}:"":""`;

  //       const errorMessage = "Cannot load Flow details";
  //       const statusCode = "400";

  //       handleErrorLog(errObj, Token, key, errorMessage, statusCode)
  //         .then((res) => {
  //           console.log(res, "res");
  //         })
  //         .catch((err) => {
  //           throw err;
  //         });

  //       console.error(error);
  //     }

  //     return () => {
  //       setArtifactsList([]);
  //       setVersionList([]);
  //       setSelectedArtifacts(null);
  //       setSelectedVerison(null);
  //       setSelectedNode(null);
  //     };
  //   }
  // }, [tenant, group,selectedapplication, sendFabrics]); // Add dependencies if necessary

  useEffect(() => {
    try {
      applicationLists(tenant, group, sendFabrics).then((response) => {
        if (response && response.data) {
          setApplicationList(response.data);
        }
      });
    } catch (error) {
      const errObj = {
        tname: "TM",
        errGrp: "Technical",
        fabrics: "SF",
        errType: "Fatal",
        errCode: "TM005",
      };
      const Token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoidGVzdCIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6IiIsIm1vYmlsZSI6IiIsIjJGQUZsYWciOiJZIiwicm9sZSI6InNlbmlvcmRldiIsImNsaWVudCI6IkFCQyIsImlhdCI6MTcxOTU1NDIyOX0.1Gk5Lpf14W9twZEYxov1pik1vYunYP5CwKEoG2YEKG4";

      const key = `${tenant}:${group}:${applicationList}:${"SF"}:"":""`;

      const errorMessage = "Cannot load Flow details";
      const statusCode = "400";

      handleErrorLog(errObj, Token, key, errorMessage, statusCode)
        .then((res) => {
          console.log(res, "res");
        })
        .catch((err) => {
          throw err;
        });

      console.error(error);
    }

    return () => {
      setArtifactsList([]);
      setVersionList([]);
      setSelectedArtifacts(null);
      setSelectedVerison(null);
      setSelectedNode(null);
    };
  }, [tenant, group, sendFabrics]);

  const handleApplicationChange = (e) => {
    try {
      setSelectedArtifacts(null);
      if (Array.from(e)[0]) {
        getArtifacts(Array.from(e)[0]);
      } else {
        setArtifactsList([]);
      }
      setSelectedApplication(e);
    } catch (err) {
      console.error(err);
    }
  };

  // Add dependencies if necessar
  const handleArtifactsChange = (e) => {
    try {
      setSelectedVerison(null);
      if (Array.from(e)[0]) {
        getVersions(Array.from(e)[0]);
      } else {
        setVersionList([]);
      }
      setSelectedArtifacts(e);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Sidebar
      visible={sidebarVisible}
      className={darkmode ? "bg-[#242424]" : "bg-[#fff]"}
      position="right"
      style={{ height: "100%", width: "30vw" }}
      onHide={() => {
        updatedNodeConfig();
        setSelectionNodeId(null);
        setGettingNodes([]);
        setSelectedJson({});
        setSelectedApplication(null);
        setSelectedVerison(null);
        setSelectedArtifacts(null);
        setSelectedNode(null);
      }}
    >
      <div>
        {/**Artifacts & Version Secetions based on the seleceted fabric  */}
        <div
          className=" p-sidebar-header "
          style={{
            position: "absolute",
            top: "4px",
          }}
        >
          <Button
            variant="outline"
            className={`${
              darkmode
                ? "w-full border border-slate-600 right-5  bg-[#368289] rounded-md text-[#F4F4F5] "
                : "w-full border border-slate-400/30 right-5 bg-[#023F8A] text-white "
            }`}
            size="sm"
            onClick={() => {
              setJson((prev) => {
                return {
                  ...prev,
                  [currentModel]:
                    prev?.[currentModel] && Array.isArray(prev[currentModel])
                      ? [
                          ...prev[currentModel].filter(
                            (item) => item.resource !== selectedJson.resource
                          ),
                          selectedJson,
                        ]
                      : [selectedJson],
                };
                // if (Array.isArray(prev)) {
                //   return [
                //     ...prev.filter(
                //       (item) => item.resource !== selectedJson.resource
                //     ),
                //     selectedJson,
                //   ];
                // }
                //  else {
                //   return [selectedJson];
                // }
              });

              toast.success("Data saved successfully!", {
                position: "bottom-right",
                theme: darkmode ? "dark" : "light",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            Save Data
          </Button>
        </div>

        <div className="w-full h-[20%] py-2 px-2 grid grid-cols-6 gap-1 mt-3">
          <div className="col-span-3">
            {/** Application Secetions based on the seleceted fabrics  */}
            <ReusableDropDown
              isDisabled={
                applicationList && applicationList.length < 0 ? true : false
              }
              darkmode={darkmode}
              key={"sfApplication"}
              title={
                (selectedapplication && Array.from(selectedapplication)[0]) ||
                "Application"
              }
              selectedKey={selectedapplication}
              DropdownMenuClassName={
                applicationList && applicationList.length > 6
                  ? "h-56 overflow-y-scroll"
                  : ""
              }
              handleSelectedKey={handleApplicationChange}
              items={
                applicationList &&
                applicationList?.map((item, index) => {
                  return {
                    key: item,
                    label: item,
                  };
                })
              }
            />

            {applicationList && applicationList.length > 0 && (
              <div>
                {applicationList.length > 0 && (
                  <div className="flex items-center justify-center text-xs text-gray-400">
                    {applicationList &&
                      applicationList.length > 0 &&
                      applicationList?.forEach((obj) => {
                        <p>{obj}</p>;
                      })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-span-3">
            {/** Artifacts Secetions based on the seleceted fabrics  */}
            <ReusableDropDown
              isDisabled={
                artifactsList && artifactsList.length < 0 ? true : false
              }
              darkmode={darkmode}
              key={"sfArtifact"}
              title={
                (selectedArtifacts && Array.from(selectedArtifacts)[0]) ||
                "Artifacts"
              }
              selectedKey={selectedArtifacts}
              DropdownMenuClassName={
                artifactsList && artifactsList.length > 6
                  ? "h-56 overflow-y-scroll"
                  : ""
              }
              handleSelectedKey={handleArtifactsChange}
              items={
                artifactsList &&
                artifactsList?.map((item, index) => {
                  return {
                    key: item,
                    label: item,
                  };
                })
              }
            />

            {artifactsList && artifactsList.length > 0 && (
              <div>
                {artifactsList.length > 0 && (
                  <div className="flex items-center justify-center text-xs text-gray-400">
                    {artifactsList &&
                      artifactsList.length > 0 &&
                      artifactsList?.forEach((obj) => {
                        <p>{obj}</p>;
                      })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-span-3">
            {/** Versions Secetions based on the seleceted fabrics  */}
            <ReusableDropDown
              darkmode={darkmode}
              key={"sfversion"}
              title={
                (selectedVerison && Array.from(selectedVerison)[0]) || "Version"
              }
              selectedKey={selectedVerison}
              DropdownMenuClassName={
                versionsList && versionsList.length > 6
                  ? "h-30 overflow-y-scroll  "
                  : ""
              }
              handleSelectedKey={setSelectedVerison}
              items={
                versionsList &&
                versionsList?.map((item, index) => {
                  return {
                    key: item,
                    label: item,
                  };
                })
              }
            />
          </div>

          {console.log(gettingNodes, "get")}
          {/*Node name and node id have to dispaly on this Selection*/}
          <div className="col-span-6">
            <Dropdown
              classNames={{
                base: "w-full",
                content: "w-full p-1 ",
              }}
            >
              <DropdownTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className={`${
                    darkmode
                      ? "w-full border border-slate-400/30 text-[#F4F4F5] "
                      : "w-full border border-slate-400/30 text-black "
                  }`}
                >
                  <span
                    className="truncate "
                    title={
                      (selectedNode && Array.from(selectedNode).join(",")) ||
                      "Node"
                    }
                  >
                    {(selectedNode && Array.from(selectedNode).join(",")) ||
                      "Node"}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                className={
                  gettingNodes && gettingNodes.length > 6
                    ? "h-30 overflow-y-scroll  "
                    : ""
                }
                itemClasses={{
                  base: [
                    "rounded-md",
                    "text-white font-bold",
                    "transition-opacity",
                    "data-[hover=true]:text-pink-500 font-bold",
                    "data-[hover=true]:bg-gray-600/40 ",
                    "dark:data-[hover=true]:bg-[#1E1E1E]",
                    "data-[selectable=true]:focus:bg-gray-600/40",
                    "data-[pressed=true]:opacity-70",
                    "data-[focus-visible=true]:ring-default-500",
                  ],
                  selectedIcon: "w-1 h-1 flex items-center",
                }}
                classNames={{
                  base: "bg-[#1E1E1E] text-white font-bold p-[5px] rounded-lg ",
                }}
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectionNodeId}
                onSelectionChange={(key) => {
                  setSelectionNodeId(key);
                }}
                items={
                  gettingNodes &&
                  gettingNodes?.map((obj, index) => {
                    return {
                      key: obj.nodeId,
                      label: obj.nodeName || obj.nodeType,
                      type: obj.nodeType,
                    };
                  })
                }
              >
                {(item, index) => (
                  <DropdownItem
                    key={item.key}
                    color={item.key === "delete" ? "danger" : "default"}
                    className={item.key === "delete" ? "text-danger" : ""}
                  >
                    <div className="w-[100%] flex gap-2 items-center">
                      <Avatar
                        alt={item.label}
                        className="w-[20%] flex-shrink-0"
                        size="sm"
                        name={item.type}
                      />
                      <div className="flex flex-col w-[80%]">
                        <span className="text-small text-slate-200">
                          {item.label === ""
                            ? "Node name is not available"
                            : item.label}
                        </span>
                        <span className="text-tiny text-slate-400">
                          {item.key}
                        </span>
                      </div>
                    </div>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* SI Flag selction */}
          <div className="grid grid-cols-6 gap-2">
            <div className="flex items-center justify-between"></div>
          </div>
        </div>

        {selectedJson && (
          <Builder
            key={"MT"}
            uiPolicy={cardUIPolicy}
            keys={"MT"}
            defaultJSOn={selectedJson}
            updatedNodeConfig={updateselectedJson}
            isAdmin={{
              canAdd: true,
              canDelete: true,
              canEdit: true,
            }}
            controlPolicy={controlPolicy}
            colorPolicy={colorPolicy}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default SFSidebar;
