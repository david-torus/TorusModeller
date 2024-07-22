import React, { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import TreeView from "./treeView";
import { DarkmodeContext } from "../../../commonComponents/context/DarkmodeContext";
import { Tabs, Tab } from "@nextui-org/react";

const OrpsSidebar = ({ dropdownJson, fabrics }) => {
  const [open, setOpen] = useState(false);
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <div
      style={{
        top: 95,

        padding: "10px",
        position: "absolute",
        zIndex: 40,
      }}
    >
      <motion.div
        initial={false}
        onClick={() => {
          if (!open) setOpen(true);
        }}
        style={{
          width: open ? "250px" : "50px",
          height: open ? "500px" : "50px",
          cursor: open ? "default" : "pointer",
          transitionDuration: "0.4s",
        }}
        animate={open ? "open" : "closed"}
        className={`${
          darkMode
            ? "bg-[#1F1F1F] drop-shadow-lg relative rounded-lg  border border-gray-500  "
            : "bg-[#e7e6e6] backdrop-blur-sm drop-shadow-lg relative rounded-lg  border border-gray-500  "
        }`}
      >
        <FaPlus
          color={darkMode ? "#E0E0E0" : "#6B7280"}
          style={{
            zIndex: 45,
            top: 15,
            left: 15,
            transform: open ? "rotate(45deg)" : "none",
            transition: "0.5s",
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={() => {
            if (open) setOpen(false);
          }}
        />

        <div
          style={{ transitionDuration: open ? "1.7s" : "0.1s" }}
          className={` flex opacity-0  pt-[40px]  ${
            open ? "opacity-100 " : "invisible"
          }`}
        >
          <div className="w-full flex flex-col">
            <Tabs
              aria-label="Options"
              variant="underlined"
              classNames={{
                tabList:
                  "gap-4 w-full relative rounded-none pl-2 border-b border-divider",
                cursor: darkMode
                  ? "w-full bg-[#9c9c9c]"
                  : "w-full bg-slate-800",
                tab: darkMode
                  ? "max-w-fit px-0 h-12 text-white"
                  : "max-w-fit px-0 h-12 text-black",
                tabContent: darkMode
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
                        darkMode
                          ? "text-white text-center"
                          : "text-black text-center"
                      }
                    >
                      No data found
                    </p>
                  )}
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrpsSidebar;
