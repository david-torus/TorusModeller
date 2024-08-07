/* eslint-disable */
import React from "react";
import { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/primereact.min.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "./index.css";
import AOS from "aos";
import { DarkmodeProvider } from "./commonComponents/context/DarkmodeContext";
import "aos/dist/aos.css";
import { MainpageLoader } from "./asset/SvgsApplication";

import { ReactFlowProvider } from "reactflow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Render from "./commonComponents/App&FabricSelection/Fabrics";
import { getClientDetails } from "./commonComponents/api/clientDetailsApi";

import Layout from "./Layout";
/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */

function App() {
  const [fallBack, setFallBack] = useState(true);
  const [darkMode, setDarkmode] = useState("");
  const [clientDetails, setClientDetails] = useState({});

  useEffect(() => {
    AOS.init();
  }, []);

  const handleToken = useCallback(
    async (tok) => {
      try {
        let tk =
          tok ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoidGVzdCIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6IiIsIm1vYmlsZSI6IiIsIjJGQUZsYWciOiJZIiwicm9sZSI6InNlbmlvcmRldiIsImNsaWVudCI6IkFCQyIsImlhdCI6MTcxOTU1NDIyOX0.1Gk5Lpf14W9twZEYxov1pik1vYunYP5CwKEoG2YEKG4";
        const res = await getClientDetails(tk).then((data) => {
          setFallBack(false);
          return data;
        });

        console.log(res, "ClientResponse");
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
    [clientDetails],
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
          <>
            {clientDetails &&
            clientDetails?.hasOwnProperty("client") &&
            clientDetails?.client ? (
              <>
                <ReactFlowProvider>
                  <Layout client={clientDetails?.client} clientLoginId={clientDetails?.loginId}  />
                </ReactFlowProvider>
              </>
            ) : (
              <ReactFlowProvider>
                <Layout />
              </ReactFlowProvider>
            )}
          </>
        )}
      </DarkmodeProvider>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
