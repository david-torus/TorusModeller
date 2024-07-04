import React, { useState } from "react";
import { Header, Section, Text } from "react-aria-components";
import TorusSearchFeild from "./torusComponents/TorusSearchFeild";
import { Back, User } from "./SVG_Application";
import TorusButton from "./torusComponents/TorusButton";
const data = [
  {
    label: "User",
    icon: <User size={10} />,
  },
  {
    label: "User",
    icon: <User size={10} />,
  },
  {
    label: "User",
    icon: <User size={10} />,
  },
  {
    label: "User",
    icon: <User size={10} />,
  },
];
export default function NodeGallery() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const loop = (ite) => {
    return ite.map((item, index) => {
      return (
        <div
          key={index}
          className="flex items-center gap-1 dark:text-white "
          draggable
          onDragStart={(event) => onDragStart(event, "default")}
        >
          <div
            className={`
            bg-[#d0d8f2] 
            dark:bg-gray-400 
            dark:text-white 
            xl:w-5 xl:h-5 
            
            
            flex items-center justify-center rounded-lg`}
          >
            {item.icon}
          </div>
          <span className="text-xs font-normal font-plexsans tracking-tighter">
            {item.label}
          </span>
        </div>
      );
    });
  };
  return (
    <div
      className="w-full h-full flex flex-col gap-3 "
      style={{
        fontFamily: "IBMPlexSans-Medium",
      }}
    >
      <div className="w-full h-[8%] dark:text-white font-medium border-b border-slate-300 dark:border-slate-600 flex justify-between p-4 items-center">
        <Header className="font-plexsans tracking-tighter text-sm font-medium">
          {" "}
          Node Gallery
        </Header>
        <Back />
      </div>
      <div className="flex flex-col items-start ml-4 w-full h-[67%]  xl:gap-1 ">
        {loop(data)}
      </div>

      <div className="w-[95%]  bg-[#F4F5FA] dark:bg-gray-700 p-3 rounded-lg dark:text-white   ">
        <Text className="font-bold text-sm font-plexsans tracking-tighter">
          Upgrade to unlock more features
        </Text>

        <br />
        <p
          slot="description"
          className=" text-xs font-normal font-plexsans tracking-[0.01rem] leading-[0.9rem] word-spacing-[0.03rem] "
        >
          Enjoy unlimited space for fabrics, applets, extra security features &
          <br /> more.
        </p>

        <div className="w-[100%] flex justify-start items-center ">
          <TorusButton
            Children="update"
            width={"md"}
            bgColor={"bg-[#0736C4]"}
            outlineColor="torus-hover:ring-[#0736C4]"
            radius="full"
            color={"white"}
            height={"sm"}
            marginT={"mt-2"}
            fontStyle={"font-plexsans text-xs font-medium tracking-tighter"}
          />
        </div>
      </div>
    </div>
  );
}
