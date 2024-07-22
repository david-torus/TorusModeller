import { Tab, Tabs, Tooltip } from "@nextui-org/react";

import { useContext, useEffect } from "react";
import { DarkmodeContext } from "../context/DarkmodeContext";
import { Upload } from "../Model/UploadJson";

export const DefaultTabs = ({
  nodeInfoTabs,
  currentDefaults,
  activeTab,
  handleContextMenu,
  handleOpenModal,
  setFiles,
  setContextMenuVisible,
  contextMenuVisible,
  contextMenuPosition,
}) => {
  const { darkMode } = useContext(DarkmodeContext);

  useEffect(() => {
    try {
      const handleOutsideClick = () => {
        setContextMenuVisible(false);
      };

      if (contextMenuVisible) {
        document.addEventListener("click", handleOutsideClick);
      } else {
        document.removeEventListener("click", handleOutsideClick);
      }

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    } catch (error) {
      console.error(error);
    }
  }, [contextMenuVisible, setContextMenuVisible]);
  return (
    <>
      <Tabs
        aria-label="Options"
        color={darkMode ? "transparent" : "transparent"}
        variant="underlined"
        classNames={{
          tabList:
            "gap-1 w-full relative rounded-none p-0  border-divider bg-transparent",
          cursor: "w-full bg-transparent",
          base: "w-full h-full",
          tab: "max-w-fit px-0 h-12",
        }}
        defaultSelectedKey={""}
      >
        {Object.entries(nodeInfoTabs[currentDefaults]).map(([key, value]) => {
          return (
            <Tab
              title={
                <Tooltip content={value.label}>
                  <span
                    className={
                      darkMode
                        ? `rounded-md w-[35px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
                                              ${activeTab === value.modelOpen ? "bg-[#009BC9] text-slate-800/65" : " bg-slate-600 text-slate-50"}  
                                              flex items-center justify-center cursor-pointer px-[3px] shadow-md`
                        : `rounded-md w-[35px] h-[35px] hover:bg-blue-500 hover:shadow-lg 
                                              ${activeTab === value.modelOpen ? "bg-[#009BC9] text-slate-800/65 " : " bg-slate-300 text-slate-800"}  
                                               flex items-center justify-center cursor-pointer px-[3px] shadow-md`
                    }
                    onContextMenu={(e) => handleContextMenu(e, value.modelOpen)}
                    onClick={() => {
                      handleOpenModal(value.modelOpen);
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
                    <Upload id={value.modelOpen} setFiles={setFiles} />
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
