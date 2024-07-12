import React, { useState } from "react";
import { TorusTable } from "./torusComponents/TorusTable";
const data = [
  {
    name: "Object 1",
    value: {
      role: "admin",
      job: "ganesh",
      array: ["whatever", "something"],
    },
  },
  {
    name: "Object 2",
    value: 64,
  },
  {
    name: "Object 3",
    value: 1,
  },
  {
    name: "Object 4",
    value: 15,
  },
  {
    name: "Object 5",
    value: 52,
  },
  {
    name: "Object 6",
    value: 79,
  },
  {
    name: "Object 7",
    value: 72,
  },
  {
    name: "Object 8",
    value: 88,
  },
  {
    name: "Object 9",
    value: 1,
  },
  {
    name: "Object 10",
    value: 30,
  },
  {
    name: "Object 11",
    value: 78,
  },
  {
    name: "Object 12",
    value: 82,
  },
  {
    name: "Object 13",
    value: 25,
  },
  {
    name: "Object 14",
    value: 75,
  },
  {
    name: "Object 15",
    value: 79,
  },
  {
    name: "Object 16",
    value: 66,
  },
  {
    name: "Object 17",
    value: 73,
  },
  {
    name: "Object 18",
    value: 58,
  },
  {
    name: "Object 19",
    value: 16,
  },
  {
    name: "Object 20",
    value: 11,
  },
];
export default function Sample() {
  const [datas, setData] = useState([]);
  console.log(datas);
  return (
    <TorusTable primaryColumn={"name"} tableData={data} onSave={setData} />
  );
}
