import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Editor from "./Editor";
import { fetchRule } from "./api";
export const JsonUiEditorContext = React.createContext();
export default function Layout({}) {
  const [json, setJson] = useState({});
  const [decisionSelectedFacts, setDecisionSelectedFacts] = useState([]);

  const [factsVariables, setFactsVariables] = useState([
    { id: 1, name: "", type: "" },
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const fetchData = async () => {
      const data = await fetchRule(id);
      if (data.fact_json) {
        setFactsVariables(data.fact_json);
      }
      if (data.rule_json) {
        setJson(data.rule_json);
      }
    };

    fetchData();
  }, []);

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
