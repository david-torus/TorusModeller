import React, { useState } from "react";
import {
  RenderTableChildren,
  TableCellActions,
  TorusColumn,
  TorusRow,
  TorusTable,
  TorusTableHeader,
} from "./torusComponents/TorusTable";
import countryCode from "../src/torusComponents/countryCode.json";
import { Cell, TableBody } from "react-aria-components";
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
      isSkeleton={false}
      isAsync={true}
      heading="Torus Table"
      description="Records"
      primaryColumn={"vmsp_id"}
      setSelectedRows={setSelectedRows}
      selectedRows={selectedRows}
      tableData={countryCode} //json data
      onSave={setData}
      selectionBehavior={"toggle"}
      selectionMode={"multiple"}
      getAysncData={fetchData}
      onEdit={post}
      onDelete={deleteTableData}
      rowsPerPage={10}
      editableColumns={["name","bank_code","created_by"]}
      addableColumns={["name"]}
    >
      {({ selectedKeys, filterColmns, sortedItems, primaryColumn }) => (
        <>
          <TorusTableHeader
            selectedKeys={selectedKeys}
            columns={[
              ...filterColmns,
              {
                id: "Actions",
                name: "Actions",
                key: "Actions",
                label: "Actions",
                isRowHeader: false,
              },
            ]}
          >
            {({ columns }) => (
              <>
                {columns.map((column) => (
                  <TorusColumn
                    key={column.id}
                    id={column.id}
                    allowsSorting={column.allowsSorting}
                    isRowHeader={column.isRowHeader}
                  >
                    {column.name}
                  </TorusColumn>
                ))}
              </>
            )}
          </TorusTableHeader>
          <TableBody
            renderEmptyState={() => (
              <div className="text-center"> No Data </div>
            )}
          >
            {sortedItems.map((item, index) => (
              <>
                <TorusRow
                  key={item[primaryColumn]}
                  item={item}
                  id={index}
                  index={item[primaryColumn]}
                  columns={[
                    ...filterColmns,
                    {
                      id: "Actions",
                      name: "Actions",
                      key: "Actions",
                      label: "Actions",
                      isRowHeader: false,
                    },
                  ]}
                  selectedKeys={selectedKeys}
                  className={
                    "border-1 border-b-slate-800 border-t-transparent border-l-transparent border-r-transparent"
                  }
                >
                  {({ columns, otherProps }) => (
                    <>
                      {columns.map((column) => {
                        if (column?.id == "Actions") {
                          return (
                            <Cell
                              className={"border-b border-[#EAECF0]"}
                              children={
                                <TableCellActions id={otherProps?.index} />
                              }
                            />
                          );
                        } else
                          return (
                            <Cell
                              className={"border-b border-[#EAECF0]"}
                              children={
                                <div className="w-full h-full flex flex-col items-center justify-center py-[1rem] text-xs font-normal ">
                                  {/* {otherProps?.item?.[column?.id]} */}

                                  <RenderTableChildren
                                    children={otherProps?.item?.[column?.id]}
                                  />
                                </div>
                              }
                            />
                          );
                      })}
                    </>
                  )}
                </TorusRow>
              </>
            ))}
          </TableBody>
        </>
      )}
    </TorusTable>
  );
}
