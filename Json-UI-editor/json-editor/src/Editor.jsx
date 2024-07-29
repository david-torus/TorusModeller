import React, { useContext, useEffect, useState } from "react";
import { Button, Tab, Tabs } from "@nextui-org/react";
import examplejson from "./example.json";

import FactsComponent from "./Components/FactsComponent";
import DecisionsComponent from "./Components/DecisionsComponent";
import ValidationsComponent from "./Components/ValidationsComponent";
import GenerateComponent from "./Components/GenerateComponent";
import { JsonUiEditorContext } from "./Layout";
import DecisionView from "./Components/decisionView";
import { IoSaveOutline } from "react-icons/io5";

export default function Editor() {
  const mainHeadings = ["Facts", "Decisions"];
  const [showDecision, setDecision] = useState(false);
  const { factsVariables, setFactsVariables } = useContext(JsonUiEditorContext);
  const [selectedDecison, setSelectedDecison] = useState(null);
  const [activeTab, setActiveTab] = useState("Facts");
  const [selectedDecision, setSelectedDecision] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "Facts":
        return <FactsComponent />;
      case "Decisions":
        return showDecision ? (
          <DecisionsComponent
            selectedDecision={selectedDecision}
            setDecision={setDecision}
          />
        ) : (
          <DecisionView
            setSelectedDecision={setSelectedDecision}
            setDecision={setDecision}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[100%] p-2">
      <div className="p-2 w-[100%] flex flex-col justify-center ">

        <div className="w-full flex justify-center">
        <div className="w-[95%] flex justify-between gap-6 border-b text-sm font-medium text-slate-400">
          <div className="w-[50%] flex flex-row justify-start gap-2">
            <button
              onClick={() => setActiveTab("Facts")}
              className={`${
                activeTab === "Facts" ? "text-[#06b6d4]" : "text-slate-400"
              }`}
            >
              Facts
            </button>
            <button
              onClick={() => setActiveTab("Decisions")}
              className={`${
                activeTab === "Decisions" ? "text-[#06b6d4]" : "text-slate-400"
              }`}
            >
              Decisions
            </button>
          </div>

          <div className="w-[50%] flex flex-row justify-end gap-[0.5rem]">
            <Button
              size="md"
              endContent={
                <IoSaveOutline
                  size={20}
                  style={{
                    color: "#006FEE",
                  }}
                />
              }
              variant="light"
              className="flex justify-center items-center text-primary  text-sm font-bold border-[#2563eb] border"
              color="primary"
            >
              SAVE
            </Button>
          </div>
        </div>
        </div>
        
        <div className="w-full h-[83vh] p-2">{renderContent()}</div>
      </div>
    </div>
  );
}
