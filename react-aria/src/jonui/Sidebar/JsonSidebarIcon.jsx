import { useState, useEffect, createElement } from "react";
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

const RenderJsonArraySidebarIcon = ({
  obj,
  setShowObj,
  setPath,
  fg,
  activeTab,
  setActiveTab,
  setLabel,
  shuffledIcons,
}) => {
  return (
    <>
      <div
        className={
          "w-[100%] flex  items-center gap-[0.2rem] cursor-pointer" +
          (activeTab == fg
            ? "text-xs  cursor-pointer text-[#6600ff]"
            : " text-black cursor-pointer")
        }
      >
        <TorusToolTip
          hoverContent={
            shuffledIcons.length > 0 &&
            createElement(
              shuffledIcons[Math.floor(Math.random() * shuffledIcons.length)],
              {
                size: 20,
                color: activeTab === fg ? "#6600ff" : "#B2BABB",
              }
            )
          }
          tooltipFor="arr"
          tooltipContent={obj[0].grouplabel}
          color={activeTab == fg ? "#6600ff" : "#09254D"}
          setShowObj={setShowObj}
          setActiveTab={setActiveTab}
          setPath={setPath}
          fg={fg}
          setLabel={setLabel}
        />
      </div>
    </>
  );
};

export const JsonSidebarIcon = ({ obj, setShowObj, setPath, setLabel }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [shuffledIcons, setShuffledIcons] = useState([]);

  useEffect(() => {
    setShuffledIcons(shuffleArray([...iconArray]));
  }, [obj]);

  const RenderedIcon = shuffledIcons.length > 0 ? shuffledIcons[0] : null;

  return (
    <>
      <div className="max-w-full bg-white dark:bg-[#161616]   h-full overflow-y-scroll scrollbar-none flex flex-col p-4 gap-5">
        {obj &&
          Object.keys(obj).map((ele) => {
            if (typeof obj[ele] == "object" && !Array.isArray(obj[ele])) {
              {
                return (
                  <div>
                    <span
                      className={
                        " flex items-center text-xs cursor-pointer gap-4" +
                        (activeTab === ele
                          ? " cursor-pointer  text-xs text-[#0073e6]"
                          : "text-black cursor-pointer")
                      }
                      onClick={() => {
                        setShowObj(ele);
                        setPath(ele);
                        setActiveTab(ele);
                      }}
                    >
                      <TorusToolTip
                        hoverContent={
                          shuffledIcons.length > 0 &&
                          createElement(
                            shuffledIcons[
                              Math.floor(Math.random() * shuffledIcons.length)
                            ],
                            {
                              size: 20,
                              color: activeTab === ele ? "#E74C3C" : "#B2BABB",
                            }
                          )
                        }
                        tooltipFor="obj"
                        tooltipContent={obj[ele].label ? obj[ele].label : ele}
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
            }
            if (Array.isArray(obj[ele])) {
              return (
                <RenderJsonArraySidebarIcon
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  obj={obj[ele]}
                  fg={ele}
                  setShowObj={setShowObj}
                  setPath={setPath}
                  setLabel={setLabel}
                  shuffledIcons={shuffledIcons}
                />
              );
            }
          })}
      </div>
    </>
  );
};
