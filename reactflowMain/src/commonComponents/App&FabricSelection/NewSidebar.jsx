import React, { useState } from "react";
import { Header, Section, Text } from "react-aria-components";
import { Back, User } from "../FabricsSvg-assests/SVG_Application";
import TorusButton from "../../torusComponents/TorusButton";
import "../../index.css";
import { Panel, ReactFlowProvider } from "reactflow";
import PFMain from "../../VPT_PF/VPT_PF_PFD/PFMain";
import UFDMain from "../../VPT_UF/VPT_UF_SLD/UFDMain";
import SFMain from "../../VPT_SF/SFMain";
import ERDMain from "../../VPT_DF/VPT_DF_ERD/ERDMain";
import PFDefaults from "../../VPT_PF/VPT_PFD/PFDDefaults";
import DFDDefaults from "../../VPT_DF/VPT_DFD/DFDefaults";
import UFDefaults from "../../VPT_UF/VPT_UFD/UFDefaults";
import DJUIMain from "../../VPT_DJUI/DJUIMain";
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
export default function NewSidebar({
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
        ? " h-[90%]   w-[20%] bg-white  border border-slate-300 dark:border-[#212121] dark:bg-[#161616] rounded-lg"
        : "h-[6%] w-[5% ]"
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
            ? "w-[100%] h-[91.5%] opacity-100"
            : "collapse opacity-0"
        }  pb-2 flex flex-col gap-3 justify-between transition-opacity duration-700 ease-in-out`}
      >
        <div className="flex flex-col items-start w-full xl:h-[75%] p-2 justify-between  scrollbar-hide overflow-y-scroll  ">
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

            <div className="w-[50%] flex justify-start items-center ">
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
                  "font-sfpros 3xl:text-xs 3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
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

  const Loopbody = (color, selectedFabric, onDragStart) => {
    switch (selectedFabric) {
        case "PF":
          return (
            <div
              className={`${!true ? " h-[100%] bg-[#1d1d1d] " : "h-[100%] bg-[#EEEEEE] "}`}
            >
              <ReactFlowProvider className="w-[100%] h-full">
                <PFMain
                  
                />
              </ReactFlowProvider>
            </div>
          );
  
        case "UF":
          return (
            <ReactFlowProvider className="w-[100%] h-full">
              <UFDMain
             
              />
            </ReactFlowProvider>
          );
  
        case "SF":
          return (
            <ReactFlowProvider className="w-[100%] h-full">
              <SFMain
          
              />
            </ReactFlowProvider>
          );
  
        case "DF":
          return (
            <ReactFlowProvider className="w-[100%] h-full">
              <ERDMain
             
              />
            </ReactFlowProvider>
          );
  
        case "PFD":
          return (
            <ReactFlowProvider className="w-[100%] h-full">
              <PFDefaults />
            </ReactFlowProvider>
          );
  
        case "DFD":
          return (
            <ReactFlowProvider className="w-[100%] h-full">
              <DFDDefaults />
            </ReactFlowProvider>
          );
  
        case "UFD":
          return (
            <ReactFlowProvider className="w-[100%] h-full">
              <UFDefaults />
            </ReactFlowProvider>
          );
        case "DJUI":
          return (
            <ReactFlowProvider className="w-[100%] h-full">
              <DJUIMain />
            </ReactFlowProvider>
          );
  
        default:
          return null;
      }
  }

  return (
    <>
     {selectedFabric && Loopbody(color, selectedFabric, onDragStart)}
    </>
  );
};
