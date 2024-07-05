import React from "react";
import NodeGallery from "./NodeGallery";

export default function SelectedTabPanel({ selectedTab , color }) {
  const renderContent = (tab) => {
    console.log(typeof tab);

    switch (selectedTab) {
      case "DF":
        return <NodeGallery color={color} selectedTab={selectedTab} />;
      case "UF":
        return <NodeGallery color={color} selectedTab={selectedTab} />;
      case "PF":
        return <NodeGallery color={color}  selectedTab={selectedTab}/>;
      case "SF":
        return <NodeGallery color={color}  selectedTab={selectedTab} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full shadow-xl bg-white border border-slate-300 dark:border-slate-600 dark:bg-black rounded-lg ">
      {renderContent(selectedTab ,color)}
    </div>
  );
}
