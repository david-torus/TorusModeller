import React, { useContext, useState } from "react";
import {
  Debugger,
  Preview,
  Shared,
  TorusLogo,
  VerticalLine,
  ZoomIn,
  Search,
  Close,
} from "./SVG_Application";
import { DarkModeContext } from "./context/darkmodeContext";
import { IoIosArrowDown } from "react-icons/io";
import TorusButton from "./torusComponents/TorusButton";
import TorusPopOver from "./torusComponents/TorusPopOver";
import { BiZoomIn } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import TorusDropDown from "./torusComponents/TorusDropDown";
import TorusInput from "./torusComponents/TorusInput";
import TorusModularInput from "./torusComponents/TorusModularInput.tsx";

export default function Navbar({ color }) {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const { darkMode } = useContext(DarkModeContext);
  const [selectedVersion, setSelectedVersion] = useState(new Set());
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
                <div className="w-[330px] mt-[4%] h-[365px] border border-[#000000]/15 dark:border-[#212121] dark:bg-[#161616] bg-white rounded-lg flex flex-col justify-between">
                  <div className="w-[100%] flex flex-row p-2 border-b border-gray-300 dark:border-[#212121]">
                    <div className="w-1/3 flex justify-start">
                      <p className="text-sm font-medium text-black dark:text-white text-start px-2">
                        Artifact
                      </p>
                    </div>
                    <div className="w-2/3 flex justify-end gap-2">
                      <CiSquarePlus />
                      <CiSearch />
                      <IoCloseOutline />
                    </div>
                  </div>
                  <div className="w-[95%] h-[95%] items-center justify-center grid grid-cols-2 gap-3 ">
                    {/* <TorusModularInput
                      isRequired={true}
                      isReadOnly={false}
                      placeholder="Artifact"
                      // label="Input"
                      variant="bordered"
                      labelColor="text-[#000000]/50"
                      borderColor="border-[#000000]/20"
                      isDisabled={false}
                      // onChange={setModular}
                      radius="lg"
                      textColor="text-[#000000]"
                      bgColor="bg-[#FFFFFF]"
                      value={"this is value from state "}
                      type="text"
                      marginT="mt-3"
                      // startContent={
                      //   <FaSearchLocation size={15} color="#9CA3AF" />
                      // }
                      maxLength={20}
                      discription="This is a hint text to help user."
                      isClearable={true}
                      className="w-[50px] h-[40px] "
                    />

                    <TorusDropDown
                      label={"Select Version"}
                      options={["1.0.0", "2.0.0", "3.0.0"]}
                      onChange={(e) => setSelectedVersion(new Set([e]))}
                      value={Array.from(selectedVersion)[0] || "1.0.0"}
                      className="w-[90%] h-[40px]  border border-[#000000]/15 dark:border-[#212121] dark:bg-[#161616] bg-white rounded-lg"
                    /> */}
                  </div>
                  <div className="w-[100%] p-2 border-t border-gray-300 dark:border-[#212121] flex flex-row space-x-2 ">
                    <div className="w-1/3 flex justify-start">
                      <TorusButton
                        buttonClassName=" bg-[#F4F5FA] dark:bg-[#0F0F0F] w-[100px] h-[30px] text-xs text-black dark:text-white rounded-md flex justify-center items-center"
                        Children={"Make a copy"}
                      />
                    </div>

                    <div className="w-2/3 flex justify-end gap-4">
                      <TorusButton
                        buttonClassName=" bg-transparent w-[40px] text-[#0736C4] text-xs dark:text-white flex justify-center items-center"
                        Children={"Save"}
                      />
                      <TorusButton
                        buttonClassName=" bg-[#0736C4] w-[80px] h-[30px] text-xs text-white rounded-md flex justify-center items-center"
                        Children={"Save as"}
                      />
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
