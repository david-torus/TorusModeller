import React, { useEffect, useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaExchangeAlt, FaSearch } from "react-icons/fa";
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
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "react-aria-components";
import { MdOutlineNoteAdd } from "react-icons/md";
import { Switch } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Button,
  useDisclosure,
} from "@nextui-org/react";
import { AddModalContentType } from "./AddModalContentType";
import { BsApple, BsTrash3 } from "react-icons/bs";
import TorusModularInput from "../../torusComponents/TorusModularInput.jsx";
import TorusModel from "../../torusComponents/TorusModel";
import { CiSaveDown2 } from "react-icons/ci";

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
  const [bool, setBool] = useState();
  useEffect(() => {
    if (value) {
      handlejs(
        Array.from(value),
        path + "." + item + "." + "selectedValue",
        "selectedValue",
        "dropdown",
        showObj,
      );
    }
  }, [value]);

  useEffect(() => {
    if (bool !== undefined)
      handlejs(
        bool,
        path + "." + item + "." + "selectedValue",
        "selectedValue",
        "boolean",
        showObj,
      );
  }, [bool]);

  return (
    <>
      {obj && (obj.type == "dropdown" || obj.type == "boolean") && (
        <>
          {
            <div className="mb-2 flex w-full rounded-lg bg-[#F4F5FA]">
              <div div className="my-2 flex w-full flex-col gap-1 rounded-lg">
                {obj?.selectedValue.length > 0 && (
                  <span className="ml-2 mt-2 text-xs text-gray-400">
                    {obj.label}
                  </span>
                )}
                {obj.type == "dropdown" ? (
                  <div className="flex w-full justify-between px-2">
                    <TorusDropDown
                      key={path + "." + item + "." + obj?.label}
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
                    <Button
                      className={"mt-1"}
                      onPress={() => handleDeletejs(path + "." + item, "obj")}
                    >
                      <CiTrash color="red" size={20} />
                    </Button>
                    {/* <div className="w-[105%] pt-2"> */}
                    {/* <TorusButton
                        Children={`Delete`}
                        size={"xs"}
                        btncolor={"#0736C4"}
                        radius={"lg"}
                        color={"#f00"}
                        gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                        height={"md"}
                        borderColor={"3px solid #0736C4"}
                        btheight={"200px"}
                        startContent={<CiTrash color="white" />}
                        fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                        onPress={() => handleDeletejs(path + "." + item, "obj")}
                      /> */}
                    {/* </div> */}
                  </div>
                ) : obj.type == "boolean" ? (
                  <div className="w-full px-2">
                    <div className="flex w-full justify-between py-1">
                      <span className="mt-1 pl-0.5 text-sm text-gray-800">
                        {obj?.label}
                      </span>
                      {/* <TorusSwitch
                        skey={path + "." + item + obj?.label}
                        isChecked={obj?.selectedValue}
                        setIsChecked={setBool}
                      /> */}
                      <Switch
                        key={path + "." + item + obj?.label}
                        isSelected={obj?.selectedValue}
                        onValueChange={setBool}
                      />
                      <Button
                        onPress={() => handleDeletejs(path + "." + item, "obj")}
                      >
                        <CiTrash color="red" size={20} />
                      </Button>
                    </div>
                    {/* <TorusButton
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
                    /> */}
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
    <>
      <div className="  flex h-[100%] items-center">
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
        {/* <TorusButton
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
        /> */}
      </div>
      <div>
        {obj &&
          obj.map((ele, index) => {
            const isExpanded = expandedItem.includes(ele?.label);
            return (
              <>
                <div
                  key={index}
                  className={`flex w-[100%] ${isExpanded ? "rounded-t-lg" : "rounded-lg"} justify-between bg-[#d5d9db] text-black  dark:bg-[#0F0F0F]   dark:text-white `}
                >
                  <div
                    className="my-3 flex cursor-pointer items-center gap-1 p-2 px-0"
                    onClick={() => {
                      setShowAccordianItem(ele);
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
                    <p className="w-[100%]">{ele?.label}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex h-[100%] w-full items-center justify-between px-1">
                      <TorusDialog
                        key={"TableDelete"}
                        triggerElement={
                          // <TorusButton
                          //   // Children={`Add`}
                          //   size={"xs"}
                          //   btncolor={"#0736C4"}
                          //   radius={"lg"}
                          //   color={"#ffffff"}
                          //   gap={"py-[0.2rem] px-[0.2rem] mb-[0.5rem]"}
                          //   height={"md"}
                          //   borderColor={"3px solid #0736C4"}
                          //   startContent={
                          //     <IoAddCircleOutline color="white" size={20} />
                          //   }
                          //   fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                          // />
                          <Button>
                            <IoAddCircleOutline color="blue" size={20} />
                          </Button>
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
                      {/* <TorusButton
                        Children={`kia`}
                        size={"xs"}
                        btncolor={"#0736C4"}
                        radius={"lg"}
                        color={"#f00"}
                        gap={"py-[0.2rem] px-[0.2rem] mb-[0.3rem]"}
                        height={"md"}
                        borderColor={"3px solid #0736C4"}
                        startContent={<CiTrash color="white" />}
                        fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                        onPress={() => handleDeletejs(path, "arr-1", ele.label)}
                      /> */}
                      <span
                        onClick={() => {
                          handleDeletejs(path, "arr-1", ele.label);
                        }}
                      >
                        <CiTrash color="red" size={20} />
                      </span>
                    </div>
                  </div>
                </div>
                {isExpanded && (
                  <div className={`rounded-b-lg} bg-[#d5d9db] p-2`}>
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
                              <p
                                style={{
                                  display: item === "label" ? "none" : "",
                                }}
                                className={`mb-2 rounded-lg bg-[#F4F5FA] px-2 pb-2 dark:bg-[#0F0F0F]`}
                              >
                                <div className="flex w-[100%] items-center">
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
                                    NoneRightRadius={true}
                                  />
                                  {/* <TorusButton
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
                                  /> */}
                                  <Button
                                    className="mt-3.5 rounded-r-lg bg-white py-3.5"
                                    onPress={() =>
                                      handleDeletejs(
                                        path + "." + index + "." + item,
                                        "obj",
                                      )
                                    }
                                  >
                                    <CiTrash color="red" size={20} />
                                  </Button>
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
              </>
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
    <div className="relative mt-3 flex h-[100%]  w-full flex-col gap-3 p-2 text-sm  font-semibold">
      <span className="flex h-[20%]  flex-col">
        <div className="flex items-center justify-between">
          <div className="w-[50%]">
            <p className="mt-2 p-2  text-black dark:text-white"> Properties</p>
          </div>

          <div className="w-[50%]">
            <TorusButton
              startContent={<CiSaveDown2 color="white" size={20} />}
              Children={"Save"}
              size={"sm"}
              btncolor={"#0736C4"}
              radius={"lg"}
              color={"#ffffff"}
              borderColor={"3px solid #0736C4"}
              fontStyle={"text-sm font-medium text-[#FFFFFF]"}
              buttonClassName={"w-[100%]"}
              isIconOnly={false}
              onPress={() => OgJson()}
            />
          </div>
        </div>
        {label && (
          <span className="m-2 mt-1 w-full font-normal text-black dark:text-white">
            Label :
            <span className="m-2 w-40 overflow-ellipsis font-poppins text-[#6600ff] dark:text-[#c4b707]  ">
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

                    <div className="  flex h-[100%] w-[100%] items-center justify-end">
                      {/* <TorusDialog
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
                      /> */}

                      <TorusModel
                        body={
                          <AddModalContentType
                            obj={obj}
                            showObj={showObj}
                            // close={close()}
                            handleAddjs={handleAddjs}
                            type={"obj"}
                          />
                        }
                        title={
                          <div className="flex w-[50%] justify-around gap-[0.525rem]">
                            <div className="flex w-[10%] items-center justify-end">
                              <MdOutlineNoteAdd color="#4C8DF7" size={13} />
                            </div>
                            <div className="flex w-[90%] items-center justify-start">
                              Add Key and Values
                            </div>
                          </div>
                        }
                        triggerButton={
                          <TorusButton
                            Children={<PlusIcon />}
                            size={"xs"}
                            btncolor={"#0736C4"}
                            radius={"lg"}
                            color={"#ffffff"}
                            gap={"py-[0.2rem] px-[0.2rem]"}
                            height={"md"}
                            borderColor={"3px solid #0736C4"}
                            fontStyle={"text-sm font-medium text-[#FFFFFF]"}
                            buttonClassName={"w-[100%]"}
                            isIconOnly={true}
                          />
                        }
                        triggerButtonStyle={"cursor-pointer bg=transparent"}
                        titleStyle="text-blue-500"
                        confirmButtonText={"Add"}
                        cancelButtonText={"Cancel"}
                        confirmButtonStyle={
                          "pressed:bg-blue-600 cursor-pointer bg-[#4C8DF7] text-white hover:border-blue-600"
                        }
                        modelClassName={"max-h-120 max-w-[45%] min-w-[43%] bg-white dark:bg-[#161616] rounded-lg shadow-xl"} 
                      />
                      {/* <TorusButton
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
                      /> */}
                    </div>
                  }
                  <div>
                    {obj &&
                      showObj &&
                      obj[showObj] &&
                      Object.keys(obj[showObj]).map((ele) => {
                        if (
                          !Array.isArray(obj[showObj][ele]) &&
                          typeof obj[showObj][ele] !== "object"
                        ) {
                          return (
                            <div
                              style={{
                                display: ele === "label" ? "none" : "",
                              }}
                              className="mb-2.5 flex w-full rounded-lg bg-[#F4F5FA] px-2 pb-2 pt-2 dark:bg-[#0F0F0F]"
                            >
                              <div className="flex w-full items-center">
                                <div className="flex w-[100%] items-center justify-start">
                                  {/* <TorusInput
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
                                    NoneRightRadius={true}
                                  /> */}

                                  <TorusModularInput
                                    label={ele}
                                    defaultValue={obj[showObj][ele]}
                                    value={obj[showObj][ele]}
                                    onChange={(e) =>
                                      handleInput(e, path, ele, "obj")
                                    }
                                    isRequired={true}
                                    maxLength={10}
                                    type="text"
                                    placeholder="Type here..."
                                    bgColor="bg-transparent"
                                    labelColor="text-gray-400/60"
                                    textColor="text-black"
                                    radius="md"
                                    size="sm"
                                    endContent={
                                      <Button
                                        className="rounded-r-lg bg-white"
                                        onPress={() =>
                                          handleDeletejs(
                                            path + "." + ele,
                                            "obj",
                                          )
                                        }
                                      >
                                        <CiTrash color="red" size={15} />
                                      </Button>
                                    }
                                    isReadOnly={false}
                                    isDisabled={false}
                                    errorShown={false}
                                    isClearable={true}
                                  />
                                </div>

                                {/* <TorusButton
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
                                /> */}

                                {/* <input
                               className="border text-orange-500 "
                               type="text"
                               value={obj[showObj][ele]}
                               onChange={(e) =>
                                 handleInput(e.target.value, path, ele, "obj")
                               }
                             /> */}
                              </div>
                            </div>
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
