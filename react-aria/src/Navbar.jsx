import React, { useContext, useState } from "react";
import {
  Debugger,
  Line,
  Preview,
  Saved,
  Shared,
  TorusLogo,
  VerticalLine,
  ZoomIn,
} from "./SVG_Application";
import { Heading } from "react-aria-components";
import TorusDropDown from "./torusComponents/TorusDropDown";
import { DarkModeContext } from "./context/darkmodeContext";
import { IoIosArrowDown } from "react-icons/io";
import TorusButton from "./torusComponents/TorusButton";

export default function Navbar() {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const { darkMode } = useContext(DarkModeContext);
  const [selectedVersion, setSelectedVersion] = useState(new Set());
  return (
    <div className="w-full h-full bg-white border-b border-slate-300 flex items-center justify-center">
      <div className="w-[100%] h-[90%] flex flex-col items-center justify-center">
        <div className="w-[99%] h-[80%]  flex flex-row items-center justify-between gap-[4%]">
          {/* TorusLogo */}
          <div className="flex gap-2">
            <TorusLogo />
            <span className=" font-semibold font-Neue Montreal text-black text-lg ">
              TORUS
            </span>
          </div>

          {/* Torusselectors */}

          <div className=" w-[15%] pl-[2.8rem] bg-transparent rounded-md h-full flex justify-end ">
            <div className="w-[100%] bg-transparent rounded-md h-full">
              <div className="w-[100%] h-[100%] flex flex-col">
                <div className="w-[100%] flex flex-row justify-between items-center">
                  <div className="w-[70%]">
                    <TorusDropDown
                      title={
                        <div className="flex flex-row items-center gap-2 w-[100%]">
                          <div
                            className={
                              "w-[80%] text-black font-inter 3xl:text-sm xl:text-sm xl:font-sswmbold tracking-normal whitespace-nowrap"
                            }
                          >
                            {(selectededArtifacts &&
                              Array.from(selectededArtifacts)[0]) ||
                              "Select Artifacts"}
                          </div>
                          {/* <div className="w-[20%]">
                    <IoIosArrowDown color={darkMode ? "#090b0e" : "white"} />
                  </div> */}
                        </div>
                      }
                      fontStyle={
                        "font-inter 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
                      }
                      classNames={{
                        buttonClassName: `bg-transparent flex  text-black rounded-md font-semibold font-md  torus-pressed:animate-torusButtonActive `,
                        listBoxClassName: "bg-white text-black ",
                      }}
                      selected={selectededArtifacts}
                      setSelected={setSelectedArtifacts}
                      selectionMode="single"
                      items={[
                        { key: "Bank Master", label: "Bank Master" },
                        { key: "Bank", label: "Bank" },
                      ]}
                      btWidth={"md"}
                    />
                  </div>

                  <div className="w-[30%] flex justify-between items-center">
                    <div className="w-[60%] flex justify-center gap-1 rounded-md">
                      <TorusDropDown
                        title={
                          <span className="font-inter text-white  3xl:text-xs xl:text-sm xl:font-normal tracking-tighter">
                            {(selectedVersion &&
                              Array.from(selectedVersion)[0]) ||
                              "*"}
                          </span>
                        }
                        classNames={{
                          buttonClassName:
                            " bg-white dark:bg-[#262626] flex items-center justify-center font-semibold   w-[40px] h-[20px] torus-pressed:animate-torusButtonActive ",

                          listBoxClassName: "bg-white text-black ",
                        }}
                        popOverProps={{ offset: 15 }}
                        selected={selectedVersion}
                        setSelected={setSelectedVersion}
                        selectionMode="single"
                        items={[
                          { key: "v1", label: "v1" },
                          { key: "v2", label: "v2" },
                        ]}
                        btncolor={"#0736C4"}
                        fontStyle={
                          "font-inter 3xl:text-xs text-white  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
                        }
                        radius={"xl"}
                      />
                    </div>
                    <div className="w-[40%]">
                      <span>
                        <IoIosArrowDown size={15} color="black" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] flex h-[50%] ">
                  <div className="w-[70%] ">
                    <p className="text-xs text-black/35">Edited 10 mins ago</p>
                  </div>
                  <div className="w-[30%] flex justify-between gap-1 items-center">
                    <div className="w-[30%] flex justify-center items-center">
                      <Saved />
                    </div>
                    <div className="w-[70%]">
                      <p className="text-xs text-[#0736C4]">Saved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar */}

          <div className=" bg-transparent h-full flex justify-center items-center ">
            <div className="flex justify-center items-center w-[100%]">
              <div className="grid grid-cols-12 gap-[0.2rem] w-[100%]">
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
                    <div class="flex justify-center items-center size-6 rounded-full ring-2 bg-[#0736C4]  ring-white dark:ring-neutral-900">
                      <span className="text-white font-semibold text-xs">
                        +2
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" col-span-1 flex justify-center items-center">
                  <VerticalLine />
                </div>

                <div className=" col-span-4 flex justify-center items-center">
                  <div className="flex justify-around gap-[0.8rem] items-center ">
                    <div className="w-[30%] flex justify-center items-center">
                      <Debugger />
                    </div>
                    <div className="w-[30%] flex justify-center items-center">
                      <Preview />
                    </div>
                    <div className="w-[30%] flex justify-center items-center">
                      <Shared />
                    </div>
                  </div>
                </div>
                <div className=" col-span-1 flex justify-center items-center">
                  <VerticalLine />
                </div>
                <div className=" col-span-3">
                  <TorusButton
                    Children="Publish"
                    width={"full"}
                    btncolor={"#0736C4"}
                    outlineColor="torus-hover:ring-blue-500/50"
                    radius={"lg"}
                    fontStyle={
                      "text-white font-inter 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
                    }
                    color={"white"}
                    gap={"py-1.5"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
