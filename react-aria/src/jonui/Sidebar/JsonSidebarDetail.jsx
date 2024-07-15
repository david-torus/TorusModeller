import React, { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import TorusDropDown from "../../torusComponents/TorusDropDown";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import TorusInput from "../../torusComponents/TorusInput";
import TorusSelector from "../../torusComponents/TorusSelector";
import TorusTab from "../../torusComponents/TorusTab";
import { Calendar, Flip, Pencil, Scan } from "../../SVG_Application";
import TorusSwitch from "../../torusComponents/TorusSwitch";

const RenderSwitch = ({ obj }) => {
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div>
      <select onClick={handleDropdownClick}>
        {obj && obj.map((ele) => ({ ele }))}
      </select>
    </div>
  );
};

const RenderDropdown = ({ obj, path, handlejs, item, showObj }) => {
  const [value, setValue] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState(null);

  console.log(obj, "jk");
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  //   {
  //     "type": "dropdown",
  //     "label": "tags",
  //     "value": [
  //         "user",
  //         "premium"
  //     ],
  //     "selectedValue": ""
  // }

  useEffect(() => {
    {
      obj &&
        setData(Object.keys(obj).filter((item) => item == "selectedValue"));
    }
  }, []);

  useEffect(() => {
    if (value) {
      handlejs(
        Array.from(value),
        path + "." + item + "." + data,
        data,
        "dropdown",
        showObj
      );
    }
  }, [value]);

  const handleDropdownChange = (e) => {
    console.log(e, "st");
    setValue(e);

  handlejs(e, path + "." + item + "." + data, data, "dropdown", showObj);

    console.log(e, "kj");
  };

  return (
    <>
      {obj && obj.type == "dropdown" && (
        <>
          {
            <div className="flex w-[100%] flex-col gap-2">
              <div div className="flex flex-col gap-1 w-full ">
                {/* <p>{obj.label}</p> */}
                {
                  <TorusDropDown
                    renderEmptyState={() => "No Items..."}
                    classNames={{
                      buttonClassName: `bg-white w-[100%] h-[40px] text-black  mb-2`,
                      listBoxClassName: "bg-white text-black ",
                    }}
                    label={obj?.selectedValue.length > 0 && obj.label}
                    title={
                      <div className="flex flex-row items-center  w-[100%]">
                        <div
                          className={
                            "w-[80%] text-black font-sfpro 3xl:text-sm xl:text-sm xl:font-normal tracking-tighter whitespace-nowrap"
                          }
                        >
                          {obj?.selectedValue.length > 0
                            ? Array.from(obj?.selectedValue).join(",")
                            : obj.label}
                        </div>
                        <div className="w-[10%]">
                          <IoIosArrowDown color={"#090b0e"} />
                        </div>
                      </div>
                    }
                    fontStyle={
                      "font-plexsans 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
                    }
                    selected={value}
                    setSelected={setValue}
                    selectionMode="multiple"
                    items={obj.selectionList.map((ele) => ({
                      key: ele,
                      label: ele,
                    }))}
                    btWidth={"md"}
                  />
                } 
            

                {/* {
                  <TorusSelector
                    selected={
                      obj.selectedValue.length > 0 ? obj.selectedValue : value
                    }
                    setSelected={setValue}
                    label={obj.label}
                    items={obj.selectionList.map((ele) => ({
                      key: ele,
                      label: ele,
                    }))}
                  />
                }  */}
              </div>

              {/* <p className="flex  gap-4 mb-3">
                {" "}
                selectedValue :<span>{obj?.selectedValue}</span>
              </p> */}
            </div>
          }
        </>
      )}
    </>
  );
};

