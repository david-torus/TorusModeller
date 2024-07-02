import React from "react";
import TorusDropDown from "./torusComponents/TorusDropDown";
import Layout from "./Layout";
const data = [
  {
    label: "Data",
    key: "Data",
  },
  {
    label: "Wire",
    key: "Wire",
  },
  {
    label: "Data",
    key: "Datas",
  },
];
export default function App() {
  const [selected, setSelected] = React.useState(new Set());
  return (
    <div>
      {/* <Layout /> */}
      <TorusDropDown
        seleected={selected}
        setSelected={setSelected}
        items={data}
      />
    </div>
  );
}
