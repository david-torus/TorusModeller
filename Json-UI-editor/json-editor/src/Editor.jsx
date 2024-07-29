import React, { useContext, useEffect, useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import examplejson from "./example.json";

import FactsComponent from "./Components/FactsComponent";
import DecisionsComponent from "./Components/DecisionsComponent";
import ValidationsComponent from "./Components/ValidationsComponent";
import GenerateComponent from "./Components/GenerateComponent";
import { JsonUiEditorContext } from "./Layout";
import DecisionView from "./Components/decisionView";

export default function Editor() {
  const mainHeadings = ["Facts", "Decisions", "Validations", "Generate"];
  const [showDecision, setDecision] = useState(false);
  const { factsVariables, setFactsVariables } = useContext(JsonUiEditorContext);
  const [selectedDecison, setSelectedDecison] = useState(null);
  return (
    <div className="w-full h-[100%] p-2">
      <div className="bg-slate-400/25  shadow-sm p-2">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider text-sm font-medium text-slate-400",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
            panel: "w-full h-[83vh] p-2",
          }}
          disabledKeys={
            factsVariables[factsVariables.length - 1]?.name === "" &&
            factsVariables[factsVariables.length - 1]?.type === ""
              ? ["Decisions"]
              : []
          }
        >
          {mainHeadings.map((heading, index) => (
            <Tab
              key={heading}
              className="text-slate-400"
              title={heading}
              content={heading}
            >
              {heading === "Facts" && (
                <div className="w-full flex justify-center p-2 ">
                  <FactsComponent />
                </div>
              )}

              {heading === "Decisions" && (
                <div className="w-full h-full flex justify-center p-2 ">
                  {showDecision ? (
                    <DecisionsComponent
                      selectedDecison={selectedDecison}
                      setDecision={setDecision}
                    />
                  ) : (
                    <DecisionView
                      setSelectedDecison={setSelectedDecison}
                      setDecision={setDecision}
                    />
                  )}
                </div>
              )}

              {heading === "Validations" && (
                <div className="w-full flex justify-center p-2 ">
                  <ValidationsComponent />
                </div>
              )}

              {heading === "Generate" && (
                <div className="w-full flex justify-center p-2 ">
                  <GenerateComponent />
                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
