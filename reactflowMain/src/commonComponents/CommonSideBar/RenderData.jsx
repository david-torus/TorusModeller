import { Sidebar } from "primereact/sidebar";
import React from "react";
import { colorPolicy, controlPolicy, tableUIPolicy } from "../utils/util";
import { Dialog } from "primereact/dialog";
import { AiOutlineDatabase } from "react-icons/ai";
import { VscSymbolMethod } from "react-icons/vsc";
import Builder from "../../VPT_DJUI/builder";
import SFSidebar from "../../VPT_SF/Components/layout/SFSidebar";

export const RenderData = ({
  sideBarData,
  currentModel,
  currentDrawing,
  json,
  setJson,
  setToggle,
  toggle,
  handleRender,
  tabvisible,
  tabopen,
  attributes,
  methods,
  getNodeConfig,
  sendFabrics,
  tenant,
  group,
  application,
  darkMode,

  selectedproperty,
  helperjson,
}) => {
  return (
    <>
      {sideBarData &&
      currentModel &&
      currentModel !== "entities" &&
      currentDrawing !== "SF" ? (
        <Sidebar
          className={darkMode ? "bg-[#242424]" : "bg-[#fff]"}
          position="right"
          visible={toggle}
          onHide={() => {
            setToggle(false);
          }}
          style={{ height: "100%", width: "30vw" }}
        >
          {handleRender(currentModel + ".pw", json)}
        </Sidebar>
      ) : currentDrawing === "DF" && currentModel === "entities" ? (
        <Dialog
          className={darkMode ? "bg-[#242424]" : "bg-[#fff]"}
          maximizable
          style={{ height: "100%", width: "70vw" }}
          visible={toggle}
          onHide={() => {
            setToggle(false);
          }}
          headerStyle={{
            backgroundColor: darkMode ? "#242424" : "#fff",
            color: darkMode ? "white" : "black",
          }}
          contentStyle={{ backgroundColor: darkMode ? "#242424" : "#fff" }}
        >
          <div
            className="transition-all w-full delay-100 flex flex-col justify-center 
          items-center gap-4 overflow-y-hidden h-full "
          >
            <div
              className={` flex flex-row justify-around w-[315px] h-[40px] gap-[0px] text-base items-between rounded-md xl:py-[3px] py-[2px] ${darkMode ? "bg-[#363636]" : "bg-[#F1F3F9]"} `}
            >
              <div
                onClick={() => tabvisible(1)}
                className={`flex flex-row gap-2 transition-all items-center text-center select-none  
                 xl:px-[25px] xl:py-[3px] px-[21px] py-[4px]  xl:text-md text-sm
                  text-slate-600 rounded-md  cursor-pointer text-${darkMode ? "white" : "black"} 
                 
                ${tabopen === 1 && `border border-slate-500/50 font-bold `}`}
              >
                <AiOutlineDatabase className="text-xl" />
                Attributes
              </div>
              <div
                onClick={() => tabvisible(2)}
                className={`flex flex-row xl:gap-2 transition-all gap-1 items-center text-center 
                xl:text-md text-sm text-slate-600 select-none  
                 xl:px-[28px] xl:py-[3px] px-[21px] py-[4px] 
                  cursor-pointer rounded-md text-${darkMode ? "white" : "black"}
                  ${tabopen === 2 && `border border-slate-500/50  font-bold `} `}
              >
                <VscSymbolMethod className="text-xl" />
                Methods
              </div>
            </div>
            <div className=" shadow-black/40 rounded-xl w-full h-[80%]">
              <div
                className={
                  " h-full w-full  " +
                  (tabopen === 1
                    ? " flex items-center justify-center"
                    : " hidden")
                }
              >
                <Builder
                  key={sideBarData?.id + "AT"}
                  uiPolicy={tableUIPolicy}
                  keys={"AT"}
                  defaultJSOn={json?.entities?.attributes || []}
                  updatedNodeConfig={getNodeConfig}
                  nodeType={sideBarData?.type}
                  isAdmin={{
                    canAdd: true,
                    canDelete: true,
                    canEdit: true,
                  }}
                  controlPolicy={controlPolicy}
                  colorPolicy={colorPolicy}
                />
              </div>
              <div
                className={
                  " h-full w-full  " +
                  (tabopen === 2
                    ? " flex items-center justify-center"
                    : " hidden")
                }
              >
                {json?.entities?.methods &&
                json?.entities?.methods?.length > 0 ? (
                  <Builder
                    key={sideBarData?.id + "MT"}
                    uiPolicy={tableUIPolicy}
                    keys={"MT"}
                    defaultJSOn={json?.entities?.methods}
                    updatedNodeConfig={getNodeConfig}
                    nodeType={sideBarData?.type}
                    isAdmin={{
                      canAdd: true,
                      canDelete: true,
                      canEdit: true,
                    }}
                    controlPolicy={controlPolicy}
                    colorPolicy={colorPolicy}
                  />
                ) : (
                  <p className="text-center text-2xl text-white">
                    column found for this node
                  </p>
                )}
              </div>
            </div>
          </div>
        </Dialog>
      ) : (
        currentDrawing === "SF" && (
          <SFSidebar
            updatedNodeConfig={() => {
              setToggle(false);
            }}
            currentModel={currentModel}
            setJson={setJson}
            json={json}
            sendFabrics={sendFabrics}
            sidebarVisible={toggle}
            setSidebarVisible={setToggle}
            tenant={tenant}
            group={group}
            application={application}
          />
        )
      )}
    </>
  );
};
