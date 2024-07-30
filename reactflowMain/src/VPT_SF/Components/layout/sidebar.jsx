import React, { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import TreeView from "./treeView";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { Tabs, Tab } from "@nextui-org/react";
import { GiOrganigram } from "react-icons/gi";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
const fabrics = [
  { fabricName: "orgGrp", fabricIcon: <GiOrganigram /> },
  { fabricName: "roleGrp", fabricIcon: <RiUserSettingsLine /> },
  { fabricName: "psGrp", fabricIcon: <FaRegHandshake /> },
];
const OrpsSidebar = ({ dropdownJson }) => {
  const [open, setOpen] = useState(true);
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        variant="underlined"
        classNames={{
          tabList:
            "gap-4 w-full relative rounded-none pl-2 border-b border-divider",
          cursor: !darkMode ? "w-full bg-[#9c9c9c]" : "w-full bg-slate-800",
          tab: !darkMode
            ? "max-w-fit px-0 h-12 text-white"
            : "max-w-fit px-0 h-12 text-black",
          tabContent: !darkMode
            ? "group-data-[selected=true]:text-[#9c9c9c]"
            : "group-data-[selected=true]:text-[#9c9c9c]",
          base: "w-full bg-transparent",
        }}
        items={
          fabrics &&
          fabrics.length > 0 &&
          fabrics.map((fab) => {
            return {
              content: fab.fabricName,
              id: fab.fabricName,
              label: fab.fabricName,
              icon: fab.fabricIcon,
            };
          })
        }
      >
        {(item) => (
          <Tab
            key={item.id}
            title={
              <div className="flex items-center space-x-[2px] hover:text-blue-500">
                {item.icon}
                <span>{item.label}</span>
              </div>
            }
          >
            {dropdownJson && dropdownJson.hasOwnProperty(item.id) ? (
              <TreeView data={dropdownJson[item.id]} />
            ) : (
              <p
                className={
                  !darkMode
                    ? "text-center text-white"
                    : "text-center text-black"
                }
              >
                No data found
              </p>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default OrpsSidebar;
