import React, { useEffect, useId, useState } from "react";
import {
  Button,
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";
import {
  Checkbox,
  Collection,
  useTableOptions,
  useTable,
} from "react-aria-components";
import { v4 as uuidv4 } from "uuid";
import TorusButton from "./TorusButton";
import TorusDropDown from "./TorusDropDown";
import TorusInput from "./TorusInput";
import TorusDialog from "./TorusDialog";

const defaultClassName = {
  table: "",
  tableHeader: "",
  tableBody: "",
  tableRow: "",
  tableCell: "",
};
const TableDataContext = React.createContext();
function TorusColumn(props) {
  return (
    <Column {...props}>
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}
          {allowsSorting && (
            <span aria-hidden="true" className="sort-indicator">
              {sortDirection === "ascending" ? "▲" : "▼"}
            </span>
          )}
        </>
      )}
    </Column>
  );
}

function TorusTableHeader({ columns, children, selectedKeys }) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

  return (
    <TableHeader>
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === "toggle" && (
        <Column>
          {selectionMode === "multiple" && (
            <TorusColumnCheckbox
              slot="selection"
              selectedKeys={selectedKeys}
              className="cursor-pointer"
            />
          )}
        </Column>
      )}
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
      {/* {children} */}
      {/* <Collection items={columns}>{children}</Collection> */}
    </TableHeader>
  );
}

function TorusRow({ id, columns, children, ...otherProps }) {
  let { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <Row {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === "toggle" && (
        <Cell>
          <TorusCheckbox
            selectedKeys={otherProps?.selectedKeys}
            slot="selection"
            className="cursor-pointer"
            hs={otherProps?.index}
          />
        </Cell>
      )}
      {columns.map((column) => {
        console.log(column, "id");
        if (column?.id == "Actions") {
          return (
            <Cell children={<TableCellActions id={otherProps?.index} />} />
          );
        } else
          return (
            <Cell
              children={
                <div className="w-full h-full flex items-center justify-center">
                  <RenderTableChildren
                    children={otherProps?.item?.[column?.id]}
                  />
                </div>
              }
            />
          );
      })}
      {/* <Collection items={columns}>{children}</Collection> */}
      {/* {children} */}
      {/* <RenderTableChildren key={id} columns={columns} data={children} /> */}
    </Row>
  );
}

function TorusCheckbox({ children, hs, selectedKeys, ...props }) {
  return (
    <Checkbox
      {...props}
      isIndeterminate={
        selectedKeys && (selectedKeys == "all" || selectedKeys.has(hs))
      }
    >
      {({ isIndeterminate }) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <polyline points="1 9 7 14 15 4" />
              ) : (
                <rect x={1} y={7.5} width={15} height={3} />
              )}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}
