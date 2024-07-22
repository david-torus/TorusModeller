import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { useState } from "react";
import App from "./Components/App";
import DefaulltSidebar from "../../commonComponents/layout/SideBar/DefaulltSidebar";

function PFDefaults() {
  const [haksd, setHaksd] = useState({});
  const [json, setJson] = useState({
    nodes: [],
    nodeProperty: {},
    nodeEdges: [],
  });
  const [fabrics, setFabrics] = useState("PF");
  const fabricslist = ["PF", "DF", "UF"];
  const [defaultsMode, setDefaultsMode] = useState("SingleNode");

  /**
   * A function that handles the change of modes.
   *
   * @param {Array} mode - The mode value to set the defaults mode.
   * @return {void}
   */
  const handleModesChange = (mode) => {
    if (Array.from(mode)[0]) {
      setDefaultsMode(Array.from(mode)[0]);
    } else {
      setDefaultsMode("SingleNode");
    }
  };

  return (
    <>
      <div style={{ width: "100%", height: "100vh", display: "flex" }}>
        {/* <Sidebar data={menuData[fabrics]} />  */}
        <DefaulltSidebar fabrics={"PFD"} />
        <App
          sendJsonToParent={setHaksd}
          getJsonFromParent={json}
          defaultsMode={defaultsMode}
          setFabrics={setFabrics}
          fabrics={fabrics}
          tenant={"torus"}
          group={"Fintech"}
          sendDataToFlow={setJson}
          getDataFromFlow={haksd}
          fabricsList={fabricslist}
          setDefaultsMode={handleModesChange}
        />
      </div>
    </>
  );
}

export default PFDefaults;
