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
        ? " h-[90%]   w-[20%] rounded-lg  border border-slate-300 bg-white dark:border-[#212121] dark:bg-[#161616]"
        : "w-[5% ] h-[6%]"
    }  `}
    >
      <div
        className={`h-full w-full  ${
          showFabricSideBar &&
          "flex items-center justify-between border-b border-slate-300 p-2 font-medium dark:border-[#212121]  dark:text-white lg:h-[7%]  xl:h-[9%] 2xl:h-[7%] 3xl:h-[5%] 3xl:py-1 4xl:py-1"
        } `}
      >
        <Header
          className={`${
            showFabricSideBar ? "opacity-100" : "hidden  opacity-0"
          } font-inter font-semibold  tracking-normal transition-opacity duration-1000 ease-in-out  xl:text-base 2xl:text-sm 3xl:text-lg 4xl:text-xl `}
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
            ? "h-[91.5%] w-[100%] opacity-100"
            : "collapse opacity-0"
        }  flex flex-col justify-between gap-3 pb-2 transition-opacity duration-700 ease-in-out`}
      >
        <div className="flex w-full flex-col items-start justify-between overflow-y-scroll p-2  scrollbar-hide xl:h-[75%]  ">
          <Loop color={color} selectedFabric={selectedFabric} />
        </div>

        <div className="flex w-[100%] items-center justify-center ">
          <div className="w-[95%]  rounded-lg bg-[#F4F5FA] p-3 dark:bg-[#0F0F0F] dark:text-white   ">
            <Text className="font-inter tracking-normal xl:text-sm xl:font-semibold 2xl:text-base 3xl:text-lg 3xl:font-semibold">
              Upgrade to unlock more features
            </Text>

            <br />
            <p
              slot="description"
              className=" font-inter font-normal tracking-normal xl:text-xs xl:leading-[1.0rem] 3xl:pr-[20px] 2xl:text-sm 3xl:text-base 4xl:text-lg  "
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
            <ReactFlowProvider className="h-full w-[100%]">
              <PFMain />
            </ReactFlowProvider>
          </div>
        );

      case "UF":
        return (
          <ReactFlowProvider className="h-full w-[100%]">
            <UFDMain />
          </ReactFlowProvider>
        );

      case "SF":
        return (
          <ReactFlowProvider className="h-full w-[100%]">
            <SFMain />
          </ReactFlowProvider>
        );

      case "DF":
        return (
          <ReactFlowProvider className="h-full w-[100%]">
            <ERDMain />
          </ReactFlowProvider>
        );

      case "PFD":
        return (
          <ReactFlowProvider className="h-full w-[100%]">
            <PFDefaults />
          </ReactFlowProvider>
        );

      case "DFD":
        return (
          <ReactFlowProvider className="h-full w-[100%]">
            <DFDDefaults />
          </ReactFlowProvider>
        );

      case "UFD":
        return (
          <ReactFlowProvider className="h-full w-[100%]">
            <UFDefaults />
          </ReactFlowProvider>
        );
      case "DJUI":
        return (
          <ReactFlowProvider className="h-full w-[100%]">
            <DJUIMain />
          </ReactFlowProvider>
        );

      default:
        return null;
    }
  };

  return <>{selectedFabric && Loopbody(color, selectedFabric, onDragStart)}</>;
};
