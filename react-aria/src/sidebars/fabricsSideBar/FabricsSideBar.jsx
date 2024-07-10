import React, { useState } from "react";

import { JsonSidebarIcon } from "../../jonui/Sidebar/JsonSidebarIcon";
import JsonSidebarDetail from "../../jonui/Sidebar/JsonSidebarDetail";

export default function FabricsSideBar({obj, handlejs}) {
  const[showObj , setShowObj] = useState(null);
  
  const[path , setPath] = useState(null);
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[60%] h-screen border-x border-slate-300">
      <JsonSidebarIcon  showObj = {showObj} setShowObj = {setShowObj} obj={obj} setPath = {setPath} />

      {/* <FabricsSideBarIconTab  color={color}/> */}
      </div>
      <div className="w-[100%] h-screen">
      <JsonSidebarDetail showObj = {showObj} obj={obj} handlejs = {handlejs} path={path}  />
        {/* <FabricsSideBarDetails /> */}
      </div>
    </div>
  );
}
