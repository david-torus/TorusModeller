import React, { useState } from "react";
import { Header, Section, Text } from "react-aria-components";
import { Back, User } from "./SVG_Application";
import TorusButton from "./torusComponents/TorusButton";
import "./index.css";
import { Panel } from "reactflow";
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
  selectedFabric,
  showFabricSideBar,
  handleSidebarToggle,
  children,
}) {
  return (
    <Panel
      position="top-left"
      className={` 
    ${
      showFabricSideBar
        ? "md:w-4/12 lg:w-2/12 ml-[80px]  xl:w-[17.0%]  2xl:w-3/12 3xl:w-[12%] 4xl:w-4/12  h-[95%]  bg-white  border border-slate-300 dark:border-[#212121] dark:bg-[#161616] rounded-lg"
        : "h-[6%] w-[5%]"
    }  `}
    >
      <div
        className={`w-full h-full  ${
          showFabricSideBar &&
          "xl:h-[9%] lg:h-[7%] 2xl:h-[7%] 3xl:h-[5%]   dark:text-white font-medium border-b border-slate-300  dark:border-[#212121] flex justify-between p-2   items-center"
        } `}
      >
        <Header
          className={`${
            showFabricSideBar ? "opacity-100" : "hidden  opacity-0"
          } font-inter font-semibold  tracking-normal 3xl:text-sm xl:text-base  transition-opacity duration-1000 ease-in-out `}
        >
          Node Gallery
        </Header>

        <TorusButton
          buttonClassName={`${
            !showFabricSideBar ? "rotate-180 " : "rotate-0"
          } transition-transform ease-in-out duration-300 w-[12%] px-5 bg-white dark:bg-[#161616] `}
          width={showFabricSideBar ? "sm" : "none"}
          onPress={handleSidebarToggle}
          Children={<Back />}
        />
      </div>
      <div
        className={` ${
          showFabricSideBar
            ? "w-[100%] h-[91%] opacity-100"
            : "collapse opacity-0"
        }  pb-2 flex flex-col gap-3 justify-between transition-opacity duration-700 ease-in-out`}
      >
        <div className="flex flex-col items-start w-full xl:h-[47vh] p-2 justify-between  scrollbar-hide overflow-y-scroll  ">
          <Loop color={color} selectedFabric={selectedFabric} />
        </div>

        <div className="w-[100%] flex justify-center items-center ">
          <div className="w-[95%]  bg-[#F4F5FA] dark:bg-[#0F0F0F] p-3 rounded-lg dark:text-white   ">
            <Text className="3xl:font-semibold 3xl:text-sm xl:font-semibold xl:text-sm font-inter tracking-normal">
              Upgrade to unlock more features
            </Text>

            <br />
            <p
              slot="description"
              className=" 3xl:text-xs 3xl:pr-[20px]  xl:text-xs xl:leading-[1.0rem] font-thin font-inter tracking-normal  "
            >
              Enjoy unlimited space for fabrics, applets, extra security
              features & more.
            </p>

            <div className="w-[100%] flex justify-start items-center ">
              <TorusButton
                buttonClassName={"text-white"}
                Children="Ugrade"
                width={"md"}
                bgColor={"bg-[#0736C4]"}
                // outlineColor="torus-hover:ring-[#0736C4]"
                radius="full"
                color={"white"}
                height={"sm"}
                marginT={"mt-2"}
                btncolor={color}
                fontStyle={
                  "font-sfpros 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
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
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center hover:bg-[#F4F5FA] gap-1 dark:hover:bg-[#0F0F0F] p-2 rounded-md dark:text-white w-full"
          draggable
          onDragStart={(event) => onDragStart(event, "default")}
        >
          <div
            className={` bg-gray-100  dark:bg-[#0736C4]/15  dark:text-white xl:w-7 xl:h-7  flex items-center justify-center rounded-lg cursor-grab `}
          >
            {React.createElement(item.icon, {
              color: color ? color : "#0736C4",
              size: 18,
              selectedFabric: selectedFabric,
            })}
          </div>
          <span className="3xl:text-xs xl:text-sm font-normal tracking-normal font-inter cursor-grab">
            {item.label}
          </span>
        </div>
      ))}
    </>
  );
};
