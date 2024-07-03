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
  1: {
    "dark": "#0736C4",
    "light": "#244DCB",
  },
  2: {
    "dark": "#33CCFF",
    "light": "#00BFFF",
  },
  3: { "dark": "#2AE38F", "light": "#13CC78" },

  4: { "dark": "#FFc723", "light": "#FFBE00" },
};

export default function Navbar({ setSelectedTab }) {
  const [selectededArtifacts, setSelectedArtifacts] = useState(new Set());
  const [selectedVersion, setSelectedVersion] = useState(new Set());
  const { darkMode } = useContext(DarkModeContext);
  const [activeTab, setActiveTab] = useState(null);
 
  return (
    <div
      className={`flex  w-full h-[45px]  justify-between`}
      style={{
        backgroundColor: colors &&  activeTab && darkMode ? colors[activeTab]?.dark : colors[activeTab]?.light
      }}
    >

      <div className="w-[40%] ">
        <Tabs
          orientation="vertical"
          className=" cursor-pointer ml-[10px]"
          onSelectionChange={(key) =>
            setSelectedTab((prev) => {
              if (key == prev) {
                return 0;
              }
              return key;
            })
          }
        >
          <TabList aria-label="tabs" className="flex flex-row gap-2 ">
            <Tab
              id="1"
              className={
                `${
                  darkMode
                    ? ` torus-selected:bg-[#1E2428] `
                    : ` torus-selected:bg-[#F4F5FA] `
                }` +
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center"
              }
            >
              {({ isSelected }) => (
                <div onClick={() => setActiveTab(1)}>
                  <Data
                    strokeColor={!isSelected && darkMode ? "white" : colors[activeTab]?.dark }
                  />
                </div>
              )}
            </Tab>
            <Tab
              id="2"
              className={
                `${
                  darkMode
                    ? ` torus-selected:bg-[#1E2428] `
                    : ` torus-selected:bg-[#F4F5FA] `
                }` +
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center"
              }
            >
              {({ isSelected }) => (
                <div onClick={() => setActiveTab(2)}>
                  <Wire
                    strokeColor={!isSelected && darkMode ? "white" : colors[activeTab]?.dark}
                  />
                </div>
              )}
            </Tab>
            <Tab
              id="3"
              className={
                `${
                  darkMode
                    ? ` torus-selected:bg-[#1E2428] `
                    : ` torus-selected:bg-[#F4F5FA] `
                }` +
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center"
              }
            >
              {({ isSelected }) => (
                <div onClick={() => setActiveTab(3)}>
                  <Connect
                    strokeColor={!isSelected && darkMode ? "white" : colors[activeTab]?.dark}
                  />
                </div>
              )}
            </Tab>
            <Tab
              id="4"
              className={
                `${
                  darkMode
                    ? ` torus-selected:bg-[#1E2428] `
                    : ` torus-selected:bg-[#F4F5FA] `
                }` +
                "w-[40px] h-[40px] mt-[5px] rounded-t-lg torus-focus:outline-none flex items-center justify-center"
              }
            >
              {({ isSelected }) => (
                <div onClick={() => setActiveTab(4)}>
                  <Sheild
                    strokeColor={!isSelected && darkMode ? "white" : colors[activeTab]?.dark}
                  />
                </div>
              )}
            </Tab>
          </TabList>
        </Tabs>
      </div>

      <ButtonToggle />
      <div className="w-[20%] flex items-center justify-center gap-2 ">
        <span
          className={`${
            darkMode
              ? "text-[#090b0e] text-sm  font-bold"
              : "text-white  text-sm  font-semibold"
          } `}
        >
          DataFabric
        </span>
        <span
          className={`${
            darkMode
              ? "text-[#090b0e] text-sm  font-bold"
              : "text-white  text-sm  font-semibold"
          } `}
        >
          /
        </span>
        <TorusDropDown
          title={
            <div className="flex flex-row items-center gap-2">
              <div>
                <span
                  className={`${
                    darkMode
                      ? "text-[#151a22] text-sm  font-bold"
                      : "text-white  text-sm  font-semibold"
                  } `}
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
           
              <span className="w-[2px]" style={{
              color: darkMode ? colors[activeTab]?.dark : "black",
              }}>
             { ( selectedVersion && Array.from(selectedVersion)[0]) || "*"}
              </span>
           
          }
          classNames={{
            buttonClassName: darkMode
              ? " bg-[#262626] flex items-center justify-center  rounded-md font-semibold   w-[30px] h-[24px] torus-pressed:animate-torusButtonActive "
              : "bg-white flex items-center justify-center  rounded-md font-semibold w-[30px] h-[24px] torus-pressed:animate-torusButtonActive ",
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
        <DialogTrigger>
          <Button
            className={
              `${darkMode ? `bg-[#262626] ` : `bg-white `}` +
              `font-lg w-[160px] h-[30px]  torus-pressed:w-[155px] torus-pressed:h-[30px]   rounded-md
       torus-focus:outline-none transition-all ease-in-out duration-300 flex  gap-3 flex-row items-center justify-center `
            }
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
                  stroke={darkMode ? colors[activeTab]?.dark :  "black"}
                  stroke-width="1.55555"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.83301 8.5H13.1663"
                  stroke={darkMode ? colors[activeTab]?.dark :  "black"}
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
                color: darkMode ? colors[activeTab]?.dark : "black",
              }}
 
              className={
               " text-sm " 
              }
            >
              Create a Artifact
            </span>
          </Button>
          <Modal className="flex items-center justify-center mt-[70px]">
            <Dialog className="bg-white outline-none rounded-md border-2 border-[#D8CFPF] shadow-xl shadow-slate-300/60 torus-focus:outline-none w-[600px] h-[400px]  ">
              hello
            </Dialog>
          </Modal>
        </DialogTrigger>

        <div className="flex items-center gap-2 ml-[15px]">
          <Reload fill={darkMode ? "black" : "white"} />
          <Eye fill={darkMode ? "black" : "white"} />
          <Play fill={darkMode ? "black" : "white"} />
          <div className=" flex items-center ml-[3px]">
            <div className="w-[40px] h-[40px] rounded-full bg-[#3961da] border-2 flex items-center justify-center border-[#052997]">
              <FaRegUser color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
