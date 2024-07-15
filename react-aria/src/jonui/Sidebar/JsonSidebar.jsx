import { useState } from "react";
import { JsonSidebarIcon } from "./JsonSidebarIcon";
import JsonSidebarDetail from "./JsonSidebarDetail";

export default function JsonSidebar({ obj, handlejs }) {
  const [showObj, setShowObj] = useState(null);

  const [path, setPath] = useState(null);
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-[24%]   shadow-md rounded-lg p-6  m-10 border border-slate-900 scrollbar-none">
        {/* <JsonSidebarIcon
          showObj={showObj}
          setShowObj={setShowObj}
          obj={obj}
          setPath={setPath}
        /> */}
      </div>
      <div className="w-screen">
        <JsonSidebarDetail
          showObj={showObj}
          obj={obj}
          handlejs={handlejs}
          path={path}
        />
      </div>
    </div>
  );
}
