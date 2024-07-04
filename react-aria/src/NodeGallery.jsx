import React, { useState } from "react";
import { Header, Section, Text } from "react-aria-components";
import TorusSearchFeild from "./torusComponents/TorusSearchFeild";
import { Back, User } from "./SVG_Application";
import TorusButton from "./torusComponents/TorusButton";
const data = [
  {
    label: "User",
    icon: <User />,
  },
  {
    label: "User",
    icon: <User />,
  },
  {
    label: "User",
    icon: <User />,
  },
  {
    label: "User",
    icon: <User />,
  },
];
export default function NodeGallery() {
  const [searchText, setSearchText] = useState("");
  const loop = (ite) => {
    return ite.map((item, index) => {
      return (
        <div key={index} className="flex items-center gap-1 ">
          <div className="bg-[#d0d8f2] w-8 h-8 flex items-center justify-center rounded-lg">
            {item.icon}
          </div>
          {item.label}
        </div>
      );
    });
  };
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <div className="w-full h-[8%] font- font-medium border-b border-slate-300 flex justify-between p-4 items-center">
        <Header> Node Gallery</Header>
        <Back />
      </div>
      <div className="flex flex-col items-start ml-4 w-full h-[67%] gap-5  ">
        {loop(data)}
      </div>
      <div className="w-full h-[8%]  flex items-center justify-center   ">
        <div className="w-[95%]  bg-grey-300 p-3 rounded-lg  ">
          <Text className="font-bold text-sm">
            Upgrade to unlock more features
          </Text>

          <br />
          <Text
            slot="description"
            className=" text-xs leading-tight tracking-tighter "
          >
            Enjoy unlimited space for fabrics, applets, extra security features
            &
            <br /> more.
          </Text>
          <br />
          <TorusButton
            buttonClassName="text-sm px-5 py-1 bg-[#0736C4] text-white rounded-2xl"
            Children={"Upgrade"}
          />
        </div>
      </div>
    </div>
  );
}
