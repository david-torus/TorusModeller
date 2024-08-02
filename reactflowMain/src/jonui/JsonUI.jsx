import { memo, useEffect, useState } from "react";
import FabricsSideBar from "../sidebars/fabricsSideBar/FabricsSideBar";
import _ from "lodash";
import { unflatten } from "flat";
import {
  CustomCode,
  Documents,
  ElementInfo,
  Enities,
  Enumeration,
  Execution,
  MapperIcon,
  ProcessObject,
  RulesIcon,
  Security,
  SourceIcon,
  Validation,
} from "../asset/SvgsApplication";
import { NodeInfoSidebarTabs } from "../commonComponents/CommonSideBar/NodeInfoSidebarTabs";
import { MdOutlineEventNote } from "react-icons/md";
import NewNodeInfoSidebar from "./NewNodeInfoSidebar";

const js = {
  orgGrp: [
    {
      grouplabel: "Organization Group1",
      label: "Organization Group",
      orgGrpName: "orgGrp1",
      orgGrpCode: "OG1",
      SIFlag: {
        label: "SI Flag",
        type: "boolean",
        selectedValue: false,
        selectionList: [true, false],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["O1", "O2"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["O3", "O4"],
      },
    },
    {
      grouplabel: "Organization Group2",
      label: "Organization Group2",
      orgGrpName: "orgGrp2",
      orgGrpCode: "OG2",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: [],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["O1", "O2"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["O3", "O4"],
      },
    },
  ],
  "orgGrp/0/org": [
    {
      grouplabel: "Organization1",
      label: "Organization",
      orgCode: "O1",
      orgName: "Org1",
    },
  ],
  "orgGrp/0/org/0/roleGrp": [
    {
      grouplabel: "Role Group1",
      label: "Role Group",
      roleGrpCode: "RG1",
      roleGrpName: "roleGrp1",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["R1", "R2"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["R3", "R4"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/nodeType": { label: "Node Type", value: "roleGrp" },
  "orgGrp/0/org/0/roleGrp/0/roles": [
    {
      grouplabel: "Role",
      label: "Role",
      roleCode: "R1",
      roleName: "role1",
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp": [
    {
      grouplabel: "Permission Set Group1",
      label: "Permission Set Group",
      psGrpCode: "PSG1",
      psGrpName: "PSGrp1",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["ps1", "ps2"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["ps3", "ps4"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps": [
    {
      grouplabel: "Permission Set1",
      label: "Permission Set",
      psCode: "ps1",
      psName: "PS1",
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/pf": [
    {
      grouplabel: "Process Flow1",
      label: "Process Flow",
      resourceType: "ProcessFlow",
      resource: "ABC:CG:ME:bankmaster:v1",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["*", "ManualInput"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["*", "ManualInput"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/pf/0/nodeDetails": [
    {
      grouplabel: "Node Details1",
      label: "Node Details",
      id: "3e43a200-c58d-461e-8e7f-13365ded730d",
      resourceType: "ProcessFlow",
      resource: "ManualInput",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["A", "E"],
      },
    },
    {
      grouplabel: "Node Details2",
      label: "Node Detailsdsff",
      id: "3e43a200-c58d-461e-8e7f-13365ded730d",
      resourceType: "ProcessFlow",
      resource: "ManualInput",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["A", "E"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/pf/0/nodeDetails/0/actionAllowed":
    {
      label: "Allowed Actions",
      type: "multipleSelect",
      selectedValue: [],
      selectionList: ["*", "Read", "Execute", "Debug"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/pf/0/nodeDetails/0/actionDenied":
    {
      label: "Denied Actions",
      type: "multipleSelect",
      selectedValue: [],
      selectionList: ["*", "Read", "Execute", "Debug"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df": [
    {
      grouplabel: "Data Flow1",
      label: "Data Flow",
      resourceType: "tables",
      resource: "ABC:CG:ME:cg:v1",
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/tableDetails": [
    {
      grouplabel: "Table Details1",
      label: "Table Details",
      id: "38828038-b6a6-4da9-9931-7d1a71344fe1",
      resourceType: "tables",
      resource: "test_banks",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["A", "E"],
      },
    },
    {
      label: "Table Details",
      id: "115066c7-1363-4920-9710-d939739873ce",
      resourceType: "tables",
      resource: "psmv_banks",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: [],
        selectionList: ["A", "E"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/tableDetails/0/actionAllowed":
    {
      label: "Allowed Actions",
      type: "multipleSelect",
      selectedValue: [],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/tableDetails/0/actionDenied":
    {
      label: "Denied Actions",
      type: "multipleSelect",
      selectedValue: [],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/tableDetails/1/actionAllowed":
    {
      label: "Allowed Actions",
      type: "multipleSelect",
      selectedValue: [],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/tableDetails/1/actionDenied":
    {
      label: "Denied Actions",
      type: "multipleSelect",
      selectedValue: [],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/apiDetails": [
    {
      grouplabel: "API Details1",
      label: "API Details",
      id: "38828038-b6a6-4da9-9931-7d1a71344fe1",
      resourceType: "tables",
      resource: "test_banks",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: "A",
        selectionList: ["A", "E"],
      },
    },
    {
      label: "API Details",
      id: "115066c7-1363-4920-9710-d939739873ce",
      resourceType: "tables",
      resource: "psmv_banks",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: "A",
        selectionList: ["A", "E"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/apiDetails/0/actionAllowed":
    {
      label: "Allowed Actions",
      type: "multipleSelect",
      selectedValue: [],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/apiDetails/0/actionDenied":
    {
      label: "Denied Actions",
      type: "multipleSelect",
      selectedValue: ["*"],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/apiDetails/1/actionAllowed":
    {
      label: "Allowed Actions",
      type: "multipleSelect",
      selectedValue: ["*"],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/apiDetails/1/actionDenied":
    {
      label: "Denied Actions",
      type: "multipleSelect",
      selectedValue: ["*"],
      selectionList: ["*", "GET", "GETBYONE", "POST", "UPDATE", "DELETE"],
    },
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/uf": [
    {
      grouplabel: "User Functions1",
      label: "User Functions",
      resourceType: "Page",
      resource: "ABC:CG:ME:branchmaster:v1",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: "A",
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "", "nav1"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "", "nav1"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/uf/0/componentDetails": [
    {
      grouplabel: "Component Details1",
      label: "Component Details",
      id: "2970d268-4425-40ae-969d-2ee9676adcf8",
      resourceType: "Component",
      resource: "masterForm",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: "A",
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "title", "save", "sub"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "title", "save", "sub"],
      },
    },
    {
      label: "Component Details",
      id: "69f5e666-3699-4083-ac59-39adb61b586d",
      resourceType: "Component",
      resource: "nav1",
      SIFlag: {
        label: "SI Flag",
        type: "dropdown",
        selectedValue: "A",
        selectionList: ["A", "E"],
      },
      actionAllowed: {
        label: "Allowed Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "masterNavbar"],
      },
      actionDenied: {
        label: "Denied Actions",
        type: "dropdown",
        selectedValue: ["*"],
        selectionList: ["*", "masterNavbar"],
      },
    },
  ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/uf/0/componentDetails/0/controlDetails":
    [
      {
        grouplabel: "Control Details1",
        label: "Control Details",
        resourceType: "controls",
        resource: "title",
        SIFlag: {
          label: "SI Flag",
          type: "dropdown",
          selectedValue: "A",
          selectionList: ["A", "E"],
        },
        actionAllowed: {
          label: "Allowed Actions",
          type: "dropdown",
          selectedValue: "Y",
          selectionList: ["*", "Y", "N"],
        },
        actionDenied: {
          label: "Denied Actions",
          type: "dropdown",
          selectedValue: ["*"],
          selectionList: ["*", "Y", "N"],
        },
      },
      {
        label: "Control Detailsadws",
        resourceType: "controls",
        resource: "save",
        SIFlag: {
          label: "SI Flag",
          type: "dropdown",
          selectedValue: "A",
          selectionList: ["A", "E"],
        },
        actionAllowed: {
          label: "Allowed Actions",
          type: "dropdown",
          selectedValue: "Y",
          selectionList: ["*", "Y", "N"],
        },
        actionDenied: {
          label: "Denied Actions",
          type: "dropdown",
          selectedValue: ["*"],
          selectionList: ["*", "Y", "N"],
        },
      },
      {
        label: "Control Detailasd",
        resourceType: "controls",
        resource: "sub",
        SIFlag: {
          label: "SI Flag",
          type: "dropdown",
          selectedValue: "A",
          selectionList: ["A", "E"],
        },
        actionAllowed: {
          label: "Allowed Actions",
          type: "dropdown",
          selectedValue: "Y",
          selectionList: ["*", "Y", "N"],
        },
        actionDenied: {
          label: "Denied Actions",
          type: "dropdown",
          selectedValue: ["*"],
          selectionList: ["*", "Y", "N"],
        },
      },
    ],
  "orgGrp/0/org/0/roleGrp/0/roles/0/psGrp/0/ps/0/df/0/uf/0/componentDetails/1/controlDetails":
    [
      {
        grouplabel: "Control Details1",
        label: "Control Details",
        resourceType: "controls",
        resource: "navbar",
        SIFlag: {
          label: "SI Flag",
          type: "dropdown",
          selectedValue: "A",
          selectionList: ["A", "E"],
        },
        actionAllowed: {
          label: "Allowed Actions",
          type: "dropdown",
          selectedValue: "Y",
          selectionList: ["*", "Y", "N"],
        },
        actionDenied: {
          label: "Denied Actions",
          type: "dropdown",
          selectedValue: ["*"],
          selectionList: ["*", "Y", "N"],
        },
      },
    ],
};

const RenderObject = ({
  obj,
  handlejs,
  OgJson,
  showNodeProperty,
  sideBarData,
  currentDrawing,
  setShowNodeProperty,
  setToggleReactflow,
  nodeInfoTabs,
  setDupJson,
  handleAddjs,
  handleDeletejs,
}) => {
  return (
    <>
      {
        <FabricsSideBar
          obj={obj}
          handlejs={handlejs}
          OgJson={OgJson}
          showNodeProperty={showNodeProperty}
          sideBarData={sideBarData}
          currentDrawing={currentDrawing}
          setShowNodeProperty={setShowNodeProperty}
          setToggleReactflow={setToggleReactflow}
          nodeInfoTabs={nodeInfoTabs}
          setDupJson={setDupJson}
          handleAddjs={handleAddjs}
          handleDeletejs={handleDeletejs}
        />
      }
    </>
  );
};

export const nodeInfoTabs = {
  PF: [
    {
      label: "Data",
      icon: <SourceIcon />,
      modelOpen: "data",
    },
    {
      label: "Mapper",
      icon: <MapperIcon />,
      modelOpen: "mapper",
    },
    {
      label: "Rule",
      icon: <RulesIcon />,
      modelOpen: "rule",
    },
    {
      label: "CustomCode",
      icon: <CustomCode />,
      modelOpen: "customCode",
    },
    {
      label: "Validation",
      icon: <Validation />,
      modelOpen: "validation",
    },
    {
      label: "Security",
      icon: <Security />,
      modelOpen: "security",
    },
    {
      label: "Execution",
      icon: <Execution />,
      modelOpen: "execution",
    },
    {
      label: "Documents",
      icon: <Documents />,
      modelOpen: "data",
    },
  ],
  UF: [
    {
      label: "ElementInfo",
      icon: <ElementInfo />,
      modelOpen: "elementInfo",
    },
    {
      label: "Datasource",
      icon: <SourceIcon />,
      modelOpen: "config",
    },
    {
      label: "Events",
      icon: <MdOutlineEventNote />,
      modelOpen: "events",
    },

    {
      label: "CustomCode",
      icon: <CustomCode />,
      modelOpen: "customCode",
    },
    {
      label: "Validation",
      icon: <Validation />,
      modelOpen: "validation",
    },
    {
      label: "Security",
      icon: <Security />,
      modelOpen: "security",
    },
    {
      label: "Execution",
      icon: <Execution />,
      modelOpen: "execution",
    },
    {
      label: "Documents",
      icon: <Documents />,
      modelOpen: "documents",
    },
  ],
  DF: [
    {
      label: "Entities",
      icon: <Enities />,
      modelOpen: "entities",
    },
    {
      label: "DataSource",
      icon: <SourceIcon />,
      modelOpen: "config",
    },
    {
      label: "Enum",
      icon: <Enumeration />,
      modelOpen: "mapper",
    },
    {
      label: "ProcessObjects",
      icon: <ProcessObject />,
      modelOpen: "processObj",
    },
    {
      label: "Validation",
      icon: <Validation />,
      modelOpen: "validation",
    },
    {
      label: "Security",
      icon: <Security />,
      modelOpen: "security",
    },
    {
      label: "Execution",
      icon: <Execution />,
      modelOpen: "execution",
    },
    {
      label: "Documents",
      icon: <Documents />,
      modelOpen: "documents",
    },
  ],
  SF: [
    {
      label: "PF",
      icon: <Enities />,
      modelOpen: "pf",
    },
    {
      label: "DF",
      icon: <SourceIcon />,
      modelOpen: "df",
    },
    {
      label: "UF",
      icon: <Enumeration />,
      modelOpen: "uf",
    },
    {
      label: "Portel",
      icon: <ProcessObject />,
      modelOpen: "portel",
    },
  ],
};

export const RenderJson = memo(
  ({
    showNodeProperty,
    sideBarData,
    currentDrawing,
    setShowNodeProperty,
    setToggleReactflow,
    json,
    updatedNodeConfig,
    nodedata,

  }) => {
    const [dupJson, setDupJson] = useState(null);

    const [convertedJson, setConvertedJson] = useState(null);

    function convertJson(obj) {
      const converted = {};
      for (let key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          converted[key.replace(/\//g, ".")] = convertJson(obj[key]);
        } else if (Array.isArray(obj[key])) {
          converted[key.replace(/\//g, ".")] = obj[key];
        } else {
          converted[key.replace(/\//g, ".")] = obj[key];
        }
      }
      console.log(converted, "ctct");

      return converted;
    }

    function replaceKeys(obj) {
      if (Array.isArray(obj)) {
        return obj.map((item) => replaceKeys(item));
      } else if (typeof obj === "object" && obj !== null) {
        let newObj = {};
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            let newKey = key.replace(/\//g, ".");
            newObj[newKey] = replaceKeys(obj[key]);
          }
        }
        return newObj;
      } else {
        return obj;
      }
    }

    const OgJson = () => {
      const jss = convertJson(dupJson);
      const newjson = JSON.stringify(jss, null, 2);

      let newjs = unflatten(jss);
      console.log(newjs, nodedata, "new");

      setConvertedJson(newjs);
      updatedNodeConfig(
        nodedata?.id,
        {
          nodeId: nodedata?.id,
          nodeName: nodedata?.data?.label,
          nodeType: nodedata?.type,
        },
        {
          ...newjs,
        },
      );

      // setJson(newjs);
    };

    const handlejs = (e, i, key, type, jskey) => {
      if (type == "obj") {
        setDupJson((prev) => {
          return {
            ...prev,
            [i]: {
              ...prev[i],
              [key]: e,
            },
          };
        });
      }
      if (type == "arr-0" || type == "arr-1" || type == "arr") {
        if (i) {
          const js = structuredClone(dupJson);
          _.set(js, i, e);
          setDupJson(js);
          console.log(js, "arrjs");
        }
      }

      if (type == "dropdown" || type == "boolean") {
        if (i) {
          const js = structuredClone(dupJson);
          _.set(js, i, e);
          setDupJson(js);
          console.log(js, "arrjs");
        }
      }
    };

    const handleAddjs = (path, key, value, type, i, selectedType) => {
      console.log(path, key, value, type, i, selectedType, "handleAddjs");
      if (type == "obj" && selectedType === "input") {
        setDupJson((prev) => {
          return {
            ...prev,
            [path]: {
              ...prev[path],
              [key]: value,
            },
          };
        });
      } else if (type == "obj" && selectedType === "boolean") {
        setDupJson((prev) => {
          return {
            ...prev,
            [path]: {
              ...prev[path],
              [key]: {
                label: key,
                type: "boolean",
                selectedValue: false,
                selectionList: [true, false],
              },
            },
          };
        });
      } else if (type == "obj" && selectedType === "dropdown") {
        setDupJson((prev) => {
          return {
            ...prev,
            [path]: {
              ...prev[path],
              [key]: {
                label: key,
                type: "dropdown",
                selectedValue: "",
                selectionList: value,
              },
            },
          };
        });
      } else if (type === "arr-1" && selectedType === "input") {
        setDupJson((prev) => {
          return {
            ...prev,
            [path]: prev[path].map((item, index) => {
              if (index === i) {
                return {
                  ...item,
                  [key]: value,
                };
              } else {
                return item;
              }
            }),
          };
        });
      } else if (type === "arr-1" && selectedType === "boolean") {
        setDupJson((prev) => {
          return {
            ...prev,
            [path]: prev[path].map((item, index) => {
              if (index === i) {
                return {
                  ...item,
                  [key]: {
                    label: key,
                    type: "boolean",
                    selectedValue: false,
                    selectionList: [true, false],
                  },
                };
              } else {
                return item;
              }
            }),
          };
        });
      } else if (type == "arr-1" && selectedType === "dropdown") {
        setDupJson((prev) => {
          return {
            ...prev,
            [path]: prev[path].map((item, index) => {
              if (index === i) {
                return {
                  ...item,
                  [key]: {
                    label: key,
                    type: "dropdown",
                    selectedValue: "",
                    selectionList: value,
                  },
                };
              } else {
                return item;
              }
            }),
          };
        });
      } else if (type === "arr-0" && selectedType === "object") {
        setDupJson((prev) => {
          return {
            ...prev,
            [path]: [
              ...prev[path],
              {
                label: key,
              },
            ],
          };
        });
      }
    };

    const handleDeletejs = (path, type, label) => {
      if (type === "arr-1") {
        setDupJson((prev) => {
          const updatedObj = _.cloneDeep(prev);
          const events = _.get(updatedObj, path);
          _.remove(events, (event) => event.label === label);
          return updatedObj;
        });
      } else {
        console.log(path, dupJson, "bef");
        setDupJson((prev) => {
          // const updatedObj = _.cloneDeep(prev);
          _.unset(prev, path);
          return prev;
        });
      }
    };
    console.log(dupJson, "aft");

    function denormalizeJson(obj, prefix = "", result = {}, originalObj) {
      const copy = JSON.parse(JSON.stringify(obj));
      for (let key in copy) {
        if (copy.hasOwnProperty(key)) {
          let newKey = prefix ? `${prefix}/${key}` : key;
          if (
            typeof copy[key] === "object" &&
            copy[key] !== null &&
            !Array.isArray(copy[key])
          ) {
            if (
              !(
                copy[key].hasOwnProperty("type") &&
                (copy[key].type === "dropdown" || copy[key].type === "boolean")
              )
            ) {
              if (copy[key] === originalObj) {
                return result; // Return early if the object being processed is the same as the original object
              }
              result[newKey] = copy[key];
              denormalizeJson(copy[key], newKey, result, originalObj);
              delete copy[key];
            }
          } else if (
            Array.isArray(copy[key]) &&
            typeof copy[key][0] === "object"
          ) {
            result[newKey] = copy[key];
            copy[key].forEach((item, index) => {
              if (typeof item === "object" && item !== null) {
                const nestedKey = `${newKey}/${index}`;
                denormalizeJson(item, nestedKey, result, originalObj);
              } else {
                result[newKey][index] = item;
              }
            });
            delete copy[key];
          } else {
            if (!prefix) {
              result[copy["label"]] = copy;
            }
          }
        }
      }
      return result;
    }

    const haandledenormalize = () => {
      if (json) {
        const denormalized = denormalizeJson(json);
        console.log(denormalized, "denormalized");
        setDupJson(structuredClone(denormalized));
      }
    };

    useEffect(() => {
      haandledenormalize();
    }, [json]);

    console.log(convertedJson, nodedata, "convertedJson");
    console.log(json, nodedata, "rrenderjs");

    return (
      <div
        className="h-full overflow-y-scroll scrollbar-hide"  
        // style={{ display: showNodeProperty ? "block" : "none" }}
      >
        {dupJson && Object.keys(dupJson).length > 0 && (
          <div className="h-full overflow-y-scroll scrollbar-hide ">
            {
              <>
                <RenderObject
                  obj={dupJson}
                  handlejs={handlejs}
                  OgJson={OgJson}
                  showNodeProperty={showNodeProperty}
                  sideBarData={sideBarData}
                  currentDrawing={currentDrawing}
                  setShowNodeProperty={setShowNodeProperty}
                  setToggleReactflow={setToggleReactflow}
                  nodeInfoTabs={nodeInfoTabs}
                  setDupJson={setDupJson}
                  handleAddjs={handleAddjs}
                  handleDeletejs={handleDeletejs}
                />
              </>
            }
          </div>
        )}
      </div>
    );
  },
);
