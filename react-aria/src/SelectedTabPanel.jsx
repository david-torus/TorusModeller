import React from "react";
import NodeGallery from "./NodeGallery";

export default function SelectedTabPanel({ selectedTab }) {
  const renderContent = (tab) => {
    console.log(typeof tab);

    switch (selectedTab) {
      case "DF":
        return <NodeGallery />;
      case "UF":
        return <NodeGallery />;
      case "PF":
        return <NodeGallery />;
      case "SF":
        return <NodeGallery />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full shadow-xl bg-white border border-slate-300 dark:border-slate-600 dark:bg-black rounded-lg ">
      {renderContent(selectedTab)}
    </div>
  );
}
