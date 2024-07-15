import React from "react";
import App from "./Components/App";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ReactFlowProvider } from "reactflow";
import { NextUIProvider } from "@nextui-org/system";

export default function SFMain({
  appGroup,
  tenant,
  application,
  currentFabric,
}) {
  return (
    <ReactFlowProvider>
      <NextUIProvider style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
          }}
        >
          <App
            currentFabric={currentFabric}
            tenant={tenant}
            appGroup={appGroup}
            fabrics={currentFabric}
            application={application}
          />
        </div>
      </NextUIProvider>
    </ReactFlowProvider>
  );
}
