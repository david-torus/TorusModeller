
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import { useState } from "react";
import App from "./Components/App";
import DefaulltSidebar from "../../commonComponents/layout/SideBar/DefaulltSidebar";

function UFDefaults() {
  const [haksd, setHaksd] = useState({});
  const [json, setJson] = useState({ nodes: [], nodeProperty: {} });
  const [fabrics, setFabrics] = useState("UF");
  const [defaultsMode, setDefaultsMode] = useState("SingleNode");
  const [isSelected, setSelected] = useState({
    artifact: false,
    version: false,
  });
  const fabricslist = ["PF", "DF", "UF"];

  /**
   * Updates the selected state with the provided selected object.
   *
   * @param {Object} selected - The selected object to update the state with.
   * @return {void} This function does not return anything.
   */
  const handleSelected = (selected) => {
    setSelected({ ...selected });
  };

  /**
   * Handles the change in modes by setting the defaults mode based on the input mode.
   *
   * @param {Array} mode - The mode to handle the change for.
   * @return {void} This function does not return anything.
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
        <DefaulltSidebar fabrics={"UFD"} />
        <App
          defaultsMode={defaultsMode}
          isSelected={isSelected}
          sendJsonToParent={setHaksd}
          getJsonFromParent={json}
          setFabrics={setFabrics}
          fabrics={fabrics}
          tenant={"torus"}
          group={"Fintech"}
          sendDataToFlow={setJson}
          getDataFromFlow={haksd}
          fabricsList={fabricslist}
          setDefaultsMode={handleModesChange}
          handleSelected={handleSelected}
        />
      </div>
    </>
  );
}

export default UFDefaults;
