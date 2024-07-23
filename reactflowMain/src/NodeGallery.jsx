import React, { useContext, useState } from "react";
import { Header, Section, Text } from "react-aria-components";
import { Back, User } from "./SVG_Application";
import TorusButton from "./torusComponents/TorusButton";
// import "./index.css";
import { Panel } from "reactflow";
import { EnvSideData } from "./commonComponents/layout/SideBar/SidebarData";
import { FabricsContexts } from "./Layout";
const data = [
  {
    label: "User",
    icon: User,
  },

  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
  {
    label: "User",
    icon: User,
  },
];
export default function NodeGallery({
  color,
  showFabricSideBar,
  handleSidebarToggle,
  children,
}) {
  const { selectedFabric } = useContext(FabricsContexts);
  return (
    <Panel
      position="top-left"
      style={{
        left: "6%",
      }}
      className={` 
    ${
      showFabricSideBar
        ? "h-[95%] rounded-lg  border  border-slate-300 bg-white dark:border-[#212121]  dark:bg-[#161616]  md:w-4/12  lg:w-2/12 xl:w-[14.0%]  3xl:w-[12%] 4xl:w-4/12"
        : "flex h-[6%] w-[5%] items-center justify-center"
    }`}
    >
      <div
        className={`h-full w-full  ${
          showFabricSideBar &&
          "flex items-center justify-between border-b border-slate-300 p-2 font-medium dark:border-[#212121]  dark:text-white lg:h-[7%] xl:h-[9%] 2xl:h-[9%] 3xl:h-[7%]"
        } `}
      >
        <div className="felx-col flex w-[100%] justify-between">
          <div className="flex w-[70%] items-center justify-start">
            <Header
              className={`${
                showFabricSideBar ? "opacity-100" : "hidden  opacity-0"
              } 3xl:text-md font-inter  font-semibold tracking-normal transition-opacity  duration-1000 ease-in-out xl:text-sm 3xl:text-xl`}
            >
              Node Gallery
            </Header>
          </div>
          <div
            className={`flex ${!showFabricSideBar ? "w-[50%] pr-[15px] pt-[10px]" : ""}  items-center justify-end  `}
          >
            <TorusButton
              buttonClassName={`flex justify-center items-center px-3 ${!showFabricSideBar ? "border border-slate-300 border-l-transparent " : ""} ${
                !showFabricSideBar ? "rotate-180 " : "rotate-0"
              } transition-transform ease-in-out duration-300 w-[12%] px-5 bg-white dark:bg-[#161616] `}
              width={showFabricSideBar ? "sm" : "none"}
              onPress={handleSidebarToggle}
              Children={<Back />}
            />
          </div>
        </div>
      </div>
      <div
        className={` ${
          showFabricSideBar
            ? "h-[91.5%] w-[100%] opacity-100"
            : "collapse opacity-0"
        }  flex flex-col justify-between  transition-opacity duration-700 ease-in-out`}
      >
        <div className="flex w-full flex-col items-start justify-between overflow-y-scroll p-2  scrollbar-hide xl:max-h-[88%] xl:min-h-[50%] 2xl:max-h-[75%] 2xl:min-h-[35%] ">
          <Loop color={color} selectedFabric={selectedFabric} />
        </div>

        <div className="flex w-[100%] items-center justify-center xl:max-h-[7%] xl:min-h-[33.5%] 2xl:min-h-[25%] ">
          <div className=" w-[95%] rounded-lg bg-[#F4F5FA] p-3 dark:bg-[#0F0F0F] dark:text-white   ">
            <Text className="font-inter tracking-normal xl:text-sm xl:font-semibold 3xl:text-sm 3xl:font-semibold">
              Upgrade to unlock more features
            </Text>

            <br />
            <p
              slot="description"
              className=" font-inter   tracking-normal xl:text-xs xl:leading-[1.0rem] 2xl:pr-[18px] 2xl:text-sm 2xl:leading-[0.8rem] 3xl:pr-[20px] 3xl:text-sm 3xl:leading-[1.0rem] "
            >
              Enjoy unlimited space for fabrics, applets, extra security
              features & more.
            </p>

            <div className="flex w-[50%] items-center justify-start ">
              <TorusButton
                buttonClassName={"text-white"}
                Children="Upgrade"
                width={"md"}
                bgColor={"bg-[#0736C4]"}
                outlineColor="torus-hover:ring-[#0736C4]"
                radius="full"
                color={"white"}
                size={"sm"}
                marginT={"mt-2"}
                btncolor={"#0736C4"}
                fontStyle={
                  "font-sfpros 3xl:text-xs 3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter px-1 py-2"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

const Loop = ({ color, selectedFabric }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <>
      {EnvSideData[selectedFabric] &&
        EnvSideData[selectedFabric].map((item, index) => (
          <div
            key={index}
            className="flex w-full items-center gap-1 rounded-lg p-2 hover:bg-[#F4F5FA] dark:text-white dark:hover:bg-[#0F0F0F]"
            draggable
            onDragStart={(event) => onDragStart(event, item.nodeType)}
          >
            <div
              className={` flex  cursor-grab  items-center justify-center rounded-lg  bg-gray-100 dark:bg-[#0736C4]/15 dark:text-white xl:h-7 xl:w-7 3xl:h-10 3xl:w-10`}
            >
              {React.createElement(item.icon, {
                color: color ? color : "#0736C4",
                size: 18,
                selectedFabric: selectedFabric,
              })}
            </div>
            <span className="cursor-grab px-2 font-inter font-normal tracking-normal xl:text-sm 2xl:text-base 3xl:text-lg">
              {item.label}
            </span>
          </div>
        ))}
    </>
  );
};
