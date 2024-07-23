import React, { useContext, useState } from "react";
import {
  ArtifactLogo,
  Debugger,
  Preview,
  Shared,
  TorusLogo,
  VerticalLine,
} from "./SVG_Application";
import { DarkModeContext } from "./context/darkmodeContext";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import TorusButton from "./torusComponents/TorusButton";
import TorusPopOver from "./torusComponents/TorusPopOver";
import { CiSquarePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { Heading, Input } from "react-aria-components";
import DropDown from "./NewDropdown";

const versions = ["v1.25", "v1.26", "v1.27", "v1.28"];

const artifactsList = [
  {
    project: "First Abu Dhabi Bank",
    arifactList: [
      {
        artifact: "Bank Master",
        version: ["1.0.0", "1.0.1"],
      },
      {
        artifact: "Branch Master",
        version: ["1.0.0", "1.0.1"],
      },
      {
        artifact: "IPS",
        version: ["1.0.0", "1.0.1"],
      },
    ],
  },
  {
    project: "Equity Bank",
    arifactList: [
      {
        artifact: "EFT - Debit",
        version: ["1.0.0", "1.0.1"],
      },
      {
        artifact: "EFT - Credit",
        version: ["1.0.0", "1.0.1"],
      },
      {
        artifact: "CCS",
        version: ["1.0.0", "1.0.1"],
      },
    ],
  },
  {
    project: "NSDL",
    arifact: [],
  },
  {
    project: "Finance House",
    arifact: [],
  },
];

export default function Navbar({ color }) {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const { darkMode } = useContext(DarkModeContext);
  const [inputchange, setInputchange] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedVersion, setSelectedVersion] = useState(new Set());
  const [value, setValue] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(0);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const toggleExpansion2 = (index) => {
    setExpanded2(index);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-[#161616] dark:border-none border-b border-slate-300 flex items-center justify-center">
      <div className="w-[100%] h-[90%] flex flex-col items-center justify-center">
        <div className="w-[99%] h-[80%]  flex flex-row items-center">
          <div className="w-1/3 flex justify-start gap-2">
            <TorusLogo />
            <span className=" font-semibold font-Neue Montreal text-black text-lg dark:text-white ">
              TORUS
            </span>
          </div>

          <div className=" w-1/3 bg-transparent rounded-md h-full flex items-center justify-center ">
            <TorusPopOver
              parentHeading={
                <div className="flex flex-row items-center justify-center gap-2 w-[100%]">
                  <div className="text-black dark:text-white font-semibold text-sm">
                    {(selectededArtifacts &&
                      Array.from(selectededArtifacts)[0]) ||
                      "Select Artifacts"}
                  </div>
                  <div className="text-white  bg-[#0736C4]  px-4 rounded-xl">
                    {(selectedVersion && Array.from(selectedVersion)[0]) || "*"}
                  </div>
                  <div>
                    <IoIosArrowDown className="text-black dark:text-white" />
                  </div>
                </div>
              }
              children={
                <div className="w-[470px] 2xl:w-[700px] 2xl:h-[580px] mt-[3%] ml-[-8%] h-[365px] border border-[#000000]/15 dark:border-[#212121] dark:bg-[#161616] bg-white rounded-lg flex flex-col justify-between">
                  <div className="w-[100%] h-[15%] flex flex-row p-2 border-b border-gray-300 dark:border-[#212121]">
                    <div className="w-[15%] flex items-center justify-start">
                      <p className="text-sm font-medium text-black dark:text-white text-start px-2">
                        Library
                      </p>
                    </div>
                    <div className="w-[70%] flex items-center justify-center gap-2">
                      <Input
                        startcontent={<CiSearch />}
                        value={inputValue}
                        placeholder="Enter text"
                        className={
                          "bg-[#F4F5FA] p-2 text-sm border border-gray-300 dark:bg-[#0F0F0F] w-[100%] h-[25px]  text-black dark:text-white rounded-md flex justify-center items-center"
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setInputchange(false);
                          }
                        }}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-[15%] flex items-center justify-end">
                      <IoCloseOutline />
                    </div>
                  </div>
                  <div className="w-[100%] h-[100%] flex flex-row ">
                    <div className="w-1/3 h-full border-r border-gray-300 ">
                      <div className="w-[150px] h-[267px] flex flex-col items-start justify-start p-3  overflow-y-auto scrollbar-none">
                        <div className=" flex flex-row items-center gap-1">
                          <IoIosArrowForward
                            color={darkMode ? "white" : "black"}
                            size={15}
                            className={`transition-all ease-in-out cursor-pointer duration-200 delay-75 ${
                              expanded ? "rotate-90" : ""
                            }`}
                            onClick={toggleExpansion}
                          />
                          <Heading className="text-black dark:text-white font-semibold text-xs select-none">
                            CLient
                          </Heading>
                        </div>

                        {expanded && (
                          <div className="w-[100%]  flex flex-col gap-2 ml-[6px]  border-l p-1 mt-[10px]">
                            {artifactsList.map((item, index) => {
                              return Object.keys(item).map((ele) => {
                                if (ele === "project") {
                                  return (
                                    <div className="w-[100%] flex flex-row items-center gap-1">
                                      <IoIosArrowForward
                                        color={darkMode ? "white" : "black"}
                                        size={15}
                                        className={`transition-all ease-in-out cursor-pointer p-[1px] duration-200 delay-75 ${
                                          expanded2 === index ? "rotate-90" : ""
                                        }`}
                                        onClick={() => {
                                          setExpanded2(index);
                                        }}
                                      />
                                      <div className="w-[100%] text-black font-semibold text-xs">
                                        {item[ele]}
                                      </div>
                                    </div>
                                  );
                                }
                                if (ele === "arifactList") {
                                  return (
                                    <>
                                      {expanded2 === index && (
                                        <div className="w-[100%]  flex flex-col gap-2 ml-[6px]  border-l p-1 mt-[10px]">
                                          {item[ele].map((ele2) => {
                                            if (typeof ele2 === "object") {
                                              return Object.keys(ele2).map(
                                                (ele3) => {
                                                  if (ele3 === "artifact") {
                                                    return (
                                                      <div className="w-[100%] file:text-black  text-xs">
                                                        {ele2[ele3]}
                                                      </div>
                                                    );
                                                  }
                                                }
                                              );
                                            }
                                          })}
                                        </div>
                                      )}
                                    </>
                                  );
                                }
                              });
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-2/3 ">
                      <div className="w-[95%] h-[95%]">
                        <div className="w-full h-full flex items-center justify-center ">
                          <div className="w-[75%] h-full p-2 flex flex-row ">
                            {inputchange == false ? (
                              <div className="w-[100%] h-[30px] bg-[#F4F5FA] dark:bg-[#0F0F0F] rounded-md flex flex-row">
                                <div className="w-full flex text-sm items-center justify-start p-2 ">
                                  {inputValue}
                                </div>
                                <div className="w-full flex items-center justify-end gap-2 p-2">
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => setInputchange(true)}
                                  >
                                    <FiEdit2 color="black" size={13} />
                                  </span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => setInputValue("")}
                                  >
                                    <BsTrash3 color="red" size={13} />
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full">
                                <Input
                                  value={inputValue}
                                  placeholder="Enter text"
                                  className={
                                    "bg-[#F4F5FA] p-2 text-sm dark:bg-[#0F0F0F] w-[100%] h-[30px]  text-black dark:text-white rounded-md flex justify-center items-center"
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      setInputchange(false);
                                    }
                                  }}
                                  onChange={(e) => {
                                    setInputValue(e.target.value);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="w-[25%] h-full ">
                            <DropDown
                              triggerButton="Version"
                              selectedKeys={selectedVersion}
                              setSelectedKeys={setSelectedVersion}
                              items={versions}
                              classNames={{
                                triggerButton:
                                  " rounded-lg w-[100%] text-xs h-[30px] font-medium mt-2 p-2 bg-[#F4F5FA] dark:bg-[#0F0F0F] dark:text-white",
                                popover: "w-[5%]",
                                listbox: "overflow-y-auto",
                                listboxItem: "flex text-sm justify-between",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[100%]  border-t border-gray-300 dark:border-[#212121] flex flex-row  ">
                    <div className="w-full  flex  p-2">
                      <div className="w-[60%] flex justify-start gap-2 ">
                        <TorusButton
                          btncolor={"secondary"}
                          buttonClassName=" dark:bg-[#0F0F0F] w-[110px] h-[30px]  rounded-md flex justify-center items-center"
                          Children={
                            <div className="w-[100%] h-full flex flex-row gap-1 items-center justify-center">
                              <ArtifactLogo className="stroke-[#1C274C] dark:stroke-white" />
                              <p className="text-[#1C274C] text-xs ">
                                Make a Copy
                              </p>
                            </div>
                          }
                        />
                        <TorusButton
                          btncolor={"primary"}
                          buttonClassName=" dark:bg-[#0F0F0F] w-[110px] h-[30px]  rounded-md flex justify-center items-center"
                          Children={
                            <div className="w-[100%] h-full flex flex-row gap-1 items-center justify-center">
                              <ArtifactLogo className="stroke-white " />
                              <p className="text-white text-xs ">
                                New Artifact
                              </p>
                            </div>
                          }
                        />
                      </div>
                      <div className="w-[40%] flex justify-end gap-4 ">
                        <TorusButton
                          buttonClassName=" bg-transparent w-[40px] text-[#0736C4] text-xs dark:text-white flex justify-center items-center"
                          Children={"Save"}
                        />
                        <TorusButton
                          btncolor={"primary"}
                          buttonClassName=" w-[80px] h-[30px] text-xs text-white rounded-md flex justify-center items-center"
                          Children={"Save as"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>

          <div className="w-1/3 bg-transparent h-full flex justify-end items-center gap-3 ">
            <div className=" rounded-md col-span-3 ">
              <div class="flex items-center -space-x-3">
                <img
                  class="inline-block size-6 rounded-full ring-2 ring-white dark:ring-neutral-900"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Image Description"
                />
                <img
                  class="inline-block size-6 rounded-full ring-2 ring-white dark:ring-neutral-900"
                  src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Image Description"
                />
                <img
                  class="inline-block size-6 rounded-full ring-2 ring-white dark:ring-neutral-900"
                  src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
                  alt="Image Description"
                />
                <img
                  class="inline-block size-6 rounded-full ring-2 ring-white dark:ring-neutral-900"
                  src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Image Description"
                />
                <img
                  class="inline-block size-6 rounded-full ring-2 ring-white dark:ring-neutral-900"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Image Description"
                />
                <div
                  style={{
                    backgroundColor: color ? color : "#0736C4",
                  }}
                  class="flex justify-center items-center size-6 rounded-full ring-2  ring-white dark:ring-neutral-900"
                >
                  <span className="text-white font-semibold text-xs">+2</span>
                </div>
              </div>
            </div>
            <div className=" col-span-1 flex justify-center items-center">
              <VerticalLine className={"stroke-black dark:stroke-white"} />
            </div>
            <div className=" col-span-4 flex justify-center items-center">
              <div className="flex justify-around gap-[0.8rem] items-center ">
                <div className="w-[30%] flex justify-center items-center">
                  <Debugger className={"stroke-black dark:stroke-white"} />
                </div>
                <div className="w-[30%] flex justify-center items-center">
                  <Preview className={"stroke-black dark:stroke-white"} />
                </div>
                <div className="w-[30%] flex justify-center items-center">
                  <Shared className={"stroke-black dark:stroke-white"} />
                </div>
              </div>
            </div>
            <div className=" col-span-1 flex justify-center items-center">
              <VerticalLine className={"stroke-black dark:stroke-white"} />
            </div>
            <div className=" col-span-3">
              <TorusButton
                Children="Publish"
                size={"md"}
                btncolor={color ? color : "#0736C4"}
                outlineColor="torus-hover:ring-blue-500/50"
                radius={"lg"}
                fontStyle={
                  "text-white font-inter 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
                }
                color={"white"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
