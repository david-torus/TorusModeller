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
import { FaRegUser } from "react-icons/fa";
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
const colors = {
  hidden: { dark: "#008080", light: "#008080" },
  DF: {
    dark: "#0736C4",
    light: "#244DCB",
  },
  UF: {
    dark: "#33CCFF",
    light: "#00BFFF",
  },
  PF: { dark: "#2AE38F", light: "#13CC78" },

  SF: { dark: "#FFc723", light: "#FFBE00" },
};

export default function Navbar({
  selectedTab,
  setSelectedTab,
  setSelectedFabric,
  selectedFabric,
}) {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const [selectedVersion, setSelectedVersion] = useState(new Set());

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex max-w-full mx-auto max-h-11 justify-between`}
      style={{
        backgroundColor:
          colors && selectedTab && darkMode
            ? colors[selectedTab]?.dark
            : colors[selectedTab]?.light,
      }}
    >
      <div className="w-[40%] ">
        <Tabs
          orientation="vertical"
          className=" cursor-pointer ml-[10px]"
          onSelectionChange={(key) => {
            setSelectedTab((prev) => {
              if (key == prev) {
                return "hidden";
              }
              return key;
            });
            setSelectedFabric(key);
          }}
        >
          <TabList aria-label="tabs" className="flex flex-row gap-2 ">
            <Tab
              id="DF"
              className={
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center torus-selected:bg-[#F4F5FA] dark:torus-selected:bg-[#1E2428]]"
              }
            >
              {({ isSelected }) => (
                <div>
                  <Data
                    strokeColor={
                      !isSelected ? "white" : colors[selectedTab]?.dark
                    }
                  />
                </div>
              )}
            </Tab>
            <Tab
              id="UF"
              className={
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center torus-selected:bg-[#F4F5FA] dark:torus-selected:bg-[#1E2428]]"
              }
            >
              {({ isSelected }) => (
                <div>
                  <Wire
                    strokeColor={
                      !isSelected ? "white" : colors[selectedTab]?.dark
                    }
                  />
                </div>
              )}
            </Tab>
            <Tab
              id="PF"
              className={
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center torus-selected:bg-[#F4F5FA] dark:torus-selected:bg-[#1E2428]]"
              }
            >
              {({ isSelected }) => (
                <div>
                  <Connect
                    strokeColor={
                      !isSelected ? "white" : colors[selectedTab]?.dark
                    }
                  />
                </div>
              )}
            </Tab>

            <Tab
              id="SF"
              className={
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center torus-selected:bg-[#F4F5FA] dark:torus-selected:bg-[#1E2428]]"
              }
            >
              {({ isSelected }) => (
                <div>
                  <Sheild
                    strokeColor={
                      !isSelected ? "white" : colors[selectedTab]?.dark
                    }
                  />
                </div>
              )}
            </Tab>
          </TabList>
        </Tabs>
      </div>

      {/* <ButtonToggle /> */}
      <div className="w-[20%] flex items-center justify-center gap-2 ">
        <span
          className={
            "text-white  text-sm  font-semibold dark:text-[#090b0e] dark:font-bold"
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
            "text-white  text-sm  font-semibold dark:text-[#090b0e] dark:font-bold"
          }
        >
          /
        </span>
        <TorusDropDown
          title={
            <div className="flex flex-row items-center gap-2">
              <div>
                <span
                  className={
                    "text-white  text-sm  font-semibold dark:text-[#151a22] dark:font-bold"
                  }
                >
                  {(selectededArtifacts &&
                    Array.from(selectededArtifacts)[0]) ||
                    "*"}
                </span>
              </div>
              <IoIosArrowDown color={darkMode ? "#090b0e" : "white"} />
            </div>
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
        />
        <TorusDropDown
          title={
            <span
              className="w-[2px]"
              style={{
                color: darkMode ? colors[selectedTab]?.dark : "black",
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
      <div className="w-[40%]  flex items-center justify-end ">
        <Button
          className={`bg-white dark:bg-[#262626] font-lg w-[160px] h-[30px]  torus-pressed:w-[155px] torus-pressed:h-[30px]   rounded-md
       torus-focus:outline-none transition-all ease-in-out duration-300 flex  gap-3 flex-row items-center justify-center `}
        >
          <span className="mt-[2px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 17 17"
              fill=""
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 3.83325V13.1666"
                stroke={darkMode ? colors[selectedTab]?.dark : "black"}
                stroke-width="1.55555"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.83301 8.5H13.1663"
                stroke={darkMode ? colors[selectedTab]?.dark : "black"}
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: 500,
              fontStyle: "normal",
              fontVariationSettings: "normal",
              color: darkMode ? colors[selectedTab]?.dark : "black",
            }}
            className={" text-sm "}
          >
            Create a Artifact
          </span>
        </Button>

        <div className="flex items-center gap-2 ml-[15px]">
          <Reload fill={darkMode ? "black" : "white"} />
          <Eye fill={darkMode ? "black" : "white"} />
          <Play fill={darkMode ? "black" : "white"} />
          <div className=" flex items-center ml-[3px]">
            <div className="w-[40px] h-[40px] rounded-full bg-transparent border-2 flex items-center justify-center border-[#F4F5FA]">
              <FaRegUser color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
