import React, { useState, createContext, useContext, useEffect } from "react";
import PFMain from "../../VPT_PF/VPT_PF_PFD/PFMain";
import ERDMain from "../../VPT_DF/VPT_DF_ERD/ERDMain";
import UFDMain from "../../VPT_UF/VPT_UF_SLD/UFDMain";
import PFDefaults from "../../VPT_PF/VPT_PFD/PFDDefaults";
import DFDDefaults from "../../VPT_DF/VPT_DFD/DFDefaults";
import UFDefaults from "../../VPT_UF/VPT_UFD/UFDefaults";
import DJUIMain from "../../VPT_DJUI/DJUIMain";
import FabricCards from "./FabricCardStyle.jsx";
import { DarkmodeContext } from "../context/DarkmodeContext";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { ReactFlowProvider } from "reactflow";
import SFMain from "../../VPT_SF/SFMain";
import { LuFileJson2 } from "react-icons/lu";

/**
 * Creates a new context object for the Fabric application.
 *
 * @return {Object} The context object.
 */
export const FabricContext = createContext(null);

/**
 * Creates a new context object for the Node Property of the Fabric application.
 *
 * @return {Object} The context object.
 */

/**
 * Renders different fabric components based on the selected fabric type.
 *
 * @param {string} tenant - The name of the current tenant.
 * @param {string} appGroup - The application group.
 * @param {string} application - The current application.
 * @param {Function} setSelectedApp - Function to set the selected application.
 * @param {Function} setIsLogin - Function to set the login status.
 * @return {JSX.Element} The rendered fabric components based on the selected fabric type.
 */
export default function Render({
  tenant,
  appGroup,
  application,
  setSelectedApp,
}) {
  const [selectedFabric, setSelectedFabric] = useState(null);
  const { darkmode } = useContext(DarkmodeContext);

  useEffect(() => {
    /**
     * Handles errors that occur during the execution of the function.
     *
     * @param {Error} e - The error object.
     * @return {void}
     */
    const errorHandler = (e) => {
      if (
        e.message.includes(
          "ResizeObserver loop completed with undelivered notifications" ||
            "ResizeObserver loop limit exceeded"
        )
      ) {
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.style.display = "none";
        }
      }
    };
    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  /**
   * Renders different fabric components based on the selected fabric type.
   *
   * @param {string} param - The fabric type to render.
   * @return {JSX.Element} The rendered fabric component.
   */
  const Fabrics = (param) => {
    switch (param) {
      case "PF":
        return (
          <div
            className={`${!true ? " h-[100%] bg-[#1d1d1d] " : "h-[100%] bg-[#EEEEEE] "}`}
          >
            <ReactFlowProvider className="w-[100%] h-full">
              <PFMain
                tenant={tenant}
                appGroup={appGroup}
                application={application}
                currentFabric={param}
              />
            </ReactFlowProvider>
          </div>
        );

      case "UF":
        return (
          <ReactFlowProvider className="w-[100%] h-full">
            <UFDMain
              tenant={tenant}
              appGroup={appGroup}
              application={application}
              currentFabric={param}
            />
          </ReactFlowProvider>
        );

      case "SF":
        return (
          <ReactFlowProvider className="w-[100%] h-full">
            <SFMain
              tenant={tenant}
              appGroup={appGroup}
              application={application}
              currentFabric={param}
            />
          </ReactFlowProvider>
        );

      case "DF":
        return (
          <ReactFlowProvider className="w-[100%] h-full">
            <ERDMain
              tenant={tenant}
              appGroup={appGroup}
              application={application}
              currentFabric={param}
            />
          </ReactFlowProvider>
        );

      case "PFD":
        return (
          <ReactFlowProvider className="w-[100%] h-full">
            <PFDefaults />
          </ReactFlowProvider>
        );

      case "DFD":
        return (
          <ReactFlowProvider className="w-[100%] h-full">
            <DFDDefaults />
          </ReactFlowProvider>
        );

      case "UFD":
        return (
          <ReactFlowProvider className="w-[100%] h-full">
            <UFDefaults />
          </ReactFlowProvider>
        );
      case "DJUI":
        return (
          <ReactFlowProvider className="w-[100%] h-full">
            <DJUIMain />
          </ReactFlowProvider>
        );

      default:
        return null;
    }
  };

  const slides = [
    {
      index: 0,
      headline: "Data Fabric",
      src: "DataFabrics",
      button: "DF",
    },
    {
      index: 1,
      headline: "Process Fabric",
      src: "ProcessFlow",
      button: "PF",
      isHovered: false,
    },
    {
      index: 2,
      headline: "UI Fabric",
      src: "UserFabric",
      button: "UF",
      isHovered: false,
    },
    {
      index: 3,
      headline: "Security Fabric",
      src: "Security Fabric",
      button: "SF",
      isHovered: false,
    },
    {
      index: 4,
      headline: "Data Fabric Defaults",
      src: "DataFabricsDefault",
      button: "DFD",
      isHovered: false,
    },
    {
      index: 5,
      headline: "Process Fabric Defaults",
      src: "ProcessFlowDefault",
      button: "PFD",
      isHovered: false,
    },
    {
      index: 6,
      headline: "UI Fabric Defaults",
      src: "UserFabricDefault",
      button: "UFD",
      isHovered: false,
    },
    {
      index: 7,
      headline: "Defaults Json Ui",
      src: <LuFileJson2 />,
      button: "DJUI",
      isHovered: false,
    },
  ];

  return (
    <div className="w-full h-full flex  items-center justify-center ">
      {selectedFabric == null ? (
        <>
          <div
            className={`w-[100%] h-full flex flex-col items-center justify-center  gap-2 ${darkmode ? "bg-transparent " : "bg-[#EEEEEE] "} `}
          >
            <div className="slider-conatiner  w-[76%] h-[76%] p-4 flex items-center justify-center overflow-scroll">
              <FabricCards
                isHovered={false}
                slides={slides}
                heading={"Select Drawing type"}
                setSelectedFabric={setSelectedFabric}
              />
            </div>
          </div>
          <div
            // onClick={() => setSelectedApp(null)}
            style={{
              position: "absolute",
              left: "60px",
              top: "50px",
            }}
            className="cursor-pointer  "
          >
            <div className="flex flex-row gap-3">
              {/* <IoIosArrowRoundBack
                size={40}
                color={darkmode ? "#D3D3D3" : "#474747"}
              /> */}
              <Breadcrumbs className="mr-[685px] mt-[10px]  ">
                <BreadcrumbItem
                  classNames={{
                    item: darkmode
                      ? "text-white/70  font-bold"
                      : "text-black/70  font-bold",
                    separator: darkmode ? "text-white/70  " : "text-black/70  ",
                  }}
                >
                  {tenant}
                </BreadcrumbItem>
                <BreadcrumbItem
                  classNames={{
                    item: darkmode
                      ? "text-white/70  font-bold"
                      : "text-black/70  font-bold",
                    separator: darkmode ? "text-white/70  " : "text-black/70  ",
                  }}
                >
                  {appGroup}
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
          </div>
        </>
      ) : (
        <FabricContext.Provider value={setSelectedFabric}>
          <div
            className={`${darkmode ? "bg-transparent  w-full h-full flex flex-row relative " : "bg-[#EEEEEE]  w-full h-full flex flex-row relative "}   `}
          >
            <div className="w-[100%] h-full">
              {Fabrics(selectedFabric, darkmode)}
            </div>
          </div>
        </FabricContext.Provider>
      )}
    </div>
  );
}
