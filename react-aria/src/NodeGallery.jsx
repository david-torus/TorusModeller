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
          <span className="3xl:text-xs xl:text-sm font-normal font-plexsans tracking-tighter">
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
      <div
        className={`w-full 
          xl:h-[9%]
           lg:h-[7%]
           2xl:h-[7%]
           3xl:h-[5%]

           dark:text-white
            font-medium border-b border-slate-300
             dark:border-slate-600 
             flex justify-between 
             xl:py-1 xl:px-2
             3xl:p-2 items-center`}
      >
        <Header className="font-plexsans tracking-tighter 3xl:text-sm xl:text-base font-medium">
          {" "}
          Node Gallery
        </Header>
        <Back />
      </div>
      <div className="flex flex-col items-start ml-4 w-full h-[67%] 3xl:gap-2  xl:gap-[1.08rem] ">
        {loop(data)}
      </div>

      <div className="w-[95%]  bg-[#F4F5FA] dark:bg-gray-700 p-3 rounded-lg dark:text-white   ">
        <Text className="3xl:font-bold 3xl:text-sm xl:font-semibold xl:text-base font-plexsans tracking-tighter">
          Upgrade to unlock more features
        </Text>

        <br />
        <p
          slot="description"
          className=" 3xl:text-xs xl:text-sm xl:leading-[1.0rem] font-normal font-plexsans tracking-[0.01rem] leading-[0.9rem] word-spacing-[0.03rem] "
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
            fontStyle={
              "font-plexsans 3xl:text-xs  3xl:font-medium xl:text-sm xl:font-semibold tracking-tighter"
            }
          />
        </div>
      </div>
    </div>
  );
}
