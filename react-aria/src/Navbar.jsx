import React, { useState } from "react";
import {
  Connect,
  Data,
  Eye,
  Play,
  Reload,
  Sheild,
  Wire,
} from "./SVG_Application";
import { Tabs, TabList, Tab } from "react-aria-components";
import { Button } from "react-aria-components";
import { FaRegUser } from "react-icons/fa";
import TorusDropDown from "./torusComponents/TorusDropDown";

export default function Navbar() {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const [selectedVersion, setSelectedVersion] = useState(new Set());
  return (
    <div className="top-0 flex bg-[#0736C4] w-full h-[45px]">
      <div>
        <Tabs orientation="vertical" className=" cursor-pointer ml-[10px]">
          <TabList aria-label="tabs" className="flex flex-row gap-2 ">
            <Tab
              id="1"
              className="w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none torus-selected:bg-white flex items-center justify-center"
            >
              {({ isSelected }) => (
                <Data strokeColor={!isSelected ? "white" : "#0736C4"} />
              )}
            </Tab>
            <Tab
              id="2"
              className="w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none torus-selected:bg-white flex items-center justify-center"
            >
              {({ isSelected }) => (
                <>
                  <Wire strokeColor={!isSelected ? "white" : "#0736C4"} />
                </>
              )}
            </Tab>
            <Tab
              id="3"
              className="w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none torus-selected:bg-white flex items-center justify-center"
            >
              {({ isSelected }) => (
                <>
                  <Connect strokeColor={!isSelected ? "white" : "#0736C4"} />
                </>
              )}
            </Tab>
            <Tab
              id="4"
              className="w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none torus-selected:bg-white flex items-center justify-center"
            >
              {({ isSelected }) => (
                <>
                  <Sheild strokeColor={!isSelected ? "white" : "#0736C4"} />
                </>
              )}
            </Tab>
          </TabList>
        </Tabs>
      </div>
      <div className=" flex items-center justify-center gap-2 lg:ml-[300px] xl:ml-[400px] 2xl:ml[450px]">
        <span className="text-white text-sm font-semibold">DataFabric</span>
        <span className="text-white text-sm  ">/</span>
        {/* <span className="text-white text-sm   "> BankMaster</span> */}
        <TorusDropDown
          buttonClassName="bg-transparent  text-white torus-pressed:animate-torusButtonActive "
          seleected={selectededArtifacts}
          setSelected={setSelectedArtifacts}
          selectionMode="single"
          items={[
            { key: "BankMaster", label: "BankMaster" },
            { key: "Bank", label: "Bank" },
          ]}
        />
        <TorusDropDown
          buttonClassName="bg-white  text-black rounded-md font-semibold font-sm w-[30px] torus-pressed:animate-torusButtonActive "
          seleected={selectedVersion}
          setSelected={setSelectedVersion}
          selectionMode="single"
          items={[
            { key: "v1", label: "v1" },
            { key: "v2", label: "v2" },
          ]}
        />
      </div>
      <div className="xl:ml-[280px] lg:ml-[280px] flex items-center justify-end ">
        <Button
          className={`bg-white font-lg w-[160px] h-[30px]  torus-pressed:w-[155px] torus-pressed:h-[30px]   rounded-md
         torus-focus:outline-none transition-all ease-in-out duration-300 flex  gap-3 flex-row items-center justify-center`}
        >
          <span className="mt-[2px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 3.83325V13.1666"
                stroke="black"
                stroke-width="1.55555"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.83301 8.5H13.1663"
                stroke="black"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span className="text-black  font-semibold text-xs">
            Create a Artifacte
          </span>
        </Button>
      </div>
      <div className="flex items-center gap-2 ml-[15px]">
        <Reload />
        <Eye />
        <Play />
      </div>
      <div className=" flex items-center ml-[3px]">
        <div className="w-[40px] h-[40px] rounded-full bg-[#3961da] border-2 flex items-center justify-center border-[#052997]">
          <FaRegUser color="white" />
        </div>
      </div>
    </div>
  );
}
