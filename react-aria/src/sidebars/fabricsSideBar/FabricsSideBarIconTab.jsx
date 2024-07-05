import React from "react";
import { BiAccessibility } from "react-icons/bi";
import {
  Pencil,
  Flip,
  Medicine,
  Scan,
  Add,
  Calendar,
} from "../../SVG_Application";
import TorusToolTip from "../../torusComponents/TorusToolTip";
const tabIcons = [
  {
    name: "DF",
    icon: <Pencil />,
  },
  {
    name: "UF",
    icon: <Flip />,
  },
  {
    name: "UF",
    icon: <Medicine />,
  },
  {
    name: "UF",
    icon: <Scan />,
  },
  {
    name: "UF",
    icon: <Add />,
  },
  {
    name: "UF",
    icon: <Flip />,
  },
  {
    name: "UF",
    icon: <Medicine />,
  },
  {
    name: "UF",
    icon: <Scan />,
  },
];

export default function FabricsSideBarIconTab({color}) {
  return (
    <div className="w-full h-full flex flex-col gap-3 pt-6 ">
      {tabIcons.map((icon) => {
        return <RenderIcon name={icon.name} icon={icon.icon}  color={color}/>;
      })}
    </div>
  );
}

const RenderIcon = ({ name, icon , color}) => {
  return (
    <div  className="w-full p-2 flex items-center justify-center ">
      <TorusToolTip tooltipContent={name} hoverContent={icon} color={color} />
    </div>
  );
};
