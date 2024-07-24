import { memo, useEffect, useState } from "react";
import FabricsSideBar from "../sidebars/fabricsSideBar/FabricsSideBar";
import JsonSidebar from "./Sidebar/JsonSidebar";
import _, { set } from "lodash";
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
}) => {
  return (
    <>
      { (
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
        />
      )}
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
  }) => {
    const [dupJson, setDupJson] = useState( structuredClone(js));

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
      console.log(newjs, "new");

      setConvertedJson(newjs);
    };

    const handlejs = (e, i, key, type, jskey) => {
      console.log(e, i, key, type, jskey, "rendertype");

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
      if (type == "arr") {
        if (i) {
          const js = structuredClone(dupJson);
          _.set(js, i, e);
          setDupJson(js);
          console.log(js, "arrjs");
        }
      }

      if (type == "dropdown") {
        if (i) {
          const js = structuredClone(dupJson);
          _.set(js, i, e);
          setDupJson(js);
          console.log(js, "arrjs");
        }
      }
    };

    console.log(convertedJson, "convertedJson");
    console.log(dupJson, "renderjs");

    return (
      <div
        className=" h-full"
        style={{ display: showNodeProperty ? "block" : "none" }}
      >
        { (
          <div className="h-full">
            { (
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
                />
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);
