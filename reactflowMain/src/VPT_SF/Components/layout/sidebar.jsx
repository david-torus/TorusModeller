import React, { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import TreeView from "./treeView";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
// import { Tabs, Tab } from "@nextui-org/react";
import { Tabs, TabList, Tab, TabPanel } from "react-aria-components";
import { Collection, Button } from "react-aria-components";
import { GiOrganigram } from "react-icons/gi";
import { RiUserSettingsLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
const fabrics = [
  { id: "orgGrp", fabricName: "orgGrp", fabricIcon: <GiOrganigram /> },
  { id: "roleGrp", fabricName: "roleGrp", fabricIcon: <RiUserSettingsLine /> },
  { id: "psGrp", fabricName: "psGrp", fabricIcon: <FaRegHandshake /> },
];
const OrpsSidebar = ({ dropdownJson }) => {
  const [open, setOpen] = useState(true);
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div className="flex w-full flex-row ">
      <Tabs
        className="mt-2 w-full p-2"
        orientation="horizontal"
        aria-label="Options"
        variant="solid"
        classNames={{
          tabList:
            " w-full bg-[#F4F5FA] dark:bg-[#0F0F0F]  p-[2px] gap-0 border-none outline-none rounded-md flex items-center justify-center  ",

          tab: !darkMode
            ? " px-0 text-white font-semibold border-none outline-none"
            : " px-0 text-black font-semibold border-none outline-none",
          tabContent: !darkMode
            ? " border-none rounded-md outline-none"
            : " border-none rounded-md outline-none",
          cursor:
            "border-none bg-white dark:bg-[#212121] rounded-md torus-focus:outline-none outline-none torus-focus-within:outline-none",
          base: "p-2 mt-2",
        }}

        // items={
        //   fabrics &&
        //   fabrics.length > 0 &&
        //   fabrics.map((fab) => {
        //     return {
        //       content: fab.fabricName,
        //       id: fab.fabricName,
        //       label: fab.fabricName,
        //       icon: fab.fabricIcon,
        //     };
        //   })
        // }
      >
        <TabList
          aria-label="Dynamic tabs"
          items={fabrics}
          style={{ flex: 1 }}
          className=" flex h-[36px] w-full items-center justify-center  gap-0 rounded-md border-none bg-[#F4F5FA] px-[1px] py-[2px] text-black outline-none dark:bg-[#0F0F0F] "
        >
          {(item) => (
            <Tab
              className={({ isSelected }) => `
            flex h-[34px] w-full cursor-default flex-row items-center justify-center rounded-md text-center  font-medium  shadow-none outline-none transition-colors focus-visible:outline-none
            ${
              isSelected
                ? "bg-white text-sm text-black shadow dark:bg-[#212121] dark:text-white"
                : "pressed:bg-white/10 text-sm text-black dark:text-white"
            }
          `}
            >
              {item.fabricName}
            </Tab>
          )}
        </TabList>

        <Collection items={fabrics}>
          {(item) => (
            <TabPanel
              className="mt-2 w-full"
              key={item.id}
              title={
                <div className="flex items-center border-none ">
                  <span>{item.fabricName}</span>
                </div>
              }
            >
              {dropdownJson && dropdownJson.hasOwnProperty(item.id) ? (
                <div className="h-40">
                  <TreeView data={dropdownJson[item.id]} />
                </div>
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
            </TabPanel>
          )}
        </Collection>
      </Tabs>
    </div>
  );
};

export default OrpsSidebar;
