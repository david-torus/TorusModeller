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
        let params;
        if (tok) {
          params = atob(tok);
        } else {
          params = atob(
            `eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpzYjJkcGJrbGtJam9pZEdWemRDSXNJbVpwY25OMFRtRnRaU0k2SW5SbGMzUWlMQ0pzWVhOMFRtRnRaU0k2SW5SbGMzUWlMQ0psYldGcGJDSTZJblJsYzNSQVpXMWhhV3d1WTI5dElpd2liVzlpYVd4bElqb2lOVGM0TkRFeE5EazBPU0lzSWpKR1FVWnNZV2NpT2lKT0lpd2lZMnhwWlc1MElqb2lRVUpESWl3aVlYVjBhQ0k2ZXlKdmNtZEhjbkFpT2xzaVJsUWlMQ0pKVkNKZExDSnZjbWR6SWpwYklrWlVUekVpTENKR1ZFOHlJaXdpU1ZSUE1pSmRMQ0p5YjJ4bFIzSndJanBiSWxKSE1TSXNJbEpITWlKZExDSnliMnhsY3lJNld5SlNNU0pkTENKd2MwZHljQ0k2V3lKVVQxSlZVMU5OUlNKZExDSndjeUk2VzF0N0ltNWhiV1VpT2lKQlFrTWlMQ0poY0hCSGNuQWlPbHQ3SW01aGJXVWlPaUpOVTFBaUxDSmhjSEFpT2x0N0ltNWhiV1VpT2lKTlJTSjlYWDBzZXlKdVlXMWxJam9pUTBjaUxDSmhjSEFpT2x0N0ltNWhiV1VpT2lKTlJTSjlMSHNpYm1GdFpTSTZJbTEyY0NKOVhYMHNleUp1WVcxbElqb2lWRTBpTENKaGNIQWlPbHQ3SW01aGJXVWlPaUowWlhOMEluMWRmVjE5TEhzaWJtRnRaU0k2SWtkVFV5SXNJbUZ3Y0VkeWNDSTZXM3NpYm1GdFpTSTZJazVsZDBGd2NFZHliM1Z3SWl3aVlYQndJanBiZXlKdVlXMWxJam9pYm1WM1FWQndJbjFkZlYxOVhTeGJleUp1WVcxbElqb2lRVUpESWl3aVlYQndSM0p3SWpwYmV5SnVZVzFsSWpvaVRWTlFJaXdpWVhCd0lqcGJleUp1WVcxbElqb2lUVVVpZlYxOUxIc2libUZ0WlNJNklrTkhJaXdpWVhCd0lqcGJleUp1WVcxbElqb2lUVVVpZlYxOUxIc2libUZ0WlNJNklsUk5JaXdpWVhCd0lqcGJleUp1WVcxbElqb2lkR1Z6ZENKOVhYMWRmU3g3SW01aGJXVWlPaUpIVTFNaUxDSmhjSEJIY25BaU9sdDdJbTVoYldVaU9pSk9aWGRCY0hCSGNtOTFjQ0lzSW1Gd2NDSTZXM3NpYm1GdFpTSTZJbTVsZDBGUWNDSjlYWDFkZlYwc1czc2libUZ0WlNJNklrRkNReUlzSW1Gd2NFZHljQ0k2VzNzaWJtRnRaU0k2SWsxVFVDSXNJbUZ3Y0NJNlczc2libUZ0WlNJNklrMUZJbjFkZlN4N0ltNWhiV1VpT2lKRFJ5SXNJbUZ3Y0NJNlczc2libUZ0WlNJNklrMUZJbjFkZlN4N0ltNWhiV1VpT2lKVVRTSXNJbUZ3Y0NJNlczc2libUZ0WlNJNkluUmxjM1FpZlYxOVhYMHNleUp1WVcxbElqb2lSMU5USWl3aVlYQndSM0p3SWpwYmV5SnVZVzFsSWpvaVRtVjNRWEJ3UjNKdmRYQWlMQ0poY0hBaU9sdDdJbTVoYldVaU9pSnVaWGRCVUhBaWZWMTlYWDFkTEZ0N0ltNWhiV1VpT2lKQlFrTWlMQ0poY0hCSGNuQWlPbHQ3SW01aGJXVWlPaUpOVTFBaUxDSmhjSEFpT2x0N0ltNWhiV1VpT2lKTlJTSjlYWDBzZXlKdVlXMWxJam9pUTBjaUxDSmhjSEFpT2x0N0ltNWhiV1VpT2lKTlJTSjlYWDBzZXlKdVlXMWxJam9pVkUwaUxDSmhjSEFpT2x0N0ltNWhiV1VpT2lKMFpYTjBJbjFkZlYxOUxIc2libUZ0WlNJNklrZFRVeUlzSW1Gd2NFZHljQ0k2VzNzaWJtRnRaU0k2SWs1bGQwRndjRWR5YjNWd0lpd2lZWEJ3SWpwYmV5SnVZVzFsSWpvaWJtVjNRVkJ3SW4xZGZWMTlYU3hiZXlKdVlXMWxJam9pUVVKRElpd2lZWEJ3UjNKd0lqcGJleUp1WVcxbElqb2lUVk5RSWl3aVlYQndJanBiZXlKdVlXMWxJam9pVFVVaWZWMTlMSHNpYm1GdFpTSTZJa05ISWl3aVlYQndJanBiZXlKdVlXMWxJam9pVFVVaWZWMTlMSHNpYm1GdFpTSTZJbFJOSWl3aVlYQndJanBiZXlKdVlXMWxJam9pZEdWemRDSjlYWDFkZlN4N0ltNWhiV1VpT2lKSFUxTWlMQ0poY0hCSGNuQWlPbHQ3SW01aGJXVWlPaUpPWlhkQmNIQkhjbTkxY0NJc0ltRndjQ0k2VzNzaWJtRnRaU0k2SW01bGQwRlFjQ0o5WFgxZGZWMHNXM3NpYm1GdFpTSTZJa0ZDUXlJc0ltRndjRWR5Y0NJNlczc2libUZ0WlNJNklrMVRVQ0lzSW1Gd2NDSTZXM3NpYm1GdFpTSTZJazFGSW4xZGZTeDdJbTVoYldVaU9pSkRSeUlzSW1Gd2NDSTZXM3NpYm1GdFpTSTZJazFGSW4xZGZTeDdJbTVoYldVaU9pSlVUU0lzSW1Gd2NDSTZXM3NpYm1GdFpTSTZJblJsYzNRaWZWMTlYWDBzZXlKdVlXMWxJam9pUjFOVElpd2lZWEJ3UjNKd0lqcGJleUp1WVcxbElqb2lUbVYzUVhCd1IzSnZkWEFpTENKaGNIQWlPbHQ3SW01aGJXVWlPaUp1WlhkQlVIQWlmVjE5WFgxZFhYMHNJbWxoZENJNk1UY3lNekU0TURFeE5pd2laWGh3SWpveE56SXpNVGd6TnpFMmZRLmNnM1IyM1c4bUJtWFdOOUNmYnFrQ0xPTE1fZTkzb3NEeWY1Qy04Tml3WlUiLCJhY2Nlc3NLZXkiOiJmcmsiLCJjb250ZXh0S2V5IjoiZGYiLCJjYXRhbG9nIjoiZG9tYWluMiIsImFydGlmYWN0R3JwIjoicGdycCIsImFydGlmYWN0TmFtZSI6InRlc3Rpbmc0IiwidmVyc2lvbiI6InYxIn0`,
          );
        }
        params = JSON.parse(params);
        console.log(params, "params");
        let token =
          params?.token ||
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoidGVzdCIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6IiIsIm1vYmlsZSI6IiIsIjJGQUZsYWciOiJZIiwicm9sZSI6InNlbmlvcmRldiIsImNsaWVudCI6IkFCQyIsImlhdCI6MTcxOTU1NDIyOX0.1Gk5Lpf14W9twZEYxov1pik1vYunYP5CwKEoG2YEKG4";

        const res = await getClientDetails(token).then((data) => {
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
          setClientDetails({ profile: res, details: params });
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
  }, []);

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
            clientDetails?.profile &&
            clientDetails?.profile?.hasOwnProperty("client") &&
            clientDetails?.profile?.client ? (
              <>
                <ReactFlowProvider>
                  <Layout
                    client={clientDetails?.profile?.client}
                    clientLoginId={clientDetails?.profile?.loginId}
                    currentArtifactKey={{
                      tKey: clientDetails?.details?.accessKey,
                      fabric: clientDetails?.details?.contextKey,
                      project: clientDetails?.details?.catalog,
                      artifactGroup: clientDetails?.details?.artifactGrp,
                      artifact: clientDetails?.details?.artifactName,
                      version: clientDetails?.details?.version,
                    }}
                  />
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
