import { useState, useEffect, createElement, memo } from "react";
import TorusToolTip from "../../torusComponents/TorusToolTip";
import {
  MdOutlineDataArray,
  MdBackupTable,
  MdDataObject,
} from "react-icons/md";
import { LuDatabase } from "react-icons/lu";
import { SiDatabricks } from "react-icons/si";
import { TfiRulerPencil } from "react-icons/tfi";
import { PiCodepenLogoLight } from "react-icons/pi";
import { GoLink } from "react-icons/go";
import { LiaCreditCardSolid } from "react-icons/lia";
import { SlSocialDropbox } from "react-icons/sl";

const iconArray = [
  MdDataObject,
  MdOutlineDataArray,
  MdBackupTable,
  LuDatabase,
  SiDatabricks,
  TfiRulerPencil,
  PiCodepenLogoLight,
  GoLink,
  LiaCreditCardSolid,
  SlSocialDropbox,
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const RenderJsonArraySidebarIcon = memo(
  ({
    obj,
    setShowObj,
    setPath,
    fg,
    activeTab,
    setActiveTab,
    setLabel,
    shuffledIcons,
    setCheckActivestatus,
    setExpandedItem

  }) => {
    
    return (
      <>
        <div
          className={
            "w-[100%]  flex z-50 items-center gap-4 cursor-pointer" +
            (activeTab == fg
              ? "text-xs  cursor-pointer text-[#6600ff]"
              : " text-gray-800 cursor-pointer")
          }
        >
         
          <TorusToolTip
            hoverContent={
              <MdOutlineDataArray size={20}   />
            }
            tooltipFor="arr"
            tooltipContent={ fg} // obj.map((ele) => ele?.label ? ele?.label : fg
            color={activeTab == fg ? "#6600ff" : "#09254D"}
            setShowObj={setShowObj}
            setActiveTab={setActiveTab}
            setPath={setPath}
            fg={fg}
            obj={obj}
            setLabel={setLabel}
            setCheckActivestatus={setCheckActivestatus}
            setExpandedItem={setExpandedItem}
          />
        </div>
      </>
    );
  }
);

export const JsonSidebarIcon = memo(
  ({ obj, setShowObj, setPath, setLabel, checkActivestatus,setCheckActivestatus,setExpandedItem }) => {
    const [activeTab, setActiveTab] = useState(null);

    return (
      <>
        <div className="max-w-full relative bg-white dark:bg-[#161616]   h-full overflow-y-scroll scrollbar-none flex flex-col mb-5 p-4 gap-5">
          {obj &&
            Object.keys(obj).map((ele, i) => {
              if (typeof obj[ele] == "object" && !Array.isArray(obj[ele])) {
                return (
                  <div key={i + ele} className="">
                    <span
                      className={
                        " flex items-center z-50 text-xs cursor-pointer gap-4" +
                        (activeTab === ele
                          ? " cursor-pointer  text-xs text-[#0073e6]"
                          : "text-gray-100 cursor-pointer")
                      }
                      onClick={() => {
                        setShowObj(ele);
                        setPath(ele);
                        setActiveTab(ele);
                        setCheckActivestatus(obj[activeTab])
                      }}
                      
                      
                      
                    >
                      
                      <TorusToolTip
                        hoverContent={
                          <MdDataObject size={20} />
                        }
                        tooltipFor="obj"
                        tooltipContent={ele} // obj.map((ele) => ele?.label ? ele?.label : fg
                        color={activeTab == ele ? "#6600ff" : "#09254D"}
                        setShowObj={setShowObj}
                        setActiveTab={setActiveTab}
                        setPath={setPath}
                        ele={ele}
                        setLabel={setLabel}
                      />
                    </span>
                  </div>
                );
              }
              if (Array.isArray(obj[ele])) {
                return (
                  <RenderJsonArraySidebarIcon
                    key={i + ele}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    obj={obj[ele]}
                    fg={ele}
                    setShowObj={setShowObj}
                    setPath={setPath}
                    setLabel={setLabel}
                    shuffledIcons={iconArray}
                    setCheckActivestatus={setCheckActivestatus}
                    setExpandedItem={setExpandedItem}
          
                  />
                );
              }
            })}
        </div>
      </>
    );
  }
);
