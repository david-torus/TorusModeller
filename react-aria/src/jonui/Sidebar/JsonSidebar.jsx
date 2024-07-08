import { useState } from "react";
import {JsonSidebarIcon} from "./JsonSidebarIcon";
import JsonSidebarDetail from "./JsonSidebarDetail";

export default function JsonSidebar({ obj , handlejs }) {
    const[showObj , setShowObj] = useState(null);
    const [showAccordianItem, setShowAccordianItem] = useState(null);

    const[path , setPath] = useState(null);
    return (
      <div className="w-full h-full flex flex-row">
        <div className="w-[24%] h-full m-10 border-x border-slate-900">
        <JsonSidebarIcon  showObj = {showObj} setShowObj = {setShowObj} obj={obj} setPath = {setPath} setShowAccordianItem = {setShowAccordianItem} />
        </div>
        <div className="w-[76%] h-full">
            <JsonSidebarDetail showObj = {showObj} obj={obj} handlejs = {handlejs} path={path} showAccordianItem = {showAccordianItem} setShowAccordianItem = {setShowAccordianItem}  />
       
        </div>
      </div>
    );
  }