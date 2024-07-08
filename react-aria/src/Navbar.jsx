import React, { useContext, useState } from "react";
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
import { FaRegUser, FaSyncAlt } from "react-icons/fa";
import TorusDropDown from "./torusComponents/TorusDropDown";
import { IoIosArrowDown } from "react-icons/io";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from "react-aria-components";
import ButtonToggle from "./context/ButtonToggle";
import { DarkModeContext } from "./context/darkmodeContext";
import TorusButton from "./torusComponents/TorusButton";
import { merger } from "./utils/utils";
import { BiPlus } from "react-icons/bi";
import TorusAvatar from "./torusComponents/TorusAvatar";
import TorusTab from "./torusComponents/TorusTab";
const colors = {
  hidden: { dark: "#008080", light: "#008080" },
  DF: {
    dark: "#2257f7",
    light: "#244DCB",
  },
  UF: {
    dark: "#33CCFF",
    light: "#00BFFF",
  },
  PF: { dark: "#2AE38F", light: "#13CC78" },

  SF: { dark: "#FFc723", light: "#FFBE00" },
};

export default function Navbar({ handleTabChange, selectedFabric }) {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const [selectedVersion, setSelectedVersion] = useState(new Set());

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex max-w-full mx-auto   xl:max-3xl:pr-3  justify-between`}
      style={{
        backgroundColor:
          colors && selectedFabric && darkMode
            ? colors[selectedFabric]?.dark
            : colors[selectedFabric]?.light,
      }}
    >
      <div className="w-[40%] ">
        <TorusTab
          classNames={{
            tabs: "cursor-pointer ml-[10px] lg:max-3xl:mt[2%]",
            tabList: "flex flex-row gap-2 ",
            tab: `xl:w-[6.5%] xl:h-[2.48rem]
                  lg:w-[6.5%] lg:h-[2.3rem]
                  md:w-[10%] md:h-[2.5rem]
                  3xl:w-[6.5%] 3xl:h-[2.3rem]
                  md:mt-[1%] 
                  lg:mt-[1.6%] 
                  xl:mt-[1.7%] 
                  3xl:mt-[1.8%] 
                rounded-t-lg torus-focus:outline-none flex items-center justify-center torus-selected:bg-[#F4F5FA] dark:torus-selected:bg-[#1E2428]]`,
          }}
          tabs={[
            {
              id: "DF",
              content: ({ isSelected }) => (
                <div>
                  <Data
                    strokeColor={
                      !isSelected ? "white" : colors[selectedFabric]?.dark
                    }
                  />
                </div>
              ),
            },
            {
              id: "UF",
              content: ({ isSelected }) => (
                <div>
                  <Wire
                    strokeColor={
                      !isSelected ? "white" : colors[selectedFabric]?.dark
                    }
                  />
                </div>
              ),
            },
            {
              id: "PF",
              content: ({ isSelected }) => (
                <div>
                  <Connect
                    strokeColor={
                      !isSelected ? "white" : colors[selectedFabric]?.dark
                    }
                  />
                </div>
              ),
            },
            {
              id: "SF",
              content: ({ isSelected }) => (
                <div>
                  <Sheild
                    strokeColor={
                      !isSelected ? "white" : colors[selectedFabric]?.dark
                    }
                  />
                </div>
              ),
            },
          ]}
          onSelectionChange={handleTabChange}
        />
      </div>

      {/* <ButtonToggle /> */}
      <div className="w-[20%] flex items-center justify-center gap-2 ">
        <span
          className={
            "text-white   xl:text-sm  3xl:text-sm font-plexsans font-semibold dark:text-[#090b0e] dark:font-bold"
          }
        >
          {selectedFabric &&
            (selectedFabric == "DF"
              ? "DataFabric"
              : selectedFabric == "UF"
              ? "UserFabric"
              : selectedFabric == "PF"
              ? "ProcessFabric"
              : "SecurityFabric")}
        </span>
        <span
          className={
            "text-white xl:text-sm  3xl:text-sm font-plexsans font-semibold dark:text-[#090b0e] dark:font-bold"
          }
        >
          /
        </span>

        <diV className="flex items-center justify-center gap-2 w-[100%] ">
          <div className="flex items-center xl:justify-start 3xl:justify-start gap-2 w-[50%]">
            <TorusDropDown
              title={
                <div className="flex flex-row items-center gap-2 w-[100%]">
                  <div
                    className={
                      "w-[80%] text-white font-plexsans 3xl:text-sm xl:text-sm xl:font-normal tracking-tighter whitespace-nowrap"
                    }
                  >
                    {(selectededArtifacts &&
                      Array.from(selectededArtifacts)[0]) ||
                      "Select Artifacts"}
                  </div>
                  <div className="w-[20%]">
                    <IoIosArrowDown color={darkMode ? "#090b0e" : "white"} />
                  </div>
                </div>
              }
              fontStyle={
                "font-plexsans 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
              }
              classNames={{
                buttonClassName: `bg-transparent flex  text-white rounded-md font-semibold font-sm  torus-pressed:animate-torusButtonActive `,
                listBoxClassName: "bg-white text-black ",
              }}
              selected={selectededArtifacts}
              setSelected={setSelectedArtifacts}
              selectionMode="single"
              items={[
                { key: "BankMaster", label: "BankMaster" },
                { key: "Bank", label: "Bank" },
              ]}
              btWidth={"md"}
            />
          </div>

          <div className="flex items-center 3xl:justify-start  xl:justify-end  gap-2 w-[50%]">
            <TorusDropDown
              title={
                <span
                  className="font-plexsans 3xl:text-xs xl:text-sm xl:font-normal tracking-tighter"
                  style={{
                    color: darkMode ? colors[selectedFabric]?.dark : "black",
                  }}
                >
                  {(selectedVersion && Array.from(selectedVersion)[0]) || "*"}
                </span>
              }
              classNames={{
                buttonClassName:
                  " bg-white dark:bg-[#262626] flex items-center justify-center  rounded-md font-semibold   w-[30px] h-[24px] torus-pressed:animate-torusButtonActive ",

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
            />
          </div>
        </diV>
      </div>
      <div className="w-[40%]  flex items-center justify-end ">
        <TorusButton
          Children="Create a Artifact"
          width={"sm"}
          bgColor={"bg-[#0736C4]"}
          radius="lg"
          startContent={<BiPlus size={18} color={"black"} />}
          color={"text-teal-600"}
          gap={"px-[15px]"}
          height={"sm"}
          btncolor={"white"}
          fontStyle={
            "font-sfpromedium  3xl:text-xs  3xl:font-medium xl:text-sm xl:font-[400] tracking-tighter"
          }
        />

        <div className="flex items-center gap-2 ml-[15px]">
          <Reload fill={darkMode ? "black" : "white"} />
          <Eye fill={darkMode ? "black" : "white"} />
          <Play fill={darkMode ? "black" : "white"} />
          <TorusAvatar
            color={"white"}
            borderColor={"border-white"}
            radius={"full"}
            size={"full"}
          />
        </div>
      </div>
    </div>
  );
}
