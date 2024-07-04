import React from "react";
import { BiAccessibility } from "react-icons/bi";
const tabIcons = [
  {
    name: "DF",
    icon: <BiAccessibility />,
  },
  {
    name: "UF",
    icon: <BiAccessibility />,
  },
  {
    name: "UF",
    icon: <BiAccessibility />,
  },
  {
    name: "UF",
    icon: <BiAccessibility />,
  },
  {
    name: "UF",
    icon: <BiAccessibility />,
  },
  {
    name: "UF",
    icon: <BiAccessibility />,
  },
];

export default function FabricsSideBarIconTab() {
  return (
    <div className="w-full h-full flex flex-col gap-5 pt-8 ">
      {tabIcons.map((icon) => {
        return <RenderIcon name={icon.name} icon={icon.icon} />;
      })}
    </div>
  );
}

const RenderIcon = ({ name, icon }) => {
  return (
    <div title={name} className="w-full p-2 flex items-center justify-center ">
      {icon}
    </div>
  );
};
