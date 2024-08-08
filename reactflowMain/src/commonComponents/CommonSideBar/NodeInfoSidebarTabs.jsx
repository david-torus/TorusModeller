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
  sideBarData,
}) => {
  return (
    <>
      {currentDrawing !== "events" && (
        <Tabs
          aria-label="Options"
          variant="solid"
          classNames={{
            tabList:
              "  items-center justify-center p-2  bg-[#F5FEFD] dark:bg-[#0F0F0F]    gap-0 border-none outline-none rounded-md flex items-center justify-center  ",

            tab: !darkMode
              ? " p-3 text-white font-semibold border-none outline-none w-[50px]  "
              : " p-3 text-black font-semibold border-none outline-none w-[50px] ",
            tabContent: !darkMode
              ? " border-none rounded-md outline-none "
              : " border-none rounded-md outline-none  ",
            cursor:
              "border-none  rounded-md torus-focus:outline-none outline-none torus-focus-within:outline-none",
          }}
          defaultSelectedKey={""}
        >
          {nodeInfoTabs[currentDrawing] &&
            Object.entries(nodeInfoTabs[currentDrawing]).map(([key, value]) => {
              return (
                <Tab
                  title={
                    <Tooltip content={value.label} color={"secondary"}>
                      <span
                        className={
                          darkMode
                            ? `h-[32px] w-[32px] 
                                              ${activeTab === value.label ? "bg-[#009BC9]" : ""}  
                                              flex cursor-pointer items-center justify-center `
                            : `h-[32px] w-[32px] rounded-md 
                                              ${activeTab === value.label ? "bg-[#009BC9] " : "bg-slate-800/50"}  
                                               flex cursor-pointer items-center justify-center `
                        }
                        onContextMenu={(e) =>
                          handleContextMenu(e, value.modelOpen)
                        }
                        onClick={() => {
                          setSendFabrics(value.label);
                          handleOpen(value.label);

                          if (value.label === "CustomCode") {
                            setToggleReactflow((prev) => ({
                              ...prev,
                              flow: false,
                              code: true,
                            }));
                          }
                          if (value.label === "Rule") {
                            setToggleReactflow((prev) => ({
                              ...prev,
                              flow: false,
                              rule: true,
                            }));
                          }
                          if (value.label === "Mapper") {
                            setToggleReactflow((prev) => ({
                              ...prev,
                              flow: false,
                              mapper: true,
                            }));
                          }
                          if (value.label === "Events") {
                            setToggleReactflow((prev) => ({
                              ...prev,
                              flow: false,
                              events: true,
                            }));
                          }

                          if (currentDrawing === "SF") {
                            if (value.label === "PF") {
                              handleOpenModal(
                                value.modelOpen,
                                false,
                                "",
                                "SFPF",
                              );
                            }

                            if (value.label === "DF") {
                              handleOpenModal(
                                value.modelOpen,
                                false,
                                "",
                                "SFDF",
                              );
                            }

                            if (value.label === "UF") {
                              handleOpenModal(
                                value.modelOpen,
                                false,
                                "",
                                "SFUF",
                              );
                            }
                          }

                          if (
                            value.label !== "Mapper" &&
                            value.label !== "Events" &&
                            value.label !== "Rule" &&
                            value.label !== "CustomCode" &&
                            currentDrawing !== "SF"
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
                      style={{
                        zIndex: 9999,
                        backgroundColor: "#F4F5FA",
                        width: "3rem",
                        height: "3rem",
                        display: contextMenuVisible ? "flex" : "none",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "0.25rem",
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
      )}

      {sideBarData &&
        sideBarData?.type === "handlerNode" &&
        currentDrawing === "events" && (
          <>
            <Tabs
              aria-label="Options"
              color={darkMode ? "transparent" : "transparent"}
              variant="underlined"
              classNames={{
                tabList: "gap-1  rounded-none bg-transparent",
                cursor: "w-full bg-transparent",
                base: "w-full relative",
                tab: "max-w-fit px-0 h-5",
              }}
              defaultSelectedKey={""}
            >
              {nodeInfoTabs[currentDrawing] &&
                Object.entries(nodeInfoTabs[currentDrawing]).map(
                  ([key, value]) => {
                    return (
                      <Tab
                        title={
                          <Tooltip content={value.label} color={"secondary"}>
                            <span
                              className={
                                darkMode
                                  ? ` w-[35px] rounded-md hover:bg-blue-500 hover:shadow-lg 
                                              ${activeTab === value.label ? "bg-[#009BC9] text-slate-100" : ""}  
                                              flex cursor-pointer items-center justify-center px-[3px] shadow-md`
                                  : ` w-[35px] rounded-md hover:bg-blue-500 hover:shadow-lg 
                                              ${activeTab === value.label ? "bg-[#009BC9] " : "bg-slate-800/50"}  
                                               flex cursor-pointer items-center justify-center px-[3px] `
                              }
                              onContextMenu={(e) =>
                                handleContextMenu(e, value.modelOpen)
                              }
                              onClick={() => {
                                setSendFabrics(value.label);
                                handleOpen(value.label);

                                if (currentDrawing === "events") {
                                  if (value.label === "Params") {
                                    handleOpenModal(
                                      value.modelOpen,
                                      false,
                                      "",
                                      "eventParams",
                                    );
                                  }
                                  if (value.label === "StateTransitionTable") {
                                    handleOpenModal(
                                      value.modelOpen,
                                      false,
                                      "",
                                      "eventSTT",
                                    );
                                  }
                                  if (
                                    value.label === "StateTransitionStreams"
                                  ) {
                                    handleOpenModal(
                                      value.modelOpen,
                                      false,
                                      "",
                                      "eventSTS",
                                    );
                                  }
                                }
                              }}
                            >
                              {value.icon}
                            </span>
                          </Tooltip>
                        }
                      >
                        <div className="App">
                          <div
                            style={{
                              zIndex: 9999,
                              backgroundColor: "#F4F5FA",
                              width: "3rem",
                              height: "3rem",
                              display: contextMenuVisible ? "flex" : "none",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "0.25rem",
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
                  },
                )}
            </Tabs>
          </>
        )}
    </>
  );
};
