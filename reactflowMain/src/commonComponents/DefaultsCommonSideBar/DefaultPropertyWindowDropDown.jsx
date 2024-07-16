import React, { useContext } from "react";

import ReusableDropDown from "../reusableComponents/ReusableDropDown";
import { DarkmodeContext } from "../context/DarkmodeContext";
import { propertyData } from "../utils/util";
export default function DefaultPropertyWindowDropDown({
  propertyDatas,
  model,
  handleSelectedProperty,
}) {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <ReusableDropDown
      selectedKey={new Set([propertyDatas[model]])}
      handleSelectedKey={handleSelectedProperty}
      darkmode={darkmode}
      title={propertyDatas[model]}
      selectionMode="single"
      items={propertyData}
    />
  );
}
