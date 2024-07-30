import React, { useContext, useState } from "react";
import FactsComponent from "./Components/FactsComponent";
import DecisionsComponent from "./Components/DecisionsComponent";
import DecisionView from "./Components/decisionView";
import { Button } from "@nextui-org/react";
import { saveRule } from "./api";
import { IoSaveOutline } from "react-icons/io5";
import { JsonUiEditorContext } from "./Layout";

export default function Editor({ruleId}) {
	const [activeTab, setActiveTab] = useState("Facts");
	const [showDecision, setDecision] = useState(false);
	const [selectedDecision, setSelectedDecision] = useState(null);
  const { json, factsVariables } = useContext(JsonUiEditorContext);

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
		<div className="w-full h-[100%] p-2 relative">
			<div className="p-2">
			<Button
				onClick={() => saveRule(ruleId, {fact_json: factsVariables, rule_json: json})}
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
				className="flex absolute top-0 right-3 items-center text-primary  text-sm font-bold border-[#2563eb] border"
				color="primary"
				>
					Save Rule
				</Button>
				<div className="flex gap-6 border-b border-divider text-sm font-medium text-slate-400">
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
				<div className="w-full h-[83vh] p-2">{renderContent()}</div>
				
			</div>
		</div>
	);
}
