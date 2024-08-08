import React, { useState } from "react";

import { JsonSidebarIcon } from "../../jonui/Sidebar/JsonSidebarIcon";
import JsonSidebarDetail from "../../jonui/Sidebar/JsonSidebarDetail";
import TorusTab from "../../torusComponents/TorusTab";
import { Pencil, Scan } from "../../SVG_Application";
import { Flip } from "react-toastify";
import { Calendar } from "react-aria-components";
import NewNodeInfoSidebar from "../../jonui/NewNodeInfoSidebar";

export default function FabricsSideBar({
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
}) {
  const [showObj, setShowObj] = useState();
  const [label, setLabel] = useState(null);
  const [checkActivestatus, setCheckActivestatus] = useState(null);
  const [expandedItem, setExpandedItem] = useState([]);

  const [path, setPath] = useState(null);

  return (
    <div className="flex h-[100%]   w-full max-w-full flex-row overflow-hidden ">
      <div className="bg-white  dark:border-[#212121]">
        {
          <JsonSidebarIcon
            key={"iconBar"}
            showObj={showObj}
            setShowObj={setShowObj}
            obj={obj}
            setPath={setPath}
            setLabel={setLabel}
            setCheckActivestatus={setCheckActivestatus}
            checkActivestatus={checkActivestatus}
            setExpandedItem={setExpandedItem}
          />
        }
        {/* <FabricsSideBarIconTab  color={color}/> */}
      </div>
      <div className="w-full bg-white dark:bg-[#161616]">
        {
          <JsonSidebarDetail
            showObj={showObj}
            obj={obj}
            handlejs={handlejs}
            path={path}
            label={label}
            OgJson={OgJson}
            handleAddjs={handleAddjs}
            handleDeletejs={handleDeletejs}
            checkActivestatus={checkActivestatus}
            setExpandedItem={setExpandedItem}
            expandedItem={expandedItem}
          />
        }
        {/* <FabricsSideBarDetails /> */}
      </div>
    </div>
  );
}
