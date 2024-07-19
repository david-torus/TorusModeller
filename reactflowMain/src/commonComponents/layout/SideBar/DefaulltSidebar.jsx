import React, { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { Card, CardFooter } from "@nextui-org/react";

import { ScrollShadow } from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

import { EnvSideData } from "./SidebarData";
import { DarkmodeContext } from "../../context/DarkmodeContext";
import ReusableInput from "../../reusableComponents/ReusableInput";

/**
 * Renders a sidebar component with a search input and a list of items.
 *
 * @param {Object} data - The data to be displayed in the sidebar.
 * @return {JSX.Element} The sidebar component.
 */
const DefaulltSidebar = ({ fabrics }) => {
  const [open, setOpen] = useState(false);
  const [clickToEdit, setClickToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const { darkMode } = useContext(DarkmodeContext);

  /**
   * Sets the data transfer for a drag start event and allows the move effect.
   *
   * @param {DragEvent} event - The drag start event.
   * @param {string} nodeType - The type of the node being dragged.
   * @param {string} [nodeName=""] - The name of the node being dragged. Defaults to an empty string.
   */
  const onDragStart = (event, nodeType, nodeName = "") => {
    event.dataTransfer.setData("application/roleColor", "#ccc");
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/name", nodeName);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        top: 95,
        padding: "10px",
        position: "absolute",
        zIndex: 100,
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
            : "backdrop-blur-sm drop-shadow-lg relative rounded-lg  border border-gray-500  "
        }`}
      >
        <FaPlus
          color={darkMode ? "white" : "#6B7280"}
          style={{
            zIndex: 110,
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
          className={`flex flex-col items-center opacity-0  pt-[40px]  ${
            open ? "opacity-100 " : "invisible"
          }`}
        >
          <div className="pb-2">
            <ReusableInput
              key={"DefaultSideBarNavbarInput1"}
              darkMode={darkMode}
              placeholder="Type to search..."
              startContent={
                <FiSearch
                  size={16}
                  color={darkMode ? "stone-100" : "slate-600/60"}
                />
              }
              isClearable={false}
              type="search"
              handleChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <ScrollShadow
            size={20}
            color="white"
            className="w-[220px] h-[380px] "
          >
            {EnvSideData[fabrics].length > 0 ? (
              EnvSideData[fabrics]
                .filter(
                  (item) =>
                    item.label.includes(search) ||
                    item.label.toLowerCase().includes(search)
                )
                .map((item, index) => {
                  return (
                    <Card
                      key={index}
                      onDragStart={(event) =>
                        onDragStart(event, item?.nodeType, item?.label)
                      }
                      draggable
                      isFooterBlurred
                      radius="lg"
                      className={`${
                        darkMode
                          ? "text-white/70  flex flex-col items-start cursor-grab active:cursor-grabbing  gap-2 bg-[#1D1C20] border border-gray-400/50  mb-3 "
                          : "text-black/70  flex flex-col items-start cursor-grab active:cursor-grabbing  gap-2 bg-[#E9E8E8] border border-gray-400  mb-3 "
                      }`}
                    >
                      <div className="mt-5 ml-2 flex flex-row justify-center items-center gap-2  ">
                        {React.createElement(item.icon, {
                          size: 30,
                          color: "#ccc",
                        })}
                        <div
                          className={`${
                            darkMode
                              ? "text-white/70 font-bold w-[70%] cursor-pointer "
                              : "text-black font-bold w-[70%] cursor-pointer "
                          }`}
                        >
                          {clickToEdit === index ? (
                            <ReusableInput
                              key={"DefaultSideBarNavbarInput2"}
                              darkMode={darkMode}
                              defaultValue={item.label}
                              size="sm"
                              handleChange={(e) => {
                                item.label = e.target.value;
                              }}
                              inputProps={{
                                onKeyDown: (e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    setClickToEdit(null);
                                  }
                                },
                                onblur: () => {
                                  setClickToEdit(null);
                                },
                              }}
                            />
                          ) : (
                            <label
                              className="cursor-text"
                              onClick={() => setClickToEdit(index)}
                            >
                              {item.label || "click to add name"}
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <CardFooter
                          className={`${
                            darkMode
                              ? "mb-[12px] text-start  text-white/70 text-sm justify-between bg-[#313137] border-gray-300/20 border-1 overflow-hidden py-1  rounded-lg bottom-1 w-[90%] shadow-small   "
                              : "mb-[12px] text-start text-black/70 text-sm justify-between bg-gray-100 border-gray-300/20 border-1 overflow-hidden py-1  rounded-lg bottom-1 w-[90%] shadow-small   "
                          }`}
                        >
                          <p className="indent-px">{item?.description}</p>
                        </CardFooter>
                      </div>
                    </Card>
                  );
                })
            ) : (
              <div className="text-white text-2xl">No items found</div>
            )}
          </ScrollShadow>
        </div>
        ;
      </motion.div>
    </div>
  );
};

export default DefaulltSidebar;
