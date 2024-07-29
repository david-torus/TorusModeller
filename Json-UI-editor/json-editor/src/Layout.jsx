import React, { useState } from "react";
import SideBar from "./SideBar";
import Editor from "./Editor";
export const JsonUiEditorContext = React.createContext();
export default function Layout({}) {
  const [json, setJson] = useState({});
  const [decisionSelectedFacts, setDecisionSelectedFacts] = useState([]);

  const [factsVariables, setFactsVariables] = useState([
    { id: 1, name: "", type: "" },
  ]);

  console.log(json, decisionSelectedFacts, "LayoutJson");

  return (
    <JsonUiEditorContext.Provider
      value={{
        json,
        setJson,
        factsVariables,
        setFactsVariables,
        decisionSelectedFacts,
        setDecisionSelectedFacts,
      }}
    >
      <div className="w-full h-full">
        <div className="flex justify-between flex-row items-center">
          <div className="w-[100%] h-full">
            <Editor />
          </div>
        </div>
      </div>
    </JsonUiEditorContext.Provider>
  );
}
