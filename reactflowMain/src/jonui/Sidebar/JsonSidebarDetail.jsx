import React, { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import TorusDropDown from "../../torusComponents/TorusDropDown";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import TorusInput from "../../torusComponents/TorusInput";
import TorusSelector from "../../torusComponents/TorusSelector";
import TorusTab from "../../torusComponents/TorusTab";
import { Calendar, Flip, Pencil, PlusIcon, Scan } from "../../SVG_Application";
import TorusSwitch from "../../torusComponents/TorusSwitch";
import TorusDialog from "../../commonComponents/torusComponents/TorusDialog";
import TorusButton from "../../torusComponents/TorusButton";
import { CiTrash } from "react-icons/ci";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { AddModalContentType } from "./AddModalContentType";

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

const RenderDropdown = ({
  obj,
  path,
  handlejs,
  item,
  showObj,
  handleDeletejs,
}) => {
  const [value, setValue] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState(null);
  const [bool, setBool] = useState();

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
    obj && setData(Object.keys(obj).filter((item) => item == "selectedValue"));
    if (obj && obj?.type == "boolean") {
      setBool(obj?.selectedValue);
    }
  }, []);

  useEffect(() => {
    if (value) {
      handlejs(
        Array.from(value),
        path + "." + item + "." + data,
        data,
        "dropdown",
        showObj,
      );
    }
  }, [value]);

  useEffect(() => {
    if (data !== null && bool !== undefined)
      handlejs(bool, path + "." + item + "." + data, data, "boolean", showObj);
  }, [bool]);

  const handleDropdownChange = (e) => {
    console.log(e, "st");
    setValue(e);

    handlejs(e, path + "." + item + "." + data, data, "dropdown", showObj);

    console.log(e, "kj");
  };

  return (
    <>
      {obj && (obj.type == "dropdown" || obj.type == "boolean") && (
        <>
          {
            <div className="m-2 flex w-full gap-2 bg-gray-200">
              <div
                div
                className="my-2 flex w-full flex-col gap-1 rounded-lg bg-white"
              >
                {obj?.selectedValue.length > 0 && (
                  <span className="ml-2 mt-2 text-xs text-gray-400">
                    {obj.label}
                  </span>
                )}
                {obj.type == "dropdown" ? (
                  <div>
                    <TorusDropDown
                      key={path + "." + item + "." + data}
                      renderEmptyState={() => "No Items..."}
                      classNames={{
                        buttonClassName: `bg-white dark:bg-[#161616] w-[105%] h-[40px] text-black dark:text-white mt-2`,
                        listBoxClassName:
                          "bg-white dark:bg-[#161616] text-black dark:text-white",
                      }}
                      label={obj?.selectedValue.length > 0 && obj.label}
                      title={
                        <div className="flex w-[100%] flex-row  items-center">
                          <div
                            className={
                              "font-sfpro w-[80%] whitespace-nowrap tracking-tighter text-black dark:text-white xl:text-sm xl:font-normal 3xl:text-sm"
                            }
                          >
                            {obj?.selectedValue.length > 0
                              ? Array.from(obj?.selectedValue).join(",")
                              : obj.label}
                          </div>
                          <div className="w-[10%]">
                            <IoIosArrowDown className="text-black dark:text-white" />
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
                    <TorusButton
                      Children={`Delete`}
                      size={"xs"}
                      btncolor={"#0736C4"}
                      radius={"lg"}
                      color={"#f00"}
                      gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                      height={"md"}
                      borderColor={"3px solid #0736C4"}
                      startContent={<CiTrash color="white" />}
                      fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                      onPress={() => handleDeletejs(path + "." + item, "obj")}
                    />
                  </div>
                ) : obj.type == "boolean" ? (
                  <div className="flex w-full items-center justify-between p-2 pl-4">
                    <span className="text-sm text-gray-800">{obj?.label}</span>
                    <div className="">
                      <TorusSwitch
                        skey={path + "." + item + "." + data}
                        isChecked={bool}
                        setIsChecked={setBool}
                      />
                      <TorusButton
                        Children={`Delete`}
                        size={"xs"}
                        btncolor={"#0736C4"}
                        radius={"lg"}
                        color={"#f00"}
                        gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                        height={"md"}
                        borderColor={"3px solid #0736C4"}
                        startContent={<CiTrash color="white" />}
                        fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                        onPress={() => handleDeletejs(path + "." + item, "obj")}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
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
  handleAddjs,
  handleDeletejs,
  expandedItem,
  setExpandedItem,
}) => {
  const [showAccordianItem, setShowAccordianItem] = useState(null);
  const [value, setValue] = useState(null);
  const handleInput = (e, i, key, type) => {
    console.log(e, i, key, type, "renderinput");
    setValue(e);
    if (value) {
      handlejs(e, i, key, type, showObj);
    }
  };

  console.log(obj, "dropdown-->");

  const toggleKey = (key) => {
    if (expandedItem.includes(key)) {
      setExpandedItem(expandedItem.filter((k) => k !== key));
    } else {
      setExpandedItem([...expandedItem, key]);
    }
  };

  return (
    <>
      <div className="  flex h-[100%] w-[40%] items-center">
        <TorusDialog
          key={"TableDelete"}
          triggerElement={
            <TorusButton
              Children={`Add`}
              size={"xs"}
              btncolor={"#0736C4"}
              radius={"lg"}
              color={"#ffffff"}
              gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
              height={"md"}
              borderColor={"3px solid #0736C4"}
              startContent={<PlusIcon />}
              fontStyle={"text-sm font-medium text-[#FFFFFF]"}
            />
          }
          classNames={{
            modalClassName: " w-[40%] flex justify-center items-center  ",
            dialogClassName: " w-full h-full rounded-lg flex-col bg-white",
          }}
          title={"Add"}
          message={"Edit"}
          children={({ close }) => (
            <AddModalContentType
              obj={obj}
              showObj={showObj}
              close={close}
              handleAddjs={handleAddjs}
              type="arr-0"
            />
          )}
        />
        <TorusButton
          Children={`Delete`}
          size={"xs"}
          btncolor={"#0736C4"}
          radius={"lg"}
          color={"#f00"}
          gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
          height={"md"}
          borderColor={"3px solid #0736C4"}
          startContent={<CiTrash color="white" />}
          fontStyle={"text-sm font-medium text-[#FFFFFF]"}
          onPress={() => handleDeletejs(path)}
        />
      </div>
      <div>
        {obj &&
          obj.map((ele, index) => {
            const isExpanded = expandedItem.includes(ele?.label);
            return (
              <div
                key={index}
                className={
                  " mb-2 w-[100%] rounded-lg bg-[#F4F5FA]  text-black  dark:bg-[#0F0F0F]   dark:text-white"
                }
              >
                <p
                  className="my-1  flex cursor-pointer items-center gap-2 p-2"
                  onClick={(e) => {
                    setShowAccordianItem(ele);
                    e.stopPropagation();
                    e.preventDefault();
                    toggleKey(ele?.label);
                  }}
                >
                  <span className="flex justify-end">
                    {isExpanded ? (
                      <MdExpandLess color="gray" size={20} />
                    ) : (
                      <IoIosArrowForward color="gray" size={20} />
                    )}
                  </span>
                  <p>{ele?.label} </p>
                </p>

                {isExpanded && (
                  <div className="mb-2  p-2">
                    <>
                      <div className="flex h-[100%] w-[40%] items-center justify-between">
                        <TorusDialog
                          key={"TableDelete"}
                          triggerElement={
                            <TorusButton
                              Children={`Add`}
                              size={"xs"}
                              btncolor={"#0736C4"}
                              radius={"lg"}
                              color={"#ffffff"}
                              gap={"py-[0.2rem] px-[0.2rem] mb-[0.5rem]"}
                              height={"md"}
                              borderColor={"3px solid #0736C4"}
                              startContent={<PlusIcon />}
                              fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                            />
                          }
                          classNames={{
                            modalClassName:
                              " w-[40%] h-[40%]  flex justify-center items-center  ",
                            dialogClassName:
                              " w-full h-full rounded-lg flex-col bg-white",
                          }}
                          title={"Add"}
                          message={"Edit"}
                          children={({ close }) => (
                            <AddModalContentType
                              obj={obj}
                              showObj={showObj}
                              close={close}
                              handleAddjs={handleAddjs}
                              type="arr-1"
                              path={index}
                            />
                          )}
                        />
                        <TorusButton
                          Children={`Delete`}
                          size={"xs"}
                          btncolor={"#0736C4"}
                          radius={"lg"}
                          color={"#f00"}
                          gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                          height={"md"}
                          borderColor={"3px solid #0736C4"}
                          startContent={<CiTrash color="white" />}
                          fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                          onPress={() =>
                            handleDeletejs(path, "arr-1", ele.label)
                          }
                        />
                      </div>
                    </>
                    {objs &&
                      Object.keys(objs[showObj][index])
                        .filter(
                          (item) => item !== "grouplabel" && item !== "label",
                        )
                        .map((item, inds) => {
                          if (
                            !Array.isArray(objs[showObj][index][item]) &&
                            typeof objs[showObj][index][item] !== "object"
                          ) {
                            return (
                              <p className="mt-[-25px] flex  flex-col ">
                                <TorusInput
                                  key={inds}
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
                                      "arr",
                                    );
                                  }}
                                  radius="lg"
                                  width="xl"
                                  height="xl"
                                  textColor="text-[#000000] dark:text-[#FFFFFF]"
                                  bgColor="bg-[#FFFFFF] dark:bg-[#161616]"
                                  value={objs[showObj][index][item]}
                                />
                                <TorusButton
                                  Children={`Delete`}
                                  size={"xs"}
                                  btncolor={"#0736C4"}
                                  radius={"lg"}
                                  color={"#f00"}
                                  gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                                  height={"md"}
                                  borderColor={"3px solid #0736C4"}
                                  startContent={<CiTrash color="white" />}
                                  fontStyle={
                                    "text-sm font-medium text-[#FFFFFF]"
                                  }
                                  onPress={() =>
                                    handleDeletejs(
                                      path + "." + index + "." + item,
                                      "obj",
                                    )
                                  }
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
                                  handleDeletejs={handleDeletejs}
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
    </>
  );
};

export default function JsonSidebarDetail({
  showObj,
  obj,
  handlejs,
  path,
  label,
  OgJson,
  handleAddjs,
  handleDeletejs,
  checkActivestatus,
  expandedItem,
  setExpandedItem,
}) {
  const [value, setValue] = useState(null);
  const [selectedTab, setselectedTab] = useState("Tabs");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleInput = (e, i, key, type) => {
    setValue(e);
    if (value) {
      handlejs(e, i, key, type, showObj);
    }
  };

  return (
    <div className="relative mt-3 flex h-[100%]  flex-col gap-3 p-2 text-sm  font-semibold">
      <span className="flex h-[20%]  flex-col">
        <span className="flex justify-between">
          <p className="mt-2 p-2  text-black dark:text-white"> Properties</p>
          <span
            onClick={() => OgJson()}
            className="mb-2 mt-2  cursor-pointer rounded-lg bg-[#0736C4] px-1  py-2 text-white active:scale-95"
          >
            save
          </span>
        </span>
        {label && (
          <span className="m-2 mt-1 w-[100%] font-normal text-black dark:text-white">
            Label :
            <span className="m-2 w-full font-poppins text-[#6600ff] dark:text-[#c4b707]  ">
              {label}
            </span>
          </span>
        )}
      </span>
      <div
        style={{
          height: "inherit",
        }}
        className="scrollbar-none  overflow-y-auto"
      >
        {obj && showObj && obj[showObj] && (
          <div className="">
            {
              !Array.isArray(obj[showObj]) ? (
                <div className="flex flex-col gap-3">
                  {
                    // <div >
                    //   <Button size="sm" onPress={onOpen}>Add</Button>
                    //   <Modal  size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                    //     <ModalContent>
                    //       {(onClose) => (
                    //         <>
                    //           <ModalHeader className="flex flex-col gap-1 dark:text-white">
                    //             Add key-value
                    //           </ModalHeader>
                    //           <ModalBody>
                    //             <AddModalContentType/>

                    //           </ModalBody>
                    //           <ModalFooter>
                    //             <Button
                    //               color="danger"
                    //               variant="light"
                    //               onPress={onClose}
                    //             >
                    //               Close
                    //             </Button>
                    //             <Button color="primary" onPress={onClose}>
                    //               Action
                    //             </Button>
                    //           </ModalFooter>
                    //         </>
                    //       )}
                    //     </ModalContent>
                    //   </Modal>
                    // </div>

                    <div className="  flex h-[100%] w-[40%] items-center">
                      <TorusDialog
                        key={"TableDelete"}
                        triggerElement={
                          <TorusButton
                            Children={`Add`}
                            size={"xs"}
                            btncolor={"#0736C4"}
                            radius={"lg"}
                            color={"#ffffff"}
                            gap={"py-[0.2rem] px-[0.2rem]"}
                            height={"md"}
                            borderColor={"3px solid #0736C4"}
                            startContent={<PlusIcon />}
                            fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                          />
                        }
                        classNames={{
                          modalClassName:
                            " w-[40%] h-[40%]  flex justify-center items-center  ",
                          dialogClassName:
                            " w-full h-full rounded-lg flex-col bg-white",
                        }}
                        title={"Add"}
                        message={"Edit"}
                        children={({ close }) => (
                          <AddModalContentType
                            obj={obj}
                            showObj={showObj}
                            close={close}
                            handleAddjs={handleAddjs}
                            type={"obj"}
                          />
                        )}
                      />
                      <TorusButton
                        Children={`Delete`}
                        size={"xs"}
                        btncolor={"#0736C4"}
                        radius={"lg"}
                        color={"#f00"}
                        gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                        height={"md"}
                        borderColor={"3px solid #0736C4"}
                        startContent={<CiTrash color="white" />}
                        fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                        onPress={() => handleDeletejs(path)}
                      />
                    </div>
                  }
                  <div>
                    {console.log(obj, showObj, "jio")}
                    {obj &&
                      showObj &&
                      obj[showObj] &&
                      Object.keys(obj[showObj]).map((ele) => {
                        if (
                          !Array.isArray(obj[showObj][ele]) &&
                          typeof obj[showObj][ele] !== "object"
                        ) {
                          return (
                            <p
                              style={{
                                display: ele === "label" ? "none" : "",
                              }}
                              className="rounded-lg bg-[#F4F5FA]  px-2 dark:bg-[#0F0F0F] "
                            >
                              <div className="w-[100%]">
                                <TorusInput
                                  key={path}
                                  variant="bordered"
                                  label={ele}
                                  labelColor="text-[#000000]/50"
                                  borderColor="[#000000]/50"
                                  outlineColor="torus-focus:ring-[#000000]/50"
                                  placeholder=""
                                  isDisabled={false}
                                  onChange={(e) =>
                                    handleInput(e, path, ele, "obj")
                                  }
                                  radius="lg"
                                  width="xl"
                                  height="xl"
                                  textColor="text-[#000000] dark:text-[#FFFFFF]"
                                  bgColor="bg-[#FFFFFF] dark:bg-[#161616]"
                                  value={obj[showObj][ele]}
                                />
                                <TorusButton
                                  Children={`Delete`}
                                  size={"xs"}
                                  btncolor={"#0736C4"}
                                  radius={"lg"}
                                  color={"#f00"}
                                  gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                                  height={"md"}
                                  borderColor={"3px solid #0736C4"}
                                  startContent={<CiTrash color="white" />}
                                  fontStyle={
                                    "text-sm font-medium text-[#FFFFFF]"
                                  }
                                  onPress={() =>
                                    handleDeletejs(path + "." + ele, "obj")
                                  }
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
                              handleDeletejs={handleDeletejs}
                            />
                          );
                        }
                      })}
                  </div>
                </div>
              ) : (
                <RenderJsonArraySidebarDetail
                  obj={obj[showObj]}
                  showObj={showObj}
                  path={path}
                  handlejs={handlejs}
                  objs={obj}
                  handleAddjs={handleAddjs}
                  handleDeletejs={handleDeletejs}
                  checkActivestatus={checkActivestatus}
                  setExpandedItem={setExpandedItem}
                  expandedItem={expandedItem}
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
