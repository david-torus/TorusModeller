import { Dialog } from "primereact/dialog";
import React, { useContext, useState } from "react";
import Builder from "../../VPT_DJUI/builder";

import DefaultPropertyWindowDropDown from "./DefaultPropertyWindowDropDown";
import { DarkmodeContext } from "../context/DarkmodeContext";
import {  Tab, Tabs } from "@nextui-org/react";
import { cardUIPolicy, colorPolicy, controlPolicy } from "../utils/util";

export default function DefaultDailog({
  visible,
  setVisible,
  model,
  tabData,
  tabDataHelper,
  handleTabData,
  handleTabDataHelper,
  handlePropertyWindow,
  propertyWindow,
}) {
  const [activeTab, setActiveTab] = useState("1");
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <Dialog
      headerStyle={{
        height: "40px",
        textAlign: "center",
        textTransform: "capitalize",
        backgroundColor: darkmode ? "#363636" : "#E9E8E8",
        color: darkmode ? "white" : "black",
      }}
      contentStyle={{
        backgroundColor: darkmode ? "#363636" : "#E9E8E8",
        color: darkmode ? "white" : "black",
      }}
      visible={visible}
      onHide={() => setVisible(false)}
      style={{ width: "60vw", height: "90vh" }}
    >
      <div className="w-[5%]">
        <DefaultPropertyWindowDropDown
          propertyDatas={propertyWindow}
          model={model + ".pw"}
          handleSelectedProperty={handlePropertyWindow}
        />
      </div>
      <div className="flex flex-col items-center">
        <div>
          <Tabs
            items={[
              { id: "1", key: 1, label: model },
              { id: "2", key: 2, label: model + ".helper" },
            ]}
            onSelectionChange={setActiveTab}
          >
            {(item) => <Tab key={item.id} title={item.label} />}
          </Tabs>
        </div>
        <div
          className="w-full"
          style={{ display: activeTab === "1" ? "block" : "none" }}
        >
          <Builder
            updatedNodeConfig={handleTabData}
            defaultJSOn={tabData[model]}
            colorPolicy={colorPolicy}
            controlPolicy={controlPolicy}
            isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
            uiPolicy={cardUIPolicy}
            key={model}
          />
        </div>
        <div
          className="w-full"
          style={{ display: activeTab === "2" ? "block" : "none" }}
        >
          <Builder
            updatedNodeConfig={handleTabDataHelper}
            defaultJSOn={tabDataHelper[model + ".helper"]}
            colorPolicy={colorPolicy}
            controlPolicy={controlPolicy}
            isAdmin={{ canAdd: true, canDelete: true, canEdit: true }}
            uiPolicy={cardUIPolicy}
            key={model + ".helper"}
          />
        </div>
      </div>
    </Dialog>
  );
}
