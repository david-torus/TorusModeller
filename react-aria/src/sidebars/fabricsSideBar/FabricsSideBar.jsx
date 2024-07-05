import React from "react";
import FabricsSideBarIconTab from "./FabricsSideBarIconTab";
import FabricsSideBarDetails from "./FabricsSideBarDetails";

export default function FabricsSideBar({color}) {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-[20%] h-full border-x border-slate-300">
      <FabricsSideBarIconTab  color={color}/>
      </div>
      <div className="w-[80%] h-full">
        <FabricsSideBarDetails />
      </div>
    </div>
  );
}
