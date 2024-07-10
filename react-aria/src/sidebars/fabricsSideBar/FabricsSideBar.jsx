import React, { useState } from "react";

import { JsonSidebarIcon } from "../../jonui/Sidebar/JsonSidebarIcon";
import JsonSidebarDetail from "../../jonui/Sidebar/JsonSidebarDetail";

export default function FabricsSideBar({ obj, handlejs }) {
  const [showObj, setShowObj] = useState(null);

  const [path, setPath] = useState(null);
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[25%] h-full border-x border-slate-300 overflow-scroll-y bg-white">
        <JsonSidebarIcon
          showObj={showObj}
          setShowObj={setShowObj}
          obj={obj}
          setPath={setPath}
        />

        {/* <FabricsSideBarIconTab  color={color}/> */}
      </div>
      <div className="w-[75%] h-full overflow-y-scroll scrollbar-none bg-white">
        <JsonSidebarDetail
          showObj={showObj}
          obj={obj}
          handlejs={handlejs}
          path={path}
        />
        {/* <FabricsSideBarDetails /> */}
      </div>
    </div>
  );
}
