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
      currentDrawing !== "SF" && toggle ? (
         handleRender(currentModel + ".pw", json, sideBarData)
        // <Sidebar
        //   className={"bg-[#242424]" }
        //   position="right"
        //   visible={toggle}
        //   onHide={() => {
        //     setToggle(false);
        //   }}
        //   style={{ height: "100%", width: "30vw" }}
        // >
  
        // </Sidebar>
      ) : currentDrawing === "DF" && currentModel === "entities"  && toggle ? (
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
            className="flex h-full w-full flex-col items-center justify-center 
          gap-4 overflow-y-hidden transition-all delay-100 "
          >
            <div
              className={` items-between flex h-[40px] w-[315px] flex-row justify-around gap-[0px] rounded-md py-[2px] text-base xl:py-[3px] ${darkMode ? "bg-[#363636]" : "bg-[#F1F3F9]"} `}
            >
              <div
                onClick={() => tabvisible(1)}
                className={`xl:text-md flex cursor-pointer select-none flex-row items-center gap-2  
                 rounded-md px-[21px] py-[4px] text-center  text-sm text-slate-600
                  transition-all xl:px-[25px]  xl:py-[3px] text-${darkMode ? "white" : "black"} 
                 
                ${tabopen === 1 && `border border-slate-500/50 font-bold `}`}
              >
                <AiOutlineDatabase className="text-xl" />
                Attributes
              </div>
              <div
                onClick={() => tabvisible(2)}
                className={`xl:text-md flex cursor-pointer select-none flex-row items-center gap-1 
                rounded-md px-[21px] py-[4px] text-center  
                 text-sm text-slate-600 transition-all xl:gap-2 
                  xl:px-[28px] xl:py-[3px] text-${darkMode ? "white" : "black"}
                  ${tabopen === 2 && `border border-slate-500/50  font-bold `} `}
              >
                <VscSymbolMethod className="text-xl" />
                Methods
              </div>
            </div>
            <div className=" h-[80%] w-full rounded-xl shadow-black/40">
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
