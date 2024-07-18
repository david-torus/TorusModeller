import React, { useState } from "react";
import { TorusTable } from "./torusComponents/TorusTable";
import countryCode from "../src/torusComponents/countryCode.json";
const URL = "http://192.168.2.94:3010/vmsp_banks/";
export default function Sample() {
  const [datas, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set([""]));
  //get
  const fetchData = async (page, filterValue, rowsPerPage) => {
    try {
      const response = await fetch(
        `http://192.168.2.94:3010/vmsp_banks/get?page=${page}&limit=${rowsPerPage}&filter=${filterValue}`
      );
      const data = await response.json();

      if (
        data &&
        Array.isArray(data.items) &&
        typeof data.totalPages === "number"
      ) {
        return {
          tableData: data.items,
          totalPages: data.totalPages,
        };
      } else {
        console.error("Unexpected data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //edit
  async function post(id, data) {
    console.log(id);

    const url = URL + id;

    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  async function deleteTableData(id, data) {
    console.log(id);

    const url = URL + id;

    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <TorusTable
      isAsync={true}
      heading="Torus Table"
      description="Records"
      primaryColumn={"vmsp_id"}
      setSelectedRows={setSelectedRows}
      selectedRows={selectedRows}
      // tableData={countryCode} //json data
      onSave={setData}
      selectionBehavior={"toggle"}
      selectionMode={"multiple"}
      getAysncData={fetchData}
      onEdit={post}
      onDelete={deleteTableData}
      rowsPerPage={10}
    />
  );
}
