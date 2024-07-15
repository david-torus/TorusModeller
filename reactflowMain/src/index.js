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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Mock from "./React-aria/App";
/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

function App() {
  const [fallBack, setFallBack] = useState(true);
  const [darkmode, setDarkmode] = useState("");
  const [clientDetails, setClientDetails] = useState({});
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
    <DarkmodeProvider getContext={getContext}>
      {fallBack ? (
        <MainpageLoader />
      ) : (
        <>
          {clientDetails &&
          clientDetails?.hasOwnProperty("client") &&
          clientDetails?.client ? (
            <>
              <ReactFlowProvider>
                <div className=" w-full relative h-full bg-[#1d1d1d] ">
                  <Render
                    tenant={clientDetails?.client || "noClient"}
                    application={""}
                    appGroup={"CG"}
                  />
                  <ToastContainer
                    theme={darkmode ? "light" : "dark"}
                    position="bottom-right"
                    autoClose={1000}
                  />
                </div>
              </ReactFlowProvider>
            </>
          ) : (
            <ReactFlowProvider>
              <div className=" w-full relative h-full bg-[#1d1d1d] ">
                <Render
                  tenant={clientDetails?.client || "ABC"}
                  application={""}
                  appGroup={"CG"}
                />
                <ToastContainer
                  theme={darkmode ? "light" : "dark"}
                  position="bottom-right"
                  autoClose={1000}
                />
              </div>
            </ReactFlowProvider>
          )}
        </>
      )}
    </DarkmodeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          lazy={true}
          loader={<MainpageLoader />}
          path="/"
          element={<App />}
        />
        <Route
          lazy={true}
          loader={<MainpageLoader />}
          path="/mock"
          element={<Mock />}
        />
        {/* <Route path="/table" element={<Sample />} />
    <Route path="/login" element={<SignIn />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
