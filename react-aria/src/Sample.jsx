import React, { useState } from "react";
import { TorusTable } from "./torusComponents/TorusTable";
import countryCode from "../src/torusComponents/countryCode.json";

export default function Sample() {
  const [datas, setData] = useState([]);
  console.log(datas.length, "Lengths--->>>");
  console.log(datas, "Lengths--->>>");
  return (
    <TorusTable
      heading="Torus Table"
      description="country code"
      primaryColumn={"specialKey"}
      tableData={countryCode}
      onSave={setData}
      selectionBehavior={"toggle"}
      selectionMode={"multiple"}
    />
  );
}