function TorusColumnCheckbox({ children, selectedKeys, ...props }) {
  return (
    <Checkbox
      {...props}
      isIndeterminate={selectedKeys && selectedKeys == "all" ? true : false}
    >
      {({ isIndeterminate }) => (
        <>
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <polyline points="1 9 7 14 15 4" />
              ) : (
                <rect x={1} y={7.5} width={15} height={3} />
              )}
            </svg>
          </div>
          {children}
        </>
      )}
    </Checkbox>
  );
}
export function TorusTable({
  allowsSorting = true,
  primaryColumn,
  tableData,
  onSave,
  rowsPerPage = 6,
  isEditable = true,
}) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [TotalColumns, setTotalColumns] = useState([]);
  const [serchValue, setSerchValue] = useState("");

  const serachedItems = React.useMemo(() => {
    try {
      if (!serchValue) return data;
      return data.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(serchValue.toLowerCase())
      );
    } catch (e) {
      console.error(e);
    }
  }, [serchValue, data]);

  const items = React.useMemo(() => {
    try {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return serachedItems.slice(start, end);
    } catch (e) {
      console.error(e);
    }
  }, [page, serachedItems, rowsPerPage]);

  const filterColmns = React.useMemo(() => {
    try {
      if (!TotalColumns) return [];
      return TotalColumns.filter(
        (col) =>
          col.name == primaryColumn || Array.from(columns).includes(col.name)
      );
    } catch (e) {
      console.error(e);
    }
  }, [columns, primaryColumn, TotalColumns]);

  const sortedItems = React.useMemo(() => {
    try {
      if (!sortDescriptor) return items;
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor?.column];
        const second = b[sortDescriptor?.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.error(e);
    }
  }, [sortDescriptor, items]);

  const getColumns = (tableData) => {
    let newColumns = new Set([]);
    tableData.forEach((item) => {
      if (typeof item == "object")
        Object.keys(item).forEach((key) => newColumns.add(key));
    });

    let cc = Array.from(newColumns).map((key) => ({
      id: key,
      name: key,
      key: key,
      label: key,
      isRowHeader: key == primaryColumn ? true : false,
      allowsSorting: allowsSorting,
    }));
    setTotalColumns(cc);

    setColumns(newColumns);
  };
  let [selectedKeys, setSelectedKeys] = React.useState(null);
  useEffect(() => {
    if (Array.isArray(tableData)) {
      getColumns(tableData);
      setData(tableData);

      setSortDescriptor({
        column: primaryColumn,
        direction: "ascending",
      });
    } else {
      console.error("tableData is not an array");
    }
  }, [tableData, primaryColumn]);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / rowsPerPage));
  }, [data, rowsPerPage]);

  return (
    <TableDataContext.Provider value={{ data, setData }}>
      {filterColmns.length > 0 && sortDescriptor && totalPages && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <TorusInput placeholder="search" onChange={setSerchValue} />
          <TorusButton
            onPress={() => {
              onSave && onSave(data);
            }}
            Children={"save"}
          />
          <TorusDropDown
            title={"filter"}
            selectionMode="multiple"
            selected={columns}
            setSelected={setColumns}
            items={TotalColumns.filter((col) => col.name != primaryColumn)}
          />
          <Table
            onRowAction={(event) => alert(event)}
            selectedKeys={selectedKeys}
            onSortChange={setSortDescriptor}
            sortDescriptor={sortDescriptor}
            onSelectionChange={setSelectedKeys}
            className={"w-full h-[90%] "}
          >
            <TorusTableHeader
              selectedKeys={selectedKeys}
              columns={[
                ...filterColmns,
                isEditable && {
                  id: "Actions",
                  name: "Actions",
                  key: "Actions",
                  label: "Actions",
                  isRowHeader: false,
                },
              ]}
            />

            <TableBody renderEmptyState={() => <div> noData </div>}>
              {sortedItems.map((item, index) => (
                <TorusRow
                  key={tableData.findIndex(
                    (el) => el[primaryColumn] == item[primaryColumn]
                  )}
                  item={item}
                  id={index}
                  index={data.findIndex(
                    (el) => el[primaryColumn] === item[primaryColumn]
                  )}
                  columns={[
                    ...filterColmns,
                    isEditable && {
                      id: "Actions",
                      name: "Actions",
                      key: "Actions",
                      label: "Actions",
                      isRowHeader: false,
                    },
                  ]}
                  selectedKeys={selectedKeys}
                />
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center  w-[30%] h-[5%]">
            <TorusButton
              Children={"Previous"}
              width={"xs"}
              onPress={() =>
                setPage((p) => {
                  if (p > 1) return p - 1;
                  return p;
                })
              }
            />
            <span>
              {page} of {totalPages}
            </span>
            <TorusButton
              Children={"Next"}
              width={"xs"}
              onPress={() =>
                setPage((p) => {
                  if (p < totalPages) return p + 1;
                  return p;
                })
              }
            />
          </div>
        </div>
      )}
    </TableDataContext.Provider>
  );
}
const TableCellActions = ({ id }) => {
  return (
    <div className=" w-full h-full flex items-center justify-center">
      <TorusDialog
        key={"TableEdit"}
        triggerElement={<TorusButton Children={"Edit"} />}
        classNames={{
          dialogClassName: " flex  border-2 flex-col bg-white",
        }}
        title={"Edit"}
        message={"Edit"}
        children={({ close }) => <EditAction id={id} close={close} />}
      />
      <TorusDialog
        key={"TableDelete"}
        triggerElement={<TorusButton Children={"Delete"} />}
        classNames={{
          dialogClassName: " flex  border-2 flex-col bg-white",
        }}
        title={"Delete"}
        message={"Edit"}
        children={({ close }) => <DeleteAction id={id} close={close} />}
      />
    </div>
  );
};
const RenderTableChildren = ({ children }) => (
  <>
    {children && typeof children === "object" ? (
      <>
        {Array.isArray(children) ? (
          <div className=" flex flex-col gap-1">
            {children.map((item, index) => (
              <li>
                <RenderTableChildren key={index} children={item} />
              </li>
            ))}
          </div>
        ) : (
          <div className=" flex flex-col gap-1">
            {Object.keys(children).map((key) => (
              <div
                key={key}
                className=" flex gap-2 items-center justify-center"
              >
                <h1>{key}:</h1>
                <RenderTableChildren key={key} children={children[key]} />
              </div>
            ))}
          </div>
        )}
      </>
    ) : (
      children
    )}
  </>
);

const EditAction = ({ id, close }) => {
  const { data, setData } = React.useContext(TableDataContext);
  const [obj, setObj] = React.useState(null);
  useEffect(() => {
    setObj(data[id]);
  }, [id, data]);

  const handleSave = () => {
    setData((prev) => {
      return prev.map((item, index) => {
        if (index === id) {
          return { ...item, ...obj };
        }
        return item;
      });
    });
    close();
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {obj && <Cycle obj={obj} setObj={setObj} />}
      <TorusButton Children={"Save"} onPress={handleSave} />
    </div>
  );
};

const DeleteAction = ({ id, close }) => {
  const { data, setData } = React.useContext(TableDataContext);

  const handleDelete = () => {
    setData((prev) => {
      console.log(
        prev.filter((item, index) => index !== id),
        "deletedData"
      );
      return prev.filter((item, index) => index !== id);
    });
    close();
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <TorusButton Children={"Cancel"} onPress={close} />
      <TorusButton Children={"Delete"} onPress={handleDelete} />
    </div>
  );
};

const Cycle = ({ obj, setObj }) => {
  return (
    <>
      {obj && Array.isArray(obj) ? (
        obj.map((ele, index) => (
          <li>
            <Cycle
              key={index}
              obj={ele}
              setObj={(newObj) =>
                setObj(obj.map((e, i) => (i === index ? newObj : e)))
              }
            />
          </li>
        ))
      ) : typeof obj == "object" ? (
        Object.keys(obj).map((ele) => {
          if (typeof obj[ele] === "object")
            return (
              <>
                <p>{ele}:</p>
                <Cycle
                  key={ele}
                  obj={obj[ele]}
                  setObj={(newObj) => setObj({ ...obj, [ele]: newObj })}
                />
              </>
            );
          return (
            <TorusInput
              key={ele}
              variant="bordered"
              label={ele}
              labelColor="text-[#000000]/50"
              borderColor="[#000000]/50"
              outlineColor="torus-focus:ring-[#000000]/50"
              placeholder=""
              isDisabled={false}
              onChange={(e) => setObj({ ...obj, [ele]: e })}
              radius="lg"
              width="xl"
              height="xl"
              textColor="text-[#000000]"
              bgColor="bg-[#FFFFFF]"
              value={obj[ele]}
              type="text"
            />
          );
        })
      ) : (
        <TorusInput
          variant="bordered"
          labelColor="text-[#000000]/50"
          borderColor="[#000000]/50"
          outlineColor="torus-focus:ring-[#000000]/50"
          placeholder=""
          isDisabled={false}
          onChange={(e) => setObj(e)}
          radius="lg"
          width="xl"
          height="xl"
          textColor="text-[#000000]"
          bgColor="bg-[#FFFFFF]"
          value={obj}
          type="text"
        />
      )}
    </>
  );
};
