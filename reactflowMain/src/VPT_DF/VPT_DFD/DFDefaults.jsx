import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";


import { useState } from "react";
import App from "./Components/App";

import DefaulltSidebar from "../../commonComponents/layout/SideBar/DefaulltSidebar";

/**
 * Function component for managing default values for the Data Flow Diagram.
 *
 * @return {JSX.Element} The JSX element representing the default values management for the Data Flow Diagram.
 */
function DFDDefaults() {
  const [haksd, setHaksd] = useState({});
  const [json, setJson] = useState({ nodes: [], nodeProperty: {} });
  const [fabrics, setFabrics] = useState("DF");
  const [defaultsMode, setDefaultsMode] = useState("SingleNode");
  const fabricslist = ["PF", "DF", "UF"];

  /**
   * Updates the `defaultsMode` state based on the provided `mode` value.
   *
   * @param {Array} mode - The mode value to set the `defaultsMode` state.
   * @return {void}
   */
  const handleModesChange = (mode) => {
    if (Array.from(mode)[0]) {
      setDefaultsMode(Array.from(mode)[0]);
    } else {
      setDefaultsMode("SingleNode");
    }
  };

  //Returning the JSX
  return (
    <>
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        {/* <Sidebar data={menuData[fabrics]} /> */}
        <DefaulltSidebar fabrics={"DFD"} />
        <App
          setFabrics={setFabrics}
          fabrics={fabrics}
          fabricsList={fabricslist}
          setDefaultsMode={handleModesChange}
          defaultsMode={defaultsMode}
          sendJsonToParent={setHaksd}
          getJsonFromParent={json}
          sendDataToFlow={setJson}
          getDataFromFlow={haksd}
        />
      </div>
    </>
  );
}

export default DFDDefaults;