const RenderJsonArraySidebarDetail = ({
  obj,
  showObj,
  path,
  handlejs,
  objs,
}) => {
  const [expandedItem, setExpandedItem] = useState([]);
  const [showAccordianItem, setShowAccordianItem] = useState(null);
  const [value, setValue] = useState(null);
  const handleInput = (e, i, key, type) => {
    console.log(e, i, key, type, "renderinput");
    setValue(e);
    if (value) {
      handlejs(e, i, key, type, showObj);
    }
  };

  const toggleKey = (key) => {
    if (expandedItem.includes(key)) {
      setExpandedItem(expandedItem.filter((k) => k !== key));
    } else {
      setExpandedItem([...expandedItem, key]);
    }
  };

  return (
    <div>
      {obj &&
        obj.map((ele, index) => {
          const isExpanded = expandedItem.includes(ele.label);
          return (
            <div
              key={index}
              className={
                " bg-[#F4F5FA]  rounded-lg  w-[100%]   mb-2" +
                (isExpanded ? "transition ease-in-out duration-300" : "")
              }
            >
              <p
                className="cursor-pointer  flex items-center gap-2 p-2 "
                onClick={(e) => {
                  setShowAccordianItem(ele);
                  e.stopPropagation();
                  toggleKey(ele.label);
                }}
              >
                <span className="flex justify-end">
                  {isExpanded ? (
                    <MdExpandLess color="gray" size={20} />
                  ) : (
                    <IoIosArrowForward color="gray" size={20} />
                  )}
                </span>
                <p>{ele.label} </p>
              </p>

              {isExpanded && (
                <div className="mb-2 p-2">
                  {objs &&
                    Object.keys(objs[showObj][index])
                      .filter(
                        (item) => item !== "grouplabel" && item !== "label"
                      )
                      .map((item, inds) => {
                        if (
                          !Array.isArray(objs[showObj][index][item]) &&
                          typeof objs[showObj][index][item] !== "object"
                        ) {
                          return (
                            <p className="flex flex-col  mt-[-25px] ">
                              <TorusInput
                                variant="bordered"
                                label={item}
                                labelColor="text-[#000000]/50"
                                borderColor="[#000000]/50"
                                outlineColor="torus-focus:ring-[#000000]/50"
                                placeholder=""
                                isDisabled={false}
                                onChange={(e) => {
                                  handleInput(
                                    e,
                                    path + "." + index + "." + item,
                                    item,
                                    "arr"
                                  );
                                }}
                                radius="lg"
                                width="xl"
                                height="xl"
                                textColor="text-[#000000]"
                                bgColor="bg-[#FFFFFF]"
                                value={objs[showObj][index][item]}
                              />
                              {/* <input
                                className="border text-blue-500 "
                                type="text"
                                Value={objs[showObj][index][item]}
                                onChange={(e) => {
                                  handleInput(
                                    e,
                                    path + "." + index + "." + item,
                                    item,
                                    "arr"
                                  );
                                }}
                              /> */}
                            </p>
                          );
                        }

                        if (
                          Array.isArray(objs[showObj][index][item]) ||
                          typeof objs[showObj][index][item] === "object"
                        ) {
                          return (
                            <>
                              <RenderDropdown
                                obj={objs[showObj][index][item]}
                                item={item}
                                path={path + "." + index}
                                handlejs={handlejs}
                                showObj={showObj}
                              />
                            </>
                          );
                        }
                        if (typeof objs[showObj][index][item] === "boolean") {
                          <RenderSwitch obj={objs[showObj][index][item]} />;
                        }
                      })}
                </div>
              )}
            </div>
          );
        })}

      {/* 
      {obj && (
        <>
          {obj && obj.map((ele, index) => {
            {
              console.log(ele, "ele-<");
            }
            return (
              <div key={index}>
                <p
                  onClick={() => setShowAccordianItem(ele) }
                  className="cursor-pointer"
                >
                  {ele.label}
                </p>
              </div>
            );
          })}

           {
           showAccordianItem &&
            Object.keys(showAccordianItem).map((item, inds) => {
              if (!Array.isArray(showAccordianItem[item])) {
                return (
                  <p >
                  {item} :
                  <input
                    className="border text-blue-500 "
                    type="text"
                    Value={showAccordianItem[item]}
                   
                  />
                </p> 
              
                );
              }
            })} 
        </>
      )} */}

      {/* <select>
        {obj &&
          obj.map((ele) => (
            <option key={ele} value={ele}>
              {ele}
            </option>
          ))}
      </select> */}
    </div>
  );
};

