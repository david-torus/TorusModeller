import React, { useState } from "react";

import { JsonSidebarIcon } from "../../jonui/Sidebar/JsonSidebarIcon";
import JsonSidebarDetail from "../../jonui/Sidebar/JsonSidebarDetail";

export default function FabricsSideBar({ obj, handlejs }) {
  const [showObj, setShowObj] = useState(null);
  const[label , setLabel] = useState(null);

  const [path, setPath] = useState(null);
  return (
    <div className="w-full h-[100%] max-h-full  max-w-full overflow-hidden flex flex-row ">
      <div className="max-w-[40%]   border-x border-slate-300  bg-white">
        <JsonSidebarIcon
          showObj={showObj}
          setShowObj={setShowObj}
          obj={obj}   
          setPath={setPath}
          setLabel={setLabel}
        />

        {/* <FabricsSideBarIconTab  color={color}/> */}
      </div>
      <div className=" max-w-full max-h-[100%] bg-white">
        <JsonSidebarDetail
          showObj={showObj}
          obj={obj}
          handlejs={handlejs}
          path={path}
          label={label}
        />
        {/* <FabricsSideBarDetails /> */}
      </div>
    </div>
  );
}
