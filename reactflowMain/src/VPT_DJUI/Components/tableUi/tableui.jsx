/* eslint-disable */
import React, { useEffect, useState, useRef, useContext } from "react";
import useOnClickOutsideRef from "../../../commonComponents/customhooks/outsidecall";
import { Tooltip } from "@nextui-org/tooltip";
import { Toast } from "primereact/toast";
import { IoFilterSharp } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Pagination,
} from "@nextui-org/react";

import { FiSearch } from "react-icons/fi";

import TableUidecider from "./TableUidecider";
import Deletepop from "../utils/Deletepop";

import { RenderTooltip } from "../utils/RenderTooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BuilderContext } from "../../builder";
import ReusableInput from "../../../commonComponents/reusableComponents/ReusableInput";
export default function Tableui({
  toogleFunctionality = true,
  keyJson,
  ArrayJson,
  path,
  uiPolicys,
  children,
}) {
  const { functionality, editedValues, setEditedValues } =
    useContext(BuilderContext);
  const { darkMode } = useContext(DarkmodeContext);

  const [deltekys, setdleteKyes] = useState(null);

  const [selectedkey, setSelectedkey] = useState(null);
  const [selectedhead, setSelectedhead] = useState(null);
  const [showhead, setShowhead] = useState(null);

  const [headkey, setHeadkey] = useState(null);
  const [hoverhead, sethoverhead] = useState(null);

  const modalRef = useOnClickOutsideRef(() => setSelectedkey(false));
  const modalRefs = useOnClickOutsideRef(() => setSelectedhead(false));
  const [uniqueColumns, setUniqueColumns] = useState([]);
  const [newkey, setNewkey] = useState(null);
  const [deletepop, setDeletepop] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filteredColumns, setFilteredColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const [json, setJson] = useState([]);

  const [search, setSearch] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "",
    direction: "ascending",
  });
  const handlepath = (keys2) => {
    try {
      let index = "";
      json &&
        json.length > 0 &&
        json.map((item, i) => {
          if (Object.keys(item).includes(keys2)) {
            if (index == "") index = i;
          }
        });
      let paths = path + "." + index + "." + keys2;
      let result;

      result = paths.split(".");
      result.shift();
      result = result.join(".");
      return result;
    } catch (e) {
      console.error(e);
    }
  };

  const toast = useRef(null);

  const handlekeyhead = (newkey) => {
    try {
      json &&
        json.length > 0 &&
        json.map((items, key) => {
          if (newkey) {
            if (!Object.keys(items).includes(newkey)) {
              functionality("add", path + "." + key, {
                key: newkey,
                values: "",
                options: "string",
              });
              setNewkey("");
            } else {
              toast.current.show({
                severity: "warm",
                summary: "warming",
                detail: "Key already exists",
                life: 1000,
              });
            }
          } else {
            toast.current.show({
              severity: "warm",
              summary: "Warming",
              detail: "Key should not be empty",
              life: 1000,
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handlehead = (e) => {
    try {
      setHeadkey(e.target.value);
    } catch (e) {
      console.error(e);
    }
  };

  const handlekeyDelete = (keys) => {
    try {
      setDeletepop(false);
      Object.keys(json).length > 0 &&
        Object.keys(json)?.map((key) => {
          Object.keys(json[key]).length > 0 &&
            Object.keys(json[key]).map((ele) => {
              if (ele == keys) {
                functionality("delete", path + "." + key + "." + keys);
                setDeletepop(false);
              }
            });
        });
    } catch (e) {
      console.error(e);
    }
  };

  const handlekeyedit = (e, headkey, keys) => {
    try {
      Object.keys(json).length > 0 &&
        Object.keys(json)?.map((key) => {
          Object.keys(json[key]).map((ele) => {
            if (ele == keys) {
              functionality(
                "edit",
                path + "." + key + "." + keys,
                e.target.value
              );
            }
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handlerow = (e) => {
    try {
      let newrow = {};
      uniqueColumns &&
        uniqueColumns.length > 0 &&
        uniqueColumns.map((key) => {
          if (key.toLowerCase() == "datatype") {
            newrow = {
              ...newrow,
              [key]: {
                selectedValue: "",
                type: "singleSelect",
                selectionList: [
                  "Int",
                  "String",
                  "Float",
                  "Boolean",
                  "DateTime",
                  "Json",
                ],
              },
            };
          } else if (key.toLowerCase() == "isrequired") {
            newrow = {
              ...newrow,
              [key]: {
                value: false,
                type: "checkbox",
              },
            };
          } else newrow = { ...newrow, [key]: "" };
        });

      if (Object.keys(newrow).length > 0) {
        functionality("add", path, {
          key: Object.keys(json).length,
          options: "string",
          values: newrow,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      if (ArrayJson) {
        setJson(ArrayJson);
      }
    } catch (e) {
      console.error(e);
    }
  }, [ArrayJson]);

  useEffect(() => {
    try {
      let uniq = [];
      let objKeys = [];

      Object.keys(json) &&
        Object.keys(json).length > 0 &&
        Object.keys(json)?.map((key) => {
          Object.keys(json[key]).map((ele) => {
            if (!uniq.includes(ele) && ele !== "path" && ele !== "isHeader") {
              uniq.push(ele);
            }
          });
        });
      setSelectedColumns(uniq);
      setUniqueColumns(uniq);
    } catch (e) {
      console.error(e);
    }
  }, [json]);

  useEffect(() => {
    try {
      if (json) {
        let visibleColumns = Object.keys(json);

        const filteredColumns = visibleColumns.filter((parentKey) =>
          Object.keys(json[parentKey]).some((key) =>
            json[parentKey][key]
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase())
          )
        );
        const rowsPerPage = 5;
        const pages = Math.ceil(filteredColumns.length / rowsPerPage);
        setTotalPages(pages);

        setFilteredColumns(filteredColumns);
      }
    } catch (e) {
      console.error(e);
    }
  }, [search, json]);

  const items = React.useMemo(() => {
    try {
      const rowsPerPage = 5;
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredColumns.slice(start, end);
    } catch (e) {
      console.error(e);
    }
  }, [page, filteredColumns]);

  const sortedItems = React.useMemo(() => {
    try {
      return [...items].sort((a, b) => {
        const first = a[Object.keys(a)[0]];
        const second = b[Object.keys(b)[0]];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    } catch (e) {
      console.error(e);
    }
  }, [sortDescriptor, items]);

  return (
    <div className="h-full w-[75%] flex flex-col gap-2  items-center  ">
      <Toast ref={toast} />

      {json.length > 0 && toogleFunctionality && (
        <div className="flex flex-row  items-between justify-between w-[100%]  h-[50px]  ">
          <div className=" flex gap-1 items-center justify-around  rounded-md w-[30%] h-full ">
            <Button
              className={
                " rounded-md  flex select-none  text-sm font-bold border  border-slate-500/50 items-center  " +
                (darkMode ? " bg-[#242424]  text-white" : "text-gray-500 ")
              }
              onClick={() => {
                if (json && uniqueColumns.length > 0) handlerow();
              }}
              size="sm"
            >
              Add row
            </Button>
            <div className="accordian_Wrapper">
              <Popover
                placement="right"
                itemClasses={{
                  title: "text-sm font-bold",
                }}
              >
                <PopoverTrigger>
                  <Button
                    size="sm"
                    className={
                      "rounded-md  flex select-none  text-sm font-bold border  border-slate-500/50  items-center  " +
                      (darkMode
                        ? " bg-[#242424]  text-white"
                        : "text-gray-500 ")
                    }
                    isIconOnly={true}
                  >
                    <FaPlus color={darkMode ? "white" : "#326FD1"} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={
                    " h-[60%] p-1 font-bold text-sm text-gray-500  rounded-sm " +
                    (darkMode ? " bg-[#242424]  text-white" : "text-gray-500 ")
                  }
                  key="keys"
                  aria-label="Keys"
                  title="Add Keys"
                >
                  <div className=" flex flex-row justify-center items-center ">
                    <ReusableInput
                      darkMode={darkMode}
                      placeholder="Enter key"
                      size="sm"
                      key={"table" + path}
                      value={newkey}
                      isClearable={false}
                      handleChange={(e) => {
                        setNewkey(e.target.value);
                      }}
                      endContent={
                        <div className="flex gap-1">
                          <button
                            className={
                              " rounded-full p-1 " +
                              (darkMode ? "bg-transparent  " : "bg-white")
                            }
                            onClick={() => {
                              handlekeyhead(newkey);
                            }}
                          >
                            <FaCheck
                              size={16}
                              color="#326FD1"
                              className="hover:text-gray-500"
                            />
                          </button>

                          <button
                            className={
                              " rounded-full p-1 " +
                              (darkMode ? "bg-transparent  " : "bg-white")
                            }
                            onClick={() => {
                              setNewkey("");
                            }}
                          >
                            <IoMdClose
                              size={16}
                              color="#326FD1"
                              className="hover:text-gray-500"
                            />
                          </button>
                        </div>
                      }
                      inputProps={{
                        classNames: {
                          base: "  w-[100%]",
                          mainWrapper: "h-full ",
                          input: darkMode
                            ? "text-white text-small"
                            : "text-small text-black",
                          inputWrapper: darkMode
                            ? "h-[10px] font-normal rounded-md text-white bg-transparent hover:bg-transparent/80 hover:text-gray-700 border border-slate-500/50 "
                            : "h-[10px] font-normal rounded-md text-black bg-[#D9DEE8] hover:bg-[#D9DEE8] hover:text-gray-700 border border-slate-500/50 ",
                        },
                        className: "shadow-md text-black",
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className=" mr-[10px]">{children}</div>
          </div>

          <div className={`transition-all flex justify-end  gap-1  w-[50%]  `}>
            <ReusableInput
              key={path + "search"}
              darkMode={darkMode}
              placeholder="Type to search..."
              startContent={
                <FiSearch
                  size={16}
                  className={darkMode ? "text-[#41425B]" : "text-gray-500"}
                />
              }
              isClearable={false}
              type="search"
              handleChange={(e) => {
                setSearch(e.target.value);
              }}
              inputProps={{
                size: "sm",
                classNames: {
                  base: " w-[50%] h-[30px] ",

                  input: darkMode
                    ? "text-white text-small"
                    : "text-small text-black",
                  inputWrapper: darkMode
                    ? "h-[10px] font-normal rounded-md text-white bg-transparent hover:bg-transparent/80 hover:text-gray-700 border border-slate-500/50 "
                    : "h-[10px] font-normal rounded-md text-black bg-[#D9DEE8] hover:bg-[#D9DEE8] hover:text-gray-700 border border-slate-500/50 ",
                },
                className: "text-slate-700  shadow-md",
              }}
            />
            <Dropdown backdrop="blur" className="eclipse">
              <DropdownTrigger asChild>
                <Button
                  isIconOnly
                  size="sm"
                  className={`bg-[${darkMode ? "#41425B" : "#D9DEE8"}] rounded-md border border-slate-500/50 eclipse h-[30px] w-[6%] items-center justify-center flex mr-[-16px]`}
                >
                  <IoFilterSharp
                    className={`truncate ${darkMode ? "text-white" : "text-blue-600"}`}
                    title={selectedColumns.join(",")}
                    size={15}
                    alt="filter"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                itemClasses={{
                  selectedIcon: "w-1 h-1 flex items-center",
                }}
                selectionMode="multiple"
                closeOnSelect={false}
                selectedKeys={selectedColumns}
                items={
                  uniqueColumns &&
                  uniqueColumns.length > 0 &&
                  uniqueColumns?.map((column) => {
                    return {
                      label: column,
                      value: column,
                      key: column,
                    };
                  })
                }
              >
                {(item) => (
                  <DropdownItem
                    className="capitalize transition-all duration-300"
                    key={item.key}
                    onClick={() => {
                      if (selectedColumns.includes(item.key)) {
                        setSelectedColumns(
                          selectedColumns.filter((ele) => ele !== item.key)
                        );
                      } else {
                        const newColumns = [...selectedColumns];
                        newColumns.splice(
                          uniqueColumns.indexOf(item.key),
                          0,
                          item.key
                        );
                        setSelectedColumns(newColumns);
                      }
                    }}
                  >
                    {item.value}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      )}

      {json && uniqueColumns.length > 0 && (
        <div className="w-full h-full overflow-hidden  flex flex-col justify-space-between gap-2 items-center   ">
          <table
            id="table"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
            className={
              " border-1 border-slate-500/50 " +
              (darkMode
                ? "text-[#F4F4F5] bg-[#1D1D1D]"
                : " bg-[#F1F3F9] text-[#41425B]/85  ")
            }
          >
            <tr className="  border-b-1  border-b-slate-500/50">
              {selectedColumns &&
                selectedColumns.length > 0 &&
                selectedColumns.map((ele, index) => {
                  if (ele !== "path" && ele !== "isHeader")
                    return (
                      <th key={ele + index} className="p-2" scope="col">
                        {showhead && selectedhead == ele + index ? (
                          <ReusableInput
                            key={ele + index}
                            darkMode={darkMode}
                            type="text"
                            defaultValue={ele}
                            handleChange={(e) => {
                              handlehead(e.target.value);
                            }}
                            inputProps={{
                              onKeyDown: (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handlekeyedit(e, headkey, ele);

                                  setSelectedhead(null);
                                }
                              },
                              ref: modalRefs,
                            }}
                          />
                        ) : (
                          <div
                            className="  flex justify-center items-center gap-1 overflow-hidden "
                            onMouseEnter={(e) => {
                              e.preventDefault();
                              sethoverhead(ele);
                            }}
                            onMouseLeave={(e) => {
                              e.preventDefault();
                              sethoverhead(null);
                            }}
                          >
                            <span
                              className=" flex items-center font-semibold justify-center text-center"
                              onClick={(e) => {
                                setSelectedhead(ele + index);
                                setShowhead(true);
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              {ele}
                            </span>
                            {keyJson &&
                              keyJson.hasOwnProperty(handlepath(ele)) && (
                                <Tooltip
                                  key={path + "." + ele}
                                  content={
                                    <RenderTooltip
                                      tooltip={keyJson[handlepath(ele)]}
                                    />
                                  }
                                >
                                  <div className="flex gap-2 items-center">
                                    <span>
                                      <AiOutlineInfoCircle
                                        color={darkMode ? "white" : "black"}
                                      />
                                    </span>
                                  </div>
                                </Tooltip>
                              )}
                            <span
                              className="flex content-center cursor-pointer"
                              title="Delete"
                              style={{
                                visibility:
                                  hoverhead == ele ? "visible" : "hidden",
                              }}
                              htmlFor=""
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                setdleteKyes(ele);

                                setDeletepop(true);
                              }}
                            >
                              <RiDeleteBin6Line
                                color={darkMode ? "white" : "black"}
                              />
                            </span>
                          </div>
                        )}
                      </th>
                    );
                })}
            </tr>

            <tbody
              className="text-center"
              style={{
                width: "100%",
                height: "90%",
              }}
            >
              {items.length > 0 ? (
                items?.map((parentKey, parentIndex) => (
                  <tr
                    key={path + "." + parentKey}
                    className={
                      "transition  ease-in-out duration-300 w-full h-[20%] border-b-1 border-b-slate-500/50 last:border-b-0  "
                    }
                  >
                    {selectedColumns &&
                      selectedColumns.length > 0 &&
                      selectedColumns?.map((key, index) => {
                        if (
                          json[parentKey] &&
                          !json[parentKey].hasOwnProperty("QueryParams") &&
                          Object.keys(json[parentKey]).includes(key) &&
                          typeof json[parentKey][key] !== "object"
                        ) {
                          return (
                            <td
                              style={{
                                width: 100 / selectedColumns.length + "%",
                              }}
                              key={path + "." + parentKey + "." + key}
                              scope="row"
                              className={`${darkMode ? "bg-[#1D1D1D]" : "bg-[#F1F3F9]"}  whitespace-nowrap 
                              overflow-hidden  `}
                            >
                              <ReusableInput
                                key={path + "." + parentKey + "." + key}
                                className={`border-gray-500/30 h-10 ${darkMode ? "text-gray-200" : "text-gray-700"} border rounded-2xl outline-none shadow-none  w-10 bg-transparent`}
                                type="text"
                                defaultValue={json[parentKey][key]}
                                value={
                                  editedValues[
                                    path + "." + parentKey + "." + key
                                  ]
                                }
                                darkMode={darkMode}
                                handleChange={(e) => {
                                  setEditedValues((prev) => ({
                                    ...prev,
                                    [path + "." + parentKey + "." + key]:
                                      e.target.value,
                                  }));
                                }}
                                inputProps={{
                                  ref: modalRef,
                                }}
                              />
                            </td>
                          );
                        }
                        if (
                          json[parentKey] &&
                          json[parentKey].hasOwnProperty("QueryParams") &&
                          Object.keys(json[parentKey]).includes(key) &&
                          typeof json[parentKey][key] !== "object"
                        ) {
                          return (
                            <td
                              style={{
                                width: 100 / selectedColumns.length + "%",
                              }}
                              key={path + "." + parentKey + "." + key}
                              scope="row"
                              className={`${darkMode ? "bg-[#1D1D1D]" : "bg-[#F1F3F9]"}  whitespace-nowrap 
                              overflow-hidden  `}
                            >
                              <span
                                className={`${
                                  darkMode ? "text-white" : "text-gray-700"
                                } text-center`}
                                title={json[parentKey][key]}
                              >
                                {json[parentKey][key]}
                              </span>
                            </td>
                          );
                        }
                        if (
                          json[parentKey] &&
                          Object.keys(json[parentKey]).includes(key) &&
                          typeof json[parentKey][key] == "object"
                        ) {
                          return (
                            <td
                              style={{
                                width: 100 / selectedColumns.length + "%",
                              }}
                              key={path + "." + parentKey + "." + key}
                              className={`${darkMode ? "bg-[#1D1D1D]" : "bg-[#F1F3F9]"}  whitespace-nowrap 
                            overflow-hidden  `}
                            >
                              <TableUidecider
                                key={path + "." + parentKey + "." + key}
                                keyJson={keyJson}
                                data={json[parentKey][key]}
                                path={path + "." + parentKey + "." + key}
                              />
                            </td>
                          );
                        }
                        if (
                          json[parentKey] &&
                          !Object.keys(json[parentKey]).includes(key)
                        ) {
                          return (
                            <td
                              style={{
                                width: 100 / selectedColumns.length + "%",
                              }}
                              className={`${darkMode ? "bg-[#1D1D1D] text-white" : "bg-[#F1F3F9] text-black"}  whitespace-nowrap 
                        overflow-hidden  `}
                            >
                              ---
                            </td>
                          );
                        }
                      })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No items found</td>
                </tr>
              )}
            </tbody>
          </table>

          <Deletepop
            type=""
            id={deltekys}
            deletepop={deletepop}
            path={deltekys}
            setDeletepop={setDeletepop}
            deleteNode={handlekeyDelete}
          />
        </div>
      )}
      {
        <div className="h-[10%]">
          <Pagination
            classNames={{
              item: darkMode ? "text-white" : "text-black",
              next: darkMode ? "text-white" : "text-black",
              prev: darkMode ? "text-white" : "text-black",
            }}
            className={darkMode ? "text-white" : "text-black"}
            showControls
            variant="light"
            initialPage={page}
            page={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      }
    </div>
  );
}
