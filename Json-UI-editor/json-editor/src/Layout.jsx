import React, { useState } from "react";
import SideBar from "./SideBar";
import Editor from "./Editor";
export const JsonUiEditorContext = React.createContext();
export default function Layout({}) {
  const [json, setJson] = useState({
    decision1: {},
    decision2: {},
    decision3: {},
  });
  return (
    <JsonUiEditorContext.Provider value={{ json, setJson }}>
      <div className="w-full h-full">
        <div className="flex justify-between flex-row items-center">
          <div className="w-[20%] ">
            <SideBar />
          </div>
          <div className="w-[80%] h-full">
            <Editor />
          </div>
        </div>
      </div>
    </JsonUiEditorContext.Provider>
  );
}
