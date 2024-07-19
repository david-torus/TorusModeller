/* eslint-disable */
import React from "react";
import { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";

import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./index.css";
import AOS from "aos";
import { DarkmodeProvider } from "./commonComponents/context/DarkmodeContext";
import "aos/dist/aos.css";
import { MainpageLoader } from "./asset/SvgsApplication";

import { ReactFlowProvider } from "reactflow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Render from "./commonComponents/App&FabricSelection/Fabrics";
import { getClientDetails } from "./commonComponents/api/clientDetailsApi";
import NewFabricSidebar from "./commonComponents/layout/SideBar/NewFabricSidebar";
import NewSidebar from "./commonComponents/App&FabricSelection/NewSidebar";
/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

function App() {
  const [fallBack, setFallBack] = useState(true);
  const [darkmode, setDarkmode] = useState("");
  const [clientDetails, setClientDetails] = useState({});
  const [selectedFabric, setSelectedFabric] = useState("Home");
  const [showFabricSideBar, setShowFabricSideBar] = useState(true);

  const colors = {
    hidden: { dark: "#008080", light: "#008080" },
    DF: {
      dark: "#0736C4",
      light: "#244DCB",
    },
    UF: {
      dark: "#33CCFF",
      light: "#00BFFF",
    },
    PF: { dark: "#2AE38F", light: "#13CC78" },

    SF: { dark: "#FFc723", light: "#FFBE00" },
  };

  useEffect(() => {
    setTimeout(() => {
      setFallBack(false);
    }, 3500);
  }, []);
  useEffect(() => {
    AOS.init();
    // const user = localStorage.getItem("user");
    // if (user) {
    //   setIsLogin(true);
    //   setRelamName(JSON.parse(user).realm);
    // }
  }, []);

  const handleTabChange = (fabric) => {
    if (fabric === selectedFabric) return;
    setSelectedFabric(fabric);
    setShowFabricSideBar(true);
  };

  const handleSidebarToggle = () => {
    setShowFabricSideBar(!showFabricSideBar);
  };

  const handleToken = useCallback(
    async (tok) => {
      try {
        let tk =
          tok ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoidGVzdCIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6IiIsIm1vYmlsZSI6IiIsIjJGQUZsYWciOiJZIiwicm9sZSI6InNlbmlvcmRldiIsImNsaWVudCI6IkFCQyIsImlhdCI6MTcxOTU1NDIyOX0.1Gk5Lpf14W9twZEYxov1pik1vYunYP5CwKEoG2YEKG4";
        const res = await getClientDetails(tk);
        if (
          res &&
          res?.hasOwnProperty("client") &&
          res?.client &&
          JSON.stringify(res) !== JSON.stringify(clientDetails)
        ) {
          setClientDetails(res);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [clientDetails]
  );

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let name = params.get("tk");
    handleToken(name);
  }, [handleToken]);

  const getContext = (data) => {
    setDarkmode(data);
  };

  return (
    <React.StrictMode>
      <DarkmodeProvider getContext={getContext}>
        {fallBack ? (
          <MainpageLoader />
        ) : (
          <div className="w-full bg-[#0F0F0F] h-[100%] flex">
            {clientDetails &&
            clientDetails?.hasOwnProperty("client") &&
            clientDetails?.client ? (
              <>
                <ReactFlowProvider>
                  <div className=" w-full flex relative h-[100%] bg-[#1d1d1d] ">

                     {/* <Render
                      tenant={clientDetails?.client || "noClient"}
                      application={""}
                      appGroup={"CG"}
                    />  */}


                    <NewFabricSidebar
                      fabrics={selectedFabric}
                      color={colors[selectedFabric]?.dark}
                      showFabricSideBar={showFabricSideBar}
                      handleSidebarToggle={handleSidebarToggle}
                      handleTabChange={handleTabChange}
                    />
                    {/* <NewSidebar
                      selectedFabric={selectedFabric}
                      color={colors[selectedFabric]?.light}
                      showFabricSideBar={showFabricSideBar}
                      handleSidebarToggle={handleSidebarToggle}
                    /> */}
                    {/* 
                    <ToastContainer
                      theme={darkmode ? "light" : "dark"}
                      position="bottom-right"
                      autoClose={1000}
                    /> */}
                  </div>
                </ReactFlowProvider>
              </>
            ) : (
              <ReactFlowProvider>
                {/* <Render
                    tenant={clientDetails?.client || "ABC"}
                    application={""}
                    appGroup={"CG"}
                  /> */}

                

                {/* <ToastContainer
                    theme={darkmode ? "light" : "dark"}
                    position="bottom-right"
                    autoClose={1000}
                  /> */}
              </ReactFlowProvider>
            )}
          </div>
        )}
      </DarkmodeProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
