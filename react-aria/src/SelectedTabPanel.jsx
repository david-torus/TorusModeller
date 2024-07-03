import React from "react";
import NodeGallery from "./NodeGallery";

export default function SelectedTabPanel({ selectedTab }) {
  const renderContent = (tab) => {
    console.log(typeof tab);

    switch (selectedTab) {
      case "1":
        return <NodeGallery />;
      case "2":
        return "Working on it";
      case "3":
        return "Working on it";
      case "4":
        return "working on it";
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full shadow-xl bg-white border border-slate-300 dark:bg-black rounded-lg ">
      {renderContent(selectedTab)}
    </div>
  );
}