export default function JsonSidebarDetail({
  showObj,
  obj,
  handlejs,
  path,
  label,
}) {
  const [value, setValue] = useState(null);
  const [selectedTab, setselectedTab] = useState("Tabs");

  const handleInput = (e, i, key, type) => {
    setValue(e);
    if (value) {
      handlejs(e, i, key, type, showObj);
    }
  };

  return (
    <div className="relative flex max-h-[100%] w-[240px]  scrollbar-none  overflow-y-scroll flex-col gap-3 font-semibold p-2  text-sm">
      <span className="flex flex-col ">
        <p className="px-2"> Properties</p>
        <TorusTab
          orientation="horizontal"
          classNames={{
            tabs: "cursor-pointer bg-[#F4F5FA]",
            tabList: "w-full h-[100%] flex justify-center items-center",
            tab: ` p-2 h-full  w-full flex justify-center items-center torus-pressed:outline-none torus-focus:outline-none `,
          }}
          tabs={[
            {
              id: "Tabs",
              content: <Pencil strokeColor={"#1C274C"} />,
            },
            {
              id: "Tabbs",
              content: <Pencil strokeColor={"#B2BABB "} />,
            },
            {
              id: "Tabbbs",
              content: <Flip strokeColor={"#B2BABB "} />,
            },
            {
              id: "Tabbbbs",
              content: <Scan strokeColor={"#B2BABB "} />,
            },
            {
              id: "Tabbbbbs",
              content: <Calendar strokeColor={"#B2BABB "} />,
            },
          ]}
        />

        <span className="mt-3 m-2 w-[100%]">
          label:
          <span className="text-[#6600ff] m-2 font-poppins ">{label}</span>
        </span>
      </span>
      <div>
        {showObj && (
          <div className="">
            {
              !Array.isArray(obj[showObj]) ? (
                obj &&
                showObj &&
                Object.keys(obj[showObj]).map((ele) => {
                  if (
                    !Array.isArray(obj[showObj][ele]) &&
                    typeof obj[showObj][ele] !== "object"
                  ) {
                    return (
                      <p
                        style={{ display: ele === "label" ? "none" : "" }}
                        className="bg-[#F4F5FA] rounded-lg p-2"
                      >
                        <div className="w-[100%]">
                          <TorusInput
                            variant="bordered"
                            label={ele}
                            labelColor="text-[#000000]/50"
                            borderColor="[#000000]/50"
                            outlineColor="torus-focus:ring-[#000000]/50"
                            placeholder=""
                            isDisabled={false}
                            onChange={(e) => handleInput(e, path, ele, "obj")}
                            radius="lg"
                            width="xl"
                            height="xl"
                            textColor="text-[#000000]"
                            bgColor="bg-[#FFFFFF]"
                            value={obj[showObj][ele]}
                          />
                        </div>

                        {/* <input
                          className="border text-orange-500 "
                          type="text"
                          value={obj[showObj][ele]}
                          onChange={(e) =>
                            handleInput(e.target.value, path, ele, "obj")
                          }
                        /> */}
                      </p>
                    );
                  }
                  if (
                    Array.isArray(obj[showObj][ele]) ||
                    typeof obj[showObj][ele] === "object"
                  ) {
                    return (
                      <RenderDropdown
                        obj={obj[showObj][ele]}
                        item={ele}
                        path={path}
                        handlejs={handlejs}
                        showObj={showObj}
                      />
                    );
                  }
                })
              ) : (
                <RenderJsonArraySidebarDetail
                  obj={obj[showObj]}
                  showObj={showObj}
                  path={path}
                  handlejs={handlejs}
                  objs={obj}
                />
              )
              // showObj &&
              //   Object.keys(showObj).map((ele ,index) => {
              //     if (!Array.isArray(showObj[ele]))
              //       return (
              //         <p style={{ display: ele === "label" ? "none" : "" }} key={path + "."+ele}>

              //           {ele} :
              //            <input
              //             className="border text-blue-500 "
              //             type="text"
              //             defaultValue={showObj[ele]}
              //             onChange={(e) =>
              //               handleInput(e.target.value, path + "."+ele ,"", "arr" )
              //             }
              //           />
              //         </p>
              //       );
              //     else if (Array.isArray(showObj[ele]))
              //       return <RenderJsonArraySidebarDetail obj={showObj[ele]} />;
              //     else if (typeof showObj[ele] == "object")
              //       return (
              //         <p>
              //           {ele} : {showObj[ele].label}
              //         </p>
              //       );
              //   })
            }
          </div>
        )}
      </div>
    </div>
  );
}
