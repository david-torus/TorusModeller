

import { Tab, Tabs, Tooltip } from "@nextui-org/react";
import { Upload } from "../Model/UploadJson";

export const NodeInfoSidebarTabs = ({
  nodeInfoTabs,
  currentDrawing,
  activeTab,
  handleContextMenu,
  setSendFabrics,
  handleOpen,
  handleOpenModal,
  setToggleReactflow,
  setFiles,
  darkMode,
  contextMenuVisible,
  contextMenuPosition,
}) => {
  return (
    <>
      <Tabs
        aria-label="Options"
        color={darkMode ? "transparent" : "transparent"}
        variant="underlined"
        classNames={{
          tabList:
            "gap-1 w-[280px]  rounded-none border  border-divider bg-transparent",
          cursor: "w-full bg-transparent",
          base: "w-full",
          tab: "max-w-fit px-0 h-8",
        }}
        defaultSelectedKey={""}
      >
        {nodeInfoTabs[currentDrawing] && Object.entries(nodeInfoTabs[currentDrawing]).map(([key, value]) => {
          return (
            <Tab
              title={
                <Tooltip content={value.label}>
                  <span
                    className={
                      darkMode
                        ? `rounded-md w-[35px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
                                              ${activeTab === value.label ? "bg-[#009BC9] text-slate-800/65" : " bg-slate-600 text-slate-50"}  
                                              flex items-center justify-center cursor-pointer px-[3px] shadow-md`
                        : `rounded-md w-[35px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
                                              ${activeTab === value.label ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}  
                                               flex items-center justify-center cursor-pointer px-[3px] shadow-md`
                    }
                    onContextMenu={(e) => handleContextMenu(e, value.modelOpen)}
                    onClick={() => {
                      setSendFabrics(value.label);
                      handleOpen(value.label);

                      if (value.label === "CustomCode") {
                        setToggleReactflow((prev) => ({
                          ...prev,
                          code: true,
                        }));
                      }
                      if (value.label === "Rule") {
                        setToggleReactflow((prev) => ({
                          ...prev,
                          rule: true,
                        }));
                      }
                      if (value.label === "Mapper") {
                        setToggleReactflow((prev) => ({
                          ...prev,
                          mapper: true,
                        }));
                      }
                      if (value.label === "Events") {
                        setToggleReactflow((prev) => ({
                          ...prev,
                          events: true,
                        }));
                      }

                      if (
                        value.label !== "Mapper" &&
                        value.label !== "Events" &&
                        value.label !== "Rule" &&
                        value.label !== "CustomCode"
                      )
                        handleOpenModal(value.modelOpen, false, "");
                    }}
                  >
                    {value.icon}
                  </span>
                </Tooltip>
              }
            >
              <div className="App">
                <div
                  className={
                    "fixed  rounded-md " +
                    (darkMode ? "bg-[#242424]" : "bg-white")
                  }
                  style={{
                    zIndex: 9999,
                    display: contextMenuVisible ? "block" : "none",
                    top: contextMenuPosition.y,
                    left: contextMenuPosition.x,
                  }}
                >
                  <div className=" px-3 py-3">
                    <Upload id={value.label} setFiles={setFiles} />
                  </div>
                </div>
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};
