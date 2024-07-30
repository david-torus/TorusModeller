import React, { useContext } from "react";
import { Panel } from "reactflow";
import {
  Connect,
  Data,
  FabricBar,
  Faq,
  Home,
  Line,
  NodeGallerIcon,
  Sheild,
  Support,
  VerticalLine,
  Wire,
} from "../../FabricsSvg-assests/SVG_Application";

import { BiMoon, BiSun } from "react-icons/bi";
import TorusTab from "../../../torusComponents/TorusTab";
import TorusAvatar from "../../../torusComponents/TorusAvatar";
import { DarkmodeContext } from "../../context/DarkmodeContext";
import { TorusModellerContext } from "../../../Layout";

const colors = {
  home: { dark: "#008080", light: "#008080" },
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

const transparent =
  "torus-selected:border-r-transparent torus-selected:border-t-transparent torus-selected:border-b-transparent";
const focusBLcolor = {
  DF: {
    dark: `torus-selected:border-2 torus-selected:border-l-[#2257f7] ${transparent}`,
    light: `torus-selected:border-2 torus-selected:border-l-[#244DCB] ${transparent}`,
  },
  UF: {
    dark: `torus-selected:border-2 torus-selected:border-l-[#33CCFF] ${transparent}`,
    light: `torus-selected:border-2 torus-selected:border-l-[#00BFFF] ${transparent}`,
  },
  PF: {
    dark: `torus-selected:border-2 torus-selected:border-l-[#2AE38F] ${transparent}`,
    light: `torus-selected:border-2 torus-selected:border-l-[#13CC78] ${transparent}`,
  },

  SF: {
    dark: `torus-selected:border-2 torus-selected:border-l-[#FFc723] ${transparent}`,
    light: `torus-selected:border-2 torus-selected:border-l-[#FFBE00] ${transparent}`,
  },
};

export default function NewFabricSidebar() {
  const { handleTabChange, selectedFabric } = useContext(TorusModellerContext);
  const { darkMode, toggleDarkMode } = useContext(DarkmodeContext);
  const borderFn = () => {
    if (selectedFabric === "home") {
      return focusBLcolor.home;
    } else if (selectedFabric === "DF") {
      return focusBLcolor.DF.dark;
    } else if (selectedFabric === "UF") {
      return focusBLcolor.UF.dark;
    } else if (selectedFabric === "PF") {
      return focusBLcolor.PF.dark;
    } else if (selectedFabric === "SF") {
      return focusBLcolor.SF.dark;
    }
  };

  const borderLeft = borderFn();
  console.log(borderLeft, "leftBorder");

  return (
    <Panel
      position="top-left"
      className=" z-100 flex h-[90%] w-[5%] flex-col   items-center rounded-lg   border  border-slate-300  bg-white py-2 dark:border-[#212121]  "
    >
      <div className=" flex w-[100%] flex-col  items-center   ">
        <TorusTab
          key="TorusTab"
          orientation="vertical"
          classNames={{
            tabs: "cursor-pointer ",
            tabList: "w-full h-[100%]  flex justify-center items-center",
            tab: ` p-1.5 h-full w-full flex justify-center items-center torus-pressed:outline-none torus-focus:outline-none  border-2 border-transparent  torus-selected:border-l-[${colors[selectedFabric]?.dark}]`,
          }}
          tabs={[
            {
              id: "Home",
              content: ({ isSelected }) => (
                <Home strokeColor={!isSelected ? "#A59E92" : "teal"} />
              ),
            },
            {
              id: "DF",
              content: ({ isSelected }) => (
                <Data
                  strokeColor={
                    !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                  }
                />
              ),
            },
            {
              id: "UF",
              content: ({ isSelected }) => (
                <Wire
                  strokeColor={
                    !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                  }
                />
              ),
            },
            {
              id: "PF",
              content: ({ isSelected }) => (
                <Connect
                  strokeColor={
                    !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                  }
                />
              ),
            },
            {
              id: "SF",
              content: ({ isSelected }) => (
                <Sheild
                  strokeColor={
                    !isSelected ? "#A59E92" : colors[selectedFabric]?.dark
                  }
                />
              ),
            },
          ]}
          onSelectionChange={handleTabChange}
        />

        <div className="flex h-[5%] rotate-90 items-center p-2 py-5 ">
          <VerticalLine className={"stroke-white"} />
        </div>

        <div className="  mb-5 flex  h-[30%] w-[100%] cursor-pointer flex-col items-center gap-3">
          <FabricBar className="stroke-[#A6A6A6] dark:stroke-[#686868]" />

          <Faq className="stroke-[#A6A6A6] dark:stroke-[#686868]" />

          <Support className="stroke-[#A6A6A6] dark:stroke-[#686868]" />
        </div>

        <div className="flex h-[40%] flex-col items-center  justify-end gap-3">
          <div
            className="cursor-pointer"
            onClick={() => toggleDarkMode(!darkMode)}
          >
            {darkMode ? (
              <BiSun color={"#A59E92"} />
            ) : (
              <BiMoon color={"#A59E92"} />
            )}
          </div>
          <div>
            <NodeGallerIcon color={"#A59E92"} />
          </div>
          <div>
            <TorusAvatar
              radius={"full"}
              size={"lg"}
              borderColor={"#A59E92"}
              src={
                "https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              }
            />
          </div>
        </div>
      </div>
    </Panel>
  );
}
